/* ==========================================
   WorldCup2026 - Firebase Live Data
   File: frontend/js/firebase-live.js
   Admin এ যা save হবে Website এ দেখাবে
   ========================================== */

import { db, ref, onValue } from "./firebase-config.js";

// -----------------------------------------------
// STREAM LINKS — Admin থেকে real-time update
// -----------------------------------------------
function listenStreamLinks() {
  onValue(ref(db, "streamLinks"), (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // streamSources update করো
    if (data.bbc) {
      if (streamSources.bbc[0])
        streamSources.bbc[0].url = data.bbc.bbc || streamSources.bbc[0].url;
      if (streamSources.bbc[1])
        streamSources.bbc[1].url =
          data.bbc.bbcSport || streamSources.bbc[1].url;
    }
    if (data.itv && streamSources.itv[0])
      streamSources.itv[0].url = data.itv.itv || streamSources.itv[0].url;
    if (data.fifa && streamSources.fifa[0])
      streamSources.fifa[0].url = data.fifa.fifa || streamSources.fifa[0].url;
    if (data.others) {
      if (streamSources.sbs?.[0])
        streamSources.sbs[0].url = data.others.sbs || streamSources.sbs[0].url;
      if (streamSources.trt?.[0])
        streamSources.trt[0].url = data.others.trt || streamSources.trt[0].url;
      if (streamSources.tvp?.[0])
        streamSources.tvp[0].url = data.others.tvp || streamSources.tvp[0].url;
    }
  });
}

// -----------------------------------------------
// LIVE MATCHES — Admin থেকে real-time update
// -----------------------------------------------
function listenMatches() {
  onValue(ref(db, "matches"), (snapshot) => {
    const data = snapshot.val();
    if (!data || !Array.isArray(data)) return;

    // Score strip update করো
    renderAPIScoreStrip(
      data.map((m) => ({
        homeTeam: { shortName: m.homeN, tla: "" },
        awayTeam: { shortName: m.awayN, tla: "" },
        score: { fullTime: { home: m.hs, away: m.as } },
        status:
          m.status === "live"
            ? "IN_PLAY"
            : m.status === "ft"
              ? "FINISHED"
              : "SCHEDULED",
        minute: m.time,
        utcDate: new Date().toISOString(),
      })),
    );

    // Goal notification
    checkForGoals(data);
  });
}

// -----------------------------------------------
// TICKER — Admin থেকে real-time update
// -----------------------------------------------
function listenTicker() {
  onValue(ref(db, "ticker"), (snapshot) => {
    const data = snapshot.val();
    if (!data || !Array.isArray(data)) return;

    const ticker = document.getElementById("tickerContent");
    if (!ticker) return;

    ticker.innerHTML = data
      .map((item) => `<span>${item}</span><span class="dot">●</span>`)
      .join("");
  });
}

// -----------------------------------------------
// SCHEDULE — Admin থেকে real-time update
// -----------------------------------------------
function listenSchedule() {
  onValue(ref(db, "schedule"), (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // scheduleData update করো
    if (data.today) scheduleData.today = data.today;
    if (data.tomorrow) scheduleData.tomorrow = data.tomorrow;
    if (data.week) scheduleData.week = data.week;

    // re-render করো
    renderSchedule("today");
  });
}

// -----------------------------------------------
// INIT — সব listener শুরু করো
// -----------------------------------------------
function initFirebaseLive() {
  listenStreamLinks();
  listenMatches();
  listenTicker();
  listenSchedule();
  console.log("✅ Firebase Live connected!");
}

document.addEventListener("DOMContentLoaded", initFirebaseLive);
