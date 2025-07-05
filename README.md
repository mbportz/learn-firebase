# 📚 Firebase Practice Summary

This document summarizes what I learned and implemented while practicing **Firebase** basics with JavaScript.

---

## ✅ **1️⃣ Firebase Project Setup**
- Created a Firebase project in the console.
- Retrieved `firebaseConfig` with API keys.
- Initialized Firebase using `initializeApp()`.

---

## ✅ **2️⃣ Firestore Database**
- Connected to Firestore with `getFirestore()`.
- Created a **collection** named `books`.
- Wrote **queries** with `query()`, `where()`, `orderBy()`.
- Set up **real-time listeners** with `onSnapshot()` to sync data live.

**CRUD in Firestore:**
- `addDoc()` — Add new documents (books).
- `deleteDoc()` — Delete documents by ID.
- `getDoc()` — Fetch a single document.
- `updateDoc()` — Update a document’s fields.

---

## ✅ **3️⃣ Firebase Authentication**
- Connected Firebase Auth with `getAuth()`.
- **Sign Up:** Used `createUserWithEmailAndPassword()`.
- **Login:** Used `signInWithEmailAndPassword()`.
- **Logout:** Used `signOut()`.
- **Auth State Listener:** Used `onAuthStateChanged()` to track if user is logged in/out.

---

## ✅ **4️⃣ Real-time Subscriptions & Cleanup**
- Set up **real-time listeners** for:
  - Firestore collection changes
  - Single document changes
  - Auth state changes
- Learned to **unsubscribe** with `unsubCol()`, `unsubDoc()`, and `unsubAuth()` when not needed.

---

## 🗂️ **Key Takeaways**
- Learned how to integrate Firestore database with CRUD and real-time listeners.
- Implemented authentication flows for sign up, login, logout.
- Practiced managing live data updates and cleaning up listeners properly.

Next steps: Explore Firebase Storage, deploy security rules, and try hosting.

---

*This README.md documents my current Firebase learning progress.*

