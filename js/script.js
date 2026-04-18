document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after animation (if loader exists)
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';
            // Start stats animation after loader hides
            runStatCounters();
        }, 2500);
    }

    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Dropdown functionality - hover based (scoped to Products & Services only)
    const productsBtn = document.getElementById('productsBtn');
    const productsMenu = document.getElementById('productsMenu');
    
    if (productsBtn && productsMenu) {
        const productsDropdown = productsBtn.closest('.nav-dropdown');
        if (productsDropdown) {
            productsDropdown.addEventListener('mouseenter', function() {
                productsMenu.style.display = 'block';
                productsBtn.setAttribute('aria-expanded', 'true');
            });
            
            productsDropdown.addEventListener('mouseleave', function() {
                productsMenu.style.display = 'none';
                productsBtn.setAttribute('aria-expanded', 'false');
            });
        }
    }

    // Search bar functionality with suggestions
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    // Define searchable pages
    const searchablePages = [
        { title: 'Home', url: '../Regional Development Bank.html' },
        { title: 'About Us', url: 'About_us.html' },
        { title: 'Careers', url: 'Careers.html' },
        { title: 'Savings & Investments', url: 'Savings_Investments.html' },
        { title: 'Loans & Advances', url: 'Loans_&_Advances.html' },
        { title: 'RDB Services', url: 'RDB_Services.html' },
        { title: 'Alerts', url: 'AlertPage.html' },
        { title: 'Awards & Recognition', url: 'Awards_&_Recognition.html' },
        { title: 'Chairman', url: 'Chairman.html' },
        { title: 'Contact Us', url: 'Contact_Us.html' }
    ];
    
    // Create suggestions dropdown if it doesn't exist
    let suggestionsList = document.getElementById('searchSuggestions');
    if (!suggestionsList) {
        suggestionsList = document.createElement('div');
        suggestionsList.id = 'searchSuggestions';
        suggestionsList.className = 'search-suggestions';
        searchInput.parentElement.appendChild(suggestionsList);
    }
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            searchInput.classList.toggle('active');
            if (searchInput.classList.contains('active')) {
                searchInput.focus();
            }
        });
        
        // Search input event listener
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length === 0) {
                suggestionsList.style.display = 'none';
                suggestionsList.innerHTML = '';
                return;
            }
            
            // Filter suggestions based on query
            const filteredPages = searchablePages.filter(page => 
                page.title.toLowerCase().includes(query)
            );
            
            if (filteredPages.length === 0) {
                suggestionsList.style.display = 'none';
                suggestionsList.innerHTML = '';
                return;
            }
            
            // Display suggestions
            suggestionsList.innerHTML = filteredPages.map(page => `
                <a href="${page.url}" class="suggestion-item">
                    <span>${highlightMatch(page.title, query)}</span>
                </a>
            `).join('');
            
            suggestionsList.style.display = 'block';
        });
        
        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-search')) {
                searchInput.classList.remove('active');
                suggestionsList.style.display = 'none';
            }
        });
    }
    
    // Helper function to highlight matching text
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    // Active link management
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop().toLowerCase();

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (!this.classList.contains('dropdown-trigger')) {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    if (currentPath) {
        navLinks.forEach(link => link.classList.remove('active'));
        const match = Array.from(navLinks).find(link => {
            if (!link.getAttribute('href')) return false;
            const hrefPath = link.getAttribute('href').split('/').pop().toLowerCase();
            return hrefPath === currentPath;
        });

        if (match) {
            match.classList.add('active');
        }
    }
});

// Stats counters: animate numbers from 0 to target
function getStatCounters() {
    return Array.from(document.querySelectorAll('.stat-number'));
}

function parseStatTarget(text) {
    const trimmed = (text || '').trim();
    const match = trimmed.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return { target: 0, suffix: '' };
    return { target: parseFloat(match[1]), suffix: match[2] || '' };
}

function animateStatCounter(el, target, suffix, duration = 1500) {
    const startTime = performance.now();
    const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
    };
    el.textContent = `0${suffix}`;
    requestAnimationFrame(step);
}

function runStatCounters() {
    const counters = getStatCounters();
    counters.forEach((el) => {
        const { target, suffix } = parseStatTarget(el.textContent);
        animateStatCounter(el, target, suffix);
    });
}

function showLoanTab(tabName) {
    // 1. Hide all sections
    const sections = document.querySelectorAll('.loan-content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // 2. Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 3. Show selected section
    const targetSection = document.getElementById(tabName + '-content');
    if(targetSection) {
        targetSection.classList.add('active');
    }

    // 4. Highlight the clicked button
    event.currentTarget.classList.add('active');
}