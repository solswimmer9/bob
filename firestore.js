// Firestore Operations
// Handles saving and loading flashcard progress to/from Firestore

// Save flashcard progress for current user
async function saveFlashcardProgress(topic, flashcardIndex, progressData) {
  const user = auth.getCurrentUser();
  if (!user) {
    console.error('No user signed in');
    return false;
  }

  try {
    const flashcardId = `${topic}_${flashcardIndex}`;
    const docRef = db.collection('users').doc(user.uid).collection('flashcards').doc(flashcardId);

    await docRef.set({
      topic: topic,
      index: flashcardIndex,
      lastReviewed: firebase.firestore.FieldValue.serverTimestamp(),
      interval: progressData.interval || 1,
      easeFactor: progressData.easeFactor || 2.5,
      reviewCount: progressData.reviewCount || 1,
      difficulty: progressData.difficulty || 'medium',
      nextReview: progressData.nextReview || new Date()
    }, { merge: true });

    console.log(`Progress saved for ${flashcardId}`);
    return true;
  } catch (error) {
    console.error('Error saving progress:', error);
    return false;
  }
}

// Load flashcard progress for current user
async function loadFlashcardProgress(topic, flashcardIndex) {
  const user = auth.getCurrentUser();
  if (!user) {
    console.error('No user signed in');
    return null;
  }

  try {
    const flashcardId = `${topic}_${flashcardIndex}`;
    const docRef = db.collection('users').doc(user.uid).collection('flashcards').doc(flashcardId);
    const doc = await docRef.get();

    if (doc.exists) {
      const data = doc.data();
      // Convert Firestore Timestamp to Date
      if (data.nextReview && data.nextReview.toDate) {
        data.nextReview = data.nextReview.toDate();
      }
      if (data.lastReviewed && data.lastReviewed.toDate) {
        data.lastReviewed = data.lastReviewed.toDate();
      }
      console.log(`Progress loaded for ${flashcardId}`);
      return data;
    } else {
      console.log(`No progress found for ${flashcardId}`);
      return null;
    }
  } catch (error) {
    console.error('Error loading progress:', error);
    return null;
  }
}

// Load all flashcard progress for a topic
async function loadAllFlashcardProgress(topic) {
  const user = auth.getCurrentUser();
  if (!user) {
    console.error('No user signed in');
    return {};
  }

  try {
    const snapshot = await db.collection('users')
      .doc(user.uid)
      .collection('flashcards')
      .where('topic', '==', topic)
      .get();

    const progressMap = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      // Convert Firestore Timestamp to Date
      if (data.nextReview && data.nextReview.toDate) {
        data.nextReview = data.nextReview.toDate();
      }
      if (data.lastReviewed && data.lastReviewed.toDate) {
        data.lastReviewed = data.lastReviewed.toDate();
      }
      progressMap[data.index] = data;
    });

    console.log(`Loaded progress for ${Object.keys(progressMap).length} cards in ${topic}`);
    return progressMap;
  } catch (error) {
    console.error('Error loading all progress:', error);
    return {};
  }
}

// Get cards due for review (where nextReview <= now)
async function getDueCards(topic) {
  const user = auth.getCurrentUser();
  if (!user) {
    console.error('No user signed in');
    return [];
  }

  try {
    const now = new Date();
    const snapshot = await db.collection('users')
      .doc(user.uid)
      .collection('flashcards')
      .where('topic', '==', topic)
      .where('nextReview', '<=', now)
      .get();

    const dueCards = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      dueCards.push({
        id: doc.id,
        index: data.index,
        ...data
      });
    });

    console.log(`${dueCards.length} cards due for review in ${topic}`);
    return dueCards;
  } catch (error) {
    console.error('Error getting due cards:', error);
    return [];
  }
}

// Reset all progress for a topic
async function resetTopicProgress(topic) {
  const user = auth.getCurrentUser();
  if (!user) {
    console.error('No user signed in');
    return false;
  }

  try {
    const snapshot = await db.collection('users')
      .doc(user.uid)
      .collection('flashcards')
      .where('topic', '==', topic)
      .get();

    const batch = db.batch();
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Reset progress for ${snapshot.size} cards in ${topic}`);
    return true;
  } catch (error) {
    console.error('Error resetting progress:', error);
    return false;
  }
}

// Save study session stats
async function saveStudySession(topic, stats) {
  const user = auth.getCurrentUser();
  if (!user) {
    console.error('No user signed in');
    return false;
  }

  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const docRef = db.collection('users')
      .doc(user.uid)
      .collection('studySessions')
      .doc(today);

    await docRef.set({
      date: today,
      [topic]: {
        cardsReviewed: firebase.firestore.FieldValue.increment(stats.cardsReviewed || 0),
        timeSpent: firebase.firestore.FieldValue.increment(stats.timeSpent || 0),
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
      }
    }, { merge: true });

    console.log(`Study session saved for ${topic}`);
    return true;
  } catch (error) {
    console.error('Error saving study session:', error);
    return false;
  }
}

// Load study session stats for today
async function loadTodayStudyStats() {
  const user = auth.getCurrentUser();
  if (!user) {
    console.error('No user signed in');
    return null;
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const docRef = db.collection('users')
      .doc(user.uid)
      .collection('studySessions')
      .doc(today);

    const doc = await docRef.get();
    if (doc.exists) {
      return doc.data();
    }
    return null;
  } catch (error) {
    console.error('Error loading study stats:', error);
    return null;
  }
}

// Export functions
window.firestore = {
  saveFlashcardProgress,
  loadFlashcardProgress,
  loadAllFlashcardProgress,
  getDueCards,
  resetTopicProgress,
  saveStudySession,
  loadTodayStudyStats
};
