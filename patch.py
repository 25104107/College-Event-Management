import os
import re

directory = "c:/Users/Admin/OneDrive/Desktop/College Event Management(1)/College Event Management"

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # 1. Update the auth logic script
        # The logic usually looks like:
        # const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        # ...
        # if (isLoggedIn || userInfo) {
        
        old_auth = r'const isLoggedIn = sessionStorage\.getItem\("isLoggedIn"\) === "true";(.*?)if \(isLoggedIn \|\| userInfo\) \{'
        new_auth = r'const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true" || localStorage.getItem("isLoggedIn") === "true";\n        const isAdminLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true" || localStorage.getItem("adminInfo") !== null;\1if (isLoggedIn || userInfo || isAdminLoggedIn) {'
        
        content = re.sub(old_auth, new_auth, content, flags=re.DOTALL)
        
        # Another old logic variation might exist:
        old_auth2 = r'const isLoggedIn = sessionStorage\.getItem\("isLoggedIn"\) === "true";(.*?)if \(isLoggedIn\) \{'
        new_auth2 = r'const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true" || localStorage.getItem("isLoggedIn") === "true";\n        const isAdminLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true" || localStorage.getItem("adminInfo") !== null;\1if (isLoggedIn || isAdminLoggedIn) {'
        
        content = re.sub(old_auth2, new_auth2, content, flags=re.DOTALL)
        
        # Update logout function to also clear admin stuff
        old_logout = r'function logout\(\) \{\s+sessionStorage\.clear\(\);\s+localStorage\.removeItem\("userInfo"\);\s+(?:localStorage\.removeItem\("isLoggedIn"\);\s+)?window\.location\.href = "index\.html";\s+\}'
        new_logout = '''function logout() {
        sessionStorage.clear();
        localStorage.removeItem("userInfo");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("adminInfo");
        window.location.href = "index.html";
      }'''
        content = re.sub(old_logout, new_logout, content)

        # 2. Remove Admin Dashboard button in events.html
        if filename == "events.html":
            # Finding the link exactly as it is in the HTML
            admin_btn_pattern = r'<a\s+href="admin\.html"[^>]*>Admin Dashboard</a>'
            content = re.sub(admin_btn_pattern, "", content, flags=re.DOTALL)
            
        # 3. Add dark mode styles to dashboard.html
        if filename == "dashboard.html":
            if "/* Dashboard Dark Mode */" not in content:
                dark_mode_css = """
      /* Dashboard Dark Mode */
      body.dark-mode .dashboard-wrapper { background: #121212; }
      body.dark-mode .stat-card, body.dark-mode .chart-card, body.dark-mode .progress-card, body.dark-mode .upcoming-section, body.dark-mode .recent-section, body.dark-mode .badge-date { background: #1e1e1e; border-color: #333; box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
      body.dark-mode .welcome h1 { background: none; -webkit-text-fill-color: #e0e0e0; color: #e0e0e0; }
      body.dark-mode .badge-date { color: #e0e0e0; }
      body.dark-mode .stat-left h3 { color: #a0a0a0; }
      body.dark-mode .stat-left .value { color: #e0e0e0; }
      body.dark-mode .chart-card h2, body.dark-mode .progress-card h2, body.dark-mode .section-header h2 { color: #e0e0e0; }
      body.dark-mode .progress-item span { color: #e0e0e0; }
      body.dark-mode .progress-bg { background: #333; }
      body.dark-mode .chip { background: #333; color: #a0a0a0; }
      body.dark-mode .event-item { border-bottom-color: #333; }
      body.dark-mode .event-info h4 { color: #e0e0e0; }
      body.dark-mode .countdown-badge { background: #333; color: #a0a0a0; }
      body.dark-mode .timeline-item { border-bottom-color: #333; }
      body.dark-mode .timeline-icon { background: #333; color: #a0a0a0; }
      body.dark-mode .timeline-content p { color: #e0e0e0; }
      body.dark-mode .info-line { color: #a0a0a0; border-top-color: #333; }
      /* End Dashboard Dark Mode */
    </style>"""
                content = content.replace("</style>", dark_mode_css, 1)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

print("Done making script edits.")
