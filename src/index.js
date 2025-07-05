import { initializeApp } from "firebase/app";
import {
   getFirestore,
   collection,
   onSnapshot,
   addDoc,
   deleteDoc,
   doc,
   query,
   where,
   orderBy,
   serverTimestamp,
   getDoc,
   updateDoc,
} from "firebase/firestore";
import {
   getAuth,
   createUserWithEmailAndPassword,
   signOut,
   signInWithEmailAndPassword,
   onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyABXhQICXjwV14aXRyMmo_lHr-cO3O3FSo",
   authDomain: "fir-mbp-67280.firebaseapp.com",
   projectId: "fir-mbp-67280",
   storageBucket: "fir-mbp-67280.firebasestorage.app",
   messagingSenderId: "912870586885",
   appId: "1:912870586885:web:a585481e911b5acf9d3a6c",
   measurementId: "G-MSJWMSVLZZ",
};

// Initialize Firebase app
initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore();
const auth = getAuth();

// Collection reference
const colRef = collection(db, "books");

// Query: get all books ordered by createdAt
const q = query(colRef, orderBy("createdAt"));

// Example of a filtered query
// const q = query(
//    colRef,
//    where("author", "==", "kaye portuguez"),
//    orderBy("title", "desc")
// );

// Real-time listener for books collection
const unsubCol = onSnapshot(q, (snapshot) => {
   let books = [];
   snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
   });
   console.log(books);
});

/* -------------------- Add Document -------------------- */
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
   e.preventDefault();
   addDoc(colRef, {
      title: addBookForm.title.value,
      author: addBookForm.author.value,
      createdAt: serverTimestamp(),
   }).then(() => {
      addBookForm.reset();
   });
});

/* -------------------- Delete Document -------------------- */
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
   e.preventDefault();
   const docRef = doc(db, "books", deleteBookForm.id.value);
   deleteDoc(docRef).then(() => {
      deleteBookForm.reset();
   });
});

/* -------------------- Update Document -------------------- */
const docRef = doc(db, "books", "Qqp9sEM6W8x8Qp2dBSQH");

// Listen to a single document in real-time
const unsubDoc =  onSnapshot(docRef, (doc) => {
   console.log(doc.data(), doc.id);
});

const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
   e.preventDefault();
   const docRef = doc(db, "books", updateForm.id.value);
   updateDoc(docRef, {
      title: "updated title",
   }).then(() => updateForm.reset());
});

/* -------------------- Sign Up User -------------------- */
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
   e.preventDefault();
   const email = signupForm.email.value;
   const password = signupForm.password.value;
   createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
         signupForm.reset();
      })
      .catch((err) => {
         console.warn(err.message);
      });
});

/* -------------------- Log In & Log Out -------------------- */
const logout = document.querySelector(".logout");
logout.addEventListener("click", () => {
   signOut(auth)
      .then(() => {
         // User signed out
      })
      .catch((err) => {
         console.warn(err);
      });
});

const login = document.querySelector(".login");
login.addEventListener("submit", (e) => {
   e.preventDefault();
   const email = login.email.value;
   const password = login.password.value;
   signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
         // User logged in
      })
      .catch((err) => {
         console.err(err);
         login.reset();
      });
});

/* -------------------- Auth State Listener -------------------- */
const unsubAuth = onAuthStateChanged(auth, (user) => {
   console.log("user status changed", user);
});

// unsubscribing from changes (auth & db)
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
   unsubCol()
   unsubDoc()
   unsubAuth()
})
