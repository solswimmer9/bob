// Authentication Management
// Handles Google Sign-In, Sign-Out, and auth state monitoring

// Current user object
let currentUser = null;

// Initialize Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Sign in with Google
async function signInWithGoogle() {
  try {
    const result = await firebase.auth().signInWithPopup(googleProvider);
    currentUser = result.user;
    console.log('User signed in:', currentUser.displayName);
    return currentUser;
  } catch (error) {
    console.error('Error signing in:', error);

    // Handle different error types
    if (error.code === 'auth/popup-blocked') {
      alert('Pop-up was blocked. Please allow pop-ups for this site and try again.');
    } else if (error.code === 'auth/popup-closed-by-user') {
      // User cancelled - don't show error, just log it
      console.log('User cancelled sign-in');
    } else if (error.code === 'auth/network-request-failed') {
      alert('Network error. Please check your connection and try again.');
    } else if (error.code === 'auth/unauthorized-domain') {
      alert('This domain is not authorized for authentication. Please contact support.');
    } else {
      // Show alert for other unexpected errors
      alert('Failed to sign in: ' + error.message);
    }

    throw error;
  }
}

// Sign out
async function signOut() {
  try {
    await firebase.auth().signOut();
    currentUser = null;
    console.log('User signed out');
    // Redirect to home page
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error signing out:', error);
    alert('Failed to sign out. Please try again.');
  }
}

// Monitor authentication state changes
firebase.auth().onAuthStateChanged((user) => {
  currentUser = user;

  if (user) {
    console.log('User is signed in:', user.displayName);
    onUserSignedIn(user);
  } else {
    console.log('User is signed out');
    onUserSignedOut();
  }
});

// Callback when user signs in (to be overridden by pages)
function onUserSignedIn(user) {
  // This function can be overridden in individual pages
  console.log('User signed in callback:', user.email);
}

// Callback when user signs out (to be overridden by pages)
function onUserSignedOut() {
  // This function can be overridden in individual pages
  console.log('User signed out callback');
}

// Get current user
function getCurrentUser() {
  return currentUser || firebase.auth().currentUser;
}

// Check if user is signed in
function isUserSignedIn() {
  return getCurrentUser() !== null;
}

// Require authentication (redirect to index.html if not signed in)
function requireAuth() {
  return new Promise((resolve, reject) => {
    // Check immediately if user is already loaded
    if (firebase.auth().currentUser) {
      resolve(firebase.auth().currentUser);
      return;
    }

    // Wait for auth state to initialize
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        // Not signed in - redirect to home page
        alert('Please sign in to access flashcards.');
        window.location.href = 'index.html';
        reject(new Error('User not authenticated'));
      }
    });
  });
}

// Update UI to show user profile
function updateUserProfile(user) {
  const profileElements = document.querySelectorAll('.user-profile');

  profileElements.forEach(el => {
    if (user) {
      el.innerHTML = `
        <div class="user-info">
          <img src="${user.photoURL}" alt="${user.displayName}" class="user-avatar" referrerpolicy="no-referrer">
          <span class="user-name">${user.displayName}</span>
          <button class="sign-out-btn" onclick="signOut()">Sign Out</button>
        </div>
      `;
      el.style.display = 'flex';
    } else {
      el.innerHTML = '';
      el.style.display = 'none';
    }
  });
}

// Export functions for use in other scripts
window.auth = {
  signInWithGoogle,
  signOut,
  getCurrentUser,
  isUserSignedIn,
  requireAuth,
  updateUserProfile
};

// Namespace for auth module
window.authModule = {
  signInWithGoogle,
  signOut,
  getCurrentUser,
  isUserSignedIn,
  requireAuth,
  updateUserProfile
};
