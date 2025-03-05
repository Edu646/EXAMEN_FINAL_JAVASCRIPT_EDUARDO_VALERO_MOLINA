import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD26oNshoW8O42dt8fAEU0ySwSA3vYqh9k",
  authDomain: "vue-examen-52ab6.firebaseapp.com",
  projectId: "vue-examen-52ab6",
  storageBucket: "vue-examen-52ab6.appspot.com",
  messagingSenderId: "717706290189",
  appId: "1:717706290189:web:3810f0cf21fc17a38be144",
  measurementId: "G-313VS3LVRP"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasksCollection = collection(db, "tasks");

// Exportar funciones necesarias
export { db, tasksCollection, addDoc, deleteDoc, updateDoc, doc, onSnapshot };
