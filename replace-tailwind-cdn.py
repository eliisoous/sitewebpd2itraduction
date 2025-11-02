#!/usr/bin/env python3
"""
Script pour remplacer Tailwind CDN par CSS local dans toutes les pages HTML
"""
import os
import re
import glob

# Trouver tous les fichiers HTML
html_files = glob.glob('*.html')

replacement = '''    <!-- Tailwind CSS Local -->
    <link rel="stylesheet" href="assets/css/tailwind.min.css">'''

def replace_tailwind_cdn(filepath):
    """Remplace le CDN Tailwind par le CSS local"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Chercher le script CDN avec le commentaire avant
        cdn_pattern = re.compile(
            r'<!-- Tailwind CSS -->\s*<script src="https://cdn\.tailwindcss\.com"></script>',
            re.DOTALL
        )
        
        # Chercher le script CDN seul (sans commentaire)
        cdn_pattern_simple = re.compile(r'<script src="https://cdn\.tailwindcss\.com"></script>')
        
        # Chercher le script de config tailwind (à supprimer)
        config_pattern = re.compile(
            r'<script>\s*tailwind\.config = \{.*?\}.*?</script>',
            re.DOTALL
        )
        
        found_cdn = False
        
        # Essayer pattern avec commentaire d'abord
        if cdn_pattern.search(content):
            content = cdn_pattern.sub(replacement, content)
            found_cdn = True
        # Sinon pattern simple
        elif cdn_pattern_simple.search(content):
            content = cdn_pattern_simple.sub(replacement, content)
            found_cdn = True
        
        if found_cdn:
            # Supprimer le script de config s'il existe
            if config_pattern.search(content):
                content = config_pattern.sub('', content)
            print(f"✓ {os.path.basename(filepath)} - CDN remplacé par CSS local")
            changed = True
        else:
            print(f"⚠️  {os.path.basename(filepath)} - Pas de CDN Tailwind trouvé (peut-être déjà remplacé)")
            return False
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"❌ Erreur sur {os.path.basename(filepath)}: {e}")
        return False

if __name__ == '__main__':
    print("Remplacement de Tailwind CDN par CSS local...\n")
    success_count = 0
    
    for html_file in html_files:
        if replace_tailwind_cdn(html_file):
            success_count += 1
    
    print(f"\n✅ {success_count}/{len(html_files)} fichiers traités")
    if success_count > 0:
        print("\n⚠️  IMPORTANT: Assurez-vous d'avoir généré le CSS avec 'npm run build:css'")

