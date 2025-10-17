// Acids & Bases Flashcards with Spaced Repetition
const acidsFlashcards = [
  {
    id: 51,
    question: "What is the definition of pH?",
    answer: "pH = -log₁₀[H⁺]",
    explanation: "pH is a measure of hydrogen ion concentration in a solution"
  },
  {
    id: 52,
    question: "What is a Brønsted-Lowry acid?",
    answer: "A proton (H⁺) donor",
    explanation: "A Brønsted-Lowry base is a proton acceptor"
  },
  {
    id: 53,
    question: "What is the ionic product of water (Kw)?",
    answer: "Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ mol² dm⁻⁶ at 25°C",
    explanation: "At 25°C, pH of pure water is 7"
  },
  {
    id: 54,
    question: "What is a buffer solution?",
    answer: "A solution that resists changes in pH when small amounts of acid or base are added",
    explanation: "Made from a weak acid and its salt, or a weak base and its salt"
  },
  {
    id: 55,
    question: "What is the Henderson-Hasselbalch equation?",
    answer: "pH = pKa + log([A⁻]/[HA])",
    explanation: "Used to calculate the pH of buffer solutions"
  },
  {
    id: 56,
    question: "What is Ka?",
    answer: "The acid dissociation constant - a measure of the strength of a weak acid",
    explanation: "Ka = [H⁺][A⁻] / [HA]. Larger Ka means stronger acid"
  },
  {
    id: 57,
    question: "What is the equivalence point in a titration?",
    answer: "The point at which the acid and base have reacted in exact stoichiometric proportions",
    explanation: "This is not always at pH 7"
  },
  {
    id: 58,
    question: "What indicator would you use for a strong acid-weak base titration?",
    answer: "Methyl orange (pH range 3.1-4.4)",
    explanation: "The equivalence point is below pH 7, so phenolphthalein would not work"
  },
  {
    id: 59,
    question: "What is pKa?",
    answer: "pKa = -log₁₀(Ka)",
    explanation: "A lower pKa indicates a stronger acid"
  },
  {
    id: 60,
    question: "How do you calculate pH of a weak acid?",
    answer: "Use Ka = [H⁺]² / [HA], assuming [H⁺] << [HA], then pH = -log[H⁺]",
    explanation: "For weak acids, we assume minimal dissociation"
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('physicalAcidsProgress', acidsFlashcards);
