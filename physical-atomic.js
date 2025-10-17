// Electronic Structure & Ionisation Energies Flashcards with Spaced Repetition
const chemFlashcards = [
  {
    id: 1,
    question: "What did Bohr's model propose about electron energies?",
    answer: "Electrons have fixed, quantised energy levels.",
    explanation: "Bohr suggested electrons orbit the nucleus at specific energies, explaining emission spectra."
  },
  {
    id: 2,
    question: "What evidence supports Bohr’s model of the atom?",
    answer: "Line emission spectra of elements.",
    explanation: "Each element produces discrete spectral lines, showing electrons exist in fixed energy levels."
  },
  {
    id: 3,
    question: "What happens when an electron moves to a higher energy level?",
    answer: "It absorbs a specific amount of energy.",
    explanation: "The absorbed energy equals the energy difference between levels (ΔE = hv)."
  },
  {
    id: 4,
    question: "What equation links energy and frequency in electron transitions?",
    answer: "ΔE = hν",
    explanation: "Planck’s equation links photon energy to its frequency (h = 6.63 × 10⁻³⁴ J s)."
  },
  {
    id: 5,
    question: "What is meant by the term 'convergence limit' in a spectrum?",
    answer: "Where spectral lines merge into a continuum.",
    explanation: "At this point, electrons are being ionised from the atom (removed completely)."
  },
  {
    id: 6,
    question: "What are sub-shells?",
    answer: "Divisions within electron shells labelled s, p, d, and f.",
    explanation: "They explain extra spectral lines seen beyond hydrogen’s simple pattern."
  },
  {
    id: 7,
    question: "How many electrons can each sub-shell hold?",
    answer: "s: 2, p: 6, d: 10, f: 14."
  },
  {
    id: 8,
    question: "What is the order of sub-shell filling by energy?",
    answer: "1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p.",
    explanation: "Electrons fill the lowest available energy sub-shells first (Aufbau principle)."
  },
  {
    id: 9,
    question: "What does Hund’s Rule state?",
    answer: "Electrons fill degenerate orbitals singly before pairing.",
    explanation: "This minimises electron–electron repulsion within a sub-shell."
  },
  {
    id: 10,
    question: "What is the Pauli Exclusion Principle?",
    answer: "No two electrons in an atom can have the same set of quantum numbers.",
    explanation: "Hence, each orbital can hold only two electrons of opposite spin."
  },
  {
    id: 11,
    question: "Which orbitals are spherical in shape?",
    answer: "s orbitals."
  },
  {
    id: 12,
    question: "Which orbitals are dumbbell-shaped?",
    answer: "p orbitals."
  },
  {
    id: 13,
    question: "Who proposed wave–particle duality for electrons?",
    answer: "Louis de Broglie in 1924."
  },
  {
    id: 14,
    question: "What is Heisenberg’s Uncertainty Principle?",
    answer: "It is impossible to know both an electron’s position and velocity simultaneously."
  },
  {
    id: 15,
    question: "What did Schrödinger contribute to atomic theory?",
    answer: "He developed a wave equation describing electron orbitals as regions of probability."
  },
  {
    id: 16,
    question: "What determines the block an element is in on the periodic table?",
    answer: "The type of sub-shell its outer electron occupies (s, p, d, or f)."
  },
  {
    id: 17,
    question: "When forming ions, which sub-shell’s electrons are lost first in transition metals?",
    answer: "The 4s electrons are lost before 3d.",
    explanation: "Even though 4s fills first, it is higher in energy once filled."
  },
  {
    id: 18,
    question: "Why does chromium have an unusual electron configuration?",
    answer: "It has a half-filled 3d sub-shell (4s¹ 3d⁵).",
    explanation: "Half-filled sub-shells give extra stability."
  },
  {
    id: 19,
    question: "What is the first ionisation energy?",
    answer: "The energy required to remove one mole of electrons from one mole of gaseous atoms to form +1 ions.",
    explanation: "e.g. H(g) → H⁺(g) + e⁻"
  },
  {
    id: 20,
    question: "Why are all ionisation energies endothermic?",
    answer: "Energy must be supplied to overcome electrostatic attraction between nucleus and electrons."
  },
  {
    id: 21,
    question: "What three factors affect ionisation energy?",
    answer: "Nuclear charge, distance from the nucleus, and electron shielding."
  },
  {
    id: 22,
    question: "Why is the second ionisation energy always higher than the first?",
    answer: "The electron is removed from a positively charged ion with greater attraction to the remaining electrons."
  },
  {
    id: 23,
    question: "What does a large jump in successive ionisation energies indicate?",
    answer: "A new inner electron shell has been reached.",
    explanation: "It shows the element’s group on the periodic table."
  },
  {
    id: 24,
    question: "Why does ionisation energy decrease down a group?",
    answer: "Outer electrons are further from the nucleus and more shielded."
  },
  {
    id: 25,
    question: "Why does ionisation energy generally increase across a period?",
    answer: "Nuclear charge increases while shielding remains constant."
  },
  {
    id: 26,
    question: "Why is there a small drop in ionisation energy from Be to B?",
    answer: "The outer electron in B enters a higher-energy 2p sub-shell, making it easier to remove."
  },
  {
    id: 27,
    question: "Why is there a small drop in ionisation energy from N to O?",
    answer: "Oxygen’s paired electrons in a 2p orbital repel each other slightly, lowering ionisation energy."
  },
  {
    id: 28,
    question: "Which element has the highest first ionisation energy?",
    answer: "Helium.",
    explanation: "It has two electrons in the first shell with no shielding and strong nuclear attraction."
  },
  {
    id: 29,
    question: "How does ionisation energy show periodicity?",
    answer: "The repeating pattern across periods reflects repeating electron shell structures."
  },
  {
    id: 30,
    question: "Why is the first ionisation energy of rubidium lower than that of sodium?",
    answer: "Rubidium’s outer electron is in a higher principal energy level, further from the nucleus and more shielded."
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('physicalAtomicProgress', chemFlashcards);
