import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBGWtodrussMLE5LQBJQk9uUZUXOL-0Am0",
    authDomain: "docs-dfcb9.firebaseapp.com",
    projectId: "docs-dfcb9",
    storageBucket: "docs-dfcb9.appspot.com",
    messagingSenderId: "809662588511",
    appId: "1:809662588511:web:d6c3b230d4f148b762ddea"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export { db }