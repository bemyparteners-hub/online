#!/usr/bin/env bash
# PLIALU — build.sh
# Transpile les sources JSX (app/*.jsx) en JS simple (app/*.js).
# Nécessite : node + @babel/core + @babel/preset-react (via npx).
# Aucun autre bundling : les fichiers sont chargés individuellement par index.html.

set -euo pipefail

cd "$(dirname "$0")"

echo "→ Transpile JSX → JS (app/)"
npx --yes --package=@babel/core --package=@babel/preset-react --package=@babel/cli -- \
  babel app --presets=@babel/preset-react --out-dir app --extensions .jsx --out-file-extension .js

echo "✔ Build terminé."
echo "→ Ouvrez index.html dans un navigateur (ou servez le dossier via 'npx serve')."
