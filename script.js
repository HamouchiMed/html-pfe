// Sample Talents Data
const talents = [
    {
        id: 1,
        name: "YOUSSEF ES-SOUSY",
        category: "art",
        emoji: "🎨",
        description: "Youssef Es-Sousy est un artiste originaire de Dakhla, connu pour sa créativité et son engagement artistique. À travers son art, il met en valeur la culture locale et l'identité du Sud marocain.",
        details: "YOUSSEF crée des œuvres magnifiques inspirées par la culture locale de Dakhla. Il travaille avec diverses techniques et expose ses créations aux galeries internationales.",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        id: 2,
        name: "RACHID ROUSSAFI",
        category: "sport",
        emoji: "⚽",
        description: "Rachid Roussafi est un sportif spécialisé en kitesurf originaire de Dakhla. Il est reconnu pour son talent et sa maîtrise des conditions uniques de la lagune, et participe à la promotion des sports nautiques dans la région.",
        details: "Rachid Roussafi a participé à plusieurs compétitions de kitesurf et est reconnu pour son talent dans ce sport. Il contribue à la promotion du kitesurf à Dakhla et encourage les jeunes à suivre leur passion pour les sports nautiques.",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        id: 3,
        name: "Prof ZOUHAIR MAHANI",
        category: "tech",
        emoji: "💻",
        description: "Développeur web et entrepreneur technologique",
        details: "Le Professeur Zouhair Mahani est un éducateur et chercheur reconnu, apprécié pour son engagement envers l'enseignement et le développement académique. Il inspire ses étudiants par sa passion pour le savoir et encourage toujours l'excellence et la curiosité intellectuelle.",
        rating: "⭐⭐⭐⭐"
    },
    {
        id: 4,
        name: "Najm Souf",
        category: "musique",
        emoji: "🎵",
        description: "Chanteuse et musicienne talentueuse",
        details: "Layla fusionne la musique traditionnelle avec les sons modernes. Ses performances ont été applaudies lors de festivals internationaux.",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        id: 5,
        name: "Soufiane Hamaini",
        category: "entrepreneuriat",
        emoji: "💼",
        description: "Entrepreneur et créateur d'emplois",
        details: "Hassan a fondé plusieurs entreprises prospères qui ont créé des centaines d'emplois locaux. Il est passionné par le développement économique de la région.",
        rating: "⭐⭐⭐⭐"
    }
];

let currentFilter = "tous";

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    // Only display talents if the talents grid exists on this page
    if (document.getElementById('talentsGrid')) {
        displayTalents(talents);
    }
    setupFilterButtons();
    setupContactForm();
});

// Initialize theme from localStorage or system preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(theme);
    setupThemeToggle();
}

// Set the theme
function setTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('☀️');
    } else {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('🌙');
    }
}

// Update theme toggle button icon
function updateThemeIcon(icon) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const iconSpan = themeToggle.querySelector('.theme-icon');
        if (iconSpan) {
            iconSpan.textContent = icon;
        }
    }
}

// Setup theme toggle button
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
}

// Display talents in grid
function displayTalents(talentsToDisplay) {
    const talentsGrid = document.getElementById('talentsGrid');
    talentsGrid.innerHTML = '';

    if (talentsToDisplay.length === 0) {
        talentsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: #666;">Aucun talent trouvé dans cette catégorie.</p>';
        return;
    }

    talentsToDisplay.forEach(talent => {
        const talentCard = createTalentCard(talent);
        talentsGrid.appendChild(talentCard);
    });
}

// Create a talent card element
function createTalentCard(talent) {
    const card = document.createElement('div');
    card.className = 'talent-card';
    
    // Clicking anywhere on the card opens the biography page for this talent
    card.onclick = () => window.location.href = `bio.html?id=${talent.id}`;

    // Use image for YOUSSEF ES-SOUSY (id 1), emoji for others
    const imageContent = talent.id === 1 
        ? `<div class="talent-image">
             <img src="assets/YOUSSEF ES-SOUSY.png" alt="${talent.name}" class="talent-image-img">
             <div class="talent-name-overlay">${talent.name}</div>
           </div>`
        : talent.id === 2
        ? `<div class="talent-image">
             <img src="assets/Rachid Roussafi.png" alt="${talent.name}" class="talent-image-img">
             <div class="talent-name-overlay">${talent.name}</div>
           </div>`
        : talent.id === 3
        ? `<div class="talent-image">
             <img src="assets/prof zouhair mahani.png" alt="${talent.name}" class="talent-image-img">
             <div class="talent-name-overlay">${talent.name}</div>
           </div>`
        : talent.id === 4
        ? `<div class="talent-image">
             <img src="assets/Najm Souf.png" alt="${talent.name}" class="talent-image-img">
             <div class="talent-name-overlay">${talent.name}</div>
           </div>`
        : talent.id === 5
        ? `<div class="talent-image">
             <img src="assets/Soufiane Hamaini.png" alt="${talent.name}" class="talent-image-img">
             <div class="talent-name-overlay">${talent.name}</div>
           </div>`
        : `<div class="talent-image">${talent.emoji}</div>`;

    card.innerHTML = `
        ${imageContent}
        <div class="talent-info">
            <span class="talent-category">${getCategoryLabel(talent.category)}</span>
            <h3><a href="bio.html?id=${talent.id}">${talent.name}</a></h3>
            <p>${talent.description}</p>
            <div class="talent-rating">${talent.rating}</div>
            <div class="card-actions">
                <a class="btn btn-secondary" href="bio.html?id=${talent.id}">En savoir plus</a>
            </div>
        </div>
    `;

    return card;
}

// Render biography for a talent into an element with id 'bioContainer'
function renderBiography(id) {
    const bioContainer = document.getElementById('bioContainer');
    if (!bioContainer) return;

    const talentId = parseInt(id, 10);
    const talent = talents.find(t => t.id === talentId);
    if (!talent) {
        bioContainer.innerHTML = '<p>Talent introuvable.</p>';
        return;
    }

    bioContainer.innerHTML = `
        <div class="bio-card">
            <div class="bio-header">
                ${talent.id === 1 || talent.id === 2 || talent.id === 3 || talent.id === 4 || talent.id === 5 ? 
                    `<div class="bio-image">
                        <img src="assets/${talent.id === 1 ? 'YOUSSEF ES-SOUSY.png' : talent.id === 2 ? 'Rachid Roussafi.png' : talent.id === 3 ? 'prof zouhair mahani.png' : talent.id === 4 ? 'Najm Souf.png' : 'Soufiane Hamaini.png'}" alt="${talent.name}" class="bio-image-img ${talent.id === 3 ? 'bio-image-mahani' : ''}">
                    </div>` :
                    `<div class="bio-emoji">${talent.emoji}</div>`
                }
                <div class="bio-basic">
                    <h1>${talent.name}</h1>
                    <p class="bio-category">${getCategoryLabel(talent.category)}</p>
                    <div class="talent-rating">${talent.rating}</div>
                </div>
            </div>
            <div class="bio-content">
                <h3>À propos</h3>
                <p>${talent.details}</p>
                <h3>Spécialité</h3>
                <p>${talent.description}</p>
            </div>
            <div style="margin-top:20px;">
                <a class="btn btn-primary" href="mailto:example@example.com?subject=Contact%20${encodeURIComponent(talent.name)}">Contacter ${talent.name}</a>
            </div>
        </div>
    `;
}

// Get category label with emoji
function getCategoryLabel(category) {
    const labels = {
        'art': '🎨 Art',
        'sport': '⚽ Sport',
        'tech': '💻 Technologie',
        'musique': '🎵 Musique',
        'entrepreneuriat': '💼 Entrepreneuriat'
    };
    return labels[category] || category;
}

// Setup filter buttons
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Art category redirects to dedicated page
            if (filter === 'art') {
                window.location.href = 'art-page.html';
                return;
            }
            
            // Sport category redirects to dedicated page
            if (filter === 'sport') {
                window.location.href = 'sport-page.html';
                return;
            }
            
            // Tech category redirects to dedicated page
            if (filter === 'tech') {
                window.location.href = 'tech-page.html';
                return;
            }
            
            // Music category redirects to dedicated page
            if (filter === 'musique') {
                window.location.href = 'music-page.html';
                return;
            }
            
            // Entrepreneurship category redirects to dedicated page
            if (filter === 'entrepreneuriat') {
                window.location.href = 'entrepreneurship-page.html';
                return;
            }
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = filter;
            
            if (filter === 'tous') {
                displayTalents(talents);
            } else {
                const filtered = talents.filter(t => t.category === filter);
                displayTalents(filtered);
            }
        });
    });
}

// Open talent modal
function openTalentModal(talent) {
    const modal = document.getElementById('talentModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 5rem; margin-bottom: 20px;">${talent.emoji}</div>
            <h2 style="color: #FF6B6B; margin-bottom: 10px;">${talent.name}</h2>
            <p style="font-size: 1.1rem; color: #666; margin-bottom: 10px;">${getCategoryLabel(talent.category)}</p>
            <div style="font-size: 1.2rem; margin-bottom: 20px;">${talent.rating}</div>
        </div>
        <div class="modal-info">
            <h3>À propos</h3>
            <p>${talent.details}</p>
        </div>
        <div class="modal-info">
            <h3>Spécialité</h3>
            <p>${talent.description}</p>
        </div>
        <div style="margin-top: 30px; text-align: center;">
            <button class="btn btn-primary" onclick="contactTalent('${talent.name}')">Contacter</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close talent modal
function closeTalentModal() {
    const modal = document.getElementById('talentModal');
    modal.style.display = 'none';
}

// Contact talent
function contactTalent(talentName) {
    alert(`Vous allez être redirigé pour contacter ${talentName}. Formulaire de contact à venir!`);
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci de votre intérêt! Nous allons examiner votre soumission et vous contacter bientôt.');
            this.reset();
        });
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('talentModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
