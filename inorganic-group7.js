// Flashcard UI elements
const flashcard = document.getElementById('flashcard');
const cardCounter = document.getElementById('cardCounter');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

// Session state
let currentCard = 0;
let isAnimating = false;

// Group 7 flashcard data
const flashcards = [
    {
        question: "What is the trend in electronegativity down Group 7?",
        answer: "Electronegativity decreases down the group",
        explanation: "Atomic radius increases and shielding increases, so the ability to attract electrons decreases."
    },
    {
        question: "Describe the trend in boiling point down Group 7",
        answer: "Boiling point increases down the group",
        explanation: "More electrons means stronger London forces between molecules, requiring more energy to overcome."
    },
    {
        question: "What is the color and state of chlorine at room temperature?",
        answer: "Pale green gas",
        explanation: "Cl₂ is a pale green gas with a distinctive choking smell at room temperature and pressure."
    },
    {
        question: "What is the color and state of bromine at room temperature?",
        answer: "Red-brown liquid",
        explanation: "Br₂ is a volatile red-brown liquid that produces toxic brown fumes at room temperature."
    },
    {
        question: "What is the color and state of iodine at room temperature?",
        answer: "Dark grey/black solid",
        explanation: "I₂ is a shiny grey-black solid that sublimes to produce purple vapour when heated gently."
    },
    {
        question: "What is a displacement reaction with halogens?",
        answer: "A more reactive halogen displaces a less reactive halide ion",
        explanation: "Reactivity decreases down the group (F > Cl > Br > I), so Cl₂ can displace Br⁻ or I⁻."
    },
    {
        question: "Write the equation for chlorine displacing bromide ions",
        answer: "Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂",
        explanation: "Chlorine is more reactive than bromine, so it oxidizes bromide ions to bromine. The solution turns orange/brown."
    },
    {
        question: "What happens when chlorine is added to iodide solution?",
        answer: "Solution turns brown then black; I₂ forms",
        explanation: "Cl₂ + 2I⁻ → 2Cl⁻ + I₂. Chlorine displaces iodine. The solution turns brown, then black/purple with excess iodine."
    },
    {
        question: "Describe the test for chloride ions",
        answer: "Add AgNO₃ solution; white precipitate forms",
        explanation: "Ag⁺(aq) + Cl⁻(aq) → AgCl(s). White precipitate of silver chloride forms, soluble in dilute ammonia."
    },
    {
        question: "Describe the test for bromide ions",
        answer: "Add AgNO₃ solution; cream precipitate forms",
        explanation: "Ag⁺(aq) + Br⁻(aq) → AgBr(s). Cream precipitate of silver bromide forms, soluble in concentrated ammonia."
    },
    {
        question: "Describe the test for iodide ions",
        answer: "Add AgNO₃ solution; yellow precipitate forms",
        explanation: "Ag⁺(aq) + I⁻(aq) → AgI(s). Yellow precipitate of silver iodide forms, insoluble in ammonia."
    },
    {
        question: "What is the trend in oxidizing ability down Group 7?",
        answer: "Oxidizing ability decreases down the group",
        explanation: "Halogens become less able to gain electrons down the group due to increased atomic radius and shielding."
    },
    {
        question: "Why does chlorine displace bromine from solution?",
        answer: "Chlorine is a stronger oxidizing agent than bromine",
        explanation: "Cl₂ has a greater tendency to gain electrons and form Cl⁻ ions than Br₂ has to form Br⁻ ions."
    },
    {
        question: "What is disproportionation?",
        answer: "A reaction where the same element is both oxidized and reduced",
        explanation: "In disproportionation, the oxidation state of the same element both increases and decreases."
    },
    {
        question: "Write the equation for chlorine reacting with water",
        answer: "Cl₂ + H₂O → HCl + HClO",
        explanation: "This is disproportionation: Cl goes from 0 to -1 (reduced) and 0 to +1 (oxidized). HClO is chloric(I) acid."
    },
    {
        question: "Write the equation for chlorine reacting with cold dilute NaOH",
        answer: "Cl₂ + 2NaOH → NaCl + NaClO + H₂O",
        explanation: "This is also disproportionation. It produces sodium chloride and sodium chlorate(I) (bleach)."
    },
    {
        question: "What is the use of chlorine in water treatment?",
        answer: "Chlorine kills bacteria and makes water safe to drink",
        explanation: "Cl₂ reacts with water to form HClO (chloric(I) acid), which is a powerful oxidizing agent that kills bacteria."
    },
    {
        question: "Why is chlorine more reactive than iodine?",
        answer: "Chlorine atoms attract electrons more easily",
        explanation: "Cl atoms are smaller with less shielding, so the incoming electron is closer to the nucleus and more strongly attracted."
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
