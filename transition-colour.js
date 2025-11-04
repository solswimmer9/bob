const flashcard = document.getElementById('flashcard');
const cardCounter = document.getElementById('cardCounter');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

let currentCard = 0;
let isAnimating = false;

const flashcards = [
    {
        question: "Why are transition metal complexes colored?",
        answer: "Partially filled d orbitals allow d-d electron transitions that absorb visible light",
        explanation: "When ligands bond to the metal ion, they split the d orbitals into different energy levels. Electrons can jump between these levels, absorbing specific wavelengths of light."
    },
    {
        question: "What is d orbital splitting?",
        answer: "Ligands cause d orbitals to split into different energy levels",
        explanation: "In an isolated metal ion, all five d orbitals have the same energy. When ligands approach, electrostatic repulsion splits them into higher and lower energy groups."
    },
    {
        question: "What happens when white light hits a colored complex?",
        answer: "The complex absorbs certain wavelengths and transmits/reflects the complementary color",
        explanation: "For example, [Cu(H₂O)₆]²⁺ absorbs red/orange light and appears blue (complementary color)."
    },
    {
        question: "What is the complementary color of red?",
        answer: "Green",
        explanation: "Complementary color pairs: Red-Green, Orange-Blue, Yellow-Violet. If red is absorbed, green is observed."
    },
    {
        question: "Why is [Cu(H₂O)₆]²⁺ blue?",
        answer: "It absorbs red/orange light, so the complementary color (blue) is transmitted",
        explanation: "The d⁹ configuration of Cu²⁺ allows d-d transitions. The energy gap corresponds to red/orange wavelengths."
    },
    {
        question: "Why are Sc³⁺ and Zn²⁺ compounds colorless?",
        answer: "Sc³⁺ has no d electrons (d⁰) and Zn²⁺ has a full d¹⁰ subshell - no d-d transitions possible",
        explanation: "Without partially filled d orbitals, no d-d transitions can occur, so no visible light is absorbed."
    },
    {
        question: "How does changing the ligand affect the color of a complex?",
        answer: "Different ligands cause different amounts of d orbital splitting, changing the energy gap and color",
        explanation: "The spectrochemical series orders ligands by splitting strength: I⁻ < Br⁻ < Cl⁻ < H₂O < NH₃ < CN⁻. Stronger splitting = larger energy gap = different color."
    },
    {
        question: "How does changing the oxidation state affect color?",
        answer: "Higher oxidation states cause more d orbital splitting, changing the energy gap and color",
        explanation: "For example, Fe²⁺ compounds are pale green, but Fe³⁺ compounds are yellow/brown due to increased splitting."
    },
    {
        question: "How does changing the coordination number affect color?",
        answer: "Different shapes cause different d orbital splitting patterns, changing the color",
        explanation: "For example, [Cu(H₂O)₆]²⁺ is blue (octahedral), but [CuCl₄]²⁻ is yellow-green (tetrahedral)."
    },
    {
        question: "Why is [CuCl₄]²⁻ yellow-green but [Cu(H₂O)₆]²⁺ blue?",
        answer: "Tetrahedral complexes have smaller d orbital splitting than octahedral, so lower energy (longer wavelength) light is absorbed",
        explanation: "Tetrahedral splitting is approximately 4/9 of octahedral splitting. [CuCl₄]²⁻ absorbs blue/violet light, appearing yellow-green."
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
