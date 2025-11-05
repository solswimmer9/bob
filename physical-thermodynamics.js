// Thermodynamics Flashcards with Spaced Repetition
const thermodynamicsFlashcards = [
  {
    id: 36,
    question: "What is entropy?",
    answer: "A measure of the disorder or randomness of a system",
    explanation: "Entropy increases when solids melt, liquids boil, or gases are formed."
  },
  {
    id: 37,
    question: "What is the formula for free energy change?",
    answer: "ΔG = ΔH - TΔS",
    explanation: "ΔG = Gibbs free energy, ΔH = enthalpy change, T = temperature (K), ΔS = entropy change"
  },
  {
    id: 38,
    question: "When is a reaction spontaneous?",
    answer: "When ΔG is negative",
    explanation: "This means the reaction is thermodynamically feasible."
  },
  {
    id: 39,
    question: "What are the units of entropy?",
    answer: "J K⁻¹ mol⁻¹",
    explanation: "Unlike enthalpy which is measured in kJ mol⁻¹"
  },
  {
    id: 40,
    question: "What happens to entropy when a gas is formed from a liquid?",
    answer: "Entropy increases (positive ΔS)",
    explanation: "Gas particles are more disordered than liquid particles."
  }
];

// Initialize flashcards using Firebase spaced repetition system
initializeFirebaseFlashcards('thermodynamics', thermodynamicsFlashcards);
