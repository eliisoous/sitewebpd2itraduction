# Header Component - PD2i Website

## Description
Composant réutilisable pour le header du site PD2i. Ce composant inclut :
- Navigation responsive (mobile, tablette, desktop)
- Menus déroulants
- Sélecteur de langue
- Logo personnalisable
- Bouton Contacts

## Installation

### 1. Inclure les fichiers
```html
<!-- CSS du composant -->
<link rel="stylesheet" href="components/header.css">

<!-- JavaScript du composant -->
<script src="components/Header.js"></script>
```

### 2. Utilisation de base
```javascript
// Initialisation simple
const header = new Header();
```

### 3. Utilisation avancée
```javascript
// Configuration personnalisée
const header = new Header({
    logoSrc: 'path/to/your/logo.png',
    logoAlt: 'Votre Logo',
    currentLang: 'FR',
    languages: ['FR', 'EN', 'ES'],
    navigationItems: [
        { label: 'Accueil', href: '/', type: 'link' },
        {
            label: 'Produits',
            type: 'dropdown',
            items: [
                { label: 'Produit 1', href: '/produit1' },
                { label: 'Produit 2', href: '/produit2' }
            ]
        },
        { label: 'Contact', href: '/contact', type: 'link' }
    ]
});
```

## Options de configuration

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `logoSrc` | String | `'assets/images/logo-pd2i.png'` | Chemin vers le logo |
| `logoAlt` | String | `'PD2i Logo'` | Texte alternatif du logo |
| `currentLang` | String | `'EN'` | Langue actuelle |
| `languages` | Array | `['EN', 'FR']` | Langues disponibles |
| `navigationItems` | Array | Voir défaut | Éléments de navigation |

## Structure des éléments de navigation

### Lien simple
```javascript
{
    label: 'Accueil',
    href: '/',
    type: 'link'
}
```

### Menu déroulant
```javascript
{
    label: 'Produits',
    labelCompact: 'Prod', // Version courte pour tablette (optionnel)
    type: 'dropdown',
    items: [
        { label: 'Sous-produit 1', href: '/produit1' },
        { label: 'Sous-produit 2', href: '/produit2' }
    ]
}
```

## Méthodes publiques

### `updateNavigation(newNavigation)`
Met à jour les éléments de navigation
```javascript
header.updateNavigation([
    { label: 'Nouveau lien', href: '/nouveau', type: 'link' }
]);
```

### `updateLanguages(newLanguages)`
Met à jour les langues disponibles
```javascript
header.updateLanguages(['FR', 'EN', 'DE']);
```

### `setCurrentLanguage(lang)`
Change la langue actuelle
```javascript
header.setCurrentLanguage('FR');
```

## Événements

### `languageChanged`
Déclenché lors du changement de langue
```javascript
document.addEventListener('languageChanged', (event) => {
    console.log('Nouvelle langue:', event.detail.language);
});
```

## Breakpoints responsive

- **Mobile** : `< 1024px` → Menu burger
- **Tablette** : `1024px - 1279px` → Navigation compacte
- **Desktop** : `≥ 1280px` → Navigation complète

## Personnalisation CSS

Le composant utilise les classes CSS suivantes que vous pouvez personnaliser :

```css
/* Couleurs principales */
:root {
    --pd2i-blue: #0083CA;
    --pd2i-black: #000000;
    --pd2i-white: #FFFFFF;
}

/* Classes personnalisables */
.header-logo { /* Style du logo */ }
.header-nav { /* Style de la navigation */ }
.header-dropdown { /* Style des dropdowns */ }
.header-mobile-menu { /* Style du menu mobile */ }
```

## Exemple complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Site</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Header Component CSS -->
    <link rel="stylesheet" href="components/header.css">
</head>
<body>
    <!-- Le header sera inséré automatiquement ici -->
    
    <main>
        <!-- Votre contenu -->
    </main>
    
    <!-- Header Component JS -->
    <script src="components/Header.js"></script>
    
    <script>
        // Initialisation du header
        window.headerInstance = new Header({
            logoSrc: 'assets/images/mon-logo.png',
            currentLang: 'FR',
            navigationItems: [
                { label: 'Accueil', href: '/', type: 'link' },
                {
                    label: 'Services',
                    type: 'dropdown',
                    items: [
                        { label: 'Service 1', href: '/service1' },
                        { label: 'Service 2', href: '/service2' }
                    ]
                },
                { label: 'Contact', href: '/contact', type: 'link' }
            ]
        });
        
        // Écouter les changements de langue
        document.addEventListener('languageChanged', (event) => {
            console.log('Langue changée vers:', event.detail.language);
            // Ici vous pouvez recharger le contenu dans la nouvelle langue
        });
    </script>
</body>
</html>
```

## Compatibilité

- ✅ Tous les navigateurs modernes
- ✅ IE11+ (avec polyfills)
- ✅ Mobile et tablette
- ✅ Accessibilité (WCAG 2.1)

## Support

Pour toute question ou personnalisation, contactez l'équipe de développement.
