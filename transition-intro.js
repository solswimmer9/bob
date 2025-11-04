const flashcard = document.getElementById('flashcard');
const cardCounter = document.getElementById('cardCounter');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

let currentCard = 0;
let isAnimating = false;

const flashcards = [
    {
        question: "What is a transition metal?",
        answer: "A d-block element that forms at least one ion with a partially filled d orbital",
        explanation: "Scandium and zinc are not transition metals. Sc³⁺ has no d electrons [Ar], and Zn²⁺ has a full d¹⁰ subshell [Ar]3d¹⁰."
    },
    {
        question: "Write the electron configuration of Fe (iron, Z=26)",
        answer: "[Ar] 3d⁶ 4s²",
        explanation: "The 4s orbital fills before the 3d orbitals. Iron has 6 electrons in the 3d subshell."
    },
    {
        question: "Write the electron configuration of Fe²⁺",
        answer: "[Ar] 3d⁶",
        explanation: "When forming ions, electrons are lost from the 4s orbital first, then from the 3d orbitals."
    },
    {
        question: "Write the electron configuration of Cu (copper, Z=29)",
        answer: "[Ar] 3d¹⁰ 4s¹",
        explanation: "Copper is an exception. It has a half-filled 4s and full 3d subshell for extra stability."
    },
    {
        question: "Write the electron configuration of Cr (chromium, Z=24)",
        answer: "[Ar] 3d⁵ 4s¹",
        explanation: "Chromium is an exception. It has a half-filled 3d and half-filled 4s for extra stability."
    },
    {
        question: "Why is zinc not classified as a transition metal?",
        answer: "Zn²⁺ has a full d¹⁰ subshell, not partially filled",
        explanation: "Zn: [Ar]3d¹⁰4s². Zn²⁺: [Ar]3d¹⁰. The d subshell is completely filled, so it doesn't meet the definition."
    },
    {
        question: "State four characteristic properties of transition metals",
        answer: "Form colored compounds, show variable oxidation states, act as catalysts, form complex ions",
        explanation: "These properties arise from having partially filled d orbitals that can participate in bonding."
    },
    {
        question: "Why do transition metals have high melting points?",
        answer: "Strong metallic bonding due to delocalized 3d and 4s electrons",
        explanation: "More electrons are delocalized in the metallic bond, creating stronger electrostatic attraction between ions and electrons."
    },
    {
        question: "What is meant by variable oxidation states?",
        answer: "Transition metals can form ions with different charges",
        explanation: "For example, iron forms Fe²⁺ and Fe³⁺, copper forms Cu⁺ and Cu²⁺. The 3d and 4s electrons are similar in energy."
    },
    {
        question: "Why do transition metals form colored compounds?",
        answer: "d-d electron transitions absorb visible light",
        explanation: "Partially filled d orbitals allow electrons to jump between different d orbital energy levels, absorbing specific wavelengths."
    }
];

const totalCards = flashcards.length;

function updateCard(direction) {
    if (isAnimating) return;
    isAnimating = true;
    flashcard.classList.remove('flipped');
    flashcard.style.animation = direction === 'next'
        ? 'slideOutLeft 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
        : 'slideOutRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';

    setTimeout(() => {
        currentCard = direction === 'next'
            ? (currentCard + 1) % totalCards
            : (currentCard - 1 + totalCards) % totalCards;

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

function initializeCard() {
    const card = flashcards[currentCard];
    document.querySelector('.flashcard-front h3').textContent = card.question;
    document.querySelector('.flashcard-back h3').textContent = card.answer;
    document.querySelector('.card-explanation').textContent = card.explanation;
    cardCounter.textContent = `Card ${currentCard + 1} of ${totalCards}`;
}

flashcard.addEventListener('click', () => {
    if (!isAnimating) flashcard.classList.toggle('flipped');
});

difficultyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        console.log(`Card rated as: ${e.currentTarget.getAttribute('data-difficulty')}`);
        updateCard('next');
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        if (!isAnimating) flashcard.classList.toggle('flipped');
    } else if (e.key === '1') {
        updateCard('next');
    } else if (e.key === '2') {
        updateCard('next');
    } else if (e.key === '3') {
        updateCard('next');
    }
});

initializeCard();
