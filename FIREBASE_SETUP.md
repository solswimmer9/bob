# Firebase Setup Guide for Chemistry Flashcards

This guide will walk you through setting up Firebase Authentication and Firestore for your flashcard website.

## Prerequisites

- A Google account
- Your website files ready to deploy
- Basic understanding of Firebase Console

---

## Part 1: Create Firebase Project

### Step 1: Go to Firebase Console

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account

### Step 2: Create a New Project

1. Click **"Add project"** or **"Create a project"**
2. Enter project name: `chemistry-flashcards` (or your preferred name)
3. Click **"Continue"**
4. Disable Google Analytics (optional - you can enable it later if needed)
5. Click **"Create project"**
6. Wait for the project to be created (takes ~30 seconds)
7. Click **"Continue"** when ready

---

## Part 2: Enable Google Authentication

### Step 1: Open Authentication Settings

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"**

### Step 2: Enable Google Sign-In

1. Click on the **"Sign-in method"** tab
2. Find **"Google"** in the list of providers
3. Click on **"Google"**
4. Toggle the **"Enable"** switch to ON
5. Select a **Project support email** (your email address)
6. Click **"Save"**

### Step 3: Add Authorized Domains

1. Still in Authentication, click on **"Settings"** tab
2. Scroll down to **"Authorized domains"**
3. Click **"Add domain"**
4. Add your GitHub Pages domain: `yourusername.github.io`
   - Replace `yourusername` with your actual GitHub username
5. `localhost` should already be listed (for local testing)
6. Click **"Add"**

---

## Part 3: Create Firestore Database

### Step 1: Open Firestore

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**

### Step 2: Choose Security Rules

1. Select **"Start in test mode"**
   - ⚠️ This allows read/write access for testing
   - We'll secure it properly in the next step
2. Click **"Next"**

### Step 3: Choose Location

1. Select a location close to your users
   - For UK: `europe-west2 (London)`
   - For US: `us-central1 (Iowa)` or `us-east1 (South Carolina)`
2. Click **"Enable"**
3. Wait for the database to be created

### Step 4: Set Up Security Rules

1. Once the database is created, click on the **"Rules"** tab
2. Replace the existing rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **"Publish"**
4. Confirm by clicking **"Publish"** again

**These rules ensure:**
- Users can only access their own flashcard progress
- Unauthenticated users cannot access any data
- Each user's data is isolated and secure

---

## Part 4: Register Your Web App

### Step 1: Add Web App to Project

1. In the Firebase Console, go to **Project Overview** (home icon)
2. Click the **Web icon** (`</>`) to add a web app
3. Register app:
   - **App nickname:** `Chemistry Flashcards Web`
   - **Do NOT check** "Also set up Firebase Hosting" (we're using GitHub Pages)
4. Click **"Register app"**

### Step 2: Copy Firebase Configuration

You'll see a code snippet that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-12345.firebaseapp.com",
  projectId: "your-project-12345",
  storageBucket: "your-project-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

**IMPORTANT:** Copy this entire configuration object. You'll need it in the next step.

5. Click **"Continue to console"**

---

## Part 5: Configure Your Website

### Step 1: Update firebase-config.js

1. Open the file `firebase-config.js` in your project
2. Find this section:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

3. **Replace it** with your Firebase configuration from Step 2 above
4. Save the file

**Example of what it should look like:**

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "chemistry-flashcards-12345.firebaseapp.com",
  projectId: "chemistry-flashcards-12345",
  storageBucket: "chemistry-flashcards-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

---

## Part 6: Test Locally

### Step 1: Start a Local Server

You can't just open `index.html` directly in your browser due to CORS restrictions. Use a local server:

**Option A: Using Python (if installed)**
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

**Option B: Using Node.js (if installed)**
```bash
npx http-server -p 8000

# Then visit: http://localhost:8000
```

**Option C: Using VS Code Live Server**
- Install the "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

### Step 2: Test Google Sign-In

1. Open your browser and navigate to `http://localhost:8000`
2. Click the **"Sign in with Google"** button
3. Select your Google account
4. You should be redirected back to the homepage
5. You should see your profile picture and name in the top-right corner

### Step 3: Test Flashcards

1. Click on **"Organic Chemistry"** (or any other topic)
2. You should see flashcards load
3. Click **"Show Answer"**
4. Rate the difficulty (Hard, Medium, or Easy)
5. Check Firebase Console:
   - Go to **Firestore Database**
   - You should see a collection named `users`
   - Under your user ID, you should see `flashcards` collection
   - Each flashcard's progress should be saved there

---

## Part 7: Deploy to GitHub Pages

### Step 1: Update Authorized Domains (if not done already)

1. Go to Firebase Console > Authentication > Settings > Authorized domains
2. Make sure your GitHub Pages domain is added:
   - Format: `yourusername.github.io`
   - Example: `johnsmith.github.io`

### Step 2: Commit and Push to GitHub

```bash
git add .
git commit -m "Add Firebase authentication and Firestore integration"
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** > **Pages**
3. Under "Source", select **"main"** branch
4. Click **"Save"**
5. Wait a few minutes for deployment
6. Visit your site: `https://yourusername.github.io/repository-name`

### Step 4: Test Production

1. Visit your GitHub Pages URL
2. Sign in with Google
3. Test the flashcards
4. Verify progress is saved in Firestore

---

## Troubleshooting

### Issue: "Pop-up blocked" error

**Solution:**
- Allow pop-ups for your site in browser settings
- Or use incognito/private mode

### Issue: "auth/unauthorized-domain" error

**Solution:**
- Go to Firebase Console > Authentication > Settings > Authorized domains
- Add your domain (including `localhost` for local testing)

### Issue: Flashcards not loading

**Solution:**
- Check browser console for errors (F12 > Console tab)
- Verify Firebase config in `firebase-config.js` is correct
- Make sure you're signed in

### Issue: Progress not saving

**Solution:**
- Check Firestore security rules are set correctly
- Verify user is authenticated (profile picture shows in top-right)
- Check browser console for Firestore errors

### Issue: "Failed to fetch" or CORS errors

**Solution:**
- Don't open `index.html` directly in browser
- Use a local server (see Part 6, Step 1)

---

## Data Structure Reference

Your Firestore database will have this structure:

```
users/
  └── {userId}/
      ├── flashcards/
      │   ├── organic_0
      │   │   ├── topic: "organic"
      │   │   ├── index: 0
      │   │   ├── lastReviewed: Timestamp
      │   │   ├── interval: 2
      │   │   ├── easeFactor: 2.5
      │   │   ├── reviewCount: 3
      │   │   ├── difficulty: "medium"
      │   │   └── nextReview: Timestamp
      │   ├── organic_1
      │   └── ...
      └── studySessions/
          └── 2025-01-15
              ├── date: "2025-01-15"
              ├── organic: { cardsReviewed: 5, timeSpent: 300 }
              └── physical: { cardsReviewed: 3, timeSpent: 180 }
```

---

## Security Notes

1. **API Key is Public:** The Firebase API key in `firebase-config.js` is meant to be public. Security is enforced by Firestore rules, not by hiding the API key.

2. **Firestore Rules:** The security rules we set up ensure users can only access their own data.

3. **Authentication Required:** All flashcard pages require users to be signed in.

4. **Data Privacy:** Each user's progress is isolated and cannot be accessed by other users.

---

## Next Steps

1. ✅ Set up Firebase project
2. ✅ Enable Google Authentication
3. ✅ Create Firestore database
4. ✅ Configure security rules
5. ✅ Add Firebase config to your website
6. ✅ Test locally
7. ✅ Deploy to GitHub Pages
8. 🎉 Your flashcard app is now live with cloud-based progress tracking!

---

## Support

If you encounter any issues:

1. Check the [Firebase Documentation](https://firebase.google.com/docs)
2. Review the browser console for error messages
3. Verify all steps in this guide were completed
4. Check that your Firebase configuration is correct

Happy studying! 📚
