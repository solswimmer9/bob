// Chemical Equilibria Flashcards with Spaced Repetition
const equilibriaFlashcards = [
  {
    id: 26,
    question: "What is Le Chatelier's Principle?",
    answer: "If a system at equilibrium is disturbed, the equilibrium shifts to oppose the change",
    explanation: "This applies to changes in concentration, pressure, and temperature."
  },
  {
    id: 27,
    question: "What is the effect of a catalyst on equilibrium position?",
    answer: "No effect - it speeds up both forward and backward reactions equally",
    explanation: "However, it does allow equilibrium to be reached faster."
  },
  {
    id: 28,
    question: "What happens to equilibrium position if you increase pressure in a gaseous equilibrium?",
    answer: "The equilibrium shifts to the side with fewer moles of gas",
    explanation: "This opposes the increase in pressure."
  },
  {
    id: 29,
    question: "What is a dynamic equilibrium?",
    answer: "The forward and backward reactions occur at equal rates, and concentrations remain constant",
    explanation: "It can only occur in a closed system."
  },
  {
    id: 30,
    question: "What is the expression for Kc?",
    answer: "Kc = [products]ⁿ / [reactants]ᵐ",
    explanation: "Where n and m are the stoichiometric coefficients. Pure solids and liquids are omitted."
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('physicalEquilibriaProgress', equilibriaFlashcards);
