const flashcard = document.getElementById('flashcard');
const cardCounter = document.getElementById('cardCounter');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

let currentCard = 0;
let isAnimating = false;

const flashcards = [
    {
        question: "Why are transition metals good catalysts?",
        answer: "They can change oxidation states easily, have variable oxidation states, and can adsorb molecules onto their surface",
        explanation: "The partially filled d orbitals allow them to form temporary bonds with reactants and provide alternative reaction pathways with lower activation energy."
    },
    {
        question: "What is a heterogeneous catalyst?",
        answer: "A catalyst in a different phase (state) from the reactants",
        explanation: "Usually a solid catalyst with gaseous or liquid reactants. Examples: Fe in Haber process, Ni in hydrogenation."
    },
    {
        question: "What is a homogeneous catalyst?",
        answer: "A catalyst in the same phase (state) as the reactants",
        explanation: "Usually all in aqueous solution or all gases. Examples: Fe²⁺/Fe³⁺ in reactions, MnO₂ decomposing H₂O₂."
    },
    {
        question: "Describe the mechanism of heterogeneous catalysis (4 steps)",
        answer: "1. Adsorption of reactants onto surface, 2. Bonds weaken, 3. Reaction occurs, 4. Desorption of products",
        explanation: "Reactant molecules stick to the catalyst surface (adsorption), bonds break/weaken, new bonds form, products leave (desorption). The catalyst surface is regenerated."
    },
    {
        question: "Give an example of heterogeneous catalysis: Haber process",
        answer: "Iron catalyst: N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
        explanation: "N₂ and H₂ adsorb onto Fe surface, N≡N and H-H bonds weaken, N-H bonds form, NH₃ desorbs. Temperature: 450°C, Pressure: 200 atm."
    },
    {
        question: "Give an example of heterogeneous catalysis: Contact process",
        answer: "Vanadium(V) oxide catalyst: 2SO₂(g) + O₂(g) → 2SO₃(g)",
        explanation: "V₂O₅ catalyzes the oxidation of SO₂ to SO₃ in the manufacture of sulfuric acid. Temperature: 450°C."
    },
    {
        question: "Give an example of heterogeneous catalysis: hydrogenation",
        answer: "Nickel catalyst: alkene + H₂ → alkane (e.g., C₂H₄ + H₂ → C₂H₆)",
        explanation: "Used to convert vegetable oils (unsaturated) to margarine (saturated). Also uses Pt or Pd catalysts. H₂ and alkene adsorb onto Ni surface."
    },
    {
        question: "Give an example of homogeneous catalysis: Fe²⁺/Fe³⁺ catalyzing S₂O₈²⁻ + 2I⁻",
        answer: "2Fe²⁺ + S₂O₈²⁻ → 2Fe³⁺ + 2SO₄²⁻, then 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂",
        explanation: "Fe²⁺ is oxidized to Fe³⁺, then reduced back to Fe²⁺. The catalyst provides a lower energy pathway than the direct reaction."
    },
    {
        question: "Give an example of autocatalysis: MnO₄⁻ + C₂O₄²⁻",
        answer: "MnO₄⁻ oxidizes C₂O₄²⁻ slowly at first, but Mn²⁺ product catalyzes the reaction",
        explanation: "2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O. The reaction speeds up as Mn²⁺ accumulates (autocatalysis)."
    },
    {
        question: "Why are catalytic converters important in cars?",
        answer: "They use Pt, Pd, and Rh to convert harmful exhaust gases (CO, NOₓ, hydrocarbons) into less harmful ones (CO₂, N₂, H₂O)",
        explanation: "2CO + 2NO → 2CO₂ + N₂. Hydrocarbons are oxidized to CO₂ and H₂O. This reduces air pollution from vehicle emissions."
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
