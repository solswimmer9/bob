// Kinetics Flashcards with Spaced Repetition
const kineticsFlashcards = [
  {
    id: 21,
    question: "What is collision theory?",
    answer: "For a reaction to occur, particles must collide with sufficient energy (activation energy) and correct orientation",
    explanation: "Not all collisions lead to a reaction."
  },
  {
    id: 22,
    question: "How does a catalyst increase reaction rate?",
    answer: "It provides an alternative pathway with lower activation energy",
    explanation: "Catalysts are not used up in the reaction and appear in both the reactants and products."
  },
  {
    id: 23,
    question: "What is activation energy?",
    answer: "The minimum energy required for a reaction to occur",
    explanation: "Represented as Ea in the Arrhenius equation."
  },
  {
    id: 24,
    question: "How does increasing temperature affect reaction rate?",
    answer: "Particles have more kinetic energy, move faster, collide more frequently and with greater energy",
    explanation: "More particles exceed the activation energy."
  },
  {
    id: 25,
    question: "What is a Maxwell-Boltzmann distribution?",
    answer: "A graph showing the distribution of molecular energies in a gas at a given temperature",
    explanation: "The area under the curve represents the total number of molecules."
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('physicalKineticsProgress', kineticsFlashcards);
