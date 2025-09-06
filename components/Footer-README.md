# Footer Component - PD2i Website

## Description
Composant réutilisable pour le footer du site PD2i. Ce composant inclut :
- Logo avec slogan personnalisable
- Informations de contact de l'entreprise
- Navigation footer avec liens fonctionnels
- Liens sociaux (LinkedIn, Facebook, Twitter)
- Section copyright avec liens légaux
- Design responsive complet

## Installation

### 1. Inclure les fichiers
```html
<!-- CSS du composant -->
<link rel="stylesheet" href="components/footer.css">

<!-- JavaScript du composant -->
<script src="components/Footer.js"></script>
```

### 2. Utilisation de base
```javascript
// Initialisation simple
const footer = new Footer();
```

### 3. Utilisation avancée
```javascript
// Configuration personnalisée
const footer = new Footer({
    logoSrc: 'path/to/your/logo.png',
    logoAlt: 'Votre Logo',
    slogan: 'Votre slogan personnalisé',
    companyInfo: {
        name: 'Votre Entreprise',
        address: 'Votre adresse',
        city: 'Votre ville',
        phone: 'Votre téléphone',
        email: 'votre@email.com'
    },
    navigationLinks: [
        { label: 'À propos', href: '/about' },
        { label: 'Services', href: '/services' }
    ],
    socialLinks: [
        { 
            platform: 'linkedin', 
            href: 'https://linkedin.com/company/votre-entreprise',
            icon: 'linkedin',
            label: 'Suivez-nous'
        }
    ]
});
```

## Options de configuration

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `logoSrc` | String | `'assets/images/logo-pd2i.png'` | Chemin vers le logo |
| `logoAlt` | String | `'PD2i Logo'` | Texte alternatif du logo |
| `slogan` | String | `'Your partner when it is all about performance'` | Slogan de l'entreprise |
| `companyInfo` | Object | Voir défaut PD2i | Informations de contact |
| `navigationLinks` | Array | Voir défaut | Liens de navigation |
| `socialLinks` | Array | `[LinkedIn]` | Liens sociaux |
| `bottomLinks` | Array | Voir défaut | Liens du bas de page |
| `copyrightYear` | Number | Année actuelle | Année du copyright |

## Structure des données

### Informations de l'entreprise
```javascript
companyInfo: {
    name: 'PD2i FRANCE',
    address: '86, bd Malesherbes',
    city: '75008 Paris',
    phone: '+33 (0) 153 75 45 05',
    email: 'admin@pd2i.com'
}
```

### Liens de navigation
```javascript
navigationLinks: [
    { label: 'About us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
]
```

### Liens sociaux
```javascript
socialLinks: [
    { 
        platform: 'linkedin',  // linkedin, facebook, twitter
        href: 'https://linkedin.com/company/pd2i',
        icon: 'linkedin',      // Nom de l'icône
        label: 'Follow us'     // Texte affiché
    }
]
```

### Liens du bas de page
```javascript
bottomLinks: [
    { label: 'Cookies', href: '/cookies' },
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Legal Informations', href: '/legal' }
]
```

## Méthodes publiques

### `updateCompanyInfo(newInfo)`
Met à jour les informations de l'entreprise
```javascript
footer.updateCompanyInfo({
    phone: '+33 (0) 123 45 67 89',
    email: 'nouveau@email.com'
});
```

### `updateNavigation(newNavigation)`
Met à jour les liens de navigation
```javascript
footer.updateNavigation([
    { label: 'Accueil', href: '/' },
    { label: 'Produits', href: '/products' }
]);
```

### `updateSocialLinks(newSocialLinks)`
Met à jour les liens sociaux
```javascript
footer.updateSocialLinks([
    { 
        platform: 'facebook', 
        href: 'https://facebook.com/votre-page',
        icon: 'facebook',
        label: 'Facebook'
    }
]);
```

### `updateBottomLinks(newBottomLinks)`
Met à jour les liens du bas de page
```javascript
footer.updateBottomLinks([
    { label: 'Mentions légales', href: '/legal' },
    { label: 'CGV', href: '/terms' }
]);
```

### `setCopyrightYear(year)`
Change l'année du copyright
```javascript
footer.setCopyrightYear(2024);
```

## Icônes sociales supportées

Le composant inclut des icônes SVG pour :
- **LinkedIn** : `linkedin`
- **Facebook** : `facebook`
- **Twitter** : `twitter`

Pour ajouter d'autres icônes, modifiez la méthode `getSocialIcon()` dans le composant.

## Design responsive

### Breakpoints
- **Mobile** : `< 768px` → Colonnes empilées, texte centré
- **Tablette** : `768px - 1023px` → 2 colonnes
- **Desktop** : `≥ 1024px` → 4 colonnes

### Adaptations mobiles
- Logo et slogan centrés
- Informations de contact empilées
- Navigation en liste verticale
- Liens du bas centrés et empilés
- Icônes sociales centrées

## Personnalisation CSS

### Variables CSS disponibles
```css
:root {
    --footer-bg-color: #0083CA;
    --footer-text-color: #FFFFFF;
    --footer-hover-color: #bfdbfe;
    --footer-border-color: #3b82f6;
}
```

### Classes CSS principales
```css
.footer-logo { /* Style du logo */ }
.footer-slogan { /* Style du slogan */ }
.footer-contact { /* Section contact */ }
.footer-navigation { /* Navigation footer */ }
.footer-social { /* Liens sociaux */ }
.footer-bottom { /* Section du bas */ }
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
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'pd2i-blue': '#0083CA'
                    }
                }
            }
        }
    </script>
    
    <!-- Footer Component CSS -->
    <link rel="stylesheet" href="components/footer.css">
</head>
<body class="flex flex-col min-h-screen">
    <main class="flex-grow">
        <!-- Votre contenu principal -->
        <div class="container mx-auto px-4 py-16">
            <h1>Mon Site Web</h1>
        </div>
    </main>
    
    <!-- Le footer sera inséré automatiquement ici -->
    
    <!-- Footer Component JS -->
    <script src="components/Footer.js"></script>
    
    <script>
        // Initialisation du footer
        const footer = new Footer({
            logoSrc: 'assets/images/mon-logo.png',
            slogan: 'Mon slogan personnalisé',
            companyInfo: {
                name: 'Mon Entreprise',
                address: '123 rue Example',
                city: '75001 Paris',
                phone: '+33 1 23 45 67 89',
                email: 'contact@monentreprise.com'
            },
            navigationLinks: [
                { label: 'Accueil', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Contact', href: '/contact' }
            ],
            socialLinks: [
                { 
                    platform: 'linkedin', 
                    href: 'https://linkedin.com/company/mon-entreprise',
                    icon: 'linkedin',
                    label: 'LinkedIn'
                }
            ]
        });
    </script>
</body>
</html>
```

## Accessibilité

Le composant respecte les standards d'accessibilité :
- ✅ Navigation au clavier
- ✅ Attributs ARIA appropriés
- ✅ Contraste de couleurs suffisant
- ✅ Liens avec labels explicites
- ✅ Support du mode high contrast
- ✅ Support du mode reduced motion

## Compatibilité

- ✅ Tous les navigateurs modernes
- ✅ IE11+ (avec polyfills)
- ✅ Mobile et tablette
- ✅ Mode sombre/clair
- ✅ Impression optimisée

## Support

Pour toute question ou personnalisation, contactez l'équipe de développement.
