# Résolution des problèmes CORS et Console

## Problèmes identifiés :
1. **Erreurs CORS** : Les fichiers locaux ne peuvent pas être chargés directement dans le navigateur
2. **Warnings de preload** : Les ressources preload ne sont pas utilisées immédiatement

## Solutions :

### Option 1 : Serveur local Python (Recommandé)
```bash
# Sur Mac/Linux
./start-server.sh

# Sur Windows
start-server.bat

# Ou directement avec Python
python3 -m http.server 8000
```

Puis ouvrir : http://localhost:8000

### Option 2 : VS Code Live Server
1. Installer l'extension "Live Server" dans VS Code
2. Clic droit sur `index.html` → "Open with Live Server"

### Option 3 : Autres serveurs locaux
- **Node.js** : `npx http-server`
- **PHP** : `php -S localhost:8000`
- **Apache/Nginx** : Configurer un serveur web local

## Pourquoi ces erreurs ?
- Les navigateurs bloquent les requêtes `file://` pour des raisons de sécurité
- Un serveur HTTP local résout ces problèmes
- Les warnings de preload sont normaux et n'affectent pas le fonctionnement

## Résultat attendu :
- ✅ Plus d'erreurs CORS
- ✅ Plus de warnings de preload
- ✅ Site fonctionne parfaitement
- ✅ Console propre
