// Carboxylic Acids & Derivatives Flashcards with Spaced Repetition
const carboxylicAcidFlashcards = [
  {
    id: 1,
    question: "Why are smaller carboxylic acids (up to C4) soluble in water?",
    answer: "They can form hydrogen bonds with water molecules"
  },
  {
    id: 2,
    question: "Write the equation for the partial dissociation of ethanoic acid in water.",
    answer: "CH₃CO₂H(aq) ⇌ CH₃CO₂⁻(aq) + H⁺(aq)"
  },
  {
    id: 3,
    question: "Why are carboxylic acid salts more stable than undissociated carboxylic acids?",
    answer: "The negative charge is delocalised across both oxygen atoms"
  },
  {
    id: 4,
    question: "What structural feature makes the carboxylate ion have equal C-O bond lengths?",
    answer: "Delocalisation of the pi electron system"
  },
  {
    id: 5,
    question: "Why is propanoic acid less acidic than ethanoic acid?",
    answer: "The longer alkyl chain pushes more electron density onto the COO⁻ ion, making it less stable"
  },
  {
    id: 6,
    question: "Why is chloroethanoic acid more acidic than ethanoic acid?",
    answer: "The electronegative chlorine atom withdraws electron density from the COO⁻ ion, making it more stable"
  },
  {
    id: 7,
    question: "Why is no number needed when naming simple carboxylic acids like propanoic acid?",
    answer: "The carboxylic acid group must always be at the end of the carbon chain"
  },
  {
    id: 8,
    question: "What is the name of a compound with carboxylic acid groups on both ends of a two-carbon chain?",
    answer: "Ethanedioic acid"
  },
  {
    id: 9,
    question: "Write the equation for the esterification of ethanoic acid with ethanol.",
    answer: "CH₃CO₂H + CH₃CH₂OH ⇌ CH₃CO₂CH₂CH₃ + H₂O (with H⁺ catalyst and heat)"
  },
  {
    id: 10,
    question: "What conditions are required for esterification of carboxylic acids with alcohols?",
    answer: "Heat under reflux with a strong acid catalyst (H₂SO₄)"
  },
  {
    id: 11,
    question: "In the ester name 'methyl propanoate', which part comes from the alcohol?",
    answer: "Methyl (the part ending in -yl, next to the single-bonded oxygen)"
  },
  {
    id: 12,
    question: "In the ester name 'ethyl ethanoate', which part comes from the carboxylic acid?",
    answer: "Ethanoate (the part ending in -anoate, including the C=O carbon)"
  },
  {
    id: 13,
    question: "Why are esters suitable for use in perfumes?",
    answer: "They are non-toxic, volatile, soluble in solvents like ethanol, and do not react with water"
  },
  {
    id: 14,
    question: "Why do esters have lower boiling points than the carboxylic acids they are derived from?",
    answer: "Esters cannot form hydrogen bonds (no H bonded to highly electronegative atom)"
  },
  {
    id: 15,
    question: "What is the role of plasticisers in polymers?",
    answer: "They allow polymer chains to move more easily over each other, increasing flexibility"
  },
  {
    id: 16,
    question: "Why can methanoic acid be oxidised when other carboxylic acids cannot?",
    answer: "Its structure has effectively an aldehyde group"
  },
  {
    id: 17,
    question: "What product is formed when methanoic acid is oxidised?",
    answer: "Carbonic acid (H₂CO₃) which decomposes to CO₂"
  },
  {
    id: 18,
    question: "Write the equation for the reaction of ethanoic acid with sodium metal.",
    answer: "2CH₃CO₂H + 2Na → 2CH₃CO₂⁻Na⁺ + H₂"
  },
  {
    id: 19,
    question: "Write the equation for the reaction of ethanoic acid with sodium hydroxide.",
    answer: "CH₃CO₂H + NaOH → CH₃CO₂⁻Na⁺ + H₂O"
  },
  {
    id: 20,
    question: "Write the equation for the reaction of ethanoic acid with sodium carbonate.",
    answer: "2CH₃CO₂H + Na₂CO₃ → 2CH₃CO₂⁻Na⁺ + H₂O + CO₂"
  },
  {
    id: 21,
    question: "What is the functional group test for carboxylic acids?",
    answer: "Effervescence (CO₂ production) with solid Na₂CO₃ or aqueous NaHCO₃"
  },
  {
    id: 22,
    question: "What products are formed when an ester is hydrolysed with dilute acid?",
    answer: "A carboxylic acid and an alcohol"
  },
  {
    id: 23,
    question: "What are the conditions for acid hydrolysis of esters?",
    answer: "Dilute acid (HCl) and heat under reflux"
  },
  {
    id: 24,
    question: "Why does acid hydrolysis of esters not give a good yield?",
    answer: "The reaction is reversible"
  },
  {
    id: 25,
    question: "What products are formed when an ester is hydrolysed with sodium hydroxide?",
    answer: "A carboxylic acid salt (carboxylate ion) and an alcohol"
  },
  {
    id: 26,
    question: "What are the conditions for alkaline hydrolysis of esters?",
    answer: "Dilute sodium hydroxide and heat under reflux"
  },
  {
    id: 27,
    question: "Why does alkaline hydrolysis of esters go to completion?",
    answer: "The carboxylate anion is resistant to attack by weak nucleophiles like alcohols, so the reaction is not reversible"
  },
  {
    id: 28,
    question: "Write the equation for alkaline hydrolysis of methyl propanoate.",
    answer: "CH₃CH₂CO₂CH₃ + NaOH → CH₃CH₂CO₂⁻Na⁺ + CH₃OH"
  },
  {
    id: 29,
    question: "How can a carboxylic acid salt be converted to the carboxylic acid form?",
    answer: "Add a strong acid such as hydrochloric acid"
  },
  {
    id: 30,
    question: "Why is sodium benzoate soluble in water but benzoic acid is not?",
    answer: "Sodium benzoate is ionic; benzoic acid has a large non-polar benzene ring that outweighs the polar COOH group"
  },
  {
    id: 31,
    question: "What are fats and oils chemically?",
    answer: "Esters of glycerol (propane-1,2,3-triol) and long chain carboxylic acids (fatty acids)"
  },
  {
    id: 32,
    question: "What products are formed when fats are hydrolysed with potassium hydroxide?",
    answer: "Glycerol (propane-1,2,3-triol), soap (potassium salts of long chain fatty acids)"
  },
  {
    id: 33,
    question: "Why do long chain carboxylic acids act as soaps?",
    answer: "The polar CO₂⁻ end is hydrophilic (mixes with water) and the long non-polar chain is hydrophobic (mixes with grease)"
  },
  {
    id: 34,
    question: "Why is glycerol (propane-1,2,3-triol) readily soluble in water?",
    answer: "It has three OH groups that can form hydrogen bonds very easily"
  },
  {
    id: 35,
    question: "What is biodiesel chemically?",
    answer: "A mixture of methyl esters of long chain carboxylic acids"
  },
  {
    id: 36,
    question: "What are the reagents and conditions for producing biodiesel from vegetable oils?",
    answer: "Methanol and a strong alkali catalyst"
  },
  {
    id: 37,
    question: "Why might biodiesel not be truly carbon-neutral?",
    answer: "Energy from fossil fuels may be used to irrigate plants, extract oil, heat the reaction mixture, or process the fuel"
  },
  {
    id: 38,
    question: "What functional group is present in acyl chlorides?",
    answer: "COCl (carbonyl with chlorine attached)"
  },
  {
    id: 39,
    question: "What is the name of CH₃COCl?",
    answer: "Ethanoyl chloride"
  },
  {
    id: 40,
    question: "What is the structure of ethanoic anhydride?",
    answer: "CH₃CO-O-COCH₃ (two acyl groups joined by an oxygen)"
  },
  {
    id: 41,
    question: "Why are acyl chlorides and acid anhydrides much more reactive than carboxylic acids?",
    answer: "The Cl and -OCOCH₃ groups are good leaving groups"
  },
  {
    id: 42,
    question: "What are the products when ethanoyl chloride reacts with water?",
    answer: "Ethanoic acid and HCl gas"
  },
  {
    id: 43,
    question: "What observation is seen when acyl chlorides react with water?",
    answer: "Steamy white fumes of HCl gas"
  },
  {
    id: 44,
    question: "What are the products when ethanoic anhydride reacts with water?",
    answer: "Two molecules of ethanoic acid"
  },
  {
    id: 45,
    question: "What conditions are needed for the reaction of acyl chlorides with water?",
    answer: "Room temperature"
  },
  {
    id: 46,
    question: "What are the products when ethanoyl chloride reacts with ethanol?",
    answer: "Ethyl ethanoate (ester) and HCl gas"
  },
  {
    id: 47,
    question: "Why is esterification using acyl chlorides better than using carboxylic acids?",
    answer: "The reaction is much quicker and is not reversible"
  },
  {
    id: 48,
    question: "What are the products when ethanoyl chloride reacts with ammonia?",
    answer: "Ethanamide (primary amide) and NH₄Cl solid"
  },
  {
    id: 49,
    question: "What observation is seen when acyl chlorides react with ammonia?",
    answer: "White smoke of NH₄Cl"
  },
  {
    id: 50,
    question: "Write the equation for the reaction of ethanoyl chloride with ammonia.",
    answer: "CH₃COCl + 2NH₃ → CH₃CONH₂ + NH₄Cl"
  },
  {
    id: 51,
    question: "What are the products when ethanoyl chloride reacts with methylamine?",
    answer: "N-methylethanamide (secondary amide) and CH₃NH₃⁺Cl⁻"
  },
  {
    id: 52,
    question: "Write the equation for the reaction of ethanoyl chloride with methylamine.",
    answer: "CH₃COCl + 2CH₃NH₂ → CH₃CONHCH₃ + CH₃NH₃⁺Cl⁻"
  },
  {
    id: 53,
    question: "What mechanism do acyl chlorides undergo with nucleophiles?",
    answer: "Nucleophilic addition-elimination"
  },
  {
    id: 54,
    question: "What reagent is used to make aspirin from 2-hydroxybenzoic acid?",
    answer: "Ethanoic anhydride"
  },
  {
    id: 55,
    question: "Why is ethanoic anhydride used instead of acyl chlorides to make aspirin?",
    answer: "It is cheaper, less corrosive, less vulnerable to hydrolysis, and less dangerous to use"
  },
  {
    id: 56,
    question: "What is the first step in recrystallisation?",
    answer: "Dissolve the impure compound in a minimum volume of hot (near boiling) solvent"
  },
  {
    id: 57,
    question: "Why is a minimum volume of solvent used in recrystallisation?",
    answer: "To obtain a saturated solution and enable crystallisation on cooling"
  },
  {
    id: 58,
    question: "Why is the solution hot filtered during recrystallisation?",
    answer: "To remove insoluble impurities and prevent crystals reforming during filtration"
  },
  {
    id: 59,
    question: "Why is the filtered solution cooled in ice during recrystallisation?",
    answer: "To reform crystals while soluble impurities remain in solution, increasing yield"
  },
  {
    id: 60,
    question: "What apparatus is used for suction filtration?",
    answer: "Buchner flask and funnel with a water pump"
  },
  {
    id: 61,
    question: "Why are crystals washed with distilled water after filtration?",
    answer: "To remove soluble impurities"
  },
  {
    id: 62,
    question: "What causes loss of yield during recrystallisation?",
    answer: "Crystals lost when filtering or washing, some product stays in solution, and other side reactions"
  },
  {
    id: 63,
    question: "How can you test the purity of a solid organic compound?",
    answer: "Measure its melting point and compare to data book values"
  },
  {
    id: 64,
    question: "What indicates a pure sample when measuring melting point?",
    answer: "A sharp melting point at the same value as quoted in data books"
  },
  {
    id: 65,
    question: "What indicates an impure sample when measuring melting point?",
    answer: "The melting point will be lowered and the sample will melt over a range of several degrees Celsius"
  },
  {
    id: 66,
    question: "Why should the sample be heated slowly near the melting point?",
    answer: "To get an accurate measurement of the melting temperature"
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('carboxylicAcidProgress', carboxylicAcidFlashcards);
