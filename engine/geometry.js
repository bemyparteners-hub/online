// geometry.js — moteur de calcul du profil plié
// Un profil est une suite de "segments" (longueurs cotées A,B,C...)
// séparés par des "plis" (angles, en degrés, +/- = sens de pliage).
// La convention : on part à l'horizontale vers la droite (direction 0°).
// Un pli d'angle θ tourne la direction suivante de θ.
// θ > 0 = pli vers le haut (sens trigo), θ < 0 = vers le bas.

(function () {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function label(i) {
    if (i < 26) return LETTERS[i];
    return LETTERS[Math.floor(i / 26) - 1] + LETTERS[i % 26];
  }

  // Calcule la polyline (liste de points) du profil, dans l'axe neutre.
  // segments: [{length, label}], bends: [{angle}]  (bends.length === segments.length - 1)
  function computePolyline(segments, bends) {
    const pts = [{ x: 0, y: 0 }];
    let dir = 0; // radians, 0 = +x
    for (let i = 0; i < segments.length; i++) {
      const L = segments[i].length;
      const last = pts[pts.length - 1];
      pts.push({
        x: last.x + Math.cos(dir) * L,
        y: last.y + Math.sin(dir) * L, // en SVG y descend, on inversera à l'affichage
      });
      if (i < bends.length) {
        const a = (bends[i].angle * Math.PI) / 180;
        dir += a;
      }
    }
    return pts;
  }

  // Bounding box de la polyline
  function bbox(pts) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of pts) {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
    return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
  }

  // Longueur totale développée (somme des segments)
  function developpedLength(segments) {
    return segments.reduce((s, seg) => s + seg.length, 0);
  }

  // Poids estimé (kg) pour une pièce : L_dev(mm) * largeur_barre(mm) * ep(mm) * densité_alu(2.7e-6 kg/mm3)
  function weight(segments, thicknessMm, barLengthMm) {
    const dev = developpedLength(segments);
    return (dev * barLengthMm * thicknessMm * 2.7e-6);
  }

  // Normale d'un segment (vecteur unitaire perpendiculaire, orienté vers l'extérieur du profil)
  // On choisit la normale "vers le côté gauche" de la polyline (convention simple)
  function segmentNormal(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const L = Math.hypot(dx, dy) || 1;
    return { nx: -dy / L, ny: dx / L };
  }

  window.AluGeom = {
    LETTERS, label, computePolyline, bbox, developpedLength, weight, segmentNormal,
  };
})();
