# 🔍 GUIDE DE DIAGNOSTIC - Carousel PD2i

## ✅ Modifications effectuées

### 1. CSS simplifié
- ❌ **Avant** : `height: 0` + `padding-bottom: 200%` (problématique)
- ✅ **Maintenant** : `height: 80vh` avec `min-height: 400px` (plus fiable)

### 2. JavaScript amélioré
- ✅ Ajout de logs de debug dans la console
- ✅ Meilleure détection mobile
- ✅ Gestion d'erreurs pour les images qui ne se chargent pas

### 3. Images mobiles
- ✅ Utilisation de `Im1Tel.png`, `Im2Tel.png`, `Im3Tel.png`, `Im4Tel.png`

---

## 🧪 TESTS À EFFECTUER

### Test 1 : Vérifier la console (F12)

1. Ouvre la console (F12 → Console)
2. Recharge la page
3. Tu devrais voir :
   ```
   Carousel initialization: {
     isMobile: true/false,
     windowWidth: 375,
     images: "Mobile (Im*Tel.png)" ou "Desktop (Im*.png)"
   }
   ```

**Si tu vois des erreurs :**
- `Image failed to load: assets/images/home/Im1Tel.png` → L'image n'existe pas ou le chemin est incorrect

### Test 2 : Vérifier l'onglet Network (F12)

1. Ouvre l'onglet **Network** (F12)
2. Filtre par **Img** (images)
3. Recharge la page
4. Cherche les images `Im1Tel.png`, `Im2Tel.png`, etc.

**Si tu vois :**
- ✅ **Status 200** (vert) → L'image se charge correctement
- ❌ **Status 404** (rouge) → L'image n'existe pas au bon endroit

### Test 3 : Vérifier le chemin des images

Dans ton navigateur, essaie d'accéder directement à :
```
http://localhost/assets/images/home/Im1Tel.png
```
(Remplace `localhost` par ton domaine)

**Si l'image s'affiche :** Le chemin est bon ✅
**Si erreur 404 :** L'image n'est pas au bon endroit ❌

---

## 📋 CHECKLIST DE VÉRIFICATION

### ✅ Structure des fichiers
```
assets/
  └── images/
      └── home/
          ├── Im1Tel.png  ← Vérifie que ce fichier existe
          ├── Im2Tel.png  ← Vérifie que ce fichier existe
          ├── Im3Tel.png  ← Vérifie que ce fichier existe
          └── Im4Tel.png  ← Vérifie que ce fichier existe
```

### ✅ Vérifier les noms de fichiers
- ⚠️ **Sensible à la casse** : `Im1Tel.png` ≠ `im1tel.png` ≠ `Im1tel.png`
- ✅ Doit être **exactement** : `Im1Tel.png` (avec majuscules/minuscules)

### ✅ Vérifier la taille des images
- Format : PNG ou JPG
- Dimensions : 800 x 1600 pixels (ratio 1:2)
- Poids : < 300KB par image (recommandé)

---

## 🔧 SOLUTIONS SELON LE PROBLÈME

### Problème 1 : Images ne se chargent pas (404)

**Solution :**
1. Vérifie que les images sont bien dans `assets/images/home/`
2. Vérifie les noms exacts (majuscules/minuscules)
3. Vérifie les permissions du serveur

### Problème 2 : Espace blanc au lieu de l'image

**Causes possibles :**
- CSS avec problème de hauteur → **Corrigé** ✅
- Image trop lourde → Optimise avec TinyPNG.com
- Erreur JavaScript → Vérifie la console

**Solution :**
1. Vérifie la console (F12) pour les erreurs
2. Vérifie l'onglet Network pour voir si les images se chargent
3. Si l'image est trop lourde, optimise-la

### Problème 3 : Image floue ou déformée

**Solution :**
- Vérifie que les images font bien 800x1600 pixels
- Vérifie que le CSS utilise `object-fit: cover`

---

## 🎯 TEST RAPIDE - Forcer une image desktop

Si tu veux tester rapidement, remplace temporairement dans `index.html` :

```javascript
// Au lieu de :
image: mobileImages 
    ? 'assets/images/home/Im1Tel.png'
    : 'assets/images/home/Im1b.png',

// Mets :
image: 'assets/images/home/Im1b.png',  // Force l'image desktop
```

**Si ça marche :** Le problème vient des images mobiles
**Si ça ne marche pas :** Le problème vient du CSS ou du JavaScript

---

## 📊 LOGS DE DEBUG

Après le chargement, tu devrais voir dans la console :

```
Carousel initialization: {
  isMobile: true,
  windowWidth: 375,
  images: "Mobile (Im*Tel.png)"
}
Image loaded successfully: assets/images/home/Im1Tel.png
Image loaded successfully: assets/images/home/Im2Tel.png
...
```

**Si tu vois `Image failed to load` :** L'image n'existe pas ou le chemin est incorrect

---

## 🚀 PROCHAINES ÉTAPES

1. **Ouvre la console** (F12) et regarde les logs
2. **Vérifie l'onglet Network** pour voir si les images se chargent
3. **Dis-moi ce que tu vois** et je t'aiderai à résoudre le problème !

---

## 💡 ASTUCE

Si tu veux voir exactement quel chemin est utilisé, ajoute ceci dans la console après le chargement :

```javascript
document.querySelectorAll('.carousel-slide img').forEach((img, i) => {
  console.log(`Slide ${i+1}:`, img.src, img.complete ? '✅ Loaded' : '❌ Failed');
});
```

