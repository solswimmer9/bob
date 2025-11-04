// Flashcard UI elements
const flashcard = document.getElementById('flashcard');
const cardCounter = document.getElementById('cardCounter');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

// Session state
let currentCard = 0;
let isAnimating = false;

// Metal Extraction flashcard data
const flashcards = [
    {
        question: "What is an ore?",
        answer: "A rock containing enough metal to make extraction economically viable",
        explanation: "Ores contain metal compounds from which metals can be extracted profitably."
    },
    {
        question: "How does the position in the reactivity series affect extraction method?",
        answer: "More reactive metals require electrolysis; less reactive can use reduction with carbon",
        explanation: "Metals above carbon (like Al) need electrolysis. Metals below carbon (like Fe, Zn) can be reduced by carbon."
    },
    {
        question: "Write the equation for the extraction of iron in a blast furnace",
        answer: "Fe₂O₃ + 3CO → 2Fe + 3CO₂",
        explanation: "Iron(III) oxide is reduced by carbon monoxide. The carbon monoxide is produced by: C + O₂ → CO₂ then CO₂ + C → 2CO."
    },
    {
        question: "What is the role of limestone (CaCO₃) in a blast furnace?",
        answer: "Removes acidic impurities (SiO₂) by forming slag",
        explanation: "CaCO₃ → CaO + CO₂. Then CaO + SiO₂ → CaSiO₃ (slag). The slag is molten and floats on the iron."
    },
    {
        question: "Why can't carbon be used to extract aluminium from its ore?",
        answer: "Aluminium is more reactive than carbon",
        explanation: "Aluminium is high in the reactivity series, so it cannot be displaced by carbon. Electrolysis must be used instead."
    },
    {
        question: "What is the Kroll process used for?",
        answer: "Extraction of titanium from titanium(IV) chloride",
        explanation: "TiCl₄ is reduced by magnesium in an argon atmosphere: TiCl₄ + 2Mg → Ti + 2MgCl₂"
    },
    {
        question: "Why is the Kroll process expensive?",
        answer: "Batch process, high temperatures, argon atmosphere required",
        explanation: "The process uses expensive magnesium, must be done in batches under argon to prevent oxidation, and requires temperatures above 900°C."
    },
    {
        question: "Write the first step in titanium extraction (ore to TiCl₄)",
        answer: "TiO₂ + 2Cl₂ + 2C → TiCl₄ + 2CO",
        explanation: "Titanium dioxide (rutile ore) is converted to titanium(IV) chloride at 900°C. TiCl₄ is then purified by fractional distillation."
    },
    {
        question: "What is the main ore of aluminium?",
        answer: "Bauxite (Al₂O₃·xH₂O)",
        explanation: "Bauxite is purified to remove impurities before electrolysis to produce aluminium metal."
    },
    {
        question: "Why is cryolite added in aluminium extraction?",
        answer: "Lowers the melting point of Al₂O₃ from 2050°C to 950°C",
        explanation: "This saves energy and costs. Na₃AlF₆ (cryolite) acts as a solvent for aluminium oxide."
    },
    {
        question: "Write the half equation at the cathode during aluminium extraction",
        answer: "Al³⁺ + 3e⁻ → Al",
        explanation: "Aluminium ions are reduced at the negative cathode to form molten aluminium metal."
    },
    {
        question: "Why do the carbon anodes need regular replacement in aluminium extraction?",
        answer: "Oxygen reacts with carbon anodes to form CO₂",
        explanation: "At the anode: 2O²⁻ → O₂ + 4e⁻. The oxygen then reacts with carbon: C + O₂ → CO₂, gradually burning away the electrode."
    }
];

const totalCards = flashcards.length;

// Update card display with smooth animation
function updateCard(direction) {
    if (isAnimating) return;

    isAnimating = true;
    flashcard.classList.remove('flipped');

    flashcard.style.animation = direction === 'next'
        ? 'slideOutLeft 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
        : 'slideOutRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';

    setTimeout(() => {
        if (direction === 'next') {
            currentCard = (currentCard + 1) % totalCards;
        } else {
            currentCard = (currentCard - 1 + totalCards) % totalCards;
        }

        cardCounter.textContent = `Card ${currentCard + 1} of ${totalCards}`;

        const card = flashcards[currentCard];
        document.querySelector('.flashcard-front h3').textContent = card.question;
        document.querySelector('.flashcard-back h3').textContent = card.answer;
        document.querySelector('.card-explanation').textContent = card.explanation;

        flashcard.style.animation = direction === 'next'
            ? 'slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
            : 'slideInLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';

        setTimeout(() => {
            flashcard.style.animation = '';
            isAnimating = false;
        }, 500);
    }, 400);
}

// Initialize first card
function initializeCard() {
    const card = flashcards[currentCard];
    document.querySelector('.flashcard-front h3').textContent = card.question;
    document.querySelector('.flashcard-back h3').textContent = card.answer;
    document.querySelector('.card-explanation').textContent = card.explanation;
    cardCounter.textContent = `Card ${currentCard + 1} of ${totalCards}`;
}

// Click to flip card
flashcard.addEventListener('click', () => {
    if (!isAnimating) {
        flashcard.classList.toggle('flipped');
    }
});

// Difficulty button handlers
difficultyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const difficulty = e.currentTarget.getAttribute('data-difficulty');
        console.log(`Card rated as: ${difficulty}`);
        updateCard('next');
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        if (!isAnimating) {
            flashcard.classList.toggle('flipped');
        }
    } else if (e.key === '1') {
        console.log('Card rated as: hard');
        updateCard('next');
    } else if (e.key === '2') {
        console.log('Card rated as: medium');
        updateCard('next');
    } else if (e.key === '3') {
        console.log('Card rated as: easy');
        updateCard('next');
    }
});

// Initialize
initializeCard();
