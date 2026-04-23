# PLIALU — Configurateur façonnage aluminium

Application web statique pour configurer des pièces de façonnage alu/acier :
bavettes, couvertines, solins, habillages… Prévisualisation 2D cotée + vue
isométrique 3D extrudée, calcul temps réel du développé / poids / prix.

## Lancement

Le projet est 100 % statique, sans étape de build requise pour l'exécution :

```bash
# Option 1 — serveur python
python3 -m http.server 8000
# Option 2 — serveur npm
npx serve .
```

Puis ouvrez <http://localhost:8000/> dans un navigateur.

## Arborescence

```
.
├── index.html                 # Point d'entrée unique
├── build.sh                   # (Optionnel) transpile app/*.jsx → app/*.js
├── data/
│   └── database.js            # Base unifiée : 274 articles + 1023 matières + 7 profils + helpers
├── engine/
│   └── geometry.js            # Calcul polyline / bbox / développé / poids
├── app/
│   ├── App.jsx / App.js       # Shell React
│   ├── View2D.jsx / .js       # Vue coupe 2D cotée (SVG)
│   └── View3D.jsx / .js       # Vue isométrique 3D (SVG)
├── styles/
│   └── app.css                # Theme CAO
└── vendor/
    ├── react.production.min.js
    └── react-dom.production.min.js
```

## Base de données (`data/database.js`)

Expose le namespace global `window.Plialu` :

| Clé               | Contenu                                                          |
| ----------------- | ---------------------------------------------------------------- |
| `FAMILLES`        | 15 familles (Bavette, Couvertine, Solin, …)                       |
| `ARTICLES`        | 274 articles avec famille et nom                                  |
| `MATERIALS`       | 1 023 matières Alu/Acier (thickness, RAL, finition)               |
| `MAT_FAMILIES`    | Liste des familles matière                                        |
| `PROFILES`        | 7 profils paramétriques (segments + plis) pour le simulateur     |
| `EPAISSEURS`      | Épaisseurs standard (0.6 → 2.0 mm)                                 |
| `FINITIONS`       | Codes M / B / NF / ANO / BRT                                       |
| `PREFIXES`        | Préfixes pièce par famille (Bv, C, CJ, Sol, …)                    |
| `TARIFS`          | Tarifs €/m² par épaisseur                                          |

Helpers également exposés :
`getArticlesByFamille`, `buildRefMatiere`, `buildRefPiece`, `searchMaterials`,
`getMaterialById`, `getMaterialsByFamily`, `parseThicknessFromCode`.

## Build

Les fichiers JSX sont pré-compilés en JS simple pour éviter de charger
`@babel/standalone` (~3 Mo) au runtime. Pour régénérer après modification des
sources JSX :

```bash
./build.sh
```
