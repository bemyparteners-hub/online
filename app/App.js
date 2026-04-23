(function(){
// App.jsx — Configurateur façonnage aluminium
// Shell : toolbar + panneau gauche (profils & catalogue d'articles)
// canvas central (2D + 3D) + panneau droit (cotes + matière avec autocomplete + récap)

const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;
const View2D = window.View2D;
const View3D = window.View3D;

// ═══════════════════════════════════════════════════════════════════════
// MATERIAL PICKER — autocomplete sur les 1023 matières de la base fusionnée
// ═══════════════════════════════════════════════════════════════════════
function MaterialPicker({
  value,
  onChange
}) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef(null);
  useEffect(() => setQuery(value || ""), [value]);
  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    return window.Plialu.searchMaterials(query, 12);
  }, [query]);
  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);
  function pick(m) {
    onChange(m.name);
    setQuery(m.name);
    setOpen(false);
  }
  function onKey(e) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      pick(results[activeIdx]);
    } else if (e.key === "Escape") setOpen(false);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "mat-picker",
    ref: wrapRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "mat-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mat-label"
  }, "MAT"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "mat-input",
    value: query,
    placeholder: "ex. AL15-7016 \xB7 tape 2+ lettres\u2026",
    onChange: e => {
      const v = e.target.value.toUpperCase();
      setQuery(v);
      onChange(v);
      setOpen(true);
      setActiveIdx(0);
    },
    onFocus: () => setOpen(true),
    onKeyDown: onKey,
    spellCheck: false
  })), open && results.length > 0 && /*#__PURE__*/React.createElement("ul", {
    className: "mat-dropdown",
    role: "listbox"
  }, results.map((m, i) => /*#__PURE__*/React.createElement("li", {
    key: `${m.id}-${m.thickness}-${i}`,
    className: `mat-opt ${i === activeIdx ? "active" : ""}`,
    onMouseEnter: () => setActiveIdx(i),
    onMouseDown: e => {
      e.preventDefault();
      pick(m);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mat-opt-name"
  }, m.name), /*#__PURE__*/React.createElement("span", {
    className: "mat-opt-meta"
  }, m.family, " \xB7 ", m.thickness, "mm", m.ral ? ` · RAL ${m.ral}` : "", m.finish ? ` · ${m.finish}` : "")))), /*#__PURE__*/React.createElement("div", {
    className: "mat-hint"
  }, results.length > 0 ? `${results.length} résultat${results.length > 1 ? "s" : ""} · ↑↓ pour naviguer` : /*#__PURE__*/React.createElement(React.Fragment, null, "Ex. ", /*#__PURE__*/React.createElement("code", null, "AL15-7016M"), " \xB7 ", /*#__PURE__*/React.createElement("code", null, "AL20-9010"), " \xB7 ", /*#__PURE__*/React.createElement("code", null, "AC10-9016"))));
}

// ═══════════════════════════════════════════════════════════════════════
// CATALOG MODAL — parcours des 275 articles par famille
// ═══════════════════════════════════════════════════════════════════════
function CatalogModal({
  open,
  onClose
}) {
  const P = window.Plialu;
  const [family, setFamily] = useState(P.FAMILLES[0]);
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const base = P.getArticlesByFamille(family);
    if (!q) return base;
    const qq = q.toLowerCase();
    return base.filter(a => a.article.toLowerCase().includes(qq));
  }, [family, q]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("header", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "modal-title"
  }, "CATALOGUE ARTICLES"), /*#__PURE__*/React.createElement("div", {
    className: "modal-sub"
  }, P.ARTICLES.length, " r\xE9f\xE9rences \xB7 ", P.FAMILLES.length, " familles")), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "cat-fams"
  }, P.FAMILLES.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    className: `cat-fam ${f === family ? "active" : ""}`,
    onClick: () => setFamily(f)
  }, /*#__PURE__*/React.createElement("span", {
    className: "cat-fam-name"
  }, f), /*#__PURE__*/React.createElement("span", {
    className: "cat-fam-count"
  }, P.getArticlesByFamille(f).length)))), /*#__PURE__*/React.createElement("main", {
    className: "cat-main"
  }, /*#__PURE__*/React.createElement("input", {
    className: "cat-search",
    type: "text",
    placeholder: `Rechercher dans « ${family} »…`,
    value: q,
    onChange: e => setQ(e.target.value),
    autoFocus: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "cat-count"
  }, items.length, " article", items.length > 1 ? "s" : ""), /*#__PURE__*/React.createElement("ul", {
    className: "cat-list"
  }, items.map(a => /*#__PURE__*/React.createElement("li", {
    key: a.id,
    className: "cat-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cat-id"
  }, "#", a.id.toString().padStart(3, "0")), /*#__PURE__*/React.createElement("span", {
    className: "cat-name"
  }, a.article), /*#__PURE__*/React.createElement("span", {
    className: "cat-fam-tag"
  }, a.famille))))))));
}

// ═══════════════════════════════════════════════════════════════════════
// APP PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════
function App() {
  const P = window.Plialu;
  const G = window.AluGeom;
  const PROFILES = P.PROFILES;
  function cloneProfile(p) {
    return {
      ...p,
      segments: p.segments.map(s => ({
        ...s
      })),
      bends: p.bends.map(b => ({
        ...b
      }))
    };
  }
  const [selectedProfileId, setSelectedProfileId] = useState(PROFILES[0].id);
  const [profile, setProfile] = useState(() => cloneProfile(PROFILES[0]));
  const [hoverSeg, setHoverSeg] = useState(null);
  const [materialCode, setMaterialCode] = useState("AL15-7016M");
  const [barLength, setBarLength] = useState(3000);
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState("schema");
  const [activeView, setActiveView] = useState("both");
  const [catalogOpen, setCatalogOpen] = useState(false);
  const thicknessMm = useMemo(() => P.parseThicknessFromCode(materialCode), [materialCode]);

  // Tarif au m² (basé sur la partie AL{code})
  const tarifM2 = useMemo(() => {
    const m = String(materialCode).match(/(AL\d+)/i);
    return m ? P.TARIFS[m[1].toUpperCase()] || null : null;
  }, [materialCode]);
  function selectProfile(id) {
    const p = PROFILES.find(x => x.id === id);
    if (!p) return;
    setSelectedProfileId(id);
    setProfile(cloneProfile(p));
  }
  function updateSegmentLength(idx, value) {
    const v = Math.max(1, parseFloat(value) || 0);
    setProfile(prev => ({
      ...prev,
      segments: prev.segments.map((s, i) => i === idx ? {
        ...s,
        length: v
      } : s)
    }));
  }
  function updateBendAngle(idx, value) {
    const v = parseFloat(value) || 0;
    setProfile(prev => ({
      ...prev,
      bends: prev.bends.map((b, i) => i === idx ? {
        ...b,
        angle: v
      } : b)
    }));
  }
  function addSegment() {
    setProfile(prev => {
      const newSegments = [...prev.segments, {
        length: 30,
        label: ""
      }];
      const newBends = [...prev.bends, {
        angle: -90
      }];
      newSegments.forEach((s, i) => s.label = G.label(i));
      return {
        ...prev,
        segments: newSegments,
        bends: newBends
      };
    });
  }
  function addBendAfter(idx) {
    setProfile(prev => {
      const newSegments = [...prev.segments];
      const newBends = [...prev.bends];
      const insertAt = idx + 1;
      newSegments.splice(insertAt, 0, {
        length: 30,
        label: ""
      });
      newBends.splice(insertAt - 1 < 0 ? 0 : insertAt, 0, {
        angle: -90
      });
      newSegments.forEach((s, i) => s.label = G.label(i));
      return {
        ...prev,
        segments: newSegments,
        bends: newBends
      };
    });
  }
  function removeSegment(idx) {
    setProfile(prev => {
      if (prev.segments.length <= 2) return prev;
      const newSegments = prev.segments.filter((_, i) => i !== idx);
      const newBends = [...prev.bends];
      const bendToRemove = idx === 0 ? 0 : idx - 1;
      if (newBends.length > 0) newBends.splice(bendToRemove, 1);
      newSegments.forEach((s, i) => s.label = G.label(i));
      return {
        ...prev,
        segments: newSegments,
        bends: newBends
      };
    });
  }
  const totalDev = useMemo(() => G.developpedLength(profile.segments), [profile]);
  const estWeight = useMemo(() => G.weight(profile.segments, thicknessMm, barLength) * quantity, [profile, thicknessMm, barLength, quantity]);
  const surfaceM2 = useMemo(() => totalDev * barLength / 1e6 * quantity, [totalDev, barLength, quantity]);
  const estPrice = useMemo(() => tarifM2 ? surfaceM2 * tarifM2 : null, [tarifM2, surfaceM2]);
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("header", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "toolbar-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-mark"
  }, "\u2310"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "logo-title"
  }, "PLIALU"), /*#__PURE__*/React.createElement("div", {
    className: "logo-sub"
  }, "Configurateur fa\xE7onnage aluminium")))), /*#__PURE__*/React.createElement("div", {
    className: "toolbar-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proj-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "proj-label"
  }, "PROJET"), /*#__PURE__*/React.createElement("span", {
    className: "proj-name"
  }, "Nouveau fa\xE7onnage"), /*#__PURE__*/React.createElement("span", {
    className: "proj-sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "proj-date"
  }, new Date().toLocaleDateString("fr-FR")))), /*#__PURE__*/React.createElement("div", {
    className: "toolbar-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "tb-btn",
    onClick: () => setCatalogOpen(true)
  }, /*#__PURE__*/React.createElement("span", {
    className: "kbd"
  }, "\u2318K"), " Catalogue"), /*#__PURE__*/React.createElement("button", {
    className: "tb-btn"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kbd"
  }, "\u2318S"), " Enregistrer"), /*#__PURE__*/React.createElement("button", {
    className: "tb-btn primary"
  }, "Ajouter au devis"))), /*#__PURE__*/React.createElement("div", {
    className: "main-layout"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "sidebar left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "panel-title"
  }, "PROFILS PARAM\xC9TRIQUES"), /*#__PURE__*/React.createElement("span", {
    className: "panel-count"
  }, PROFILES.length)), /*#__PURE__*/React.createElement("div", {
    className: "profile-list"
  }, PROFILES.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    className: `profile-card ${selectedProfileId === p.id ? "active" : ""}`,
    onClick: () => selectProfile(p.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-thumb"
  }, /*#__PURE__*/React.createElement(ProfileThumb, {
    profile: p
  })), /*#__PURE__*/React.createElement("div", {
    className: "profile-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-name"
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "profile-sub"
  }, p.subtitle))))), /*#__PURE__*/React.createElement("div", {
    className: "panel-head",
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "panel-title"
  }, "MODE DE SAISIE")), /*#__PURE__*/React.createElement("div", {
    className: "mode-switch"
  }, /*#__PURE__*/React.createElement("button", {
    className: `mode-btn ${mode === "schema" ? "active" : ""}`,
    onClick: () => setMode("schema")
  }, "Cotes A,B,C"), /*#__PURE__*/React.createElement("button", {
    className: `mode-btn ${mode === "libre" ? "active" : ""}`,
    onClick: () => setMode("libre")
  }, "\xC9dition libre")), /*#__PURE__*/React.createElement("div", {
    className: "panel-head",
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "panel-title"
  }, "BASE CATALOGUE")), /*#__PURE__*/React.createElement("button", {
    className: "catalog-btn",
    onClick: () => setCatalogOpen(true)
  }, /*#__PURE__*/React.createElement("div", {
    className: "cb-num"
  }, P.ARTICLES.length), /*#__PURE__*/React.createElement("div", {
    className: "cb-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cb-title"
  }, "Parcourir les articles"), /*#__PURE__*/React.createElement("div", {
    className: "cb-sub"
  }, P.FAMILLES.length, " familles \xB7 ", P.MATERIALS.length, " mati\xE8res")), /*#__PURE__*/React.createElement("div", {
    className: "cb-arrow"
  }, "\u203A"))), /*#__PURE__*/React.createElement("main", {
    className: "canvas"
  }, /*#__PURE__*/React.createElement("div", {
    className: "canvas-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "breadcrumb"
  }, /*#__PURE__*/React.createElement("span", null, profile.name), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\u203A"), /*#__PURE__*/React.createElement("span", {
    className: "muted"
  }, profile.segments.length, " segments \xB7 ", profile.bends.length, " plis")), /*#__PURE__*/React.createElement("div", {
    className: "view-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: `vt ${activeView === "2d" ? "active" : ""}`,
    onClick: () => setActiveView("2d")
  }, /*#__PURE__*/React.createElement("span", {
    className: "vt-ic"
  }, "\u25EB"), " Coupe 2D"), /*#__PURE__*/React.createElement("button", {
    className: `vt ${activeView === "3d" ? "active" : ""}`,
    onClick: () => setActiveView("3d")
  }, /*#__PURE__*/React.createElement("span", {
    className: "vt-ic"
  }, "\u2B20"), " Isom\xE9trie"), /*#__PURE__*/React.createElement("button", {
    className: `vt ${activeView === "both" ? "active" : ""}`,
    onClick: () => setActiveView("both")
  }, /*#__PURE__*/React.createElement("span", {
    className: "vt-ic"
  }, "\u229E"), " Double vue"))), /*#__PURE__*/React.createElement("div", {
    className: `views views-${activeView}`
  }, (activeView === "2d" || activeView === "both") && /*#__PURE__*/React.createElement("div", {
    className: "view-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "view-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vl-num"
  }, "01"), /*#__PURE__*/React.createElement("span", {
    className: "vl-txt"
  }, "VUE EN COUPE \xB7 PROFIL PLI\xC9"), /*#__PURE__*/React.createElement("span", {
    className: "vl-meta"
  }, "1:1 AUTO")), /*#__PURE__*/React.createElement(View2D, {
    segments: profile.segments,
    bends: profile.bends,
    thickness: thicknessMm * 2,
    highlightIndex: hoverSeg,
    onSegmentHover: setHoverSeg,
    onSegmentLeave: () => setHoverSeg(null)
  })), (activeView === "3d" || activeView === "both") && /*#__PURE__*/React.createElement("div", {
    className: "view-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "view-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vl-num"
  }, "02"), /*#__PURE__*/React.createElement("span", {
    className: "vl-txt"
  }, "VUE ISOM\xC9TRIQUE \xB7 BARRE ", barLength, " mm"), /*#__PURE__*/React.createElement("span", {
    className: "vl-meta"
  }, "ISO 30\xB0")), /*#__PURE__*/React.createElement(View3D, {
    segments: profile.segments,
    bends: profile.bends,
    barLength: barLength,
    thickness: thicknessMm * 2
  }))), /*#__PURE__*/React.createElement("div", {
    className: "statusbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sb-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sb-lbl"
  }, "D\xC9VELOPP\xC9"), /*#__PURE__*/React.createElement("span", {
    className: "sb-val"
  }, totalDev.toFixed(1), " mm")), /*#__PURE__*/React.createElement("div", {
    className: "sb-sep"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sb-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sb-lbl"
  }, "PLIS"), /*#__PURE__*/React.createElement("span", {
    className: "sb-val"
  }, profile.bends.length)), /*#__PURE__*/React.createElement("div", {
    className: "sb-sep"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sb-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sb-lbl"
  }, "MATI\xC8RE"), /*#__PURE__*/React.createElement("span", {
    className: "sb-val"
  }, materialCode || "—")), /*#__PURE__*/React.createElement("div", {
    className: "sb-sep"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sb-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sb-lbl"
  }, "POIDS UNIT."), /*#__PURE__*/React.createElement("span", {
    className: "sb-val"
  }, (estWeight / quantity).toFixed(2), " kg")), /*#__PURE__*/React.createElement("div", {
    className: "sb-sep"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sb-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sb-lbl"
  }, "TOTAL ", quantity > 1 ? `×${quantity}` : ""), /*#__PURE__*/React.createElement("span", {
    className: "sb-val accent"
  }, estWeight.toFixed(2), " kg")), estPrice !== null && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "sb-sep"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sb-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sb-lbl"
  }, "PRIX EST."), /*#__PURE__*/React.createElement("span", {
    className: "sb-val accent"
  }, estPrice.toFixed(2), " \u20AC"))), /*#__PURE__*/React.createElement("div", {
    className: "sb-spacer"
  }))), /*#__PURE__*/React.createElement("aside", {
    className: "sidebar right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: "tab active"
  }, "Param\xE8tres")), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "panel-title"
  }, "COTES (mm)"), /*#__PURE__*/React.createElement("span", {
    className: "panel-count"
  }, profile.segments.length)), /*#__PURE__*/React.createElement("div", {
    className: "dim-list"
  }, profile.segments.map((seg, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `dim-row ${hoverSeg === i ? "hover" : ""}`,
    onMouseEnter: () => setHoverSeg(i),
    onMouseLeave: () => setHoverSeg(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "dim-label"
  }, seg.label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "dim-input",
    value: seg.length,
    min: "1",
    step: "1",
    onChange: e => updateSegmentLength(i, e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "dim-unit"
  }, "mm"), profile.segments.length > 2 && /*#__PURE__*/React.createElement("button", {
    className: "dim-rm",
    title: "Supprimer",
    onClick: () => removeSegment(i)
  }, "\u2212"), i < profile.segments.length - 1 && /*#__PURE__*/React.createElement("button", {
    className: "dim-add",
    title: "Ins\xE9rer apr\xE8s",
    onClick: () => addBendAfter(i)
  }, "+")))), /*#__PURE__*/React.createElement("button", {
    className: "add-seg-btn",
    onClick: addSegment
  }, /*#__PURE__*/React.createElement("span", {
    className: "add-seg-plus"
  }, "+"), "Ajouter une cote ", /*#__PURE__*/React.createElement("span", {
    className: "add-seg-next"
  }, G.label(profile.segments.length)))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "panel-title"
  }, "ANGLES DE PLI (\xB0)"), /*#__PURE__*/React.createElement("span", {
    className: "panel-count"
  }, profile.bends.length)), /*#__PURE__*/React.createElement("div", {
    className: "dim-list"
  }, profile.bends.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "dim-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dim-label alt"
  }, "P", i + 1), /*#__PURE__*/React.createElement("div", {
    className: "ang-meta"
  }, profile.segments[i]?.label, " \u2192 ", profile.segments[i + 1]?.label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "dim-input small",
    value: b.angle,
    step: "1",
    onChange: e => updateBendAngle(i, e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "dim-unit"
  }, "\xB0"))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "panel-title"
  }, "MATI\xC8RE"), /*#__PURE__*/React.createElement("span", {
    className: "panel-count mono-hint"
  }, P.MATERIALS.length, " r\xE9f.")), /*#__PURE__*/React.createElement(MaterialPicker, {
    value: materialCode,
    onChange: setMaterialCode
  })), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "panel-title"
  }, "BARRE & QUANTIT\xC9")), /*#__PURE__*/React.createElement("label", {
    className: "field-label"
  }, "Longueur"), /*#__PURE__*/React.createElement("div", {
    className: "dim-row",
    style: {
      padding: "0 14px 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dim-label alt"
  }, "L"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "dim-input",
    value: barLength,
    min: "1",
    step: "10",
    onChange: e => setBarLength(Math.max(1, parseFloat(e.target.value) || 1))
  }), /*#__PURE__*/React.createElement("div", {
    className: "dim-unit"
  }, "mm")), /*#__PURE__*/React.createElement("label", {
    className: "field-label"
  }, "Quantit\xE9"), /*#__PURE__*/React.createElement("div", {
    className: "qty-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "qty-btn",
    onClick: () => setQuantity(q => Math.max(1, q - 1))
  }, "\u2212"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "qty-input",
    value: quantity,
    min: "1",
    onChange: e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))
  }), /*#__PURE__*/React.createElement("button", {
    className: "qty-btn",
    onClick: () => setQuantity(q => q + 1)
  }, "+"))), /*#__PURE__*/React.createElement("section", {
    className: "section recap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "panel-title"
  }, "R\xC9CAPITULATIF")), /*#__PURE__*/React.createElement("div", {
    className: "recap-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "recap-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "recap-k"
  }, "D\xE9velopp\xE9"), /*#__PURE__*/React.createElement("span", {
    className: "recap-v"
  }, totalDev.toFixed(1), " mm")), /*#__PURE__*/React.createElement("div", {
    className: "recap-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "recap-k"
  }, "Nb plis"), /*#__PURE__*/React.createElement("span", {
    className: "recap-v"
  }, profile.bends.length)), /*#__PURE__*/React.createElement("div", {
    className: "recap-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "recap-k"
  }, "\xC9paisseur"), /*#__PURE__*/React.createElement("span", {
    className: "recap-v"
  }, thicknessMm.toFixed(2), " mm")), /*#__PURE__*/React.createElement("div", {
    className: "recap-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "recap-k"
  }, "Surface t\xF4le"), /*#__PURE__*/React.createElement("span", {
    className: "recap-v"
  }, surfaceM2.toFixed(3), " m\xB2")), /*#__PURE__*/React.createElement("div", {
    className: "recap-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "recap-k"
  }, "Poids unitaire"), /*#__PURE__*/React.createElement("span", {
    className: "recap-v"
  }, (estWeight / quantity).toFixed(2), " kg")), estPrice !== null && /*#__PURE__*/React.createElement("div", {
    className: "recap-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "recap-k"
  }, "Prix mati\xE8re"), /*#__PURE__*/React.createElement("span", {
    className: "recap-v"
  }, estPrice.toFixed(2), " \u20AC")), /*#__PURE__*/React.createElement("div", {
    className: "recap-row total"
  }, /*#__PURE__*/React.createElement("span", {
    className: "recap-k"
  }, "Total \xD7 ", quantity), /*#__PURE__*/React.createElement("span", {
    className: "recap-v"
  }, estWeight.toFixed(2), " kg")))))), /*#__PURE__*/React.createElement(CatalogModal, {
    open: catalogOpen,
    onClose: () => setCatalogOpen(false)
  }));
}

// Mini aperçu SVG pour les cartes de profils
function ProfileThumb({
  profile
}) {
  const G = window.AluGeom;
  const pts = G.computePolyline(profile.segments, profile.bends);
  const flipped = pts.map(p => ({
    x: p.x,
    y: -p.y
  }));
  const bb = G.bbox(flipped);
  const pad = 8;
  const vb = {
    x: bb.minX - pad,
    y: bb.minY - pad,
    w: bb.w + pad * 2,
    h: bb.h + pad * 2
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `${vb.x} ${vb.y} ${vb.w} ${vb.h}`,
    preserveAspectRatio: "xMidYMid meet",
    style: {
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: flipped.map(p => `${p.x},${p.y}`).join(" "),
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinejoin: "miter"
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})();