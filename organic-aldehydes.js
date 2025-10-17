// Aldehydes & Ketones Flashcards with Spaced Repetition
const aldehydesFlashcards = [
  {
    id: 1,
    question: "What is the functional group in aldehydes?",
    answer: "-CHO (carbonyl group at the end of a carbon chain)",
    explanation: "Aldehydes have the carbonyl carbon bonded to at least one hydrogen atom. Formula: RCHO."
  },
  {
    id: 2,
    question: "What reagent is used to distinguish aldehydes from ketones?",
    answer: "Tollens' reagent (ammoniacal silver nitrate) or Fehling's solution",
    explanation: "Aldehydes are oxidized by these reagents (positive test), while ketones are not oxidized (negative test)."
  },
  {
    id: 3,
    question: "What mechanism do aldehydes and ketones undergo with nucleophiles like HCN?",
    answer: "Nucleophilic addition",
    explanation: "The nucleophile attacks the δ+ carbon of the C=O bond, forming a tetrahedral intermediate."
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('aldehydesProgress', aldehydesFlashcards);
