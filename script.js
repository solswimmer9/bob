// Flashcard UI elements
const flashcard = document.getElementById('flashcard');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cardCounter = document.getElementById('cardCounter');

// Session state
let currentCard = 0;
let isAnimating = false;

// Sample flashcard data
const flashcards = [
    {
        question: "What is the general formula for alkenes?",
        answer: "CₙH₂ₙ",
        explanation: "Alkenes are unsaturated hydrocarbons containing at least one carbon-carbon double bond."
    },
    {
        question: "What is Avogadro's constant?",
        answer: "6.022 × 10²³ mol⁻¹",
        explanation: "This represents the number of particles (atoms, molecules, ions) in one mole of a substance."
    },
    {
        question: "Define electronegativity",
        answer: "The ability of an atom to attract electrons in a covalent bond",
        explanation: "Electronegativity increases across a period and decreases down a group in the periodic table."
    },
    {
        question: "What is the ideal gas equation?",
        answer: "PV = nRT",
        explanation: "P = pressure, V = volume, n = number of moles, R = gas constant, T = temperature."
    },
    {
        question: "What is a catalyst?",
        answer: "A substance that increases the rate of reaction without being consumed",
        explanation: "Catalysts work by providing an alternative reaction pathway with lower activation energy."
    }
];

const totalCards = flashcards.length;

// Update card display with smooth animation
function updateCard(direction) {
    if (isAnimating) return;

    isAnimating = true;

    // Unflip card if it's flipped
    flashcard.classList.remove('flipped');

    // Slide out animation
    flashcard.style.animation = direction === 'next'
        ? 'slideOutLeft 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
        : 'slideOutRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';

    setTimeout(() => {
        // Update card index
        if (direction === 'next') {
            currentCard = (currentCard + 1) % totalCards;
        } else {
            currentCard = (currentCard - 1 + totalCards) % totalCards;
        }

        // Update counter
        cardCounter.textContent = `${currentCard + 1} / ${totalCards}`;

        // Update content
        const card = flashcards[currentCard];
        document.querySelector('.flashcard-front h3').textContent = card.question;
        document.querySelector('.flashcard-back h3').textContent = card.answer;
        document.querySelector('.card-explanation').textContent = card.explanation;

        // Slide in animation
        flashcard.style.animation = direction === 'next'
            ? 'slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
            : 'slideInLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';

        setTimeout(() => {
            flashcard.style.animation = '';
            isAnimating = false;
        }, 500);
    }, 400);
}

// Click to flip card
flashcard.addEventListener('click', () => {
    if (!isAnimating) {
        flashcard.classList.toggle('flipped');
    }
});

// Navigation buttons
prevBtn.addEventListener('click', () => updateCard('prev'));
nextBtn.addEventListener('click', () => updateCard('next'));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        updateCard('prev');
    } else if (e.key === 'ArrowRight') {
        updateCard('next');
    } else if (e.key === ' ') {
        e.preventDefault();
        if (!isAnimating) {
            flashcard.classList.toggle('flipped');
        }
    }
});

// Smooth scroll for CTA button
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('.demo-section').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});

// Study Tracker - Update display on home page
function updateTrackerDisplay() {
    // Check if we're on the home page with tracker elements
    const trackerCards = document.getElementById('trackerCards');
    const trackerTime = document.getElementById('trackerTime');
    const trackerAvg = document.getElementById('trackerAvg');

    if (!trackerCards || !trackerTime || !trackerAvg) return;

    // Get today's date key
    const getTodayKey = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    };

    // Load data from localStorage
    const saved = localStorage.getItem('studyTrackerData');
    let data = {};
    if (saved) {
        data = JSON.parse(saved);
    }

    const today = getTodayKey();
    const todayData = data[today] || { cards: 0, timeSpent: 0, startTime: null };

    // Calculate total time including active session
    let totalTime = todayData.timeSpent || 0;
    if (todayData.startTime) {
        totalTime += Math.floor((Date.now() - todayData.startTime) / 1000);
    }

    // Format time
    const formatTime = (seconds) => {
        if (seconds < 60) {
            return `${seconds}s`;
        }
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (minutes < 60) {
            return `${minutes}m ${secs}s`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    // Update display
    trackerCards.textContent = todayData.cards || 0;
    trackerTime.textContent = formatTime(totalTime);

    // Calculate and display average
    if (todayData.cards > 0) {
        const avgSeconds = (totalTime / todayData.cards).toFixed(1);
        trackerAvg.textContent = `${avgSeconds}s/card`;
    } else {
        trackerAvg.textContent = '0s/card';
    }
}

// Update tracker immediately and every 5 seconds
if (document.getElementById('trackerCards')) {
    updateTrackerDisplay();
    setInterval(updateTrackerDisplay, 5000);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const isPercentage = target === 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = isPercentage ? '100%' : `${Math.round(target)}+`;
            clearInterval(timer);
        } else {
            element.textContent = isPercentage ? `${Math.round(current)}%` : `${Math.round(current)}+`;
        }
    }, 16);
};

// Trigger counter animations when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            animateCounter(statNumbers[0], 250);
            animateCounter(statNumbers[1], 15);
            animateCounter(statNumbers[2], 100);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(document.querySelector('.stats-section'));

// Parallax effect for floating elements
document.addEventListener('mousemove', (e) => {
    const floatingElements = document.querySelectorAll('.float-element');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 10;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;

        element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Initialize card counter
cardCounter.textContent = `${currentCard + 1} / ${totalCards}`;
