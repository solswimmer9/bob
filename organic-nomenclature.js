// Introduction & Nomenclature Flashcards with Spaced Repetition
const nomenclatureFlashcards = [
  {
    id: 1,
    question: "What is the general formula for alkanes?",
    answer: "CₙH₂ₙ₊₂",
    explanation: "Alkanes are saturated hydrocarbons with single bonds only. Each carbon forms 4 bonds."
  },
  {
    id: 2,
    question: "What is the general formula for alkenes?",
    answer: "CₙH₂ₙ",
    explanation: "Alkenes are unsaturated hydrocarbons containing at least one C=C double bond."
  },
  {
    id: 3,
    question: "What are structural isomers?",
    answer: "Compounds with the same molecular formula but different structural arrangements",
    explanation: "Examples include chain isomers, positional isomers, and functional group isomers."
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('nomenclatureProgress', nomenclatureFlashcards);
