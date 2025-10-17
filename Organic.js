// Organic Chemistry Flashcards with Spaced Repetition
const organicFlashcards = [
  {
    id: 1,
    question: "What is the functional group in alcohols?",
    answer: "-OH (hydroxyl group)"
  },
  {
    id: 2,
    question: "What type of reaction forms alkenes from alkanes?",
    answer: "Elimination reaction"
  },
  {
    id: 3,
    question: "What is the general formula of an alkane?",
    answer: "CₙH₂ₙ₊₂"
  },
  {
    id: 4,
    question: "What catalyst is used in the hydrogenation of alkenes?",
    answer: "Nickel (Ni) catalyst"
  },
  {
    id: 5,
    question: "What is the general formula for alkenes?",
    answer: "CₙH₂ₙ",
    explanation: "Alkenes are unsaturated hydrocarbons containing at least one carbon-carbon double bond."
  },
  {
    id: 6,
    question: "What is the functional group in carboxylic acids?",
    answer: "-COOH (carboxyl group)"
  },
  {
    id: 7,
    question: "What is an electrophile?",
    answer: "An electron-deficient species that accepts an electron pair"
  },
  {
    id: 8,
    question: "What is Markovnikov's rule?",
    answer: "In addition reactions, the hydrogen attaches to the carbon with more hydrogens already present",
    explanation: "This rule helps predict the major product in electrophilic addition reactions to asymmetric alkenes."
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('organicChemistryProgress', organicFlashcards);
