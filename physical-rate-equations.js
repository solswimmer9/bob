// Rate Equations Flashcards with Spaced Repetition
const rateEquationsFlashcards = [
  {
    id: 41,
    question: "What is the rate equation?",
    answer: "Rate = k[A]ᵐ[B]ⁿ",
    explanation: "Where k is the rate constant, and m and n are the orders with respect to reactants A and B"
  },
  {
    id: 42,
    question: "What is a zero order reaction?",
    answer: "A reaction where the rate is independent of the concentration of that reactant",
    explanation: "Changing the concentration has no effect on rate."
  },
  {
    id: 43,
    question: "What is the Arrhenius equation?",
    answer: "k = Ae^(-Ea/RT)",
    explanation: "k = rate constant, A = Arrhenius constant, Ea = activation energy, R = gas constant, T = temperature"
  },
  {
    id: 44,
    question: "What is the half-life of a first-order reaction?",
    answer: "The time taken for the concentration to decrease to half its initial value",
    explanation: "For first order reactions, half-life is constant and independent of concentration."
  },
  {
    id: 45,
    question: "How do you determine reaction order experimentally?",
    answer: "Use initial rates method by varying concentration of one reactant while keeping others constant",
    explanation: "Plot graphs to determine the relationship between rate and concentration."
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('physicalRateEquationsProgress', rateEquationsFlashcards);
