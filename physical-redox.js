// Oxidation & Reduction Flashcards with Spaced Repetition
const redoxFlashcards = [
  {
    id: 31,
    question: "What does OIL RIG stand for?",
    answer: "Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons)",
    explanation: "A useful mnemonic for remembering redox processes."
  },
  {
    id: 32,
    question: "What is an oxidizing agent?",
    answer: "A substance that oxidizes another substance and is itself reduced",
    explanation: "It accepts electrons from the substance being oxidized."
  },
  {
    id: 33,
    question: "What is the oxidation state of oxygen in compounds?",
    answer: "Usually -2 (except in peroxides where it's -1, and in F₂O where it's +2)"
  },
  {
    id: 34,
    question: "What happens at the anode in an electrochemical cell?",
    answer: "Oxidation occurs - electrons are released",
    explanation: "The anode is the negative electrode."
  },
  {
    id: 35,
    question: "What is the formula for cell potential?",
    answer: "E°cell = E°cathode - E°anode",
    explanation: "A positive E°cell indicates a spontaneous reaction."
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('physicalRedoxProgress', redoxFlashcards);
