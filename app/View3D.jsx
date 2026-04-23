// View3D.jsx — Rendu isométrique du profil extrudé (barre)
// Extrusion de la polyline 2D sur une longueur donnée, projetée en iso 30°.

const { useMemo: useMemo3D } = React;

function View3D({ segments, bends, barLength, thickness }) {
  const G = window.AluGeom;

  const data = useMemo3D(() => {
    const pts2d = G.computePolyline(segments, bends);
    const flipped = pts2d.map(p => ({ x: p.x, y: -p.y }));
    const bb = G.bbox(flipped);
    return { pts: flipped, bb };
  }, [segments, bends]);

  // Projection iso : axes
  // Sur l'écran : x_screen = x_world - z_world * cos(30°) ; y_screen = y_world - z_world * sin(30°)
  // Le "z" c'est la longueur de barre.
  const cos30 = Math.cos(Math.PI / 6);
  const sin30 = Math.sin(Math.PI / 6);
  // On réduit la profondeur visuelle (sinon la barre est énorme vs la section)
  const depthScale = 0.4;

  function project(x, y, z) {
    return {
      x: x + z * cos30 * depthScale,
      y: y - z * sin30 * depthScale,
    };
  }

  const pts = data.pts;
  const L = barLength;

  // Face avant (z=0) et face arrière (z=L)
  const front = pts.map(p => project(p.x, p.y, 0));
  const back = pts.map(p => project(p.x, p.y, L));

  // On construit les "rubans" = un quad par segment, qui relie front[i]→front[i+1]→back[i+1]→back[i]
  const ribbons = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = front[i], b = front[i + 1], c = back[i + 1], d = back[i];
    ribbons.push({ a, b, c, d, idx: i });
  }

  // bbox écran
  const all = [...front, ...back];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of all) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  const pad = 40;
  const vb = { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };

  return (
    <svg
      viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern id="grid3d" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e6ebf0" strokeWidth="0.3" />
        </pattern>
        <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8d1dc" />
          <stop offset="100%" stopColor="#8d98a6" />
        </linearGradient>
        <linearGradient id="metalGradLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e4e9ef" />
          <stop offset="100%" stopColor="#b1bac5" />
        </linearGradient>
      </defs>

      <rect x={vb.x} y={vb.y} width={vb.w} height={vb.h} fill="url(#grid3d)" />

      {/* Rubans (faces latérales) */}
      {ribbons.map((r, i) => {
        // alternance de teinte pour lisibilité des plis
        const fill = i % 2 === 0 ? "url(#metalGrad)" : "url(#metalGradLight)";
        return (
          <polygon
            key={`rib-${i}`}
            points={`${r.a.x},${r.a.y} ${r.b.x},${r.b.y} ${r.c.x},${r.c.y} ${r.d.x},${r.d.y}`}
            fill={fill}
            stroke="#3a4654"
            strokeWidth="0.5"
            strokeLinejoin="miter"
          />
        );
      })}

      {/* Arêtes frontales (profil) */}
      <polyline
        points={front.map(p => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="#0a0f17"
        strokeWidth="1"
      />
      <polyline
        points={back.map(p => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="#0a0f17"
        strokeWidth="0.6"
        opacity="0.6"
      />

      {/* Cote de longueur de barre */}
      {(() => {
        const p = pts[pts.length - 1];
        const f = project(p.x, p.y, 0);
        const b = project(p.x, p.y, L);
        const nx = cos30 * depthScale;
        const ny = -sin30 * depthScale;
        // décalage perpendiculaire pour la ligne de cote
        const off = 20;
        const perpX = -ny, perpY = nx;
        const n = Math.hypot(perpX, perpY) || 1;
        const px = perpX / n, py = perpY / n;
        const d1 = { x: f.x + px * off, y: f.y + py * off };
        const d2 = { x: b.x + px * off, y: b.y + py * off };
        const mid = { x: (d1.x + d2.x) / 2, y: (d1.y + d2.y) / 2 };
        return (
          <g>
            <line x1={f.x} y1={f.y} x2={d1.x} y2={d1.y} stroke="#1a2330" strokeWidth="0.4" />
            <line x1={b.x} y1={b.y} x2={d2.x} y2={d2.y} stroke="#1a2330" strokeWidth="0.4" />
            <line
              x1={d1.x} y1={d1.y} x2={d2.x} y2={d2.y}
              stroke="#1a2330" strokeWidth="0.5"
              markerStart="url(#arrowStart)" markerEnd="url(#arrow)"
            />
            <g transform={`translate(${mid.x + px * 10}, ${mid.y + py * 10})`}>
              <rect x={-28} y={-8} width={56} height={16} fill="#fafbfc" stroke="#1a2330" strokeWidth="0.3" rx="1" />
              <text
                x={0} y={0} textAnchor="middle" dominantBaseline="central"
                fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#1a2330" fontWeight="600"
              >
                L = {L}
              </text>
            </g>
          </g>
        );
      })()}

      <g transform={`translate(${vb.x + 8}, ${vb.y + vb.h - 8})`}>
        <text fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="#6b7684" letterSpacing="0.5">
          VUE ISOMÉTRIQUE · BARRE EXTRUDÉE · COTES EN MM
        </text>
      </g>
    </svg>
  );
}

Object.assign(window, { View3D });
