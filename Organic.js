// Organic Chemistry Flashcards with Spaced Repetition
const organicFlashcards = [
  {
    id: 1,
    question: "What is the functional group in alcohols?",
    answer: "-OH (hydroxyl group)"
  },
  {
    id: 2,
    question: "What type of reaction forms alkenes from alkanes?",
    answer: "Elimination reaction"
  },
  {
    id: 3,
    question: "What is the general formula of an alkane?",
    answer: "CₙH₂ₙ₊₂"
  },
  {
    id: 4,
    question: "What catalyst is used in the hydrogenation of alkenes?",
    answer: "Nickel (Ni) catalyst"
  },
  {
    id: 5,
    question: "What is the general formula for alkenes?",
    answer: "CₙH₂ₙ",
    explanation: "Alkenes are unsaturated hydrocarbons containing at least one carbon-carbon double bond."
  },
  {
    id: 6,
    question: "What is the functional group in carboxylic acids?",
    answer: "-COOH (carboxyl group)"
  },
  {
    id: 7,
    question: "What is an electrophile?",
    answer: "An electron-deficient species that accepts an electron pair"
  },
  {
    id: 8,
    question: "What is Markovnikov's rule?",
    answer: "In addition reactions, the hydrogen attaches to the carbon with more hydrogens already present",
    explanation: "This rule helps predict the major product in electrophilic addition reactions to asymmetric alkenes."
  }
];

// Spaced Repetition System
class SpacedRepetitionManager {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.loadProgress();
  }

  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.progress = JSON.parse(saved);
    } else {
      // Initialize all cards as due today
      this.progress = {};
      organicFlashcards.forEach(card => {
        this.progress[card.id] = {
          nextReview: new Date().toISOString(),
          reviewCount: 0,
          lastReviewed: null
        };
      });
      this.saveProgress();
    }
  }

  saveProgress() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
  }

  getDueCards() {
    const now = new Date();
    return organicFlashcards.filter(card => {
      const cardProgress = this.progress[card.id];
      if (!cardProgress) return true;
      const nextReview = new Date(cardProgress.nextReview);
      return nextReview <= now;
    });
  }

  recordReview(cardId, difficulty) {
    const now = new Date();
    const daysToAdd = {
      'hard': 1,
      'medium': 2,
      'easy': 4
    }[difficulty];

    const nextReview = new Date(now);
    nextReview.setDate(nextReview.getDate() + daysToAdd);

    this.progress[cardId] = {
      nextReview: nextReview.toISOString(),
      reviewCount: (this.progress[cardId]?.reviewCount || 0) + 1,
      lastReviewed: now.toISOString()
    };

    this.saveProgress();
  }

  getTotalDueCount() {
    return this.getDueCards().length;
  }

  getCardStats(cardId) {
    return this.progress[cardId] || null;
  }
}

// Initialize the spaced repetition manager
const srManager = new SpacedRepetitionManager('organicChemistryProgress');

// Session state
let dueCards = [];
let currentCardIndex = 0;
let isAnswerShown = false;
let isAnimating = false;

// DOM elements
const flashcard = document.getElementById("flashcard");
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const explanationElement = document.getElementById("explanation");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const difficultyButtons = document.getElementById("difficultyButtons");
const progressElement = document.getElementById("progress");
const currentCardNumEl = document.getElementById("currentCardNum");
const totalDueCardsEl = document.getElementById("totalDueCards");

// Initialize session
function initSession() {
  dueCards = srManager.getDueCards();
  currentCardIndex = 0;
  isAnswerShown = false;

  if (dueCards.length === 0) {
    if (progressElement) {
      progressElement.textContent = 'No cards due! Come back later.';
    }
    if (flashcard) flashcard.style.display = 'none';
    if (showAnswerBtn) showAnswerBtn.style.display = 'none';
    return;
  }

  if (progressElement) {
    progressElement.textContent = `${dueCards.length} card${dueCards.length > 1 ? 's' : ''} due for review`;
  }
  if (totalDueCardsEl) {
    totalDueCardsEl.textContent = dueCards.length;
  }

  showCurrentCard();
}

// Display current card
function showCurrentCard() {
  if (currentCardIndex >= dueCards.length) {
    // Session complete
    if (progressElement) {
      progressElement.textContent = 'Session complete! Great work!';
    }
    if (flashcard) flashcard.style.display = 'none';
    if (showAnswerBtn) showAnswerBtn.style.display = 'none';
    if (difficultyButtons) difficultyButtons.style.display = 'none';
    return;
  }

  const card = dueCards[currentCardIndex];
  isAnswerShown = false;

  // Reset card state
  if (flashcard) {
    flashcard.classList.remove('flipped');
  }
  if (showAnswerBtn) {
    showAnswerBtn.style.display = 'block';
    showAnswerBtn.textContent = 'Show Answer';
  }
  if (difficultyButtons) {
    difficultyButtons.style.display = 'none';
  }

  // Update progress
  if (currentCardNumEl) {
    currentCardNumEl.textContent = currentCardIndex + 1;
  }

  // Update card content
  if (questionElement) {
    questionElement.textContent = card.question;
  }
  if (answerElement) {
    answerElement.textContent = card.answer;
  }
  if (explanationElement) {
    if (card.explanation) {
      explanationElement.textContent = card.explanation;
      explanationElement.style.display = 'block';
    } else {
      explanationElement.style.display = 'none';
    }
  }

  // Add slide-in animation for new card
  if (flashcard) {
    flashcard.style.animation = 'slideInFromStack 0.4s ease-out forwards';

    // Reset animation after it completes
    setTimeout(() => {
      flashcard.style.animation = '';
    }, 400);
  }
}

// Show answer
function showAnswer() {
  if (isAnswerShown) return;

  isAnswerShown = true;
  if (flashcard) {
    flashcard.classList.add('flipped');
  }
  if (showAnswerBtn) {
    showAnswerBtn.style.display = 'none';
  }
  if (difficultyButtons) {
    difficultyButtons.style.display = 'flex';
  }
}

// Handle difficulty rating
function handleDifficultyClick(difficulty) {
  // Prevent multiple clicks during animation
  if (isAnimating) return;

  isAnimating = true;
  const card = dueCards[currentCardIndex];
  srManager.recordReview(card.id, difficulty);

  // Hide difficulty buttons immediately
  if (difficultyButtons) {
    difficultyButtons.style.pointerEvents = 'none';
    difficultyButtons.style.opacity = '0.5';
  }

  // Trigger shuffle animation before moving to next card
  if (flashcard) {
    flashcard.classList.add('shuffling');

    // Wait for animation to complete before showing next card
    setTimeout(() => {
      flashcard.classList.remove('shuffling');
      currentCardIndex++;
      showCurrentCard();
      isAnimating = false;

      // Re-enable buttons for next card
      if (difficultyButtons) {
        difficultyButtons.style.pointerEvents = 'auto';
        difficultyButtons.style.opacity = '1';
      }
    }, 500); // Match animation duration
  } else {
    currentCardIndex++;
    showCurrentCard();
    isAnimating = false;
  }
}

// Event listeners
if (showAnswerBtn) {
  showAnswerBtn.addEventListener('click', showAnswer);
}

// Allow clicking on the card itself to show answer
if (flashcard) {
  flashcard.addEventListener('click', () => {
    if (!isAnswerShown) {
      showAnswer();
    }
  });
}

// Difficulty button listeners
if (difficultyButtons) {
  const difficultyBtns = difficultyButtons.querySelectorAll('.difficulty-btn');
  difficultyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const difficulty = e.currentTarget.dataset.difficulty;
      handleDifficultyClick(difficulty);
    });
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === ' ' && !isAnswerShown) {
    e.preventDefault();
    showAnswer();
  } else if (e.key === '1' && isAnswerShown) {
    handleDifficultyClick('hard');
  } else if (e.key === '2' && isAnswerShown) {
    handleDifficultyClick('medium');
  } else if (e.key === '3' && isAnswerShown) {
    handleDifficultyClick('easy');
  } else if (e.key === 'Enter' && !isAnswerShown) {
    e.preventDefault();
    showAnswer();
  }
});

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSession);
} else {
  initSession();
}
