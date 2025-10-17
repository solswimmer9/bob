// Amount of Substance Flashcards with Spaced Repetition
const amountFlashcards = [
  {
    id: 6,
    question: "What is Avogadro's constant?",
    answer: "6.02 × 10²³ mol⁻¹",
    explanation: "This is the number of particles in one mole of substance."
  },
  {
    id: 7,
    question: "What is the ideal gas equation?",
    answer: "PV = nRT",
    explanation: "P = pressure (Pa), V = volume (m³), n = moles, R = 8.314 J K⁻¹ mol⁻¹, T = temperature (K)"
  },
  {
    id: 8,
    question: "What is the formula for percentage yield?",
    answer: "(Actual yield / Theoretical yield) × 100",
    explanation: "Percentage yield is always less than 100% due to practical losses."
  },
  {
    id: 9,
    question: "What is the concentration formula?",
    answer: "Concentration (mol dm⁻³) = moles / volume (dm³)",
    explanation: "Also written as c = n/V"
  },
  {
    id: 10,
    question: "What is the empirical formula?",
    answer: "The simplest whole number ratio of atoms of each element in a compound",
    explanation: "For example, C₂H₆ has empirical formula CH₃"
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('physicalAmountProgress', amountFlashcards);
