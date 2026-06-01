/* ==========================================
   WorldCup2026 - Firebase Config
   File: frontend/js/firebase-config.js
   ========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3SINyVd3nA926E9PcK9VV4oJef5Gzl_8",
  authDomain: "worldcup2026-719a1.firebaseapp.com",
  databaseURL: "https://worldcup2026-719a1-default-rtdb.firebaseio.com",
  projectId: "worldcup2026-719a1",
  storageBucket: "worldcup2026-719a1.firebasestorage.app",
  messagingSenderId: "950987598646",
  appId: "1:950987598646:web:0cb29ce0ee347a24bd2197",
  measurementId: "G-X38E1W3PRT",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set };
