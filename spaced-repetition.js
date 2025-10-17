// Shared Spaced Repetition System for A-Level Chemistry Flashcards
// This module provides the core spaced repetition logic and UI management
// for all flashcard topics (Organic, Inorganic, and Physical Chemistry)

class SpacedRepetitionManager {
  constructor(storageKey, flashcardsArray) {
    this.storageKey = storageKey;
    this.flashcards = flashcardsArray;
    this.loadProgress();
  }

  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.progress = JSON.parse(saved);
    } else {
      this.progress = {};
      this.flashcards.forEach(card => {
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
    return this.flashcards.filter(card => {
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
}

// Flashcard Session Manager
class FlashcardSession {
  constructor(srManager) {
    this.srManager = srManager;
    this.dueCards = [];
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

  initSession() {
    this.dueCards = this.srManager.getDueCards();
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

  handleDifficultyClick(difficulty) {
    if (this.isAnimating) return;

    this.isAnimating = true;
    const card = this.dueCards[this.currentCardIndex];
    this.srManager.recordReview(card.id, difficulty);

    // Track study session
    StudyTracker.recordCard();

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

    // Keyboard navigation - bind to this instance
    this.handleKeyPress = (e) => {
      // Ignore if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Show answer with Space or Enter
      if ((e.key === ' ' || e.key === 'Enter') && !this.isAnswerShown) {
        e.preventDefault();
        this.showAnswer();
      }
      // Rate difficulty with 1, 2, 3 keys
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

  // Cleanup method to remove event listeners
  cleanup() {
    if (this.handleKeyPress) {
      document.removeEventListener('keydown', this.handleKeyPress);
    }
  }
}

// Study Tracker - Tracks cards studied and time spent
class StudyTracker {
  static STORAGE_KEY = 'studyTrackerData';

  static getTodayKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  static loadData() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {};
  }

  static saveData(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  static recordCard() {
    const data = this.loadData();
    const today = this.getTodayKey();

    if (!data[today]) {
      data[today] = {
        cards: 0,
        timeSpent: 0,
        startTime: Date.now()
      };
    }

    data[today].cards++;
    data[today].lastCardTime = Date.now();

    this.saveData(data);
  }

  static startSession() {
    const data = this.loadData();
    const today = this.getTodayKey();

    if (!data[today]) {
      data[today] = {
        cards: 0,
        timeSpent: 0,
        startTime: Date.now()
      };
    } else if (!data[today].startTime) {
      data[today].startTime = Date.now();
    }

    this.saveData(data);
  }

  static updateTimeSpent() {
    const data = this.loadData();
    const today = this.getTodayKey();

    if (data[today] && data[today].startTime) {
      const sessionTime = Math.floor((Date.now() - data[today].startTime) / 1000);
      data[today].timeSpent = (data[today].timeSpent || 0) + sessionTime;
      data[today].startTime = Date.now(); // Reset for next session
      this.saveData(data);
    }
  }

  static getTodayStats() {
    const data = this.loadData();
    const today = this.getTodayKey();

    if (!data[today]) {
      return { cards: 0, timeSpent: 0 };
    }

    // Add current session time if active
    let totalTime = data[today].timeSpent || 0;
    if (data[today].startTime) {
      totalTime += Math.floor((Date.now() - data[today].startTime) / 1000);
    }

    return {
      cards: data[today].cards || 0,
      timeSpent: totalTime
    };
  }

  static formatTime(seconds) {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  }

  static getAverageTimePerCard() {
    const stats = this.getTodayStats();
    if (stats.cards === 0) return 0;
    return (stats.timeSpent / stats.cards).toFixed(1);
  }
}

// Initialize function to be called from topic-specific files
function initializeFlashcards(storageKey, flashcardsArray) {
  const srManager = new SpacedRepetitionManager(storageKey, flashcardsArray);
  const session = new FlashcardSession(srManager);

  // Start tracking session
  StudyTracker.startSession();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => session.initSession());
  } else {
    session.initSession();
  }

  // Update time spent when page unloads
  window.addEventListener('beforeunload', () => {
    StudyTracker.updateTimeSpent();
  });
}
