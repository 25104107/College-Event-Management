import os
import re

dir_path = r'c:\Users\MUTHU\Downloads\College Event Management'
index_path = os.path.join(dir_path, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract header and footer
header_match = re.search(r'(<header class="site-header">.*?</header>)', index_html, re.DOTALL)
footer_match = re.search(r'(<footer class="site-footer">.*?</footer>)', index_html, re.DOTALL)

if not header_match or not footer_match:
    print("Could not find header or footer in index.html")
    exit(1)

header_html = header_match.group(1)
footer_html = footer_match.group(1)

html_files = [f for f in os.listdir(dir_path) if f.endswith('.html')]

for file in html_files:
    if file == 'index.html':
        continue
    
    file_path = os.path.join(dir_path, file)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update Header and Footer
    current_header = header_html
    
    # Remove all existing active classes
    current_header = current_header.replace(' class="active"', '')
    current_header = current_header.replace(' active', '')
    
    # Set active class for current page
    if file == 'index.html' or file == '':
        current_header = re.sub(r'(href="index\.html")(.*?>)', r'\1 class="active"\2', current_header)
    elif file in ['login.html', 'admin-login.html', 'login-selection.html']:
        current_header = re.sub(r'(href="login-selection\.html")(.*?>)', r'\1 class="active"\2', current_header)
        # Handle case where class already exists
        if 'class="' in current_header and 'login-selection.html' in current_header:
            current_header = re.sub(r'(<a[^>]*class="[^"]*)"([^>]*href="login-selection\.html")', r'\1 active"\2', current_header)
            current_header = re.sub(r'(<a[^>]*href="login-selection\.html"[^>]*class="[^"]*)"', r'\1 active"', current_header)
    else:
        # Match any other page
        pattern = f'href="{file}"'
        current_header = re.sub(f'({pattern})(.*?>)', r'\1 class="active"\2', current_header)

    # Secondary check for buttons or links where class already exists
    if 'class="' in current_header:
        # If we added class="active" but there was an existing class, merge them
        # (Though the previous re.sub might have created duplicate class attributes if not careful)
        # Better approach: find the tag and inject 'active' into existing class attribute
        target_files = [file]
        if file in ['login.html', 'admin-login.html', 'login-selection.html']:
            target_files = ['login-selection.html']
        
        for tf in target_files:
            # Look for <a ... href="tf" ... class="..." ... > or vice versa
            current_header = re.sub(rf'(<a[^>]*class=")([^"]*)("[^>]*href="{tf}")', r'\1\2 active\3', current_header)
            current_header = re.sub(rf'(<a[^>]*href="{tf}"[^>]*class=")([^"]*)(")', r'\1\2 active\3', current_header)

    # Try to replace existing header
    if '<header class="site-header">' in content:
        content = re.sub(r'<header class="site-header">.*?</header>', current_header, content, flags=re.DOTALL)
    elif '<body>' in content:
        # Fallback for files without header: insert after body
        content = re.sub(r'(<body>)', r'\1\n  ' + current_header.replace('\\', '\\\\'), content)

    # Try to replace existing footer
    if '<footer class="site-footer">' in content:
        content = re.sub(r'<footer class="site-footer">.*?</footer>', footer_html, content, flags=re.DOTALL)
    elif '<footer>' in content:
        content = re.sub(r'<footer>.*?</footer>', footer_html, content, flags=re.DOTALL)
    elif '</body>' in content:
        # Fallback for files without footer: insert before end of body
        content = re.sub(r'(</body>)', r'  ' + footer_html.replace('\\', '\\\\') + r'\n\1', content)

    # 2. Fix inline buttons (radius-md to 0) in all html files
    content = content.replace('border-radius: var(--radius-md)', 'border-radius: 0')
    content = content.replace('border-radius: 25px', 'border-radius: 0')
    
    # 3. Remove custom backgrounds
    if file == 'about.html':
        content = re.sub(r'background:\s*linear-gradient\(135deg,\s*#1e3c72\s*0%,\s*#2a5298\s*100%\);', '', content)
    elif file == 'login.html':
        content = re.sub(r'background:\s*linear-gradient\(135deg,\s*#667eea\s*0%,\s*#764ba2\s*100%\);', '', content)
    elif file == '404errorpage.html':
        content = re.sub(r'background:\s*linear-gradient\(135deg,\s*#667eea\s*0%,\s*#764ba2\s*100%\);', '', content)
        content = re.sub(r'background:\s*linear-gradient\(135deg,\s*#1e1e2f\s*0%,\s*#2d1b3a\s*100%\);', '', content)

    # Extra fix for login.html .login-btn border-radius
    if file == 'login.html':
        content = re.sub(r'(\.login-btn\s*\{[^}]*?border-radius:\s*)var\(--radius-md\)', r'\g<1>0', content, flags=re.DOTALL)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated HTML files.")

# Update styles.css
css_path = os.path.join(dir_path, 'styles.css')
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Fix buttons in css
css_content = re.sub(r'(\.btn-register\s*\{[^}]*?border-radius:\s*)var\(--radius-md\)', r'\g<1>0', css_content, flags=re.DOTALL)
css_content = re.sub(r'(\.footer-newsletter\s+button\s*\{[^}]*?border-radius:\s*)var\(--radius-sm\)', r'\g<1>0', css_content, flags=re.DOTALL)
css_content = re.sub(r'(\.action-btn\s*\{[^}]*?border-radius:\s*)var\(--radius-sm\)', r'\g<1>0', css_content, flags=re.DOTALL)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

print("Updated CSS file.")
