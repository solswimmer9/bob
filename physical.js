// Physical Chemistry Flashcards with Spaced Repetition
const physicalFlashcards = [
  // Atomic Structure
  {
    id: 1,
    question: "What is the definition of first ionization energy?",
    answer: "The energy required to remove one mole of electrons from one mole of gaseous atoms to form one mole of gaseous 1+ ions",
    explanation: "First ionization energy is always endothermic and increases across a period."
  },
  {
    id: 2,
    question: "Why does ionization energy generally increase across a period?",
    answer: "Nuclear charge increases, atomic radius decreases, and shielding remains similar",
    explanation: "This means the outer electrons are held more strongly by the nucleus."
  },
  {
    id: 3,
    question: "What does a mass spectrometer measure?",
    answer: "The mass-to-charge ratio (m/z) of ions",
    explanation: "This allows us to determine relative atomic mass and isotopic abundance."
  },
  {
    id: 4,
    question: "What is the shape of an s orbital?",
    answer: "Spherical"
  },
  {
    id: 5,
    question: "How many orbitals are in a d subshell?",
    answer: "5 orbitals (holding a maximum of 10 electrons)"
  },

  // Amount of Substance
  {
    id: 6,
    question: "What is Avogadro's constant?",
    answer: "6.02 × 10²³ mol⁻¹",
    explanation: "This is the number of particles in one mole of substance."
  },
  {
    id: 7,
    question: "What is the ideal gas equation?",
    answer: "PV = nRT",
    explanation: "P = pressure (Pa), V = volume (m³), n = moles, R = 8.314 J K⁻¹ mol⁻¹, T = temperature (K)"
  },
  {
    id: 8,
    question: "What is the formula for percentage yield?",
    answer: "(Actual yield / Theoretical yield) × 100",
    explanation: "Percentage yield is always less than 100% due to practical losses."
  },
  {
    id: 9,
    question: "What is the concentration formula?",
    answer: "Concentration (mol dm⁻³) = moles / volume (dm³)",
    explanation: "Also written as c = n/V"
  },
  {
    id: 10,
    question: "What is the empirical formula?",
    answer: "The simplest whole number ratio of atoms of each element in a compound",
    explanation: "For example, C₂H₆ has empirical formula CH₃"
  },

  // Bonding
  {
    id: 11,
    question: "What is electronegativity?",
    answer: "The ability of an atom to attract the bonding pair of electrons in a covalent bond",
    explanation: "Fluorine is the most electronegative element with a value of 4.0 on the Pauling scale."
  },
  {
    id: 12,
    question: "What is the shape and bond angle of CH₄?",
    answer: "Tetrahedral, 109.5°",
    explanation: "Methane has 4 bonding pairs and no lone pairs around the central carbon."
  },
  {
    id: 13,
    question: "What is the shape and bond angle of NH₃?",
    answer: "Trigonal pyramidal, 107°",
    explanation: "Ammonia has 3 bonding pairs and 1 lone pair, which reduces the bond angle."
  },
  {
    id: 14,
    question: "What is a metallic bond?",
    answer: "The electrostatic attraction between positive metal ions and delocalized electrons",
    explanation: "This explains why metals conduct electricity and are malleable."
  },
  {
    id: 15,
    question: "What type of intermolecular force is hydrogen bonding?",
    answer: "A special type of permanent dipole-dipole interaction",
    explanation: "Occurs between H and N, O, or F atoms."
  },

  // Energetics
  {
    id: 16,
    question: "What is the definition of standard enthalpy of formation (ΔfH°)?",
    answer: "The enthalpy change when one mole of compound is formed from its elements under standard conditions",
    explanation: "Standard conditions: 298K, 100kPa, 1 mol dm⁻³ concentration"
  },
  {
    id: 17,
    question: "What is Hess's Law?",
    answer: "The enthalpy change of a reaction is independent of the route taken",
    explanation: "This allows us to calculate enthalpy changes indirectly using known values."
  },
  {
    id: 18,
    question: "What is the formula for calculating enthalpy change using bond enthalpies?",
    answer: "ΔH = Σ(bonds broken) - Σ(bonds formed)",
    explanation: "Breaking bonds is endothermic (+), forming bonds is exothermic (-)"
  },
  {
    id: 19,
    question: "What is the standard enthalpy of combustion?",
    answer: "The enthalpy change when one mole of substance is completely burned in oxygen under standard conditions"
  },
  {
    id: 20,
    question: "What is the formula Q = mcΔT used for?",
    answer: "Calculating heat energy change in calorimetry experiments",
    explanation: "Q = heat energy (J), m = mass (g), c = specific heat capacity (J g⁻¹ K⁻¹), ΔT = temperature change (K)"
  },

  // Kinetics
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
  },

  // Chemical Equilibria
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
  },

  // Oxidation & Reduction
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
  },

  // Thermodynamics
  {
    id: 36,
    question: "What is entropy?",
    answer: "A measure of the disorder or randomness of a system",
    explanation: "Entropy increases when solids melt, liquids boil, or gases are formed."
  },
  {
    id: 37,
    question: "What is the formula for free energy change?",
    answer: "ΔG = ΔH - TΔS",
    explanation: "ΔG = Gibbs free energy, ΔH = enthalpy change, T = temperature (K), ΔS = entropy change"
  },
  {
    id: 38,
    question: "When is a reaction spontaneous?",
    answer: "When ΔG is negative",
    explanation: "This means the reaction is thermodynamically feasible."
  },
  {
    id: 39,
    question: "What are the units of entropy?",
    answer: "J K⁻¹ mol⁻¹",
    explanation: "Unlike enthalpy which is measured in kJ mol⁻¹"
  },
  {
    id: 40,
    question: "What happens to entropy when a gas is formed from a liquid?",
    answer: "Entropy increases (positive ΔS)",
    explanation: "Gas particles are more disordered than liquid particles."
  },

  // Rate Equations
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
  },

  // Equilibrium Constant
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
  },

  // Acids & Bases
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
initializeFlashcards('physicalChemistryProgress', physicalFlashcards);
