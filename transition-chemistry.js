const flashcard = document.getElementById('flashcard');
const cardCounter = document.getElementById('cardCounter');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

let currentCard = 0;
let isAnimating = false;

const flashcards = [
    {
        question: "State the oxidation states of vanadium ions and their colors",
        answer: "+5: yellow (VO₂⁺), +4: blue (VO²⁺), +3: green (V³⁺), +2: violet (V²⁺)",
        explanation: "These can be observed in a redox titration or by reducing acidified ammonium vanadate(V) with zinc."
    },
    {
        question: "Write the equation for the reduction of VO₂⁺ to VO²⁺ using zinc",
        answer: "VO₂⁺(aq) + 2H⁺(aq) + e⁻ → VO²⁺(aq) + H₂O(l)",
        explanation: "Yellow (+5) to blue (+4). This is a one-electron reduction. Zn provides the electrons: Zn → Zn²⁺ + 2e⁻."
    },
    {
        question: "State the oxidation states and colors of manganese compounds",
        answer: "+7: purple (MnO₄⁻), +6: green (MnO₄²⁻), +4: brown (MnO₂), +2: pale pink (Mn²⁺)",
        explanation: "Manganate(VII) (KMnO₄) is a common oxidizing agent. Mn²⁺ is very pale pink and often appears colorless."
    },
    {
        question: "Write the half-equation for MnO₄⁻ in acidic conditions",
        answer: "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O",
        explanation: "Purple to colorless/pale pink. This is used in redox titrations with Fe²⁺ or C₂O₄²⁻."
    },
    {
        question: "What happens when you add NaOH to [Cu(H₂O)₆]²⁺?",
        answer: "A pale blue precipitate of Cu(OH)₂ forms",
        explanation: "Reaction: [Cu(H₂O)₆]²⁺ + 2OH⁻ → Cu(OH)₂ + 6H₂O. The precipitate is insoluble in excess NaOH."
    },
    {
        question: "What happens when you add excess NH₃ to Cu(OH)₂?",
        answer: "The precipitate dissolves to form [Cu(NH₃)₄(H₂O)₂]²⁺, a deep blue solution",
        explanation: "Ligand substitution occurs: Cu(OH)₂ + 4NH₃ + 4H₂O → [Cu(NH₃)₄(H₂O)₂]²⁺ + 2OH⁻."
    },
    {
        question: "What happens when you add concentrated HCl to [Cu(H₂O)₆]²⁺?",
        answer: "Solution changes from blue to yellow-green as [CuCl₄]²⁻ forms",
        explanation: "Ligand substitution: [Cu(H₂O)₆]²⁺ + 4Cl⁻ → [CuCl₄]²⁻ + 6H₂O. Change from octahedral to tetrahedral."
    },
    {
        question: "Write the equation for the disproportionation of Cu⁺",
        answer: "2Cu⁺(aq) → Cu²⁺(aq) + Cu(s)",
        explanation: "Cu⁺ is unstable in aqueous solution and disproportionates (oxidizes and reduces itself simultaneously)."
    },
    {
        question: "What happens when you add NaOH to [Co(H₂O)₆]²⁺?",
        answer: "A blue/blue-green precipitate of Co(OH)₂ forms, which turns pink on standing",
        explanation: "Co(OH)₂ is slowly oxidized by air to Co(OH)₃. Reaction: [Co(H₂O)₆]²⁺ + 2OH⁻ → Co(OH)₂ + 6H₂O."
    },
    {
        question: "What happens when you add excess NH₃ to Co(OH)₂?",
        answer: "Forms [Co(NH₃)₆]²⁺ (straw-colored), which oxidizes in air to [Co(NH₃)₆]³⁺ (brown)",
        explanation: "O₂ from air oxidizes Co²⁺ to Co³⁺. The Co³⁺ complex is more stable with NH₃ ligands than H₂O."
    },
    {
        question: "State the common oxidation states of chromium and their colors",
        answer: "+6: orange (Cr₂O₇²⁻) or yellow (CrO₄²⁻), +3: green ([Cr(H₂O)₆]³⁺ or [Cr(OH)₆]³⁻)",
        explanation: "Dichromate(VI) is used in acidic oxidizing reactions. Cr³⁺ is stable and forms green complexes."
    },
    {
        question: "Write the half-equation for Cr₂O₇²⁻ in acidic conditions",
        answer: "Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O",
        explanation: "Orange to green. Used in redox titrations and as an oxidizing agent in organic chemistry."
    },
    {
        question: "What happens when you add NaOH to [Cr(H₂O)₆]³⁺?",
        answer: "A grey-green precipitate of Cr(OH)₃ forms, which dissolves in excess NaOH to form [Cr(OH)₆]³⁻ (dark green)",
        explanation: "Cr(OH)₃ is amphoteric. Reaction: [Cr(H₂O)₆]³⁺ + 3OH⁻ → Cr(OH)₃ + 6H₂O, then Cr(OH)₃ + 3OH⁻ → [Cr(OH)₆]³⁻."
    },
    {
        question: "How is silver(I) oxide formed and what does it do on warming?",
        answer: "Add NaOH to Ag⁺ to form Ag₂O (brown precipitate). On warming, it acts as an oxidizing agent",
        explanation: "2Ag⁺ + 2OH⁻ → Ag₂O + H₂O. Ag₂O is used in Tollens' reagent to oxidize aldehydes to carboxylic acids."
    },
    {
        question: "What is the test for halide ions using silver nitrate?",
        answer: "Add AgNO₃(aq): Cl⁻ gives white ppt, Br⁻ gives cream ppt, I⁻ gives yellow ppt",
        explanation: "AgCl is white, AgBr is cream, AgI is yellow. Solubility test: AgCl dissolves in dilute NH₃, AgBr in concentrated NH₃, AgI doesn't dissolve."
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
