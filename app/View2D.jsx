// View2D.jsx — Rendu SVG du profil 2D coté, style CAO/DAO
// Affiche la polyline du profil, avec cotes A, B, C... et angles de pli.

const { useMemo } = React;

function View2D({ segments, bends, thickness, highlightIndex, onSegmentHover, onSegmentLeave }) {
  const G = window.AluGeom;

  const layout = useMemo(() => {
    const pts = G.computePolyline(segments, bends);
    // En SVG, y descend. On inverse y pour que les plis "vers le haut" aillent vers le haut visuellement.
    const flipped = pts.map(p => ({ x: p.x, y: -p.y }));
    const bb = G.bbox(flipped);
    return { pts: flipped, bb };
  }, [segments, bends]);

  // Marges pour les cotes
  const pad = 90;
  const vb = {
    x: layout.bb.minX - pad,
    y: layout.bb.minY - pad,
    w: layout.bb.w + pad * 2,
    h: layout.bb.h + pad * 2,
  };

  // Trait épais pour représenter la tôle (on dessine la polyline épaissie)
  const pointsStr = layout.pts.map(p => `${p.x},${p.y}`).join(" ");

  // Pour cotes : pour chaque segment, lignes d'attache perpendiculaires + ligne de cote décalée
  const dimOffset = 30; // distance de la ligne de cote au segment
  const extOver = 6; // dépassement des lignes d'attache

  function segmentNormal(p1, p2) {
    const dx = p2.x - p1.x, dy = p2.y - p1.y;
    const L = Math.hypot(dx, dy) || 1;
    // Normale "extérieure" : on prend la normale qui éloigne du centre de la bbox
    const cx = (layout.bb.minX + layout.bb.maxX) / 2;
    const cy = (layout.bb.minY + layout.bb.maxY) / 2;
    const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
    const nxA = -dy / L, nyA = dx / L;
    const dotA = (mx + nxA - cx) * nxA + (my + nyA - cy) * nyA;
    return dotA > 0 ? { nx: nxA, ny: nyA } : { nx: -nxA, ny: -nyA };
  }

  // Arcs d'angle aux plis
  const bendMarkers = [];
  for (let i = 0; i < bends.length; i++) {
    const p = layout.pts[i + 1];
    const prev = layout.pts[i];
    const next = layout.pts[i + 2];
    if (!next) continue;
    const dx1 = prev.x - p.x, dy1 = prev.y - p.y;
    const dx2 = next.x - p.x, dy2 = next.y - p.y;
    const L1 = Math.hypot(dx1, dy1) || 1;
    const L2 = Math.hypot(dx2, dy2) || 1;
    const u1x = dx1 / L1, u1y = dy1 / L1;
    const u2x = dx2 / L2, u2y = dy2 / L2;
    const r = 16;
    const a1 = Math.atan2(u1y, u1x);
    const a2 = Math.atan2(u2y, u2x);
    // midangle pour placer le texte
    let mid = (a1 + a2) / 2;
    // choisir le bon côté (intérieur du pli)
    const cross = u1x * u2y - u1y * u2x;
    if (cross < 0) mid += Math.PI;
    const tx = p.x + Math.cos(mid) * (r + 14);
    const ty = p.y + Math.sin(mid) * (r + 14);
    const angleDeg = bends[i].angle;
    // L'angle de pli réel affiché = angle entre les deux tôles (supplément du changement de direction)
    const displayAngle = 180 - Math.abs(angleDeg);
    bendMarkers.push({
      x: p.x, y: p.y, r, a1, a2,
      tx, ty, angle: displayAngle,
      bendAngle: angleDeg,
    });
  }

  return (
    <svg
      viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {/* Grille technique */}
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e6ebf0" strokeWidth="0.3" />
        </pattern>
        <pattern id="gridMajor" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="url(#grid)" />
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#d0d9e2" strokeWidth="0.5" />
        </pattern>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a2330" />
        </marker>
        <marker id="arrowStart" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 10 0 L 0 5 L 10 10 z" fill="#1a2330" />
        </marker>
      </defs>

      <rect x={vb.x} y={vb.y} width={vb.w} height={vb.h} fill="url(#gridMajor)" />

      {/* Axe d'origine */}
      <g opacity="0.25">
        <line x1={vb.x} y1={0} x2={vb.x + vb.w} y2={0} stroke="#2b66d9" strokeWidth="0.4" strokeDasharray="4 3" />
        <line x1={0} y1={vb.y} x2={0} y2={vb.y + vb.h} stroke="#2b66d9" strokeWidth="0.4" strokeDasharray="4 3" />
      </g>

      {/* Profil : trait d'épaisseur réel (tôle) */}
      <polyline
        points={pointsStr}
        fill="none"
        stroke="#0a0f17"
        strokeWidth={Math.max(thickness, 1.2)}
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />

      {/* Points aux plis */}
      {layout.pts.map((p, i) => (
        <circle key={`pt-${i}`} cx={p.x} cy={p.y} r={1.5} fill="#0a0f17" />
      ))}

      {/* Cotes par segment */}
      {segments.map((seg, i) => {
        const p1 = layout.pts[i];
        const p2 = layout.pts[i + 1];
        const { nx, ny } = segmentNormal(p1, p2);
        const ox = nx * dimOffset;
        const oy = ny * dimOffset;
        const d1 = { x: p1.x + ox, y: p1.y + oy };
        const d2 = { x: p2.x + ox, y: p2.y + oy };
        const e1 = { x: p1.x + nx * extOver, y: p1.y + ny * extOver };
        const e2 = { x: p2.x + nx * extOver, y: p2.y + ny * extOver };
        const mid = { x: (d1.x + d2.x) / 2, y: (d1.y + d2.y) / 2 };
        const textOffset = 8;
        const tx = mid.x + nx * textOffset;
        const ty = mid.y + ny * textOffset;
        const active = highlightIndex === i;
        const col = active ? "#2b66d9" : "#1a2330";
        return (
          <g
            key={`dim-${i}`}
            onMouseEnter={() => onSegmentHover && onSegmentHover(i)}
            onMouseLeave={() => onSegmentLeave && onSegmentLeave()}
            style={{ cursor: "pointer" }}
          >
            {/* Lignes d'attache */}
            <line x1={e1.x} y1={e1.y} x2={d1.x} y2={d1.y} stroke={col} strokeWidth="0.4" />
            <line x1={e2.x} y1={e2.y} x2={d2.x} y2={d2.y} stroke={col} strokeWidth="0.4" />
            {/* Ligne de cote (double flèche) */}
            <line
              x1={d1.x} y1={d1.y} x2={d2.x} y2={d2.y}
              stroke={col}
              strokeWidth="0.5"
              markerStart="url(#arrowStart)"
              markerEnd="url(#arrow)"
            />
            {/* Fond du texte */}
            <g transform={`translate(${tx}, ${ty})`}>
              <rect x={-22} y={-8} width={44} height={16} fill="#fafbfc" stroke={col} strokeWidth="0.3" rx="1" />
              <text
                x={0} y={0}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="8"
                fill={col}
                fontWeight="600"
              >
                {seg.label} = {seg.length}
              </text>
            </g>
          </g>
        );
      })}

      {/* Marqueurs d'angle */}
      {bendMarkers.map((b, i) => {
        const start = { x: b.x + Math.cos(b.a1) * b.r, y: b.y + Math.sin(b.a1) * b.r };
        const end = { x: b.x + Math.cos(b.a2) * b.r, y: b.y + Math.sin(b.a2) * b.r };
        // arc
        let delta = b.a2 - b.a1;
        while (delta <= -Math.PI) delta += 2 * Math.PI;
        while (delta > Math.PI) delta -= 2 * Math.PI;
        const largeArc = Math.abs(delta) > Math.PI ? 1 : 0;
        const sweep = delta > 0 ? 1 : 0;
        return (
          <g key={`ang-${i}`}>
            <path
              d={`M ${start.x} ${start.y} A ${b.r} ${b.r} 0 ${largeArc} ${sweep} ${end.x} ${end.y}`}
              fill="none"
              stroke="#d97757"
              strokeWidth="0.6"
            />
            <g transform={`translate(${b.tx}, ${b.ty})`}>
              <rect x={-14} y={-7} width={28} height={14} fill="#fff3ec" stroke="#d97757" strokeWidth="0.3" rx="1" />
              <text
                x={0} y={0}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="7"
                fill="#8a3f1f"
                fontWeight="600"
              >
                {b.angle.toFixed(0)}°
              </text>
            </g>
          </g>
        );
      })}

      {/* Label "Profil plié" en coin */}
      <g transform={`translate(${vb.x + 8}, ${vb.y + vb.h - 8})`}>
        <text fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="#6b7684" letterSpacing="0.5">
          VUE EN COUPE · ÉCHELLE AUTO · COTES EN MM
        </text>
      </g>
    </svg>
  );
}

Object.assign(window, { View2D });
