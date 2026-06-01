/* ==========================================
   WorldCup2026 - Firebase Admin
   File: admin/js/firebase-admin.js
   Admin থেকে data save করার কাজ
   ========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3SINyVd3nA926E9PcK9VV4oJef5Gzl_8",
  authDomain: "worldcup2026-719a1.firebaseapp.com",
  databaseURL: "https://worldcup2026-719a1-default-rtdb.firebaseio.com",
  projectId: "worldcup2026-719a1",
  storageBucket: "worldcup2026-719a1.firebasestorage.app",
  messagingSenderId: "950987598646",
  appId: "1:950987598646:web:0cb29ce0ee347a24bd2197",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// -----------------------------------------------
// STREAM LINKS SAVE
// -----------------------------------------------
window.saveStream = async function (type) {
  const links = {};

  if (type === "bbc") {
    links.bbc = document.getElementById("bbcLink")?.value;
    links.bbcSport = document.getElementById("bbcSportLink")?.value;
  } else if (type === "itv") {
    links.itv = document.getElementById("itvLink")?.value;
  } else if (type === "fifa") {
    links.fifa = document.getElementById("fifaLink")?.value;
  } else if (type === "others") {
    links.sbs = document.getElementById("sbsLink")?.value;
    links.trt = document.getElementById("trtLink")?.value;
    links.tvp = document.getElementById("tvpLink")?.value;
  }

  try {
    await set(ref(db, "streamLinks/" + type), links);
    showToast("✅ Stream link save হয়েছে!", "success");
  } catch (e) {
    showToast("❌ Error: " + e.message, "error");
  }
};

// -----------------------------------------------
// TICKER SAVE
// -----------------------------------------------
window.saveTicker = async function (items) {
  try {
    await set(ref(db, "ticker"), items);
    showToast("✅ Ticker save হয়েছে!", "success");
  } catch (e) {
    showToast("❌ Error!", "error");
  }
};

// -----------------------------------------------
// LIVE SCORE SAVE
// -----------------------------------------------
window.saveMatches = async function (matches) {
  try {
    await set(ref(db, "matches"), matches);
    showToast("✅ Score save হয়েছে!", "success");
  } catch (e) {
    showToast("❌ Error!", "error");
  }
};

// -----------------------------------------------
// SCHEDULE SAVE
// -----------------------------------------------
window.saveScheduleData = async function (data) {
  try {
    await set(ref(db, "schedule"), data);
    showToast("✅ Schedule save হয়েছে!", "success");
  } catch (e) {
    showToast("❌ Error!", "error");
  }
};

// -----------------------------------------------
// LOAD DATA FROM FIREBASE
// -----------------------------------------------
function loadAdminData() {
  // Stream links load
  onValue(ref(db, "streamLinks"), (snapshot) => {
    const data = snapshot.val();
    if (data) {
      if (data.bbc) {
        if (document.getElementById("bbcLink"))
          document.getElementById("bbcLink").value = data.bbc.bbc || "";
        if (document.getElementById("bbcSportLink"))
          document.getElementById("bbcSportLink").value =
            data.bbc.bbcSport || "";
      }
      if (data.itv && document.getElementById("itvLink"))
        document.getElementById("itvLink").value = data.itv.itv || "";
      if (data.fifa && document.getElementById("fifaLink"))
        document.getElementById("fifaLink").value = data.fifa.fifa || "";
      if (data.others) {
        if (document.getElementById("sbsLink"))
          document.getElementById("sbsLink").value = data.others.sbs || "";
        if (document.getElementById("trtLink"))
          document.getElementById("trtLink").value = data.others.trt || "";
        if (document.getElementById("tvpLink"))
          document.getElementById("tvpLink").value = data.others.tvp || "";
      }
    }
  });

  // Matches load
  onValue(ref(db, "matches"), (snapshot) => {
    const data = snapshot.val();
    if (data) {
      matchData = data;
      renderScoreCards();
    }
  });

  // Ticker load
  onValue(ref(db, "ticker"), (snapshot) => {
    const data = snapshot.val();
    if (data) {
      tickerItems = data;
      renderTickerItems();
    }
  });
}

// Admin login হলে data load করো
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(loadAdminData, 1000);
});
