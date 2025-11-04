// Flashcard UI elements
const flashcard = document.getElementById('flashcard');
const cardCounter = document.getElementById('cardCounter');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

// Session state
let currentCard = 0;
let isAnimating = false;

// Group 2 flashcard data
const flashcards = [
    {
        question: "What is the trend in atomic radius down Group 2?",
        answer: "Atomic radius increases down the group",
        explanation: "Each element has an additional electron shell, so the atomic radius increases despite the increased nuclear charge."
    },
    {
        question: "What is the trend in first ionization energy down Group 2?",
        answer: "First ionization energy decreases down the group",
        explanation: "The outer electrons are further from the nucleus and more shielded, so less energy is needed to remove them."
    },
    {
        question: "Describe the trend in reactivity of Group 2 metals with water",
        answer: "Reactivity increases down the group",
        explanation: "The metals lose electrons more easily as ionization energy decreases down the group, so they react more vigorously."
    },
    {
        question: "Write the equation for magnesium reacting with oxygen",
        answer: "2Mg + O₂ → 2MgO",
        explanation: "Magnesium burns with a bright white flame to form white magnesium oxide."
    },
    {
        question: "What happens when calcium reacts with water?",
        answer: "Ca + 2H₂O → Ca(OH)₂ + H₂",
        explanation: "Calcium reacts steadily with water, producing calcium hydroxide and hydrogen gas. The solution becomes alkaline."
    },
    {
        question: "What is the trend in solubility of Group 2 hydroxides?",
        answer: "Solubility increases down the group",
        explanation: "Mg(OH)₂ is sparingly soluble, while Ba(OH)₂ is much more soluble. This is why Ba(OH)₂ can be used as a base in titrations."
    },
    {
        question: "What is the trend in solubility of Group 2 sulfates?",
        answer: "Solubility decreases down the group",
        explanation: "MgSO₄ is very soluble in water, while BaSO₄ is insoluble. BaSO₄ is used in barium meals because it's insoluble."
    },
    {
        question: "Why does magnesium have a higher melting point than calcium?",
        answer: "Magnesium has stronger metallic bonding",
        explanation: "Magnesium atoms are smaller than calcium atoms, so the ions are closer to the delocalized electrons, creating stronger metallic bonds."
    },
    {
        question: "Write the equation for calcium carbonate decomposing on heating",
        answer: "CaCO₃ → CaO + CO₂",
        explanation: "This is thermal decomposition. All Group 2 carbonates decompose on heating to form the metal oxide and carbon dioxide."
    },
    {
        question: "What is the trend in thermal stability of Group 2 carbonates?",
        answer: "Thermal stability increases down the group",
        explanation: "Larger Group 2 ions polarize the carbonate ion less, making the carbonates more stable and requiring higher temperatures to decompose."
    },
    {
        question: "Describe the test for sulfate ions using barium chloride",
        answer: "Add BaCl₂ solution; white precipitate of BaSO₄ forms",
        explanation: "The ionic equation is: Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s). The white precipitate is insoluble in dilute HCl."
    },
    {
        question: "What is produced when barium reacts with water?",
        answer: "Barium hydroxide and hydrogen gas",
        explanation: "Ba + 2H₂O → Ba(OH)₂ + H₂. Barium reacts vigorously with water, and the solution formed is strongly alkaline."
    },
    {
        question: "Why is magnesium used in the extraction of titanium?",
        answer: "Magnesium is a strong reducing agent and displaces titanium",
        explanation: "In the Kroll process: TiCl₄ + 2Mg → Ti + 2MgCl₂. Magnesium is reactive enough to reduce titanium(IV) chloride."
    },
    {
        question: "What is the trend in thermal stability of Group 2 nitrates?",
        answer: "Thermal stability increases down the group",
        explanation: "Similar to carbonates, larger cations polarize the nitrate ion less, requiring higher temperatures for decomposition."
    },
    {
        question: "Describe how strontium reacts with oxygen",
        answer: "Burns to form strontium oxide: 2Sr + O₂ → 2SrO",
        explanation: "Like other Group 2 metals, strontium reacts vigorously when heated in oxygen to form the metal oxide."
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
        cardCounter.textContent = `Card ${currentCard + 1} of ${totalCards}`;

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
