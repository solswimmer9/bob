// Inorganic Chemistry Flashcards with Spaced Repetition
const inorganicFlashcards = [
  {
    id: 1,
    question: "What is the trend in reactivity down Group 2?",
    answer: "Reactivity increases down the group",
    explanation: "As you go down Group 2, the atomic radius increases and ionization energy decreases, making it easier to lose electrons."
  },
  {
    id: 2,
    question: "What is the trend in reactivity down Group 7?",
    answer: "Reactivity decreases down the group",
    explanation: "As you go down Group 7, the atomic radius increases and it becomes harder to attract electrons, so reactivity decreases."
  },
  {
    id: 3,
    question: "What colour is chlorine gas?",
    answer: "Pale green/yellow"
  },
  {
    id: 4,
    question: "What is the test for halide ions?",
    answer: "Add silver nitrate solution and dilute nitric acid",
    explanation: "Chloride forms white precipitate, bromide forms cream precipitate, iodide forms yellow precipitate."
  },
  {
    id: 5,
    question: "What is a transition metal?",
    answer: "A d-block element that forms at least one stable ion with a partially filled d-subshell",
    explanation: "Transition metals have characteristic properties including variable oxidation states, colored compounds, and catalytic activity."
  },
  {
    id: 6,
    question: "Why do transition metal compounds show color?",
    answer: "Due to d-d electron transitions",
    explanation: "When ligands bond to a transition metal, the d-orbitals split. Electrons can be excited between these split d-orbitals, absorbing specific wavelengths of light."
  },
  {
    id: 7,
    question: "What is a ligand?",
    answer: "A molecule or ion that donates a pair of electrons to a central metal ion",
    explanation: "Common ligands include H₂O, NH₃, Cl⁻, and CN⁻. They form coordinate bonds with transition metals."
  },
  {
    id: 8,
    question: "What is the coordination number?",
    answer: "The number of coordinate bonds formed to a central metal ion",
    explanation: "Common coordination numbers are 6 (octahedral), 4 (tetrahedral or square planar), and 2 (linear)."
  },
  {
    id: 9,
    question: "What is the equation for thermal decomposition of Group 2 carbonates?",
    answer: "MCO₃ → MO + CO₂",
    explanation: "Group 2 carbonates decompose on heating to form metal oxide and carbon dioxide. Stability increases down the group."
  },
  {
    id: 10,
    question: "What is the trend in solubility of Group 2 hydroxides?",
    answer: "Solubility increases down the group",
    explanation: "Mg(OH)₂ is sparingly soluble, while Ba(OH)₂ is much more soluble."
  },
  {
    id: 11,
    question: "What is the test for carbonate ions?",
    answer: "Add dilute acid; if CO₂ is produced, test with limewater which turns cloudy",
    explanation: "Carbonates react with acids to produce CO₂, which turns limewater (Ca(OH)₂) cloudy by forming CaCO₃."
  },
  {
    id: 12,
    question: "What is disproportionation?",
    answer: "A reaction where the same element is both oxidized and reduced",
    explanation: "Example: Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O. Chlorine goes from 0 to -1 (reduction) and 0 to +1 (oxidation)."
  }
];

// Initialize flashcards using Firebase spaced repetition system
initializeFirebaseFlashcards('inorganic', inorganicFlashcards);
