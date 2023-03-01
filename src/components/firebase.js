// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBSD5GtGv9FKGGzjbO3oOVvZplgyj09WAs',
    authDomain: 'todo-app-46cd4.firebaseapp.com',
    projectId: 'todo-app-46cd4',
    storageBucket: 'todo-app-46cd4.appspot.com',
    messagingSenderId: '635695027854',
    appId: '1:635695027854:web:4e8d5290a0d900404b1bdf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
