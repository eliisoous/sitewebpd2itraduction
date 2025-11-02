# 🚀 Configuration Tailwind CSS Local - Guide d'installation

## Pourquoi remplacer le CDN ?

- ❌ CDN charge 3-4 MB de CSS (inutile)
- ✅ Version locale optimisée : <50KB
- ✅ Meilleur LCP et Core Web Vitals
- ✅ Pas de dépendance réseau

## Installation (à faire une fois)

### 1. Installer Node.js et npm
Vérifiez que Node.js est installé :
```bash
node --version
npm --version
```

### 2. Initialiser le projet
```bash
npm init -y
```

### 3. Installer Tailwind CSS
```bash
npm install -D tailwindcss
npx tailwindcss init
```

### 4. Configurer tailwind.config.js
Le fichier `tailwind.config.js` a été créé. Configurez-le avec :
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./components/*.js",
    "./assets/js/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'pd2i-blue': '#0083CA',
        'pd2i-black': '#000000',
        'pd2i-white': '#FFFFFF'
      },
      fontFamily: {
        'roboto': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif']
      }
    },
  },
  plugins: [],
}
```

### 5. Créer le fichier source CSS
Créez `src/input.css` :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6. Générer le CSS optimisé
```bash
npx tailwindcss -i ./src/input.css -o ./assets/css/tailwind.min.css --minify
```

### 7. Mettre à jour les pages HTML
Remplacez dans toutes les pages HTML :
```html
<!-- ❌ AVANT -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
    tailwind.config = { ... }
</script>

<!-- ✅ APRÈS -->
<link rel="stylesheet" href="assets/css/tailwind.min.css">
```

### 8. Script npm pour automatiser
Ajoutez dans `package.json` :
```json
{
  "scripts": {
    "build:css": "tailwindcss -i ./src/input.css -o ./assets/css/tailwind.min.css --minify",
    "watch:css": "tailwindcss -i ./src/input.css -o ./assets/css/tailwind.min.css --watch"
  }
}
```

## Utilisation quotidienne

### Générer le CSS une fois :
```bash
npm run build:css
```

### Mode watch (développement) :
```bash
npm run watch:css
```

## Taille attendue

- **Avant (CDN) :** ~3-4 MB
- **Après (local optimisé) :** ~30-50 KB
- **Gain :** ~98% de réduction ! 🎉

## Notes importantes

- Exécutez `npm run build:css` après chaque modification des classes Tailwind
- Le CSS sera automatiquement purgé (seules les classes utilisées seront incluses)
- Ajoutez `assets/css/tailwind.min.css` dans votre `.gitignore` si vous voulez le régénérer à chaque déploiement

