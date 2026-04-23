# CLAUDE.md — PLIALU Configurateur d'affaires

## 🎯 Mission

Remplacer l'UI React actuelle (`index.html` + `app/*.jsx`) par la **nouvelle maquette HTML** fournie par l'utilisateur (look « Configurateur d'affaires » — Hexagon Manufacturing Intelligence, style fieldsets classiques Windows).
Les menus déroulants **Gammes** et **Articles** (et matière/épaisseur) doivent être connectés à la base `data/database.js` (`window.Plialu`).

## 📂 État actuel du repo

```
index.html                     ← à REMPLACER par la nouvelle maquette
data/database.js               ← garder (274 articles + 1023 matières + 7 profils + helpers)
engine/geometry.js             ← garder (calculs polyline)
app/App.jsx / App.js           ← plus utilisé (à laisser, pourra être supprimé plus tard)
app/View2D.jsx / .js           ← plus utilisé
app/View3D.jsx / .js           ← plus utilisé
styles/app.css                 ← plus utilisé (nouveau CSS embarqué dans index.html)
vendor/react*.js               ← plus utilisé (nouvelle UI en vanilla JS)
build.sh                       ← plus utilisé
README.md                      ← à mettre à jour
```

## 🔌 API `window.Plialu` disponible

| Clé                  | Type     | Contenu                                    |
| -------------------- | -------- | ------------------------------------------ |
| `FAMILLES`           | string[] | 15 familles (Bavette, Couvertine…)         |
| `ARTICLES`           | obj[]    | 274 articles `{id, famille, article}`      |
| `MATERIALS`          | obj[]    | 1023 matières `{id, name, family, thickness, ral, finish}` |
| `MAT_FAMILIES`       | string[] | 6 familles matière                         |
| `EPAISSEURS`         | obj[]    | `{valeur, code}` standard                  |
| `FINITIONS`          | obj[]    | codes M/B/NF/ANO/BRT                       |
| `PREFIXES`           | obj      | préfixe pièce par famille                  |
| `TARIFS`             | obj      | €/m² par code AL*                          |
| `PROFILES`           | obj[]    | 7 profils paramétriques (pour preview 2D)  |
| `getArticlesByFamille(famille)` | → obj[] | filtrage catalogue           |
| `getMaterialsByFamily(family)` | → obj[] | filtrage matières             |
| `searchMaterials(q)` | → obj[]  | recherche plein texte                      |
| `parseThicknessFromCode(code)` | → number | extraction épaisseur          |

## 📋 Plan d'action (tâche par tâche)

- [ ] **T1** — Sauvegarder la maquette HTML fournie dans `index.html` (avec IDs ajoutés sur les selects et zones cibles)
- [ ] **T2** — Connecter le select `#gamme` aux 15 familles de `Plialu.FAMILLES`
- [ ] **T3** — Connecter `#article` aux articles de la famille sélectionnée (via `getArticlesByFamille`)
- [ ] **T4** — Connecter `#matiere` aux 1023 matières, groupées par famille (optgroup)
- [ ] **T5** — Connecter `#epaisseur` aux épaisseurs standard + auto-sync depuis la matière choisie
- [ ] **T6** — Auto-remplir `#rep` (Repère) avec le préfixe de la famille (`PREFIXES[famille]`)
- [ ] **T7** — Charger les cotes A/B/C/pliA/pliB depuis le profil paramétrique correspondant à la famille
- [ ] **T8** — Dessiner un aperçu 2D **vivant** dans `.blank-zone` (polyline + cotes + angles)
- [ ] **T9** — Dessiner un mini aperçu du profil dans la thumb-area « Articles »
- [ ] **T10** — Remplir le panneau **Détails** (article, matière, calculs détaillés)
- [ ] **T11** — Remplir la bande **Champs calculés** (développé, surface, poids, prix)
- [ ] **T12** — Smoke-test headless (dropdowns peuplés, preview visible, pas d'erreur JS)
- [ ] **T13** — Mettre à jour `README.md` et commit/push sur `main`

## 🧪 Critères de validation

- Gammes → 15 options
- Bavette sélectionnée → 71 articles dans Articles
- Matière → 1023 options (groupées en 6 familles)
- Changer matière → Épaisseur s'ajuste
- Changer dimensions (A/B/C/pliA/pliB) → preview SVG redessine live
- Changer quantité → calc-strip et détails mis à jour
- Zéro erreur JS en console

## 📝 Journal d'avancement

_(Mis à jour à chaque tâche terminée)_
