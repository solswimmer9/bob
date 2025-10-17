// Bonding Flashcards with Spaced Repetition
const bondingFlashcards = [
  {
    id: 11,
    question: "What is electronegativity?",
    answer: "The ability of an atom to attract the bonding pair of electrons in a covalent bond",
    explanation: "Fluorine is the most electronegative element with a value of 4.0 on the Pauling scale."
  },
  {
    id: 12,
    question: "What is the shape and bond angle of CH₄?",
    answer: "Tetrahedral, 109.5°",
    explanation: "Methane has 4 bonding pairs and no lone pairs around the central carbon."
  },
  {
    id: 13,
    question: "What is the shape and bond angle of NH₃?",
    answer: "Trigonal pyramidal, 107°",
    explanation: "Ammonia has 3 bonding pairs and 1 lone pair, which reduces the bond angle."
  },
  {
    id: 14,
    question: "What is a metallic bond?",
    answer: "The electrostatic attraction between positive metal ions and delocalized electrons",
    explanation: "This explains why metals conduct electricity and are malleable."
  },
  {
    id: 15,
    question: "What type of intermolecular force is hydrogen bonding?",
    answer: "A special type of permanent dipole-dipole interaction",
    explanation: "Occurs between H and N, O, or F atoms."
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('physicalBondingProgress', bondingFlashcards);
