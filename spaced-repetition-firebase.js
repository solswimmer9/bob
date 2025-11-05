// Firebase-Integrated Spaced Repetition System with SM-2 Algorithm
// This implements Anki-style spaced repetition with dynamic intervals

class FirebaseSpacedRepetitionManager {
  constructor(topic, flashcardsArray) {
    this.topic = topic; // e.g., 'organic', 'physical', 'inorganic'
    this.flashcards = flashcardsArray;
    this.progress = {};
    this.isLoaded = false;

    // SM-2 Configuration (similar to Anki defaults)
    this.config = {
      // Learning steps (in minutes)
      learningSteps: [1, 10],

      // Graduating interval (days) - when card moves from Learning to Review
      graduatingInterval: 1,

      // Easy interval (days) - when hitting Easy on a new card
      easyInterval: 4,

      // Starting ease factor (2.5 = 250%)
      startingEase: 2.5,

      // Ease factor changes
      easyBonus: 1.3,        // Easy multiplies interval by this extra amount
      hardInterval: 1.2,     // Hard multiplies interval by this

      // Ease factor adjustments
      againEaseChange: -0.2, // Ease penalty for Again
      hardEaseChange: -0.15, // Ease penalty for Hard
      easyEaseChange: 0.15,  // Ease bonus for Easy

      // Limits
      minEase: 1.3,          // Minimum ease factor (130%)
      maxInterval: 36500,    // Maximum interval in days (100 years)

      // Interval fuzz (randomness)
      fuzzRange: 0.05,       // ±5% randomness to prevent card bunching

      // Lapses (when you hit Again on a review card)
      relearningSteps: [10], // Relearning steps in minutes
      minimumLapseInterval: 1 // Minimum interval after lapse
    };
  }

  async loadProgress() {
    try {
      const progressMap = await firestore.loadAllFlashcardProgress(this.topic);

      // Initialize progress for all cards
      this.flashcards.forEach((card, index) => {
        if (progressMap[index]) {
          this.progress[index] = progressMap[index];
          // Ensure state exists (for backwards compatibility)
          if (!this.progress[index].state) {
            this.progress[index].state = 'new';
          }
        } else {
          // Initialize new cards with SM-2 structure
          this.progress[index] = {
            topic: this.topic,
            index: index,
            state: 'new',              // Card states: 'new', 'learning', 'review', 'relearning'
            nextReview: new Date(),
            reviewCount: 0,
            lastReviewed: null,
            interval: 0,               // Current interval in days (or minutes for learning)
            easeFactor: this.config.startingEase,
            lapses: 0,                 // Number of times card was forgotten
            learningStep: 0            // Current position in learning/relearning steps
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

  // Add fuzz to interval to prevent cards from being reviewed on the same day
  addFuzz(interval) {
    if (interval < 2) return interval; // No fuzz for intervals less than 2 days

    const fuzz = interval * this.config.fuzzRange;
    const randomFuzz = (Math.random() * 2 - 1) * fuzz; // Random value between -fuzz and +fuzz

    return Math.max(1, Math.round(interval + randomFuzz));
  }

  // Calculate next interval based on SM-2 algorithm
  calculateNextInterval(cardProgress, rating) {
    const now = new Date();
    let newProgress = { ...cardProgress };
    newProgress.lastReviewed = now;
    newProgress.reviewCount++;

    // Handle different card states
    switch (cardProgress.state) {
      case 'new':
        return this.handleNewCard(newProgress, rating);

      case 'learning':
        return this.handleLearningCard(newProgress, rating);

      case 'review':
        return this.handleReviewCard(newProgress, rating);

      case 'relearning':
        return this.handleRelearningCard(newProgress, rating);

      default:
        return this.handleNewCard(newProgress, rating);
    }
  }

  handleNewCard(progress, rating) {
    const now = new Date();

    switch (rating) {
      case 'again':
        // Stay in learning, restart steps
        progress.state = 'learning';
        progress.learningStep = 0;
        progress.nextReview = new Date(now.getTime() + this.config.learningSteps[0] * 60000);
        break;

      case 'hard':
        // Start learning steps
        progress.state = 'learning';
        progress.learningStep = 0;
        progress.nextReview = new Date(now.getTime() + this.config.learningSteps[0] * 60000);
        break;

      case 'good':
        // Move through learning steps
        progress.state = 'learning';
        progress.learningStep = 0;
        progress.nextReview = new Date(now.getTime() + this.config.learningSteps[0] * 60000);
        break;

      case 'easy':
        // Skip learning, go straight to review with easy interval
        progress.state = 'review';
        progress.interval = this.config.easyInterval;
        progress.nextReview = new Date(now.getTime() + this.config.easyInterval * 86400000);
        progress.easeFactor += this.config.easyEaseChange;
        break;
    }

    return progress;
  }

  handleLearningCard(progress, rating) {
    const now = new Date();

    switch (rating) {
      case 'again':
        // Restart learning steps
        progress.learningStep = 0;
        progress.nextReview = new Date(now.getTime() + this.config.learningSteps[0] * 60000);
        break;

      case 'hard':
        // Repeat current step
        const currentStep = this.config.learningSteps[progress.learningStep];
        progress.nextReview = new Date(now.getTime() + currentStep * 60000);
        break;

      case 'good':
        // Move to next step or graduate
        progress.learningStep++;

        if (progress.learningStep >= this.config.learningSteps.length) {
          // Graduate to review
          progress.state = 'review';
          progress.interval = this.config.graduatingInterval;
          progress.nextReview = new Date(now.getTime() + this.config.graduatingInterval * 86400000);
        } else {
          // Move to next learning step
          const nextStep = this.config.learningSteps[progress.learningStep];
          progress.nextReview = new Date(now.getTime() + nextStep * 60000);
        }
        break;

      case 'easy':
        // Graduate immediately with easy interval
        progress.state = 'review';
        progress.interval = this.config.easyInterval;
        progress.nextReview = new Date(now.getTime() + this.config.easyInterval * 86400000);
        progress.easeFactor += this.config.easyEaseChange;
        break;
    }

    return progress;
  }

  handleReviewCard(progress, rating) {
    const now = new Date();

    switch (rating) {
      case 'again':
        // Lapse - go to relearning
        progress.state = 'relearning';
        progress.learningStep = 0;
        progress.lapses++;
        progress.easeFactor = Math.max(
          this.config.minEase,
          progress.easeFactor + this.config.againEaseChange
        );
        progress.nextReview = new Date(now.getTime() + this.config.relearningSteps[0] * 60000);
        break;

      case 'hard':
        // Reduce ease, shorter interval
        progress.easeFactor = Math.max(
          this.config.minEase,
          progress.easeFactor + this.config.hardEaseChange
        );
        progress.interval = Math.max(1, Math.round(progress.interval * this.config.hardInterval));
        progress.interval = this.addFuzz(progress.interval);
        progress.interval = Math.min(progress.interval, this.config.maxInterval);
        progress.nextReview = new Date(now.getTime() + progress.interval * 86400000);
        break;

      case 'good':
        // Normal SM-2 progression
        progress.interval = Math.max(1, Math.round(progress.interval * progress.easeFactor));
        progress.interval = this.addFuzz(progress.interval);
        progress.interval = Math.min(progress.interval, this.config.maxInterval);
        progress.nextReview = new Date(now.getTime() + progress.interval * 86400000);
        break;

      case 'easy':
        // Increase ease, longer interval
        progress.easeFactor += this.config.easyEaseChange;
        progress.interval = Math.max(1, Math.round(progress.interval * progress.easeFactor * this.config.easyBonus));
        progress.interval = this.addFuzz(progress.interval);
        progress.interval = Math.min(progress.interval, this.config.maxInterval);
        progress.nextReview = new Date(now.getTime() + progress.interval * 86400000);
        break;
    }

    return progress;
  }

  handleRelearningCard(progress, rating) {
    const now = new Date();

    switch (rating) {
      case 'again':
        // Restart relearning
        progress.learningStep = 0;
        progress.nextReview = new Date(now.getTime() + this.config.relearningSteps[0] * 60000);
        break;

      case 'hard':
        // Repeat current relearning step
        const currentStep = this.config.relearningSteps[progress.learningStep] || this.config.relearningSteps[0];
        progress.nextReview = new Date(now.getTime() + currentStep * 60000);
        break;

      case 'good':
        // Move to next step or graduate back to review
        progress.learningStep++;

        if (progress.learningStep >= this.config.relearningSteps.length) {
          // Graduate back to review with reduced interval
          progress.state = 'review';
          progress.interval = Math.max(
            this.config.minimumLapseInterval,
            Math.round(progress.interval * 0.5) // Interval is halved after lapse
          );
          progress.nextReview = new Date(now.getTime() + progress.interval * 86400000);
        } else {
          // Move to next relearning step
          const nextStep = this.config.relearningSteps[progress.learningStep];
          progress.nextReview = new Date(now.getTime() + nextStep * 60000);
        }
        break;

      case 'easy':
        // Graduate back to review with normal interval
        progress.state = 'review';
        progress.interval = Math.max(this.config.graduatingInterval, Math.round(progress.interval * 0.75));
        progress.nextReview = new Date(now.getTime() + progress.interval * 86400000);
        break;
    }

    return progress;
  }

  async recordReview(cardIndex, rating) {
    const currentProgress = this.progress[cardIndex];
    const newProgress = this.calculateNextInterval(currentProgress, rating);
    await this.saveProgress(cardIndex, newProgress);
  }

  // Calculate preview intervals for each button
  getButtonIntervals(cardProgress) {
    const intervals = {
      again: '',
      hard: '',
      good: '',
      easy: ''
    };

    // Simulate each rating to get preview intervals
    ['again', 'hard', 'good', 'easy'].forEach(rating => {
      const preview = this.calculateNextInterval(cardProgress, rating);
      intervals[rating] = this.formatInterval(preview);
    });

    return intervals;
  }

  formatInterval(progress) {
    const now = new Date();
    const nextReview = progress.nextReview instanceof Date
      ? progress.nextReview
      : new Date(progress.nextReview);

    const diffMs = nextReview - now;
    const diffMinutes = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    const diffMonths = Math.round(diffDays / 30);
    const diffYears = Math.round(diffDays / 365);

    if (diffMinutes < 60) {
      return `${diffMinutes}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffDays < 30) {
      return `${diffDays}d`;
    } else if (diffMonths < 12) {
      return `${diffMonths}mo`;
    } else {
      return `${diffYears}y`;
    }
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
    const cardIndex = this.dueCardIndices[this.currentCardIndex];
    const cardProgress = this.srManager.progress[cardIndex];

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

    // Calculate and update button intervals
    this.updateButtonIntervals(cardProgress);

    if (this.flashcard) {
      this.flashcard.style.animation = 'slideInFromStack 0.4s ease-out forwards';
      setTimeout(() => {
        this.flashcard.style.animation = '';
      }, 400);
    }
  }

  updateButtonIntervals(cardProgress) {
    // Get interval previews for each button
    const intervals = this.srManager.getButtonIntervals(cardProgress);

    // Update button interval labels
    const againBtn = this.difficultyButtons?.querySelector('[data-difficulty="again"]');
    const hardBtn = this.difficultyButtons?.querySelector('[data-difficulty="hard"]');
    const goodBtn = this.difficultyButtons?.querySelector('[data-difficulty="good"]');
    const easyBtn = this.difficultyButtons?.querySelector('[data-difficulty="easy"]');

    if (againBtn) {
      const intervalSpan = againBtn.querySelector('.btn-interval');
      if (intervalSpan) intervalSpan.textContent = intervals.again;
    }
    if (hardBtn) {
      const intervalSpan = hardBtn.querySelector('.btn-interval');
      if (intervalSpan) intervalSpan.textContent = intervals.hard;
    }
    if (goodBtn) {
      const intervalSpan = goodBtn.querySelector('.btn-interval');
      if (intervalSpan) intervalSpan.textContent = intervals.good;
    }
    if (easyBtn) {
      const intervalSpan = easyBtn.querySelector('.btn-interval');
      if (intervalSpan) intervalSpan.textContent = intervals.easy;
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

    // Keyboard navigation (Anki-style: 1=Again, 2=Hard, 3=Good, 4=Easy)
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
        this.handleDifficultyClick('again');
      }
      else if (e.key === '2' && this.isAnswerShown && !this.isAnimating) {
        e.preventDefault();
        this.handleDifficultyClick('hard');
      }
      else if (e.key === '3' && this.isAnswerShown && !this.isAnimating) {
        e.preventDefault();
        this.handleDifficultyClick('good');
      }
      else if (e.key === '4' && this.isAnswerShown && !this.isAnimating) {
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
