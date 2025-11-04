const flashcard = document.getElementById('flashcard');
const cardCounter = document.getElementById('cardCounter');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

let currentCard = 0;
let isAnimating = false;

const flashcards = [
    {
        question: "What is a complex ion?",
        answer: "A metal ion surrounded by coordinately bonded ligands",
        explanation: "The metal ion acts as a Lewis acid (electron pair acceptor) and ligands act as Lewis bases (electron pair donors)."
    },
    {
        question: "What is a ligand?",
        answer: "A molecule or ion that donates a pair of electrons to a central metal ion",
        explanation: "Ligands must have at least one lone pair of electrons to form a coordinate (dative covalent) bond."
    },
    {
        question: "What is meant by coordination number?",
        answer: "The number of coordinate bonds formed to the central metal ion",
        explanation: "Common coordination numbers are 2, 4, and 6. It depends on the size and charge of the metal ion and ligands."
    },
    {
        question: "Name three common monodentate ligands",
        answer: "H₂O (water), NH₃ (ammonia), Cl⁻ (chloride)",
        explanation: "Monodentate ligands donate one lone pair. Other examples include OH⁻, CN⁻, and NH₂CH₃."
    },
    {
        question: "What is a bidentate ligand? Give an example.",
        answer: "A ligand that donates two pairs of electrons. Example: ethane-1,2-diamine (NH₂CH₂CH₂NH₂) or ethanedioate (C₂O₄²⁻)",
        explanation: "Each molecule of a bidentate ligand forms two coordinate bonds using two lone pairs from different atoms."
    },
    {
        question: "What is the shape and bond angle of a complex with coordination number 6?",
        answer: "Octahedral, 90°",
        explanation: "Examples: [Fe(H₂O)₆]²⁺, [Cu(NH₃)₆]²⁺, [Co(NH₃)₆]³⁺. This is the most common coordination number."
    },
    {
        question: "What is the shape and bond angle of a complex with coordination number 4 (large ligands)?",
        answer: "Tetrahedral, 109.5°",
        explanation: "Examples: [CuCl₄]²⁻, [CoCl₄]²⁻. Forms when ligands are large or metal ion is small, causing repulsion."
    },
    {
        question: "What is the shape and bond angle of a complex with coordination number 4 (d⁸ configuration)?",
        answer: "Square planar, 90°",
        explanation: "Examples: [Ni(NH₃)₄]²⁺ (sometimes), cisplatin. Common for Pt²⁺, Pd²⁺, and some Ni²⁺ complexes."
    },
    {
        question: "What is the shape of [Ag(NH₃)₂]⁺?",
        answer: "Linear, 180°",
        explanation: "Coordination number 2. This forms when Ag⁺ reacts with excess ammonia: Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺."
    },
    {
        question: "Write the formula of the complex formed when copper(II) sulfate dissolves in water",
        answer: "[Cu(H₂O)₆]²⁺",
        explanation: "This is a blue octahedral complex. The water molecules act as ligands, donating lone pairs to Cu²⁺."
    },
    {
        question: "What is a multidentate ligand? Give an example.",
        answer: "A ligand that can donate more than two pairs of electrons. Example: EDTA⁴⁻ (can donate 6 pairs)",
        explanation: "EDTA is hexadentate. It can form six coordinate bonds using nitrogen and oxygen atoms, creating a very stable complex."
    },
    {
        question: "Why is [CoCl₄]²⁻ tetrahedral but [Co(NH₃)₆]³⁺ octahedral?",
        answer: "Cl⁻ is larger than NH₃, so only 4 Cl⁻ ions fit around Co. NH₃ is smaller, so 6 can fit.",
        explanation: "Coordination number depends on the size of ligands and the charge/size ratio of the metal ion. More charge and smaller size favor higher coordination numbers."
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
