// App.jsx — Configurateur façonnage aluminium
// Shell : toolbar + panneau gauche (profils & catalogue d'articles)
// canvas central (2D + 3D) + panneau droit (cotes + matière avec autocomplete + récap)

const { useState, useEffect, useMemo, useRef } = React;
const View2D = window.View2D;
const View3D = window.View3D;

// ═══════════════════════════════════════════════════════════════════════
// MATERIAL PICKER — autocomplete sur les 1023 matières de la base fusionnée
// ═══════════════════════════════════════════════════════════════════════
function MaterialPicker({ value, onChange }) {
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
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); pick(results[activeIdx]); }
    else if (e.key === "Escape") setOpen(false);
  }

  return (
    <div className="mat-picker" ref={wrapRef}>
      <div className="mat-row">
        <div className="mat-label">MAT</div>
        <input
          type="text"
          className="mat-input"
          value={query}
          placeholder="ex. AL15-7016 · tape 2+ lettres…"
          onChange={e => {
            const v = e.target.value.toUpperCase();
            setQuery(v);
            onChange(v);
            setOpen(true);
            setActiveIdx(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          spellCheck={false}
        />
      </div>
      {open && results.length > 0 && (
        <ul className="mat-dropdown" role="listbox">
          {results.map((m, i) => (
            <li
              key={`${m.id}-${m.thickness}-${i}`}
              className={`mat-opt ${i === activeIdx ? "active" : ""}`}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseDown={e => { e.preventDefault(); pick(m); }}
            >
              <span className="mat-opt-name">{m.name}</span>
              <span className="mat-opt-meta">
                {m.family} · {m.thickness}mm
                {m.ral ? ` · RAL ${m.ral}` : ""}
                {m.finish ? ` · ${m.finish}` : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="mat-hint">
        {results.length > 0
          ? `${results.length} résultat${results.length > 1 ? "s" : ""} · ↑↓ pour naviguer`
          : <>Ex. <code>AL15-7016M</code> · <code>AL20-9010</code> · <code>AC10-9016</code></>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// CATALOG MODAL — parcours des 275 articles par famille
// ═══════════════════════════════════════════════════════════════════════
function CatalogModal({ open, onClose }) {
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

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <div className="modal-title">CATALOGUE ARTICLES</div>
            <div className="modal-sub">{P.ARTICLES.length} références · {P.FAMILLES.length} familles</div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </header>
        <div className="modal-body">
          <aside className="cat-fams">
            {P.FAMILLES.map(f => (
              <button
                key={f}
                className={`cat-fam ${f === family ? "active" : ""}`}
                onClick={() => setFamily(f)}
              >
                <span className="cat-fam-name">{f}</span>
                <span className="cat-fam-count">{P.getArticlesByFamille(f).length}</span>
              </button>
            ))}
          </aside>
          <main className="cat-main">
            <input
              className="cat-search"
              type="text"
              placeholder={`Rechercher dans « ${family} »…`}
              value={q}
              onChange={e => setQ(e.target.value)}
              autoFocus
            />
            <div className="cat-count">{items.length} article{items.length > 1 ? "s" : ""}</div>
            <ul className="cat-list">
              {items.map(a => (
                <li key={a.id} className="cat-item">
                  <span className="cat-id">#{a.id.toString().padStart(3, "0")}</span>
                  <span className="cat-name">{a.article}</span>
                  <span className="cat-fam-tag">{a.famille}</span>
                </li>
              ))}
            </ul>
          </main>
        </div>
      </div>
    </div>
  );
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
      segments: p.segments.map(s => ({ ...s })),
      bends: p.bends.map(b => ({ ...b })),
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

  const thicknessMm = useMemo(
    () => P.parseThicknessFromCode(materialCode),
    [materialCode]
  );

  // Tarif au m² (basé sur la partie AL{code})
  const tarifM2 = useMemo(() => {
    const m = String(materialCode).match(/(AL\d+)/i);
    return m ? (P.TARIFS[m[1].toUpperCase()] || null) : null;
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
      segments: prev.segments.map((s, i) => i === idx ? { ...s, length: v } : s),
    }));
  }

  function updateBendAngle(idx, value) {
    const v = parseFloat(value) || 0;
    setProfile(prev => ({
      ...prev,
      bends: prev.bends.map((b, i) => i === idx ? { ...b, angle: v } : b),
    }));
  }

  function addSegment() {
    setProfile(prev => {
      const newSegments = [...prev.segments, { length: 30, label: "" }];
      const newBends = [...prev.bends, { angle: -90 }];
      newSegments.forEach((s, i) => s.label = G.label(i));
      return { ...prev, segments: newSegments, bends: newBends };
    });
  }

  function addBendAfter(idx) {
    setProfile(prev => {
      const newSegments = [...prev.segments];
      const newBends = [...prev.bends];
      const insertAt = idx + 1;
      newSegments.splice(insertAt, 0, { length: 30, label: "" });
      newBends.splice(insertAt - 1 < 0 ? 0 : insertAt, 0, { angle: -90 });
      newSegments.forEach((s, i) => s.label = G.label(i));
      return { ...prev, segments: newSegments, bends: newBends };
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
      return { ...prev, segments: newSegments, bends: newBends };
    });
  }

  const totalDev = useMemo(() => G.developpedLength(profile.segments), [profile]);
  const estWeight = useMemo(
    () => G.weight(profile.segments, thicknessMm, barLength) * quantity,
    [profile, thicknessMm, barLength, quantity]
  );
  const surfaceM2 = useMemo(
    () => (totalDev * barLength / 1e6) * quantity,
    [totalDev, barLength, quantity]
  );
  const estPrice = useMemo(
    () => tarifM2 ? surfaceM2 * tarifM2 : null,
    [tarifM2, surfaceM2]
  );

  return (
    <div className="app">
      {/* TOOLBAR */}
      <header className="toolbar">
        <div className="toolbar-left">
          <div className="logo">
            <div className="logo-mark">⌐</div>
            <div>
              <div className="logo-title">PLIALU</div>
              <div className="logo-sub">Configurateur façonnage aluminium</div>
            </div>
          </div>
        </div>
        <div className="toolbar-center">
          <div className="proj-info">
            <span className="proj-label">PROJET</span>
            <span className="proj-name">Nouveau façonnage</span>
            <span className="proj-sep">·</span>
            <span className="proj-date">{new Date().toLocaleDateString("fr-FR")}</span>
          </div>
        </div>
        <div className="toolbar-right">
          <button className="tb-btn" onClick={() => setCatalogOpen(true)}>
            <span className="kbd">⌘K</span> Catalogue
          </button>
          <button className="tb-btn">
            <span className="kbd">⌘S</span> Enregistrer
          </button>
          <button className="tb-btn primary">Ajouter au devis</button>
        </div>
      </header>

      <div className="main-layout">
        {/* PANNEAU GAUCHE */}
        <aside className="sidebar left">
          <div className="panel-head">
            <span className="panel-title">PROFILS PARAMÉTRIQUES</span>
            <span className="panel-count">{PROFILES.length}</span>
          </div>

          <div className="profile-list">
            {PROFILES.map(p => (
              <button
                key={p.id}
                className={`profile-card ${selectedProfileId === p.id ? "active" : ""}`}
                onClick={() => selectProfile(p.id)}
              >
                <div className="profile-thumb">
                  <ProfileThumb profile={p} />
                </div>
                <div className="profile-meta">
                  <div className="profile-name">{p.name}</div>
                  <div className="profile-sub">{p.subtitle}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="panel-head" style={{ marginTop: 16 }}>
            <span className="panel-title">MODE DE SAISIE</span>
          </div>
          <div className="mode-switch">
            <button className={`mode-btn ${mode === "schema" ? "active" : ""}`} onClick={() => setMode("schema")}>Cotes A,B,C</button>
            <button className={`mode-btn ${mode === "libre" ? "active" : ""}`} onClick={() => setMode("libre")}>Édition libre</button>
          </div>

          <div className="panel-head" style={{ marginTop: 16 }}>
            <span className="panel-title">BASE CATALOGUE</span>
          </div>
          <button className="catalog-btn" onClick={() => setCatalogOpen(true)}>
            <div className="cb-num">{P.ARTICLES.length}</div>
            <div className="cb-body">
              <div className="cb-title">Parcourir les articles</div>
              <div className="cb-sub">{P.FAMILLES.length} familles · {P.MATERIALS.length} matières</div>
            </div>
            <div className="cb-arrow">›</div>
          </button>
        </aside>

        {/* CANVAS */}
        <main className="canvas">
          <div className="canvas-head">
            <div className="breadcrumb">
              <span>{profile.name}</span>
              <span className="sep">›</span>
              <span className="muted">{profile.segments.length} segments · {profile.bends.length} plis</span>
            </div>
            <div className="view-toggle">
              <button className={`vt ${activeView === "2d" ? "active" : ""}`} onClick={() => setActiveView("2d")}><span className="vt-ic">◫</span> Coupe 2D</button>
              <button className={`vt ${activeView === "3d" ? "active" : ""}`} onClick={() => setActiveView("3d")}><span className="vt-ic">⬠</span> Isométrie</button>
              <button className={`vt ${activeView === "both" ? "active" : ""}`} onClick={() => setActiveView("both")}><span className="vt-ic">⊞</span> Double vue</button>
            </div>
          </div>

          <div className={`views views-${activeView}`}>
            {(activeView === "2d" || activeView === "both") && (
              <div className="view-frame">
                <div className="view-label">
                  <span className="vl-num">01</span>
                  <span className="vl-txt">VUE EN COUPE · PROFIL PLIÉ</span>
                  <span className="vl-meta">1:1 AUTO</span>
                </div>
                <View2D
                  segments={profile.segments}
                  bends={profile.bends}
                  thickness={thicknessMm * 2}
                  highlightIndex={hoverSeg}
                  onSegmentHover={setHoverSeg}
                  onSegmentLeave={() => setHoverSeg(null)}
                />
              </div>
            )}
            {(activeView === "3d" || activeView === "both") && (
              <div className="view-frame">
                <div className="view-label">
                  <span className="vl-num">02</span>
                  <span className="vl-txt">VUE ISOMÉTRIQUE · BARRE {barLength} mm</span>
                  <span className="vl-meta">ISO 30°</span>
                </div>
                <View3D
                  segments={profile.segments}
                  bends={profile.bends}
                  barLength={barLength}
                  thickness={thicknessMm * 2}
                />
              </div>
            )}
          </div>

          {/* STATUS BAR */}
          <div className="statusbar">
            <div className="sb-item"><span className="sb-lbl">DÉVELOPPÉ</span><span className="sb-val">{totalDev.toFixed(1)} mm</span></div>
            <div className="sb-sep" />
            <div className="sb-item"><span className="sb-lbl">PLIS</span><span className="sb-val">{profile.bends.length}</span></div>
            <div className="sb-sep" />
            <div className="sb-item"><span className="sb-lbl">MATIÈRE</span><span className="sb-val">{materialCode || "—"}</span></div>
            <div className="sb-sep" />
            <div className="sb-item"><span className="sb-lbl">POIDS UNIT.</span><span className="sb-val">{(estWeight / quantity).toFixed(2)} kg</span></div>
            <div className="sb-sep" />
            <div className="sb-item"><span className="sb-lbl">TOTAL {quantity > 1 ? `×${quantity}` : ""}</span><span className="sb-val accent">{estWeight.toFixed(2)} kg</span></div>
            {estPrice !== null && (<>
              <div className="sb-sep" />
              <div className="sb-item"><span className="sb-lbl">PRIX EST.</span><span className="sb-val accent">{estPrice.toFixed(2)} €</span></div>
            </>)}
            <div className="sb-spacer" />
          </div>
        </main>

        {/* PANNEAU DROIT */}
        <aside className="sidebar right">
          <div className="tabs"><button className="tab active">Paramètres</button></div>

          <section className="section">
            <div className="panel-head">
              <span className="panel-title">COTES (mm)</span>
              <span className="panel-count">{profile.segments.length}</span>
            </div>
            <div className="dim-list">
              {profile.segments.map((seg, i) => (
                <div
                  key={i}
                  className={`dim-row ${hoverSeg === i ? "hover" : ""}`}
                  onMouseEnter={() => setHoverSeg(i)}
                  onMouseLeave={() => setHoverSeg(null)}
                >
                  <div className="dim-label">{seg.label}</div>
                  <input
                    type="number" className="dim-input"
                    value={seg.length} min="1" step="1"
                    onChange={e => updateSegmentLength(i, e.target.value)}
                  />
                  <div className="dim-unit">mm</div>
                  {profile.segments.length > 2 && (
                    <button className="dim-rm" title="Supprimer" onClick={() => removeSegment(i)}>−</button>
                  )}
                  {i < profile.segments.length - 1 && (
                    <button className="dim-add" title="Insérer après" onClick={() => addBendAfter(i)}>+</button>
                  )}
                </div>
              ))}
            </div>
            <button className="add-seg-btn" onClick={addSegment}>
              <span className="add-seg-plus">+</span>
              Ajouter une cote <span className="add-seg-next">{G.label(profile.segments.length)}</span>
            </button>
          </section>

          <section className="section">
            <div className="panel-head">
              <span className="panel-title">ANGLES DE PLI (°)</span>
              <span className="panel-count">{profile.bends.length}</span>
            </div>
            <div className="dim-list">
              {profile.bends.map((b, i) => (
                <div key={i} className="dim-row">
                  <div className="dim-label alt">P{i + 1}</div>
                  <div className="ang-meta">{profile.segments[i]?.label} → {profile.segments[i + 1]?.label}</div>
                  <input
                    type="number" className="dim-input small"
                    value={b.angle} step="1"
                    onChange={e => updateBendAngle(i, e.target.value)}
                  />
                  <div className="dim-unit">°</div>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="panel-head">
              <span className="panel-title">MATIÈRE</span>
              <span className="panel-count mono-hint">{P.MATERIALS.length} réf.</span>
            </div>
            <MaterialPicker value={materialCode} onChange={setMaterialCode} />
          </section>

          <section className="section">
            <div className="panel-head">
              <span className="panel-title">BARRE & QUANTITÉ</span>
            </div>
            <label className="field-label">Longueur</label>
            <div className="dim-row" style={{ padding: "0 14px 8px" }}>
              <div className="dim-label alt">L</div>
              <input
                type="number" className="dim-input"
                value={barLength} min="1" step="10"
                onChange={e => setBarLength(Math.max(1, parseFloat(e.target.value) || 1))}
              />
              <div className="dim-unit">mm</div>
            </div>
            <label className="field-label">Quantité</label>
            <div className="qty-row">
              <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <input
                type="number" className="qty-input" value={quantity} min="1"
                onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button className="qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </section>

          <section className="section recap">
            <div className="panel-head"><span className="panel-title">RÉCAPITULATIF</span></div>
            <div className="recap-grid">
              <div className="recap-row"><span className="recap-k">Développé</span><span className="recap-v">{totalDev.toFixed(1)} mm</span></div>
              <div className="recap-row"><span className="recap-k">Nb plis</span><span className="recap-v">{profile.bends.length}</span></div>
              <div className="recap-row"><span className="recap-k">Épaisseur</span><span className="recap-v">{thicknessMm.toFixed(2)} mm</span></div>
              <div className="recap-row"><span className="recap-k">Surface tôle</span><span className="recap-v">{surfaceM2.toFixed(3)} m²</span></div>
              <div className="recap-row"><span className="recap-k">Poids unitaire</span><span className="recap-v">{(estWeight / quantity).toFixed(2)} kg</span></div>
              {estPrice !== null && (
                <div className="recap-row"><span className="recap-k">Prix matière</span><span className="recap-v">{estPrice.toFixed(2)} €</span></div>
              )}
              <div className="recap-row total">
                <span className="recap-k">Total × {quantity}</span>
                <span className="recap-v">{estWeight.toFixed(2)} kg</span>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </div>
  );
}

// Mini aperçu SVG pour les cartes de profils
function ProfileThumb({ profile }) {
  const G = window.AluGeom;
  const pts = G.computePolyline(profile.segments, profile.bends);
  const flipped = pts.map(p => ({ x: p.x, y: -p.y }));
  const bb = G.bbox(flipped);
  const pad = 8;
  const vb = { x: bb.minX - pad, y: bb.minY - pad, w: bb.w + pad * 2, h: bb.h + pad * 2 };
  return (
    <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }}>
      <polyline points={flipped.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
    </svg>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
