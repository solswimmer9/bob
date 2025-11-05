// NMR Spectroscopy Flashcards with Spaced Repetition
const nmrFlashcards = [
  {
    id: 1,
    question: "What are the two main types of NMR spectroscopy?",
    answer: "¹³C NMR and ¹H (proton) NMR",
    diagram: ""
  },
  {
    id: 2,
    question: "What percentage of carbon in organic molecules is ¹³C?",
    answer: "Around 1%",
    diagram: ""
  },
  {
    id: 3,
    question: "How many peaks appear in a ¹³C NMR spectrum?",
    answer: "One peak for each set of equivalent carbon atoms",
    diagram: ""
  },
  {
    id: 4,
    question: "How many peaks would propanone (CH₃COCH₃) show in ¹³C NMR?",
    answer: "2 peaks (the two CH₃ groups are equivalent)",
    diagram: `
    O
    ‖
H₃C—C—CH₃
 a    a
    `
  },
  {
    id: 5,
    question: "In ¹H NMR, what does the integration value represent?",
    answer: "The number of equivalent hydrogen atoms",
    diagram: ""
  },
  {
    id: 6,
    question: "How many signals would ethanol (CH₃CH₂OH) show in ¹H NMR?",
    answer: "3 signals (one for each set of equivalent hydrogens)",
    diagram: ""
  },
  {
    id: 7,
    question: "Why are solvents like CCl₄ and CDCl₃ used in NMR?",
    answer: "They contain no ¹H atoms, so won't give peaks in ¹H NMR spectrum",
    diagram: ""
  },
  {
    id: 8,
    question: "What is TMS and why is it used in NMR?",
    answer: "Tetramethylsilane - used to calibrate the spectrum as it gives one signal away from other signals",
    diagram: `Si(CH₃)₄`
  },
  {
    id: 9,
    question: "What does δ (delta) represent in NMR?",
    answer: "Chemical shift in parts per million (ppm) - how far the signal has shifted from TMS",
    diagram: ""
  },
  {
    id: 10,
    question: "What is the ¹³C NMR chemical shift range for C=O in esters/acids?",
    answer: "160-185 ppm",
    diagram: ""
  },
  {
    id: 11,
    question: "What is the ¹³C NMR chemical shift range for C-O (alcohols, esters, ethers)?",
    answer: "50-90 ppm",
    diagram: ""
  },
  {
    id: 12,
    question: "What is the ¹H NMR chemical shift range for R-OH (alcohols)?",
    answer: "0.5-5.0 ppm",
    diagram: ""
  },
  {
    id: 13,
    question: "What is the ¹H NMR chemical shift range for R-CO-O-H (carboxylic acids)?",
    answer: "10.0-12.0 ppm",
    diagram: ""
  },
  {
    id: 14,
    question: "What affects the chemical shift (δ) value in ¹H NMR?",
    answer: "The electronegativity of nearby atoms/groups - more electronegative groups give greater shift",
    diagram: ""
  },
  {
    id: 15,
    question: "What is the n+1 rule for spin-spin coupling?",
    answer: "Splitting of peak = number of inequivalent H's on neighbouring C atoms + 1",
    diagram: ""
  },
  {
    id: 16,
    question: "How many peaks would a hydrogen show if it has 2 equivalent hydrogens on the neighbouring carbon?",
    answer: "3 peaks (triplet) - using n+1 rule: 2+1=3",
    diagram: ""
  },
  {
    id: 17,
    question: "How many peaks would a hydrogen show if it has 3 equivalent hydrogens on the neighbouring carbon?",
    answer: "4 peaks (quartet) - using n+1 rule: 3+1=4",
    diagram: ""
  },
  {
    id: 18,
    question: "What is the relative peak height ratio for a triplet?",
    answer: "1:2:1",
    diagram: ""
  },
  {
    id: 19,
    question: "What is the relative peak height ratio for a quartet?",
    answer: "1:3:3:1",
    diagram: ""
  },
  {
    id: 20,
    question: "Do hydrogens bonded to oxygen or nitrogen usually show spin-spin coupling?",
    answer: "No - they usually appear as singlets",
    diagram: ""
  },
  {
    id: 21,
    question: "In ethanol (CH₃CH₂OH), what splitting pattern would the CH₃ group show?",
    answer: "Triplet (next to CH₂ with 2 hydrogens: 2+1=3)",
    diagram: `
H₃C—CH₂—OH
 a    b    c

Peak a: triplet
    `
  },
  {
    id: 22,
    question: "In ethanol (CH₃CH₂OH), what splitting pattern would the CH₂ group show?",
    answer: "Quartet (next to CH₃ with 3 hydrogens: 3+1=4)",
    diagram: `
H₃C—CH₂—OH
 a    b    c

Peak b: quartet
    `
  },
  {
    id: 23,
    question: "In ethanol (CH₃CH₂OH), what splitting pattern would the OH group show?",
    answer: "Singlet (H bonded to oxygen doesn't couple)",
    diagram: `
H₃C—CH₂—OH
 a    b    c

Peak c: singlet
    `
  },
  {
    id: 24,
    question: "Do nuclei in identical chemical environments show coupling with each other?",
    answer: "No - they do not show coupling amongst themselves",
    diagram: ""
  },
  {
    id: 25,
    question: "What four analytical techniques are typically combined to determine an organic structure?",
    answer: "Elemental analysis, mass spectrometry (molecular ion peak), IR spectroscopy, and NMR spectroscopy",
    diagram: ""
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('nmrProgress', nmrFlashcards);
