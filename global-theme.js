// Global Theme, RTL, and Responsive Navigation Controller
document.addEventListener('DOMContentLoaded', () => {
    // Auto-inject AI Scripts in the correct order
    // Load ai-services.js first, then ai-assistant.js after it
    if (!window.AIServices) {
        const s1 = document.createElement('script');
        s1.src = 'ai-services.js';
        s1.onload = () => {
            if (!document.getElementById('ai-assistant-script')) {
                const s2 = document.createElement('script');
                s2.id = 'ai-assistant-script';
                s2.src = 'ai-assistant.js';
                document.body.appendChild(s2);
            }
        };
        document.body.appendChild(s1);
    } else if (!document.getElementById('ai-assistant-script')) {
        const s2 = document.createElement('script');
        s2.id = 'ai-assistant-script';
        s2.src = 'ai-assistant.js';
        document.body.appendChild(s2);
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedDir = localStorage.getItem('dir') || 'ltr';

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.add('dark');
    }
    if (savedDir === 'rtl') {
        document.body.classList.add('rtl');
    }

    const navActions = document.querySelector('.nav-actions');
    if (navActions && !document.getElementById('themeToggleBtn')) {
        const togglesHtml = `
            <button id="dirToggleBtn" class="btn btn-secondary" title="Toggle RTL/LTR">
                ${savedDir === 'rtl' ? 'LTR' : 'RTL'}
            </button>
            <button id="themeToggleBtn" class="btn btn-secondary" title="Toggle Dark/Light Mode">
                <i class="fas ${savedTheme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
            </button>
        `;
        navActions.insertAdjacentHTML('afterbegin', togglesHtml);

        document.getElementById('themeToggleBtn').addEventListener('click', (e) => {
            const isDark = document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('dark', isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            e.currentTarget.innerHTML = `<i class="fas ${isDark ? 'fa-sun' : 'fa-moon'}"></i>`;
        });

        document.getElementById('dirToggleBtn').addEventListener('click', (e) => {
            const isRtl = document.body.classList.toggle('rtl');
            localStorage.setItem('dir', isRtl ? 'rtl' : 'ltr');
            e.currentTarget.textContent = isRtl ? 'LTR' : 'RTL';
        });
    }

    const nav = document.querySelector('.main-nav');
    if (nav && !document.querySelector('.hamburger-menu')) {
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger-menu';
        hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
        hamburgerBtn.setAttribute('aria-label', 'Toggle Navigation');
        
        // Insert after logo
        const logo = nav.querySelector('.logo');
        if (logo) {
            logo.after(hamburgerBtn); 
        } else {
            nav.prepend(hamburgerBtn);
        }

        hamburgerBtn.addEventListener('click', () => {
            const navLinks = nav.querySelector('.nav-links');
            const navActions = document.querySelector('.nav-actions');
            
            if (navLinks) {
                const isActive = navLinks.classList.toggle('active');
                
                if (navActions) {
                    navActions.classList.toggle('active-mobile', isActive);
                    if (isActive) {
                        // Position actions below links
                        const linksHeight = navLinks.offsetHeight;
                        navActions.style.top = `calc(100% + ${linksHeight}px)`;
                    } else {
                        navActions.style.top = '';
                    }
                }
                
                // Toggle body scroll if menu is very large (optional)
                // document.body.style.overflow = isActive ? 'hidden' : '';
                
                hamburgerBtn.innerHTML = isActive 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            }
        });

        // Close menu on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                const navLinks = nav.querySelector('.nav-links');
                const navActions = document.querySelector('.nav-actions');
                if (navLinks) navLinks.classList.remove('active');
                if (navActions) {
                    navActions.classList.remove('active-mobile');
                    navActions.style.top = '';
                }
                hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // --- Authentication and Navigation Logic ---
    const checkAuth = () => {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || localStorage.getItem("userInfo"));
        const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true" || localStorage.getItem("isLoggedIn") === "true";
        const isAdminLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true" || localStorage.getItem("adminInfo") !== null;
        
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const restrictedPages = ['dashboard.html', 'profile.html', 'notifications.html', 'admin.html', 'register.html'];
        
        const authenticated = isLoggedIn || userInfo || isAdminLoggedIn;

        // Redirect if on a restricted page and not logged in
        if (restrictedPages.includes(currentPath) && !authenticated) {
            if (currentPath === 'admin.html') {
                window.location.href = "admin-login.html";
            } else {
                window.location.href = "login-selection.html";
            }
            return;
        }

        // Update navigation and footer links visibility globally
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (['notifications.html', 'dashboard.html', 'profile.html', 'register.html'].includes(href)) {
                const parentLi = link.closest('li');
                if (parentLi) {
                    parentLi.style.display = authenticated ? 'block' : 'none';
                } else {
                    link.style.display = authenticated ? 'inline-block' : 'none';
                }
            }
        });

        // Update login/logout buttons
        const navActions = document.querySelector(".nav-actions");
        if (navActions) {
            const signUpBtn = navActions.querySelector('a[href="signup.html"]');
            const loginBtn = navActions.querySelector('a[href="login-selection.html"]');
            const logoutBtn = navActions.querySelector(".logout-btn");

            if (authenticated) {
                if (signUpBtn) signUpBtn.style.display = "none";
                if (loginBtn) loginBtn.style.display = "none";
                if (logoutBtn) logoutBtn.style.display = "inline-block";
            } else {
                if (signUpBtn) signUpBtn.style.display = "inline-block";
                if (loginBtn) loginBtn.style.display = "inline-block";
                if (logoutBtn) logoutBtn.style.display = "none";
            }
        }
    };

    // Global Logout function if not already defined
    if (typeof window.logout !== 'function') {
        window.logout = () => {
            sessionStorage.clear();
            localStorage.removeItem("userInfo");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("adminInfo");
            window.location.href = "index.html";
        };
    }

    // --- User Storage Key Helper ---
    window.getUserKey = () => {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || localStorage.getItem("userInfo"));
        if (userInfo) {
            return userInfo.email || userInfo.id || 'guest';
        }
        return 'guest';
    };

    checkAuth();
});