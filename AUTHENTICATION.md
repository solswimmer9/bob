# Authentication System Documentation

## Overview

Your Chemistry Flashcards application now has a complete Firebase-powered authentication system with Google Sign-In. Users can sign in with their Google accounts, and their profile information is displayed in the top-right corner with a sign-out button.

## Features Implemented

### 1. Google Sign-In Button
- **Location**: Landing page (index.html)
- **Behavior**: Redirects to Google login when clicked
- **Styling**: Professional white button with Google icon and text "Sign in with Google"

### 2. User Profile Section
- **Location**: Top-right corner of every page
- **Display Elements**:
  - User's Google profile picture (circular avatar)
  - User's display name
  - Sign-Out button
- **Styling**:
  - Fixed positioning at `top: 24px, right: 24px`
  - Responsive design (avatar-only on mobile devices)
  - Card-style background with subtle shadow

### 3. Sign-Out Button
- **Location**: Inside the user profile section (top-right)
- **Behavior**:
  - Signs user out of Firebase
  - Clears session data
  - Redirects to home page (index.html)
  - Shows red background on hover

### 4. Authentication State Management
- **Session Persistence**: Uses Firebase LOCAL persistence
- **Auto-Login**: Users remain logged in across page reloads
- **UI Updates**: Automatically shows/hides sign-in button and profile section based on auth state

## Files Structure

```
/Users/solomonallen/bob/
├── firebase-config.js          # Firebase project configuration
├── auth.js                      # Authentication logic and UI updates
├── firestore.js                # Firestore database integration
├── index.html                  # Landing page with sign-in button
├── Organic.html                # Organic chemistry topic page
├── Inorganic.html             # Inorganic chemistry topic page
├── physical.html               # Physical chemistry topic page
└── styles.css                 # Styling for profile and auth UI
```

## How It Works

### Authentication Flow

1. **User visits the app**
   - Firebase checks if user is already logged in
   - If not logged in, "Sign in with Google" button is visible
   - If logged in, user profile appears in top-right corner

2. **User clicks "Sign in with Google"**
   - Google authentication popup opens
   - User selects their Google account
   - Returns to app with user data (name, email, profile picture)

3. **Profile is displayed**
   - Avatar image from Google account
   - User's display name
   - Sign-Out button becomes available

4. **User clicks Sign-Out**
   - Firebase session is cleared
   - Page redirects to home
   - Profile section is hidden
   - "Sign in with Google" button reappears

### Code Implementation

#### Firebase Configuration (firebase-config.js)
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "chemistry-flashcards-9a831.firebaseapp.com",
  projectId: "chemistry-flashcards-9a831",
  // ... other config
};

firebase.initializeApp(firebaseConfig);
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
```

#### Sign-In Handler (index.html)
```javascript
function onUserSignedIn(user) {
    // Hide sign-in button, show browse topics button
    signInContainer.style.display = 'none';
    browseTopicsContainer.style.display = 'block';

    // Display user profile in top-right
    const userProfile = document.querySelector('.user-profile');
    userProfile.innerHTML = `
        <div class="user-info">
            <img src="${user.photoURL}" alt="${user.displayName}"
                 class="user-avatar" referrerpolicy="no-referrer">
            <span class="user-name">${user.displayName}</span>
            <button class="sign-out-btn" onclick="signOut()">Sign Out</button>
        </div>
    `;
    userProfile.style.display = 'flex';
}
```

#### CSS Styling (styles.css)
```css
.user-profile {
    display: none;
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 1000;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--color-card-bg);
    padding: 12px 20px;
    border-radius: 50px;
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-md);
}

.user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid var(--color-accent);
}

.sign-out-btn {
    background: transparent;
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border);
    padding: 6px 16px;
    font-size: 13px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.sign-out-btn:hover {
    background: #ff4757;
    border-color: #ff4757;
    color: white;
}
```

## Integration Points

All main pages now have authentication integrated:

### Pages with Auth Integration
- ✅ `index.html` - Landing page with sign-in
- ✅ `Organic.html` - Organic chemistry flashcards
- ✅ `Inorganic.html` - Inorganic chemistry flashcards
- ✅ `physical.html` - Physical chemistry flashcards

### What Happens on These Pages
1. Firebase scripts load
2. Auth state is checked
3. If user is logged in:
   - Profile section displays automatically
   - User can access their flashcard progress
4. If user is not logged in:
   - Can still view flashcards (optional - change based on your needs)
   - Sign-in button will appear if you add it to topic pages

## Customization Options

### To require login for flashcards:
Add this to any topic page:
```javascript
// Require user to be signed in
await auth.requireAuth();
```

### To change the profile styling:
Edit the CSS variables in `styles.css`:
```css
--color-accent: #2e5cff;        /* Primary color */
--color-card-bg: #fafafa;       /* Background color */
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
```

### To customize sign-in button:
Edit the HTML in `index.html` (lines 44-52)

## Troubleshooting

### Profile not showing after sign-in
1. Check browser console for errors (Press F12)
2. Verify Firebase scripts are loading
3. Check that `firebase-config.js` has correct project ID

### Sign-out button not working
1. Verify `signOut()` function is defined in `auth.js`
2. Check that button has `onclick="signOut()"` handler
3. Clear browser cache and try again

### User session not persisting
1. Check that `auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)` is enabled
2. Verify browser allows local storage
3. Check browser privacy/incognito mode settings

## Firebase Project Setup

Your Firebase project is already configured with:
- ✅ Authentication enabled (Google provider)
- ✅ Firestore database ready
- ✅ Local persistence enabled
- ✅ CORS configured for localhost and your domain

### Project Details
- **Project ID**: chemistry-flashcards-9a831
- **Auth Domain**: chemistry-flashcards-9a831.firebaseapp.com
- **Auth Method**: Google Sign-In

## Security Notes

### What's Protected
- API key is restricted to Web applications only
- User session is stored securely using Firebase's LOCAL persistence
- Passwords are handled entirely by Google (not stored locally)

### Best Practices
- Never commit `.env` files with sensitive keys
- The API key shown is for web apps only (safe to expose)
- Use HTTPS in production
- Review Firebase security rules for Firestore data

## Next Steps

### Optional Enhancements
1. Add user profile customization page
2. Store flashcard progress in Firestore
3. Add profile picture upload
4. Implement sign-up with email/password
5. Add social sharing features
6. Create user dashboard with statistics

## Support

For Firebase documentation, visit:
https://firebase.google.com/docs/auth/web

For any issues with authentication, check:
1. Firebase Console: https://console.firebase.google.com
2. Browser console for error messages (F12)
3. Network tab to verify API calls
