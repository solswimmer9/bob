// Reactions & Mechanisms Flashcards with Spaced Repetition
const reactionsFlashcards = [
  {
    id: 1,
    question: "What is nucleophilic substitution (SN2)?",
    answer: "A one-step mechanism where the nucleophile attacks while the leaving group departs",
    explanation: "SN2 occurs with primary halogenoalkanes. The rate depends on both the nucleophile and substrate concentration."
  },
  {
    id: 2,
    question: "What conditions are needed for electrophilic substitution in benzene?",
    answer: "Halogen carrier catalyst (e.g., AlCl₃, FeBr₃) or concentrated acid catalyst",
    explanation: "The catalyst generates the electrophile needed to attack the stable benzene ring."
  },
  {
    id: 3,
    question: "What is a radical reaction?",
    answer: "A reaction involving species with unpaired electrons, initiated by UV light or heat",
    explanation: "Free radical substitution occurs in alkanes with halogens (Cl₂, Br₂) under UV light."
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('reactionsProgress', reactionsFlashcards);
