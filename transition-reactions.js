const flashcard = document.getElementById('flashcard');
const cardCounter = document.getElementById('cardCounter');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

let currentCard = 0;
let isAnimating = false;

const flashcards = [
    {
        question: "What is ligand substitution?",
        answer: "A reaction where one ligand in a complex is replaced by another ligand",
        explanation: "The coordination number may stay the same or change. For example, H₂O ligands can be replaced by NH₃, Cl⁻, or OH⁻."
    },
    {
        question: "Write the equation for the substitution of H₂O by NH₃ in [Cu(H₂O)₆]²⁺",
        answer: "[Cu(H₂O)₆]²⁺ + 4NH₃ → [Cu(NH₃)₄(H₂O)₂]²⁺ + 4H₂O",
        explanation: "Color change: pale blue to deep blue. Only 4 NH₃ molecules substitute because of steric factors. Coordination number stays 6."
    },
    {
        question: "Write the equation for the substitution of H₂O by Cl⁻ in [Cu(H₂O)₆]²⁺",
        answer: "[Cu(H₂O)₆]²⁺ + 4Cl⁻ → [CuCl₄]²⁻ + 6H₂O",
        explanation: "Color change: blue to yellow-green. Shape changes from octahedral to tetrahedral. Coordination number changes from 6 to 4."
    },
    {
        question: "Why do [M(H₂O)₆]³⁺ ions act as weak acids?",
        answer: "High charge density polarizes O-H bonds in water ligands, releasing H⁺ ions",
        explanation: "[M(H₂O)₆]³⁺ + H₂O ⇌ [M(H₂O)₅(OH)]²⁺ + H₃O⁺. Al³⁺, Fe³⁺, Cr³⁺ complexes have pH around 3."
    },
    {
        question: "Why are [M(H₂O)₆]³⁺ ions more acidic than [M(H₂O)₆]²⁺ ions?",
        answer: "3+ ions have higher charge density, causing greater polarization of O-H bonds",
        explanation: "Fe³⁺ (pH ~3) is more acidic than Fe²⁺ (pH ~6). Higher charge pulls electron density from O-H bonds more strongly."
    },
    {
        question: "What happens when NaOH is added to [Fe(H₂O)₆]³⁺?",
        answer: "A brown precipitate of Fe(OH)₃ forms",
        explanation: "[Fe(H₂O)₆]³⁺ + 3OH⁻ → Fe(OH)₃ + 6H₂O. The precipitate is insoluble in excess NaOH (not amphoteric)."
    },
    {
        question: "What happens when NaOH is added to [Al(H₂O)₆]³⁺?",
        answer: "A white precipitate of Al(OH)₃ forms, which dissolves in excess NaOH to form [Al(OH)₄]⁻",
        explanation: "Al(OH)₃ is amphoteric. First: [Al(H₂O)₆]³⁺ + 3OH⁻ → Al(OH)₃ + 6H₂O. Then: Al(OH)₃ + OH⁻ → [Al(OH)₄]⁻."
    },
    {
        question: "What happens when NH₃ is added to [Fe(H₂O)₆]²⁺?",
        answer: "A green precipitate of Fe(OH)₂ forms, which turns brown on standing in air",
        explanation: "NH₃ acts as a base: [Fe(H₂O)₆]²⁺ + 2OH⁻ → Fe(OH)₂ + 6H₂O. Fe(OH)₂ oxidizes to Fe(OH)₃ in air."
    },
    {
        question: "What happens when excess NH₃ is added to [Cr(H₂O)₆]³⁺?",
        answer: "A grey-green precipitate of Cr(OH)₃ forms, insoluble in excess NH₃",
        explanation: "NH₃ acts as a base (not a ligand here): [Cr(H₂O)₆]³⁺ + 3OH⁻ → Cr(OH)₃ + 6H₂O. Unlike with Cu²⁺, ligand substitution doesn't occur."
    },
    {
        question: "Write the equation for the deprotonation of [Fe(H₂O)₆]³⁺",
        answer: "[Fe(H₂O)₆]³⁺ + 3OH⁻ → Fe(OH)₃ + 6H₂O or [Fe(H₂O)₆]³⁺ → [Fe(H₂O)₃(OH)₃] + 3H⁺",
        explanation: "The OH⁻ removes H⁺ from water ligands. The precipitate can be written as Fe(OH)₃ or [Fe(H₂O)₃(OH)₃]."
    },
    {
        question: "What is the test to distinguish Fe²⁺ from Fe³⁺?",
        answer: "Add NaOH: Fe²⁺ gives green precipitate Fe(OH)₂, Fe³⁺ gives brown precipitate Fe(OH)₃",
        explanation: "Alternatively, add K₃[Fe(CN)₆]: Fe²⁺ gives Prussian blue precipitate. Add K₄[Fe(CN)₆]: Fe³⁺ gives brown precipitate."
    },
    {
        question: "Why does [Co(H₂O)₆]²⁺ form [Co(NH₃)₆]²⁺ but [Fe(H₂O)₆]²⁺ doesn't?",
        answer: "Co²⁺ undergoes ligand substitution with NH₃, but Fe²⁺ forms a precipitate instead because NH₃ acts as a base",
        explanation: "[Co(H₂O)₆]²⁺ + 6NH₃ → [Co(NH₃)₆]²⁺ + 6H₂O (straw colored). For Fe²⁺, NH₃ removes H⁺ from water ligands forming Fe(OH)₂."
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
