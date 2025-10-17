// Equilibrium Constant Flashcards with Spaced Repetition
const kcFlashcards = [
  {
    id: 46,
    question: "What is the expression for Kp?",
    answer: "Kp = (p(products))ⁿ / (p(reactants))ᵐ",
    explanation: "Where p represents partial pressure and n, m are stoichiometric coefficients"
  },
  {
    id: 47,
    question: "What are the units of Kp dependent on?",
    answer: "The overall change in number of moles of gas in the equation",
    explanation: "Units can be Pa, Pa², Pa⁻¹, or no units if moles are balanced"
  },
  {
    id: 48,
    question: "How does temperature affect Kc?",
    answer: "For exothermic reactions: increasing T decreases Kc. For endothermic reactions: increasing T increases Kc",
    explanation: "This is the only factor that changes the value of K"
  },
  {
    id: 49,
    question: "What is the mole fraction equation?",
    answer: "Mole fraction = number of moles of component / total number of moles",
    explanation: "Used to calculate partial pressures: partial pressure = mole fraction × total pressure"
  },
  {
    id: 50,
    question: "What does a large Kc value indicate?",
    answer: "Equilibrium lies towards the products (reaction goes nearly to completion)",
    explanation: "A small Kc means equilibrium favors reactants"
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('physicalKcProgress', kcFlashcards);
