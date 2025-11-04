# User Sign-In & Profile Guide

## What You'll See

### Before Sign-In (Not Logged In)
```
Landing Page (index.html)
┌─────────────────────────────────────────────────────────────┐
│  Top Right: Empty (no profile)                              │
│                                                              │
│                    Chemistry Flashcards                      │
│      Master A-Level Chemistry with interactive flashcards   │
│                                                              │
│              [ Sign in with Google ]                         │
│                   (Google Icon)                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### After Sign-In (Logged In)
```
Landing Page (index.html)
┌─────────────────────────────────────────────────────────────┐
│  Top Right: [Avatar] Your Name [Sign Out]                   │
│                                                              │
│                    Chemistry Flashcards                      │
│      Master A-Level Chemistry with interactive flashcards   │
│                                                              │
│                  [ Browse Topics ]                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Step-by-Step: How to Sign In

### 1. Click "Sign in with Google"
- Located on the landing page (index.html)
- Red button with Google icon
- Visible when you're not signed in

### 2. Google Login Window Appears
- A popup window will open with Google login
- Enter your Google email or phone number
- Enter your password
- Complete any verification (if needed)

### 3. You're Signed In!
- Popup closes automatically
- Profile appears in top-right corner with:
  - Your Google profile picture (circular)
  - Your name
  - "Sign Out" button
- "Sign in with Google" button is replaced with "Browse Topics"

## Where You'll See Your Profile

Your profile section appears on every page:
- ✅ Landing Page (index.html)
- ✅ Organic Chemistry (Organic.html)
- ✅ Inorganic Chemistry (Inorganic.html)
- ✅ Physical Chemistry (physical.html)
- ✅ All topic-specific pages

## How to Sign Out

### Method 1: Click "Sign Out" Button
- Located in top-right corner (inside profile section)
- Click the red "Sign Out" button
- You'll be redirected to the landing page
- Your profile disappears
- "Sign in with Google" button reappears

### Method 2: Close Browser/Tab
- Simply closing the page doesn't sign you out
- Your session persists (you stay logged in)
- This is intentional - you won't need to sign in again next time

## What Information Is Shared

When you sign in with Google, we access:
- **Your Name**: Displayed in the profile section
- **Your Profile Picture**: Shown as the avatar
- **Your Email**: Used to identify your account

We do **NOT** access:
- ❌ Your password (Google handles this)
- ❌ Your personal files or documents
- ❌ Your contacts or calendar
- ❌ Any other sensitive information

## Mobile Experience

On mobile devices, the profile section adapts:
- **Smaller Screen Space**: Avatar and button still visible
- **Your Name**: Hidden to save space
- **Still Functional**: All features work the same

```
Mobile View:
┌──────────────────────┐
│ [Avatar] [Sign Out] │
│                      │
│  Organic Chemistry   │
│                      │
└──────────────────────┘
```

## Troubleshooting

### "Sign in with Google" button doesn't work
1. Make sure pop-ups are allowed for this website
2. Check that you have internet connection
3. Try a different browser (Chrome, Firefox, Safari, Edge)
4. Clear browser cache and cookies

### Profile doesn't appear after signing in
1. Wait a moment - it takes 1-2 seconds to load
2. Refresh the page (F5 or Ctrl+R)
3. Check browser console for error messages (F12)
4. Try signing out and signing back in

### Can't sign in with your Google account
1. Make sure you're using a valid Google account
2. Check that your Google account password is correct
3. Verify you're not in private/incognito mode
4. Try signing in from a different browser

### Your profile information looks wrong
1. Your profile info comes from your Google account
2. To change your name or picture:
   - Go to https://myaccount.google.com
   - Click "Personal info" or "Profile picture"
   - Make your changes
   - Refresh this page to see updates

## Security & Privacy

### Your Data is Safe
- All sign-in handled by Google (encrypted)
- Sessions stored locally on your device
- No passwords stored in this application
- You can sign out anytime

### Privacy
- Your data is not shared with third parties
- Only you can see your profile information
- Review our Privacy Policy for details

## Need Help?

If you encounter any issues:
1. Check your browser console (Press F12)
2. Look for red error messages
3. Try clearing browser cache
4. Reach out through the contact form

## FAQ

**Q: Can I use a different account?**
A: Yes! Click "Sign Out", then "Sign in with Google" again and choose a different account.

**Q: Will I stay logged in?**
A: Yes, your session persists. You'll stay logged in until you click "Sign Out".

**Q: Can I change my profile picture?**
A: Your profile picture comes from your Google account. Change it at myaccount.google.com.

**Q: What if I forget to sign out?**
A: No worries! Your session is secure. You can always sign out when you remember.

**Q: Can others see my profile?**
A: No, your profile is private to your session on this device.

**Q: Is my email shared anywhere?**
A: No, your email is only used internally to identify your account.
