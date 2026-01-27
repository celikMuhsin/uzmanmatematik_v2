// Main App Module

// 5. News Gallery Logic
let newsData = [];
window.currentNewsIndex = 0; // Expose to window for onclick in HTML
let newsInterval;

async function loadNews() {
    newsData = await fetchData('assets/data/news.json');
    if (newsData.length === 0) return;

    // Create Thumbnails/Numbers
    const thumbsContainer = document.getElementById('gallery-thumbs');
    thumbsContainer.innerHTML = '';

    newsData.forEach((_, index) => {
        const btn = document.createElement('div');
        btn.className = `gallery-thumb-btn ${index === 0 ? 'active' : ''}`;
        btn.innerText = index + 1;
        btn.onclick = () => showNewsSlide(index);
        thumbsContainer.appendChild(btn);
    });

    // Show first slide
    if (newsData.length > 0) {
        showNewsSlide(0);
        startNewsInterval();
    }
}

function showNewsSlide(index) {
    window.currentNewsIndex = index;
    const item = newsData[index];

    document.getElementById('gallery-img').src = item.image;
    document.getElementById('gallery-title').innerText = item.title;
    document.getElementById('gallery-desc').innerText = item.description;

    // Link update removed as we use onclick

    // Update active thumb
    const thumbs = document.querySelectorAll('.gallery-thumb-btn');
    thumbs.forEach(t => t.classList.remove('active'));
    if (thumbs[index]) thumbs[index].classList.add('active');

    // Reset Interval
    startNewsInterval();
}

function startNewsInterval() {
    if (newsInterval) clearInterval(newsInterval);
    newsInterval = setInterval(() => {
        let next = (window.currentNewsIndex + 1) % newsData.length;
        showNewsSlide(next);
    }, 6000); // 6 seconds
}

// --- Columnists Logic ---
let columnistData = [];

async function loadColumnists() {
    try {
        columnistData = await fetchData('assets/data/columnists.json');

        // 1. Sidebar / Home Lists (Limited to 5)
        const targets = ['columnist-list', 'home-columnist-list'];
        targets.forEach(targetId => {
            const listContainer = document.getElementById(targetId);
            if (!listContainer) return;
            listContainer.innerHTML = '';

            // Show only first 5
            const limitedList = columnistData.slice(0, 5);

            limitedList.forEach(author => {
                const item = document.createElement('div');
                item.className = 'columnist-item';
                // Add onclick to the entire item
                item.onclick = function () { openColumnistDetail(author.id); };
                item.style.cursor = 'pointer';

                item.innerHTML = `
                    <img src="${author.image}" class="col-thumb" alt="${author.name}">
                    <div class="col-info">
                        <span class="col-name">${author.name}</span>
                        <span class="col-title">${author.title}</span>
                    </div>
                `;
                listContainer.appendChild(item);
            });

            // Add "Show All" Button
            if (columnistData.length > 5) {
                const showAllBtn = document.createElement('div');
                showAllBtn.style.textAlign = 'center';
                showAllBtn.style.marginTop = '15px';
                showAllBtn.style.padding = '10px';
                showAllBtn.style.borderTop = '1px solid #eee';
                showAllBtn.innerHTML = `
                    <a href="#" onclick="showPage('all-columnists')" 
                       style="color: var(--primary-color); font-weight: bold; text-decoration: none; font-size: 0.9rem; border: 1px solid var(--primary-color); padding: 5px 15px; border-radius: 15px; display:inline-block; transition: all 0.2s;">
                       Tüm Köşe Yazıları (${columnistData.length}) ❯
                    </a>
                `;
                // Add hover effect logic via JS or assume App has CSS helper, inline is fine for dynamic button
                showAllBtn.querySelector('a').onmouseover = function () { this.style.backgroundColor = 'var(--primary-color)'; this.style.color = 'white'; };
                showAllBtn.querySelector('a').onmouseout = function () { this.style.backgroundColor = 'transparent'; this.style.color = 'var(--primary-color)'; };

                listContainer.appendChild(showAllBtn);
            }
        });

        // 2. All Columnists Page (List Layout) -> Handled by renderAllColumnists helper
        renderAllColumnists(columnistData); // Initial render all

    } catch (error) {
        console.error('Köşe yazarları yüklenirken hata:', error);
    }
}

// Helper to render the list (used by init and filter)
window.renderAllColumnists = (data) => {
    const aliGrid = document.getElementById('all-columnists-grid');
    if (!aliGrid) return;

    aliGrid.innerHTML = '';
    aliGrid.style.display = 'flex';
    aliGrid.style.flexDirection = 'column';
    aliGrid.style.gap = '15px';

    if (data.length === 0) {
        aliGrid.innerHTML = '<div style="text-align:center; padding: 20px; color: #777;">Bu kategoride köşe yazısı bulunmamaktadır.</div>';
        return;
    }

    data.forEach(author => {
        const card = document.createElement('div');
        card.className = 'columnist-row-item';

        Object.assign(card.style, {
            display: 'flex',
            alignItems: 'center',
            padding: '20px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            border: '1px solid #eee'
        });

        card.onmouseover = () => card.style.transform = 'translateX(5px)';
        card.onmouseout = () => card.style.transform = 'translateX(0)';

        card.onclick = () => openColumnistDetail(author.id);

        card.innerHTML = `
            <img src="${author.image}" alt="${author.name}" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-color); margin-right: 20px;">
            <div style="flex: 1;">
                <span style="display: block; font-size: 0.8rem; color: #777; font-weight: bold; text-transform: uppercase; margin-bottom: 2px;">${author.role || 'Köşe Yazarı'}</span>
                <h3 style="margin: 0; font-size: 1.1rem; color: #333;">${author.name}</h3>
                <p style="margin: 5px 0 0 0; font-size: 0.95rem; color: #555;">${author.title}</p>
            </div>
            <div style="color: var(--primary-color); font-size: 1.2rem; margin-left:15px;">❯</div>
        `;
        aliGrid.appendChild(card);
    });
};

window.filterColumnists = (category) => {
    if (category === 'all') {
        renderAllColumnists(columnistData);
    } else {
        const filtered = columnistData.filter(c => c.category === category);
        renderAllColumnists(filtered);
    }
};

window.openColumnistDetail = (id) => {
    const author = columnistData.find(c => c.id === id);
    if (!author) return;

    // Use showPage to hide everything else properly (fixes Home page overlap)
    showPage('columnist-detail');

    // Populate Data
    document.getElementById('col-detail-img').src = author.image;
    document.getElementById('col-detail-name').innerText = author.name;
    document.getElementById('col-detail-title').innerText = author.title;

    // Dynamic Role Loading
    const roleElement = document.getElementById('col-detail-role');
    if (roleElement) {
        roleElement.innerText = author.role || 'Köşe Yazarı';
    }

    // Handle Content (Array (Paragraphs) or String)
    const bodyElement = document.getElementById('col-detail-body');
    if (Array.isArray(author.content)) {
        // Option 1: Join with double breaks:
        // bodyElement.innerHTML = author.content.join('<br><br>');

        // Option 2 (Better): Wrap each in <p> tags for proper styling
        bodyElement.innerHTML = author.content.map(p => `<p style="margin-bottom: 1em;">${p}</p>`).join('');
    } else {
        // Fallback for old single string format
        bodyElement.innerText = author.content;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 6. Page Navigation (SPA-like)
// 6. Page Navigation (SPA-like)
// 6. Page Navigation (SPA-like)
window.showPage = (pageIds) => {
    // Hide all
    const pages = ['home-page', 'news-page', 'news-detail', 'games-page', 'lessons-page', 'resources-page', 'columnist-detail', 'quiz-page', 'all-columnists-page', 'contact-page', 'edebiyat-game-page', 'saniye-game-page', 'kuvvet-game-page', 'denklik-game-page', 'story-category-page', 'math-exam-page', 'english-page', 'english-exams-page'];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // Handle Sidebar Menus (Auto-Close)
    const storyMenu = document.getElementById('story-dropdown');
    if (storyMenu) {
        storyMenu.style.display = 'none';
        // Reset submenus as well
        const storySubmenu = document.getElementById('story-submenu-1');
        if (storySubmenu) storySubmenu.style.display = 'none';

        // Reset icons
        const icons = document.querySelectorAll('.sidebar-links svg');
        icons.forEach(icon => icon.style.transform = 'rotate(0deg)');
    }

    // 7. Stop Exam Timer if leaving exam page
    if (pageIds !== 'math-exam-page' && window.Arayuz && window.Arayuz.durdur) {
        window.Arayuz.durdur();
    }

    // Handle Exams Dropdown Logic
    const examsMenu = document.getElementById('exams-dropdown');
    if (examsMenu && pageIds !== 'math-exam-page') {
        examsMenu.style.display = 'none';
        const mathSub = document.getElementById('exams-math-submenu');
        if (mathSub) mathSub.style.display = 'none';
    }

    // Handle Games Dropdown Logic
    const gamePages = ['games', 'saniye-game', 'kuvvet-game', 'denklik-game', 'edebiyat-game'];
    const gamesMenu = document.getElementById('games-dropdown');

    if (gamesMenu) {
        if (gamePages.includes(pageIds)) {
            gamesMenu.style.display = 'block'; // Keep open for game pages
        } else {
            gamesMenu.style.display = 'none'; // Close for others
        }
    }

    if (pageIds === 'math-exam-page') {
        document.getElementById('math-exam-page').style.display = 'block';
    }

    if (pageIds === 'english-exams') {
        document.getElementById('english-exams-page').style.display = 'block';
        if (window.EnglishExam) window.EnglishExam.init(); // Ensure init
    }

    if (pageIds === 'english') {
        document.getElementById('english-page').style.display = 'block';
    }

    if (pageIds === 'home') {
        document.getElementById('home-page').style.display = 'block';
        // Optional: window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else if (pageIds === 'news') {
        document.getElementById('news-page').style.display = 'block';
        loadNews();
        loadColumnists();
    }
    else if (pageIds === 'lessons') {
        document.getElementById('lessons-page').style.display = 'block';
        loadVideos();
    }
    else if (pageIds === 'resources') {
        document.getElementById('resources-page').style.display = 'block';
        loadResources();
    }
    else if (pageIds === 'games') {
        document.getElementById('home-page').style.display = 'block';
        setTimeout(() => {
            const grid = document.getElementById('game-grid');
            if (grid) {
                // Scroll to the parent section of the grid usually, or just the grid
                grid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
    else if (pageIds === 'quiz') {
        document.getElementById('quiz-page').style.display = 'block';
        // Ensure starting state
        document.getElementById('start-screen').style.display = 'block';
        document.getElementById('quiz-screen').style.display = 'none';
        document.getElementById('result-screen').style.display = 'none';
        // If scorecard loading needed:
        if (typeof loadScoreboard === 'function') loadScoreboard();
    }
    else if (pageIds === 'columnist-detail') {
        document.getElementById('columnist-detail').style.display = 'block';
    }
    else if (pageIds === 'all-columnists') {
        document.getElementById('all-columnists-page').style.display = 'block';
        // Reset Filter on Re-entry
        const filterSelect = document.getElementById('columnist-category-filter');
        if (filterSelect) {
            filterSelect.value = 'all';
            filterColumnists('all');
        }
    }
    else if (pageIds === 'contact') {
        document.getElementById('contact-page').style.display = 'block';
        loadGuestbook();
        // Reset form fields
        if (form) form.reset();
    }
    else if (pageIds === 'edebiyat-game') {
        document.getElementById('edebiyat-game-page').style.display = 'block';
        if (typeof exitInternalGame === 'function') exitInternalGame();
    }
    else if (pageIds === 'saniye-game') {
        document.getElementById('saniye-game-page').style.display = 'block';
        if (typeof initSaniyeGame === 'function') initSaniyeGame();
    }
    else if (pageIds === 'kuvvet-game') {
        document.getElementById('kuvvet-game-page').style.display = 'block';
        if (typeof initKuvvetGame === 'function') initKuvvetGame();
    }
    else if (pageIds === 'denklik-game') {
        document.getElementById('denklik-game-page').style.display = 'block';
        if (typeof initDenklikGame === 'function') initDenklikGame();
    }
    else if (pageIds === 'story-category-page') {
        document.getElementById('story-category-page').style.display = 'block';
    }
};

window.openNewsDetail = (index) => {
    const item = newsData[index];
    if (!item) return;

    // Populate
    document.getElementById('detail-title').innerText = item.title;
    document.getElementById('detail-img').src = item.image;

    // Add default content if missing (for testing)
    const content = item.content || item.description || "İçerik yükleniyor...";
    document.getElementById('detail-body').innerText = content;

    // Switch View
    document.getElementById('news-page').style.display = 'none';
    document.getElementById('news-detail').style.display = 'block';

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.addEventListener('DOMContentLoaded', () => {
    init();
});

async function init() {
    await loadVideos();
    await loadResources();
    await loadGames();
    await loadGames();
    await initSlider();
    await loadColumnists(); // Load immediately for homepage
}

// Helper to fetch data safely
async function fetchData(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (e) {
        console.error("Could not fetch data:", e);
        return [];
    }
}

// 1. Slider Logic
async function initSlider() {
    const slides = await fetchData('assets/data/slider.json');
    if (slides.length === 0) return;

    const wrapper = document.getElementById('slider-wrapper');
    const textContainer = document.getElementById('slider-text');

    // Create DOM elements for slides
    slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = `slide ${index === 0 ? 'active' : ''}`;
        slideDiv.innerHTML = `<img src="${slide.image}" alt="${slide.title}">`;

        // Click Action
        if (slide.action) {
            slideDiv.style.cursor = 'pointer';
            slideDiv.setAttribute('onclick', slide.action);
        }

        wrapper.appendChild(slideDiv);
    });

    // Initial text
    const updateText = (index) => {
        const slide = slides[index];
        textContainer.innerHTML = `
            <h2 class="slider-title">${slide.title}</h2>
            <p>${slide.text}</p>
        `;

        // Click Action for Text
        if (slide.action) {
            textContainer.style.cursor = 'pointer';
            textContainer.setAttribute('onclick', slide.action);
        } else {
            textContainer.style.cursor = 'default';
            textContainer.removeAttribute('onclick');
        }
    };
    updateText(0);

    // Auto rotate
    let currentIndex = 0;
    setInterval(() => {
        // Remove active from current
        wrapper.children[currentIndex].classList.remove('active');

        // Next index
        currentIndex = (currentIndex + 1) % slides.length;

        // Add active to next
        wrapper.children[currentIndex].classList.add('active');
        updateText(currentIndex);
    }, 5000); // 5 seconds
}

// 2. Load Videos
async function loadVideos() {
    const videos = await fetchData('assets/data/videos.json');
    const container = document.getElementById('video-grid');
    if (!container) return;

    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" class="card-img-top">
            <div class="card-body">
                <span class="card-badge">${video.category}</span>
                <h3 class="card-title">${video.title}</h3>
                <p class="card-text">${video.description}</p>
                <a href="${video.url}" target="_blank" class="btn">İzle</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. Load Resources (Downloads)
async function loadResources() {
    const resources = await fetchData('assets/data/resources.json');
    const container = document.getElementById('resource-grid');
    if (!container) return;

    resources.forEach(res => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-body">
                <div style="font-size: 2rem; color: var(--primary-color); margin-bottom: 10px;">
                    <i class="icon-file">📄</i>
                </div>
                <h3 class="card-title">${res.title}</h3>
                <p class="card-text">Tür: ${res.type} &bull; Boyut: ${res.size}</p>
                <a href="${res.url}" class="btn btn-outline">İndir</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// 4. Load Games
async function loadGames() {
    const games = await fetchData('assets/data/games.json');
    const container = document.getElementById('game-grid');
    if (!container) return;

    container.innerHTML = ''; // Clear existing content

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}" class="card-img-top">
            <div class="card-body">
                <h3 class="card-title">${game.title}</h3>
                <p class="card-text">${game.description}</p>
                <a href="${game.url}" class="btn">Oyna</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Mobile Menu Toggle
// Close menu logic helper
const closeMenu = () => {
    const nav = document.querySelector('.main-nav');
    if (nav.classList.contains('active')) {
        nav.classList.remove('active');

        // Reset all open dropdowns when menu closes
        document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
    }
};

// Toggle Menu
window.toggleMenu = () => {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('active');

    // If closing via toggle, also reset dropdowns
    if (!nav.classList.contains('active')) {
        document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
    }
};

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const dropdown = link.nextElementSibling;

        // Accordion Logic for Mobile
        if (dropdown && dropdown.classList.contains('dropdown') && window.innerWidth <= 900) {
            e.preventDefault();
            // Toggle current
            const isVisible = dropdown.style.display === 'block';
            dropdown.style.display = isVisible ? 'none' : 'block';
            return;
        }

        // Reset dropdowns if clicking a regular link
        closeMenu();
    });
});

// Close menu when clicking OUTSIDE
document.addEventListener('click', (e) => {
    const nav = document.querySelector('.main-nav');
    const hamburger = document.querySelector('.hamburger-menu');

    // If menu is open AND click is NOT on nav AND click is NOT on hamburger
    if (nav.classList.contains('active') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
    }
});

// Handle Rotation / Resize (Reset dropdowns)
window.addEventListener('resize', () => {
    // If screen becomes wide (desktop), ensure mobile styles are cleared
    if (window.innerWidth > 900) {
        document.querySelectorAll('.dropdown').forEach(d => d.style.display = ''); // Clear inline style
        document.querySelector('.main-nav').classList.remove('active');
    }
});

// --- Contact Page & Guestbook Logic ---
async function loadGuestbook() {
    const guestbook = await fetchData('assets/data/guestbook.json');
    const wall = document.getElementById('guestbook-wall');
    if (!wall) return;

    wall.innerHTML = '';
    guestbook.forEach(entry => {
        const note = document.createElement('div');
        note.className = 'guest-note';
        note.innerHTML = `
            <div class="guest-header">
                <span class="guest-name">${entry.name}</span>
                <span class="guest-date">${entry.date}</span>
            </div>
            <div class="guest-message">"${entry.message}"</div>
        `;
        wall.appendChild(note);
    });
}

window.sendContactEmail = (event) => {
    event.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    const body = `İsim: ${name}%0D%0AE-posta: ${email}%0D%0A%0D%0AMesaj:%0D%0A${message}`;
    const mailtoLink = `mailto:muhsincelikdepo@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    window.location.href = mailtoLink;

    // Reset form
    setTimeout(() => event.target.reset(), 100);
    // Close games menu if not navigating to a game
    if (!pageIds.includes('game') && pageIds !== 'games' && pageIds !== 'games-page') {
        const menu = document.getElementById('games-dropdown');
        if (menu) menu.style.display = 'none';
    }
};

// --- Story Menu Logic ---
window.toggleStoryMenu = (e) => {
    if (e) e.preventDefault();
    const menu = document.getElementById('story-dropdown');

    // Close Games Menu
    const gamesMenu = document.getElementById('games-dropdown');
    if (gamesMenu) {
        gamesMenu.style.display = 'none';
        const gameIcon = document.querySelector('a[onclick="toggleGamesMenu(event)"] svg');
        if (gameIcon) gameIcon.style.transform = 'rotate(0deg)';
    }

    if (menu) {
        const isOpening = menu.style.display === 'none';
        menu.style.display = isOpening ? 'block' : 'none';

        // Reset submenu if closing
        if (!isOpening) {
            const submenu = document.getElementById('story-submenu-1');
            if (submenu) submenu.style.display = 'none';
        }

        // Rotate Icon
        const icon = e.currentTarget.querySelector('svg');
        if (icon) {
            icon.style.transform = isOpening ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    }
};

window.showStoryCategory = (category) => {
    // 1. Show the page container
    showPage('story-category-page');

    // 2. Dispatch Event for React Component
    window.dispatchEvent(new CustomEvent('CHANGE_STORY_CATEGORY', { detail: category }));
};

window.toggleSubMenu = (e, id) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const submenu = document.getElementById(id);
    if (!submenu) return;

    // Check computed style if inline is empty, but usually inline is enough for toggle
    const isVisible = submenu.style.display === 'block';
    submenu.style.display = isVisible ? 'none' : 'block';

    // Rotate Icon if exists
    const icon = e.currentTarget.querySelector('svg');
    if (icon) {
        icon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
    }
};

window.openSpecificStory = (id) => {
    // 1. Dispatch GLOBAL event to open story directly (handled by React)
    window.dispatchEvent(new CustomEvent('OPEN_STORY', { detail: { id: id } }));

    // 2. Close mobile menu if open
    // toggleMenu(); // Optional, might be annoying if exploring
};

window.toggleGamesMenu = function (e) {
    if (e) e.preventDefault();
    const menu = document.getElementById('games-dropdown');

    // Close Story Menu
    const storyMenu = document.getElementById('story-dropdown');
    if (storyMenu) {
        storyMenu.style.display = 'none';
        const storySubmenu = document.getElementById('story-submenu-1');
        if (storySubmenu) storySubmenu.style.display = 'none';

        const storyIcon = document.querySelector('a[onclick="toggleStoryMenu(event)"] svg');
        if (storyIcon) storyIcon.style.transform = 'rotate(0deg)';
    }

    if (menu) {
        const isOpening = menu.style.display === 'none';
        menu.style.display = isOpening ? 'block' : 'none';

        // Rotate Icon
        const icon = e.currentTarget.querySelector('svg');
        if (icon) {
            icon.style.transform = isOpening ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    }
};

window.showExamPage = (examType) => {
    // 1. Show the page
    showPage('math-exam-page');

    // 2. Set Active Engine
    if (typeof Arayuz !== 'undefined') {
        if (examType === 'carpanlara-ayirma' && typeof CarpanlaraAyirmaMotoru !== 'undefined') {
            Arayuz.aktifMotor = CarpanlaraAyirmaMotoru;
        } else if (examType === 'sayi-kesir' && typeof SayiKesirMotoru !== 'undefined') {
            Arayuz.aktifMotor = SayiKesirMotoru;
        }
    }

    // 3. Start Exam Interface (Timer & Reset)
    if (window.Arayuz && window.Arayuz.acilis) {
        window.Arayuz.acilis();
    }

    // 4. Dispatch event (Future proofing)
    // window.dispatchEvent(new CustomEvent('OPEN_EXAM', { detail: examType }));
};

window.toggleFAQ = (element) => {
    const faqItem = element.parentElement;
    const wasActive = faqItem.classList.contains('active');

    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Toggle current
    if (!wasActive) {
        faqItem.classList.add('active');
    }
};
