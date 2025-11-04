# Authentication Flow Diagram

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────────┐
│                    USER JOURNEY FLOW CHART                          │
└─────────────────────────────────────────────────────────────────────┘

                            START
                             │
                             ▼
                    User Visits Website
                             │
                             ▼
        ┌─────────────────────────────────────┐
        │   Firebase Checks Auth State        │
        └─────────────────────────────────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
      User Logged In?              User NOT Logged In?
      (Has Session)                (No Session)
              │                             │
              ▼                             ▼
    ┌─────────────────┐        ┌──────────────────────┐
    │ onUserSignedIn  │        │ onUserSignedOut      │
    │   (user)        │        │   (no user)          │
    └─────────────────┘        └──────────────────────┘
              │                             │
              ▼                             ▼
    ┌─────────────────┐        ┌──────────────────────┐
    │ Display:        │        │ Show:                │
    │ • Avatar        │        │ • Sign in button     │
    │ • User name     │        │ • "Browse Topics"    │
    │ • Sign Out btn  │        │   hidden             │
    └─────────────────┘        └──────────────────────┘
              │                             │
              │                             │ User Clicks "Sign in"
              │                             │
              │                             ▼
              │                  ┌──────────────────────┐
              │                  │  Google Login Popup  │
              │                  │  Opens               │
              │                  └──────────────────────┘
              │                             │
              │                             ▼
              │                  ┌──────────────────────┐
              │                  │ User Enters:         │
              │                  │ • Email/Phone        │
              │                  │ • Password           │
              │                  │ • Completes 2FA      │
              │                  └──────────────────────┘
              │                             │
              │                             ▼
              │                  ┌──────────────────────┐
              │                  │ Google Verifies      │
              │                  │ Credentials          │
              │                  └──────────────────────┘
              │                             │
              │                             ▼
              │                  ┌──────────────────────┐
              │                  │ Returns User Data:   │
              │                  │ • Name               │
              │                  │ • Email              │
              │                  │ • Profile Picture    │
              │                  └──────────────────────┘
              │                             │
              └──────────────┬──────────────┘
                             ▼
                  ┌──────────────────────┐
                  │ Firebase Stores      │
                  │ Session (LOCAL)      │
                  └──────────────────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ onUserSignedIn()     │
                  │ Called               │
                  └──────────────────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ Display Profile:     │
                  │ • Avatar             │
                  │ • Name               │
                  │ • Sign Out button    │
                  └──────────────────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ User Can Access      │
                  │ Flashcards           │
                  │ Browse Topics        │
                  └──────────────────────┘
                             │
         ┌───────────────────┴────────────────────┐
         │                                        │
    User Navigates               User Clicks
    (Session Persists)           "Sign Out"
         │                                │
         ▼                                ▼
    ┌─────────┐                  ┌──────────────────┐
    │ Still   │                  │ Clear Session    │
    │ Logged  │                  │ (Firebase)       │
    │ In      │                  └──────────────────┘
    └─────────┘                           │
         │                                ▼
         │                       ┌──────────────────┐
         │                       │ onUserSignedOut()│
         │                       │ Called           │
         │                       └──────────────────┘
         │                                │
         └───────────────────┬────────────┘
                             ▼
                  ┌──────────────────────┐
                  │ Hide Profile         │
                  │ Show Sign In Button  │
                  │ Redirect to Home     │
                  └──────────────────────┘
                             │
                             ▼
                           END
```

## Sign-In Process (Detailed)

```
┌──────────────────────────────────────────────────────────┐
│               SIGN IN WITH GOOGLE FLOW                   │
└──────────────────────────────────────────────────────────┘

1. USER CLICKS "SIGN IN WITH GOOGLE"
   ┌──────────────────────────────┐
   │ index.html                   │
   │ <button id="googleSignInBtn">│
   │   Sign in with Google        │
   │ </button>                    │
   └──────────────────────────────┘
                │
                ▼
   googleSignInBtn.addEventListener('click', async () => {
       googleSignInBtn.disabled = true;
       await auth.signInWithGoogle();
   })

2. AUTH.JS HANDLES SIGN-IN
   ┌──────────────────────────────┐
   │ async function               │
   │ signInWithGoogle() {          │
   │   const result = await       │
   │   auth.signInWithPopup(       │
   │     googleProvider           │
   │   );                         │
   │   return result.user;        │
   │ }                            │
   └──────────────────────────────┘
                │
                ▼
   GOOGLE LOGIN POPUP OPENS
   ┌──────────────────────────────┐
   │  Google Sign-In Dialog       │
   │ ┌────────────────────────┐   │
   │ │ Google Account Login   │   │
   │ ├────────────────────────┤   │
   │ │ Email or phone:        │   │
   │ │ [__________________]   │   │
   │ │         [Next]         │   │
   │ │ [Create account]       │   │
   │ └────────────────────────┘   │
   └──────────────────────────────┘
                │
                ▼
   USER ENTERS CREDENTIALS
   ┌──────────────────────────────┐
   │ → Email entered              │
   │ → Click Next                 │
   │ → Password entered           │
   │ → Click Next                 │
   │ → 2FA verified (if enabled)  │
   └──────────────────────────────┘
                │
                ▼
   FIREBASE RECEIVES USER DATA
   ┌──────────────────────────────┐
   │ User Object {                │
   │   uid: "abc123...",          │
   │   email: "user@email.com",   │
   │   displayName: "John Doe",   │
   │   photoURL: "https://...",   │
   │   emailVerified: true,       │
   │   ...                        │
   │ }                            │
   └──────────────────────────────┘
                │
                ▼
   FIREBASE STORES SESSION (LOCAL)
   ┌──────────────────────────────┐
   │ localStorage {               │
   │   "firebase:...": {          │
   │     "uid": "abc123...",      │
   │     "email": "user@...",     │
   │     "sessionId": "xyz...",   │
   │     ...                      │
   │   }                          │
   │ }                            │
   └──────────────────────────────┘
                │
                ▼
   AUTH.JS CALLBACK TRIGGERED
   ┌──────────────────────────────┐
   │ auth.onAuthStateChanged((user)│
   │   if (user) {                │
   │     onUserSignedIn(user)      │
   │   }                          │
   │ })                           │
   └──────────────────────────────┘
                │
                ▼
   FIREBASE POPUP CLOSES
   USER STAYS ON CURRENT PAGE
                │
                ▼
   3. INDEX.HTML DISPLAYS PROFILE
   ┌──────────────────────────────┐
   │ function onUserSignedIn() {  │
   │   signInContainer.hide()     │
   │   browseBtn.show()           │
   │   profileDiv.innerHTML = `   │
   │     <div class="user-info">  │
   │       <img src="avatar"/>    │
   │       <span>John Doe</span>  │
   │       <button>Sign Out</button│
   │     </div>                   │
   │   `                          │
   │   profileDiv.show()          │
   │ }                            │
   └──────────────────────────────┘
                │
                ▼
   PROFILE APPEARS IN TOP-RIGHT
   ┌──────────────────────────────┐
   │ [Avatar] John Doe [Sign Out] │
   └──────────────────────────────┘
                │
                ▼
           SUCCESS!
   User can now access flashcards
```

## Sign-Out Process

```
┌──────────────────────────────────────────────────────────┐
│               SIGN OUT FLOW                              │
└──────────────────────────────────────────────────────────┘

1. USER CLICKS "SIGN OUT" BUTTON
   ┌──────────────────────────────┐
   │ Top-Right Corner:            │
   │ [Avatar] Name [Sign Out ✕]   │
   │          Click Here →         │
   └──────────────────────────────┘
                │
                ▼
   Button Handler:
   <button onclick="signOut()">Sign Out</button>

2. AUTH.JS CLEARS SESSION
   ┌──────────────────────────────┐
   │ async function signOut() {   │
   │   await auth.signOut();      │
   │   // Session cleared from    │
   │   // localStorage            │
   │ }                            │
   └──────────────────────────────┘
                │
                ▼
   FIREBASE CLEARS STATE
   ┌──────────────────────────────┐
   │ • Remove user data           │
   │ • Clear session token        │
   │ • Clear localStorage entry   │
   │ • Set currentUser = null     │
   └──────────────────────────────┘
                │
                ▼
   REDIRECT TO HOME PAGE
   ┌──────────────────────────────┐
   │ window.location.href =       │
   │   'index.html'               │
   └──────────────────────────────┘
                │
                ▼
   3. PAGE RELOADS
   ┌──────────────────────────────┐
   │ index.html loads             │
   │ Firebase checks auth state   │
   │ → No user found              │
   │ → onUserSignedOut() called   │
   └──────────────────────────────┘
                │
                ▼
   4. UI UPDATES
   ┌──────────────────────────────┐
   │ • Profile section hidden     │
   │ • "Sign in with Google"      │
   │   button appears             │
   │ • "Browse Topics" button     │
   │   hidden                     │
   └──────────────────────────────┘
                │
                ▼
           SUCCESS!
   User is logged out and sees
   login screen again
```

## Session Persistence

```
┌──────────────────────────────────────────────────────────┐
│        HOW SESSION PERSISTS (Why You Stay Logged In)     │
└──────────────────────────────────────────────────────────┘

SCENARIO: User Logs In, Then Closes Browser

Step 1: User Logs In
┌──────────────┐
│ Logged In ✓  │ → Firebase stores session in browser
│              │    localStorage (LOCAL persistence)
└──────────────┘

Step 2: User Closes Browser
┌──────────────┐
│ Closed ✕     │ → Session data REMAINS in localStorage
│              │    (not deleted when browser closes)
└──────────────┘

Step 3: User Reopens Browser Next Day
┌──────────────┐
│ Revisits     │ → Firebase loads from localStorage
│ Website      │ → Finds stored session
└──────────────┘

Step 4: Firebase Validates Session
┌──────────────┐
│ Check        │ → Is session still valid?
│ Session      │ → YES! User is still logged in!
└──────────────┘

Step 5: User Stays Logged In
┌──────────────┐
│ Logged In ✓  │ → Profile appears automatically
│              │ → No need to sign in again
└──────────────┘

WHAT'S STORED IN localStorage:
┌─────────────────────────────────────┐
│ Key: "firebase:authUser:[projectId]" │
│                                     │
│ Value: {                            │
│   uid: "user123",                   │
│   email: "user@example.com",        │
│   displayName: "John Doe",          │
│   photoURL: "https://...",          │
│   emailVerified: true,              │
│   createdAt: 1699564800000,         │
│   sessionId: "session_xyz",         │
│   ...                               │
│ }                                   │
└─────────────────────────────────────┘

TO CLEAR SESSION (SIGN OUT):
┌──────────────────────────────────┐
│ User clicks "Sign Out"           │
│              ↓                   │
│ firebase.auth().signOut()        │
│              ↓                   │
│ localStorage entry DELETED       │
│              ↓                   │
│ User logged out                  │
└──────────────────────────────────┘
```

## Security Flow

```
┌──────────────────────────────────────────────────────────┐
│        SECURITY: How Passwords Are Protected             │
└──────────────────────────────────────────────────────────┘

YOUR APP                   FIREBASE              GOOGLE
    │                          │                    │
    │──Sign in requested───────→                   │
    │                          │──Check creds──→    │
    │                          │                    │
    │                          │←─Auth token────    │
    │                          │                    │
    │←─Auth token──────────────│                   │
    │                          │                    │
    └─Store in localStorage────┘                    │
       (Encrypted by browser)

Key Points:
✓ Password NEVER sent to your app
✓ Password NEVER stored anywhere
✓ Password sent directly to Google (over HTTPS)
✓ Your app only gets auth token
✓ Token is short-lived and can be refreshed
✓ Token is stored securely by browser

WHAT YOUR APP KNOWS:
• User's name (public info)
• User's email (needed for account ID)
• User's profile picture URL (public info)
• Auth token (proves user is authenticated)

WHAT YOUR APP DOES NOT KNOW:
✗ User's password (ever)
✗ User's phone number (private)
✗ User's contacts (private)
✗ User's calendar (private)
✗ User's files (private)
```

## API Call Flow

```
┌──────────────────────────────────────────────────────────┐
│        HOW FIREBASE CALLS WORK (Behind The Scenes)       │
└──────────────────────────────────────────────────────────┘

1. ON PAGE LOAD:
┌─────────────────────┐
│ Browser             │
│ Loads index.html    │
│   ↓                 │
│ Loads firebase.js   │
│   ↓                 │
│ Loads auth.js       │
│   ↓                 │
│ Firebase initialized│
│   ↓                 │
│ Checks auth state   │
└─────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ POST /auth/check                    │
│ Firebase API Server                 │
│ (encrypted HTTPS)                   │
│                                     │
│ "Check if user has valid session"   │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────┐
│ Browser receives:   │
│ • User data (if)    │
│ • Auth token (if)   │
│ • Refresh token (if)│
└─────────────────────┘

2. USER CLICKS SIGN IN:
┌─────────────────────┐
│ Browser             │
│   ↓                 │
│ Opens Google popup  │
│   ↓                 │
│ User enters creds   │
│   ↓                 │
│ Google verifies     │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│ Google sends back:  │
│ • ID token          │
│ • User info         │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│ Browser → Firebase  │
│ POST /auth/signIn   │
│ with Google token   │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│ Firebase validates  │
│ token with Google   │
└─────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Firebase returns:                   │
│ • Auth token                        │
│ • Refresh token                     │
│ • User UID                          │
│ • User display name, email, photo   │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Browser stores in localStorage:     │
│ • Auth tokens                       │
│ • User data                         │
│ • Session info                      │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ JavaScript callback fired:          │
│ onUserSignedIn(user)                │
│   • Update UI                       │
│   • Show profile                    │
│   • Display user name and picture   │
└─────────────────────────────────────┘

ALL COMMUNICATION IS ENCRYPTED (HTTPS)
```

## Component Interaction Map

```
┌──────────────────────────────────────────────────────────┐
│          COMPONENT INTERACTION DIAGRAM                   │
└──────────────────────────────────────────────────────────┘

┌──────────────┐
│  index.html  │
│              │
│ ┌──────────┐ │
│ │ Sign In  │ │ ──────┐
│ │ Button   │ │       │
│ └──────────┘ │       │
│              │       │
│ ┌──────────┐ │       │
│ │ Profile  │ │←──────┤─────────┐
│ │ Div      │ │       │         │
│ └──────────┘ │       │         │
└──────────────┘       │         │
                       │         │
        ┌──────────────┘         │
        │                        │
        ▼                        │
  ┌──────────┐              ┌────────────┐
  │ auth.js  │              │ firebase-  │
  │          │             │ config.js  │
  │onUserSign├─────────────→│            │
  │In()      │              │ Firebase   │
  │onUserSign├──────────┐   │ SDK        │
  │Out()     │          │   │            │
  └──────────┘          │   └────────────┘
       △                │         △
       │                │         │
       │                └─────────┘
       │                    │
       │                    ▼
       │              ┌──────────────┐
       └──────────────→ Google Auth  │
                      │ Provider     │
                      └──────────────┘
                           │
                           ▼
                      ┌──────────────┐
                      │ Google       │
                      │ Servers      │
                      └──────────────┘

DATA FLOW:
1. User clicks button (index.html)
2. Calls signInWithGoogle (auth.js)
3. Uses GoogleAuthProvider (firebase-config.js)
4. Opens Google auth popup
5. Google verifies user
6. Returns auth token
7. Firebase stores session
8. Calls onUserSignedIn callback
9. index.html displays profile
```

---

## Summary

The authentication flow is:
1. **Load** → Firebase checks if user is logged in
2. **Not Logged In** → Show sign-in button
3. **Sign In Click** → Open Google login popup
4. **Google Auth** → User logs in with Google
5. **Store Session** → Firebase stores session locally
6. **Update UI** → Profile appears in top-right
7. **Sign Out Click** → Clear session and redirect
8. **Not Logged In** → Back to step 2

All communication is encrypted (HTTPS), passwords are never touched by your app, and sessions persist using browser localStorage with Firebase's LOCAL persistence setting.
