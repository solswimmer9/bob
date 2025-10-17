// Alcohols, Halogenoalkanes & Phenols Flashcards with Spaced Repetition
const alcoholsFlashcards = [
  {
    id: 1,
    question: "What is the general formula for alcohols?",
    answer: "CnH2n+1OH"
  },
  {
    id: 2,
    question: "How do you identify a primary alcohol?",
    answer: "A primary alcohol has 1 carbon attached to the carbon adjoining the oxygen atom"
  },
  {
    id: 3,
    question: "How do you identify a secondary alcohol?",
    answer: "A secondary alcohol has 2 carbons attached to the carbon adjoining the oxygen atom"
  },
  {
    id: 4,
    question: "How do you identify a tertiary alcohol?",
    answer: "A tertiary alcohol has 3 carbons attached to the carbon adjoining the oxygen atom"
  },
  {
    id: 5,
    question: "What are the bond angles in alcohols? (H-C-H and C-C-O)",
    answer: "109.5° (tetrahedral shape due to 4 bond pairs of electrons)"
  },
  {
    id: 6,
    question: "What is the H-O-C bond angle in alcohols?",
    answer: "104.5° (bent shape due to 2 bond pairs and 2 lone pairs; lone pairs repel more)"
  },
  {
    id: 7,
    question: "Write the equation for combustion of ethanol",
    answer: "CH3CH2OH + 3O2 → 2CO2 + 3H2O"
  },
  {
    id: 8,
    question: "Write the equation for the reaction of ethanol with sodium",
    answer: "2CH3CH2OH + 2Na → 2CH3CH2O-Na+ + H2"
  },
  {
    id: 9,
    question: "What observations occur when sodium reacts with alcohols?",
    answer: "Effervescence, mixture gets hot, sodium dissolves, white solid is produced"
  },
  {
    id: 10,
    question: "What reagent can be used to test for alcohols via substitution?",
    answer: "PCl5 (phosphorus(V) chloride) - produces misty fumes of HCl"
  },
  {
    id: 11,
    question: "Write the equation for the reaction of ethanol with PCl5",
    answer: "CH3CH2OH + PCl5 → CH3CH2Cl + POCl3 + HCl"
  },
  {
    id: 12,
    question: "Why are smaller alcohols soluble in water?",
    answer: "They can form hydrogen bonds with water. Solubility decreases as the hydrocarbon chain lengthens"
  },
  {
    id: 13,
    question: "What are the functional group levels in organic chemistry from lowest to highest?",
    answer: "Hydrocarbon level (0 bonds) → Alcohol level (1 bond) → Carbonyl level (2 bonds) → Carboxylic Acid level (3 bonds) → Carbon Dioxide level (4 bonds)"
  },
  {
    id: 14,
    question: "What is the oxidizing agent used for oxidizing alcohols?",
    answer: "Potassium dichromate (K2Cr2O7) with dilute sulfuric acid"
  },
  {
    id: 15,
    question: "What color change occurs when dichromate oxidizes alcohols?",
    answer: "Orange dichromate ion (Cr2O72-) reduces to green Cr3+ ion"
  },
  {
    id: 16,
    question: "What is the product when a primary alcohol is partially oxidized?",
    answer: "An aldehyde (ends in -al)"
  },
  {
    id: 17,
    question: "What are the conditions for partial oxidation of primary alcohols?",
    answer: "Use limited amount of dichromate, warm gently, and distil out the aldehyde as it forms"
  },
  {
    id: 18,
    question: "What is the product when a primary alcohol is fully oxidized?",
    answer: "A carboxylic acid (ends in -oic acid)"
  },
  {
    id: 19,
    question: "What are the conditions for full oxidation of primary alcohols?",
    answer: "Use excess dichromate and heat under reflux"
  },
  {
    id: 20,
    question: "Write the equation for partial oxidation of propan-1-ol",
    answer: "CH3CH2CH2OH + [O] → CH3CH2CHO + H2O"
  },
  {
    id: 21,
    question: "Write the equation for full oxidation of propan-1-ol",
    answer: "CH3CH2CH2OH + 2[O] → CH3CH2COOH + H2O"
  },
  {
    id: 22,
    question: "What is the product when a secondary alcohol is oxidized?",
    answer: "A ketone (ends in -one)"
  },
  {
    id: 23,
    question: "Write the equation for oxidation of propan-2-ol",
    answer: "CH3CH(OH)CH3 + [O] → CH3COCH3 + H2O"
  },
  {
    id: 24,
    question: "Can tertiary alcohols be oxidized by potassium dichromate?",
    answer: "No, because there is no hydrogen atom bonded to the carbon with the OH group"
  },
  {
    id: 25,
    question: "Why is distillation apparatus used for partial oxidation of primary alcohols?",
    answer: "To distil off the aldehyde as it forms, preventing further oxidation to carboxylic acid"
  },
  {
    id: 26,
    question: "Where should the thermometer bulb be positioned in distillation apparatus?",
    answer: "At the T junction connecting to the condenser to measure the correct boiling point"
  },
  {
    id: 27,
    question: "Why are electric heaters used instead of Bunsen burners for organic reactions?",
    answer: "Because organic chemicals are normally highly flammable and could catch fire with a naked flame"
  },
  {
    id: 28,
    question: "What is the purpose of reflux in organic chemistry?",
    answer: "To heat reaction mixtures for long periods while preventing organic vapors from escaping by condensing them back to liquids"
  },
  {
    id: 29,
    question: "What are anti-bumping granules and why are they used?",
    answer: "They are added to prevent vigorous, uneven boiling by making small bubbles form instead of large bubbles"
  },
  {
    id: 30,
    question: "What is Tollens' reagent and what does it test for?",
    answer: "Tollens' reagent contains [Ag(NH3)2]+ and tests for aldehydes (not ketones)"
  },
  {
    id: 31,
    question: "What is the positive result for Tollens' test?",
    answer: "A silver mirror forms coating the inside of the test tube (with aldehydes only)"
  },
  {
    id: 32,
    question: "Write the equation for Tollens' test with ethanal",
    answer: "CH3CHO + 2Ag+ + H2O → CH3COOH + 2Ag + 2H+"
  },
  {
    id: 33,
    question: "What is Fehling's solution and what does it test for?",
    answer: "Fehling's solution contains blue Cu2+ ions and tests for aldehydes (not ketones)"
  },
  {
    id: 34,
    question: "What is the positive result for Fehling's test?",
    answer: "Blue Cu2+ ions change to a red precipitate of Cu2O (with aldehydes only)"
  },
  {
    id: 35,
    question: "Write the equation for Fehling's test with ethanal",
    answer: "CH3CHO + 2Cu2+ + 2H2O → CH3COOH + Cu2O + 4H+"
  },
  {
    id: 36,
    question: "How can you test for the presence of a carboxylic acid?",
    answer: "Add sodium carbonate - it will fizz and produce carbon dioxide"
  },
  {
    id: 37,
    question: "Write the equation for the reaction of ethanoic acid with sodium carbonate",
    answer: "2CH3COOH + Na2CO3 → 2CH3COO-Na+ + H2O + CO2"
  },
  {
    id: 38,
    question: "What is dehydration in organic chemistry?",
    answer: "The removal of a water molecule from a molecule"
  },
  {
    id: 39,
    question: "What are the reagents and conditions for dehydration of alcohols?",
    answer: "Concentrated sulfuric acid or phosphoric acid, warm under reflux"
  },
  {
    id: 40,
    question: "What is the product of dehydrating an alcohol?",
    answer: "An alkene"
  },
  {
    id: 41,
    question: "What type of reaction is the dehydration of alcohols?",
    answer: "Acid-catalysed elimination"
  },
  {
    id: 42,
    question: "Write the equation for dehydration of propan-1-ol",
    answer: "CH3CH2CH2OH → CH3CH=CH2 + H2O (using conc. H2SO4, heat)"
  },
  {
    id: 43,
    question: "What is an E1 elimination reaction?",
    answer: "A two-step elimination reaction that forms a carbocation intermediate; most likely with tertiary alcohols"
  },
  {
    id: 44,
    question: "What is an E2 elimination reaction?",
    answer: "A one-step elimination reaction more likely with primary alcohols because no carbocation is formed"
  },
  {
    id: 45,
    question: "Why are E1 reactions most likely with tertiary alcohols?",
    answer: "The carbocation intermediate is stabilized by electron-releasing alkyl groups"
  },
  {
    id: 46,
    question: "Write the equation for fermentation of glucose to ethanol",
    answer: "C6H12O6 → 2CH3CH2OH + 2CO2"
  },
  {
    id: 47,
    question: "What are the conditions needed for fermentation?",
    answer: "Yeast, no air (anaerobic), temperature 30-40°C (optimum ~38°C)"
  },
  {
    id: 48,
    question: "Why is fermentation done at 30-40°C?",
    answer: "Lower temperatures = reaction too slow; higher temperatures = yeast dies and enzymes denature"
  },
  {
    id: 49,
    question: "Why is fermentation done in the absence of air?",
    answer: "Air oxidizes the ethanol produced to ethanoic acid (vinegar)"
  },
  {
    id: 50,
    question: "What is the maximum ethanol concentration from fermentation?",
    answer: "Around 15% - above this concentration the yeast will not survive"
  },
  {
    id: 51,
    question: "What are the advantages of producing ethanol by fermentation?",
    answer: "Sugar is renewable, uses low-level technology and cheap equipment, low energy costs"
  },
  {
    id: 52,
    question: "What are the disadvantages of producing ethanol by fermentation?",
    answer: "Slow batch process, impure product needs distillation, uses land that could grow food crops"
  },
  {
    id: 53,
    question: "What is a biofuel?",
    answer: "A fuel produced from plants"
  },
  {
    id: 54,
    question: "Why is ethanol from fermentation considered carbon neutral?",
    answer: "CO2 released when burned was originally absorbed by photosynthesis when the plant grew - no net annual CO2 addition"
  },
  {
    id: 55,
    question: "Why is ethanol from fermentation not truly carbon neutral?",
    answer: "Energy needed for irrigation, transport, distillation, and processing often comes from fossil fuels"
  },
  {
    id: 56,
    question: "Write the equation for hydration of ethene to form ethanol",
    answer: "CH2=CH2 + H2O → CH3CH2OH"
  },
  {
    id: 57,
    question: "What are the conditions for industrial hydration of ethene?",
    answer: "High temperature (300°C), high pressure (70 atm), concentrated H3PO4 catalyst"
  },
  {
    id: 58,
    question: "What is hydration in organic chemistry?",
    answer: "The addition of water to a molecule"
  },
  {
    id: 59,
    question: "What are the advantages of producing ethanol from ethene?",
    answer: "Large scale industrial process, faster reaction, purer product, continuous process (cheaper manpower)"
  },
  {
    id: 60,
    question: "What are the disadvantages of producing ethanol from ethene?",
    answer: "High technology equipment (expensive), ethene is non-renewable, high energy costs for high pressures"
  },
  {
    id: 61,
    question: "What is the general method for purifying an organic liquid?",
    answer: "1) Separate in separating funnel, 2) Wash with NaHCO3 or NaCl solution, 3) Dry with drying agent, 4) Distil to collect pure product"
  },
  {
    id: 62,
    question: "Why is sodium hydrogencarbonate used when purifying organic liquids?",
    answer: "To neutralize any remaining reactant acid"
  },
  {
    id: 63,
    question: "Why is saturated sodium chloride used when purifying organic liquids?",
    answer: "To help separate the organic layer from the aqueous layer"
  },
  {
    id: 64,
    question: "What properties should a drying agent have?",
    answer: "Insoluble in the organic liquid and must not react with the organic liquid"
  },
  {
    id: 65,
    question: "Give examples of drying agents",
    answer: "Anhydrous sodium sulfate (Na2SO4) or calcium chloride (CaCl2)"
  },
  {
    id: 66,
    question: "How do you know when an organic liquid is dry after adding drying agent?",
    answer: "The organic liquid should appear clear"
  },
  {
    id: 67,
    question: "Which layer is usually on top in a separating funnel?",
    answer: "The layer with lower density, which is usually the organic layer"
  },
  {
    id: 68,
    question: "When writing formulas of aldehydes in condensed form, how should you write it?",
    answer: "Write CHO not COH (e.g., CH3CH2CHO)"
  }
];

// Initialize flashcards using shared spaced repetition system
initializeFlashcards('alcoholsProgress', alcoholsFlashcards);
