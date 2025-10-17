// Energetics Flashcards with Spaced Repetition
const energeticsFlashcards = [
  {
    id: 16,
    question: "What is the definition of standard enthalpy of formation (ΔfH°)?",
    answer: "The enthalpy change when one mole of compound is formed from its elements under standard conditions",
    explanation: "Standard conditions: 298K, 100kPa, 1 mol dm⁻³ concentration"
  },
  {
    id: 17,
    question: "What is Hess's Law?",
    answer: "The enthalpy change of a reaction is independent of the route taken",
    explanation: "This allows us to calculate enthalpy changes indirectly using known values."
  },
  {
    id: 18,
    question: "What is the formula for calculating enthalpy change using bond enthalpies?",
    answer: "ΔH = Σ(bonds broken) - Σ(bonds formed)",
    explanation: "Breaking bonds is endothermic (+), forming bonds is exothermic (-)"
  },
  {
    id: 19,
    question: "What is the standard enthalpy of combustion?",
    answer: "The enthalpy change when one mole of substance is completely burned in oxygen under standard conditions"
  },
  {
    id: 20,
    question: "What is the formula Q = mcΔT used for?",
    answer: "Calculating heat energy change in calorimetry experiments",
    explanation: "Q = heat energy (J), m = mass (g), c = specific heat capacity (J g⁻¹ K⁻¹), ΔT = temperature change (K)"
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('physicalEnergeticsProgress', energeticsFlashcards);
