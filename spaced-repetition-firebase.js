// Firebase-Integrated Spaced Repetition System
// This replaces localStorage with Firebase Firestore for cloud-based progress tracking

class FirebaseSpacedRepetitionManager {
  constructor(topic, flashcardsArray) {
    this.topic = topic; // e.g., 'organic', 'physical', 'inorganic'
    this.flashcards = flashcardsArray;
    this.progress = {};
    this.isLoaded = false;
  }

  async loadProgress() {
    try {
      const progressMap = await firestore.loadAllFlashcardProgress(this.topic);

      // Initialize progress for all cards
      this.flashcards.forEach((card, index) => {
        if (progressMap[index]) {
          this.progress[index] = progressMap[index];
        } else {
          // Initialize new cards
          this.progress[index] = {
            topic: this.topic,
            index: index,
            nextReview: new Date(),
            reviewCount: 0,
            lastReviewed: null,
            interval: 1,
            easeFactor: 2.5,
            difficulty: 'medium'
          };
        }
      });

      this.isLoaded = true;
      console.log(`Loaded progress for ${this.flashcards.length} cards in ${this.topic}`);
      return true;
    } catch (error) {
      console.error('Error loading progress:', error);
      return false;
    }
  }

  async saveProgress(cardIndex, progressData) {
    try {
      await firestore.saveFlashcardProgress(this.topic, cardIndex, progressData);
      this.progress[cardIndex] = progressData;
      return true;
    } catch (error) {
      console.error('Error saving progress:', error);
      return false;
    }
  }

  getDueCards() {
    const now = new Date();
    return this.flashcards.filter((card, index) => {
      const cardProgress = this.progress[index];
      if (!cardProgress) return true;

      const nextReview = cardProgress.nextReview instanceof Date
        ? cardProgress.nextReview
        : new Date(cardProgress.nextReview);

      return nextReview <= now;
    });
  }

  async recordReview(cardIndex, difficulty) {
    const now = new Date();
    const daysToAdd = {
      'hard': 1,
      'medium': 2,
      'easy': 4
    }[difficulty];

    const nextReview = new Date(now);
    nextReview.setDate(nextReview.getDate() + daysToAdd);

    const currentProgress = this.progress[cardIndex] || {};
    const newProgress = {
      topic: this.topic,
      index: cardIndex,
      nextReview: nextReview,
      reviewCount: (currentProgress.reviewCount || 0) + 1,
      lastReviewed: now,
      interval: daysToAdd,
      easeFactor: currentProgress.easeFactor || 2.5,
      difficulty: difficulty
    };

    await this.saveProgress(cardIndex, newProgress);
  }

  getTotalDueCount() {
    return this.getDueCards().length;
  }
}

// Firebase Flashcard Session Manager
class FirebaseFlashcardSession {
  constructor(srManager) {
    this.srManager = srManager;
    this.dueCards = [];
    this.dueCardIndices = []; // Track original indices
    this.currentCardIndex = 0;
    this.isAnswerShown = false;
    this.isAnimating = false;

    // DOM elements
    this.flashcard = document.getElementById("flashcard");
    this.questionElement = document.getElementById("question");
    this.answerElement = document.getElementById("answer");
    this.explanationElement = document.getElementById("explanation");
    this.showAnswerBtn = document.getElementById("showAnswerBtn");
    this.difficultyButtons = document.getElementById("difficultyButtons");
    this.progressElement = document.getElementById("progress");
    this.currentCardNumEl = document.getElementById("currentCardNum");
    this.totalDueCardsEl = document.getElementById("totalDueCards");
    this.totalDueDisplay = document.getElementById("totalDueDisplay");

    this.initEventListeners();
  }

  async initSession() {
    // Wait for progress to load
    if (!this.srManager.isLoaded) {
      await this.srManager.loadProgress();
    }

    // Get due cards
    this.dueCards = [];
    this.dueCardIndices = [];

    this.srManager.flashcards.forEach((card, index) => {
      const progress = this.srManager.progress[index];
      if (!progress) {
        this.dueCards.push(card);
        this.dueCardIndices.push(index);
        return;
      }

      const nextReview = progress.nextReview instanceof Date
        ? progress.nextReview
        : new Date(progress.nextReview);

      if (nextReview <= new Date()) {
        this.dueCards.push(card);
        this.dueCardIndices.push(index);
      }
    });

    this.currentCardIndex = 0;
    this.isAnswerShown = false;

    if (this.totalDueDisplay) {
      this.totalDueDisplay.textContent = this.dueCards.length;
    }

    if (this.dueCards.length === 0) {
      if (this.progressElement) {
        this.progressElement.textContent = 'No cards due! Come back later.';
      }
      if (this.flashcard) this.flashcard.style.display = 'none';
      if (this.showAnswerBtn) this.showAnswerBtn.style.display = 'none';
      return;
    }

    if (this.progressElement) {
      this.progressElement.textContent = `${this.dueCards.length} card${this.dueCards.length > 1 ? 's' : ''} due for review`;
    }
    if (this.totalDueCardsEl) {
      this.totalDueCardsEl.textContent = this.dueCards.length;
    }

    this.showCurrentCard();
  }

  showCurrentCard() {
    if (this.currentCardIndex >= this.dueCards.length) {
      if (this.progressElement) {
        this.progressElement.textContent = 'Session complete! Great work!';
      }
      if (this.flashcard) this.flashcard.style.display = 'none';
      if (this.showAnswerBtn) this.showAnswerBtn.style.display = 'none';
      if (this.difficultyButtons) this.difficultyButtons.style.display = 'none';
      return;
    }

    const card = this.dueCards[this.currentCardIndex];
    this.isAnswerShown = false;

    if (this.flashcard) {
      this.flashcard.classList.remove('flipped');
    }
    if (this.showAnswerBtn) {
      this.showAnswerBtn.style.display = 'block';
    }
    if (this.difficultyButtons) {
      this.difficultyButtons.style.display = 'none';
    }

    if (this.currentCardNumEl) {
      this.currentCardNumEl.textContent = this.currentCardIndex + 1;
    }

    if (this.questionElement) {
      this.questionElement.textContent = card.question;
    }
    if (this.answerElement) {
      this.answerElement.textContent = card.answer;
    }
    if (this.explanationElement) {
      if (card.explanation) {
        this.explanationElement.textContent = card.explanation;
        this.explanationElement.style.display = 'block';
      } else {
        this.explanationElement.style.display = 'none';
      }
    }

    if (this.flashcard) {
      this.flashcard.style.animation = 'slideInFromStack 0.4s ease-out forwards';
      setTimeout(() => {
        this.flashcard.style.animation = '';
      }, 400);
    }
  }

  showAnswer() {
    if (this.isAnswerShown) return;

    this.isAnswerShown = true;
    if (this.flashcard) {
      this.flashcard.classList.add('flipped');
    }
    if (this.showAnswerBtn) {
      this.showAnswerBtn.style.display = 'none';
    }
    if (this.difficultyButtons) {
      this.difficultyButtons.style.display = 'flex';
    }
  }

  async handleDifficultyClick(difficulty) {
    if (this.isAnimating) return;

    this.isAnimating = true;
    const cardIndex = this.dueCardIndices[this.currentCardIndex];

    // Save to Firestore
    await this.srManager.recordReview(cardIndex, difficulty);

    // Track study session
    await FirebaseStudyTracker.recordCard(this.srManager.topic);

    if (this.difficultyButtons) {
      this.difficultyButtons.style.pointerEvents = 'none';
      this.difficultyButtons.style.opacity = '0.5';
    }

    if (this.flashcard) {
      this.flashcard.classList.add('shuffling');

      setTimeout(() => {
        this.flashcard.classList.remove('shuffling');
        this.currentCardIndex++;
        this.showCurrentCard();
        this.isAnimating = false;

        if (this.difficultyButtons) {
          this.difficultyButtons.style.pointerEvents = 'auto';
          this.difficultyButtons.style.opacity = '1';
        }
      }, 500);
    } else {
      this.currentCardIndex++;
      this.showCurrentCard();
      this.isAnimating = false;
    }
  }

  initEventListeners() {
    // Show answer button
    if (this.showAnswerBtn) {
      this.showAnswerBtn.addEventListener('click', () => this.showAnswer());
    }

    // Click on flashcard to show answer
    if (this.flashcard) {
      this.flashcard.addEventListener('click', () => {
        if (!this.isAnswerShown) {
          this.showAnswer();
        }
      });
    }

    // Difficulty buttons
    if (this.difficultyButtons) {
      const difficultyBtns = this.difficultyButtons.querySelectorAll('.difficulty-btn');
      difficultyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const difficulty = e.currentTarget.dataset.difficulty;
          this.handleDifficultyClick(difficulty);
        });
      });
    }

    // Keyboard navigation
    this.handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if ((e.key === ' ' || e.key === 'Enter') && !this.isAnswerShown) {
        e.preventDefault();
        this.showAnswer();
      }
      else if (e.key === '1' && this.isAnswerShown && !this.isAnimating) {
        e.preventDefault();
        this.handleDifficultyClick('hard');
      }
      else if (e.key === '2' && this.isAnswerShown && !this.isAnimating) {
        e.preventDefault();
        this.handleDifficultyClick('medium');
      }
      else if (e.key === '3' && this.isAnswerShown && !this.isAnimating) {
        e.preventDefault();
        this.handleDifficultyClick('easy');
      }
    };

    document.addEventListener('keydown', this.handleKeyPress);
  }

  cleanup() {
    if (this.handleKeyPress) {
      document.removeEventListener('keydown', this.handleKeyPress);
    }
  }
}

// Firebase Study Tracker
class FirebaseStudyTracker {
  static sessionStartTime = null;
  static sessionCards = 0;

  static startSession() {
    this.sessionStartTime = Date.now();
    this.sessionCards = 0;
  }

  static async recordCard(topic) {
    this.sessionCards++;

    // Calculate time spent in this session
    const timeSpent = this.sessionStartTime
      ? Math.floor((Date.now() - this.sessionStartTime) / 1000)
      : 0;

    // Save to Firestore
    await firestore.saveStudySession(topic, {
      cardsReviewed: 1,
      timeSpent: timeSpent
    });

    // Reset session timer
    this.sessionStartTime = Date.now();
  }

  static async getTodayStats() {
    return await firestore.loadTodayStudyStats();
  }

  static formatTime(seconds) {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes < 60) {
      return `${minutes}m ${secs}s`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
}

// Initialize function for Firebase-powered flashcards
async function initializeFirebaseFlashcards(topic, flashcardsArray) {
  // Require authentication
  try {
    await auth.requireAuth();
  } catch (error) {
    console.error('Authentication required:', error);
    return;
  }

  const srManager = new FirebaseSpacedRepetitionManager(topic, flashcardsArray);
  const session = new FirebaseFlashcardSession(srManager);

  // Start tracking session
  FirebaseStudyTracker.startSession();

  // Wait for auth to be ready, then init session
  await session.initSession();

  // Update time spent when page unloads
  window.addEventListener('beforeunload', async () => {
    if (FirebaseStudyTracker.sessionStartTime && FirebaseStudyTracker.sessionCards > 0) {
      const timeSpent = Math.floor((Date.now() - FirebaseStudyTracker.sessionStartTime) / 1000);
      await firestore.saveStudySession(topic, {
        cardsReviewed: 0,
        timeSpent: timeSpent
      });
    }
  });
}
