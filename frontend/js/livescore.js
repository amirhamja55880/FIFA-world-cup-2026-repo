/* ==========================================
   WorldCup2026 - Live Score API
   File: frontend/js/livescore.js
   API: football-data.org
   ========================================== */

const API_TOKEN = "6b68ea9a02ee439c8cfb1caf2a0b0947";
const WC_ID = "WC"; // FIFA World Cup competition ID

// -----------------------------------------------
// API থেকে data নেওয়ার function
// -----------------------------------------------
async function fetchAPI(endpoint) {
  try {
    const response = await fetch(
      `https://api.football-data.org/v4/${endpoint}`,
      {
        headers: { "X-Auth-Token": API_TOKEN },
      },
    );
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

// -----------------------------------------------
// LIVE + TODAY'S MATCHES
// -----------------------------------------------
async function fetchLiveMatches() {
  const data = await fetchAPI(`competitions/${WC_ID}/matches?status=LIVE`);
  const todayData = await fetchAPI(
    `competitions/${WC_ID}/matches?status=IN_PLAY,PAUSED,FINISHED&dateFrom=${getToday()}&dateTo=${getToday()}`,
  );

  let matches = [];

  // Live matches
  if (data && data.matches) {
    matches = [...data.matches];
  }

  // Today's matches
  if (todayData && todayData.matches) {
    todayData.matches.forEach((m) => {
      if (!matches.find((lm) => lm.id === m.id)) {
        matches.push(m);
      }
    });
  }

  if (matches.length > 0) {
    renderAPIScoreStrip(matches);
  }
}

// -----------------------------------------------
// UPCOMING MATCHES (Schedule)
// -----------------------------------------------
async function fetchSchedule() {
  const data = await fetchAPI(
    `competitions/${WC_ID}/matches?status=SCHEDULED&dateFrom=${getToday()}&dateTo=${getNextDays(7)}`,
  );

  if (data && data.matches && data.matches.length > 0) {
    renderAPISchedule(data.matches);
  }
}

// -----------------------------------------------
// STANDINGS
// -----------------------------------------------
async function fetchStandings() {
  const data = await fetchAPI(`competitions/${WC_ID}/standings`);

  if (data && data.standings) {
    renderAPIStandings(data.standings);
  }
}

// -----------------------------------------------
// RENDER: SCORE STRIP
// -----------------------------------------------
function renderAPIScoreStrip(matches) {
  const container = document.getElementById("liveScoreStrip");
  if (!container) return;

  const html = matches
    .slice(0, 8)
    .map((m) => {
      const isLive = m.status === "IN_PLAY" || m.status === "PAUSED";
      const isFT = m.status === "FINISHED";
      const homeScore = m.score?.fullTime?.home ?? 0;
      const awayScore = m.score?.fullTime?.away ?? 0;
      const minute = m.minute ? m.minute + "'" : "";
      const time = isLive
        ? `🔴 ${minute}`
        : isFT
          ? "FT"
          : formatTime(m.utcDate);

      return `
      <div class="score-card ${isLive ? "live-now" : ""}" onclick="openStreamModal('bbc')">
        <div class="score-team">
          <span class="team-flag">${getFlagEmoji(m.homeTeam.tla)}</span>
          <span class="team-name">${m.homeTeam.shortName || m.homeTeam.name}</span>
        </div>
        <div class="score-box">
          <span class="score-num">${homeScore}</span>
          <span class="score-sep">—</span>
          <span class="score-num">${awayScore}</span>
        </div>
        <div class="score-team" style="flex-direction:row-reverse;text-align:right;">
          <span class="team-flag">${getFlagEmoji(m.awayTeam.tla)}</span>
          <span class="team-name">${m.awayTeam.shortName || m.awayTeam.name}</span>
        </div>
        <span class="score-status ${isLive ? "status-live" : isFT ? "status-ft" : "status-upcoming"}">
          ${time}
        </span>
      </div>
    `;
    })
    .join("");

  container.innerHTML = html || container.innerHTML;
}

// -----------------------------------------------
// RENDER: SCHEDULE
// -----------------------------------------------
function renderAPISchedule(matches) {
  const container = document.getElementById("scheduleContent");
  if (!container) return;

  // Group by date
  const grouped = {};
  matches.forEach((m) => {
    const date = new Date(m.utcDate).toLocaleDateString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(m);
  });

  let html = "";
  Object.keys(grouped)
    .slice(0, 3)
    .forEach((date) => {
      html += `<div class="schedule-date-header">📅 ${date} (BST)</div>`;
      grouped[date].forEach((m) => {
        const isLive = m.status === "IN_PLAY";
        const time = formatTimeBST(m.utcDate);
        html += `
        <div class="match-row" onclick="openStreamModal('bbc')">
          <div class="match-team">
            <span class="match-team-flag">${getFlagEmoji(m.homeTeam.tla)}</span>
            <div>
              <div class="match-team-name">${m.homeTeam.shortName || m.homeTeam.name}</div>
              <div class="match-team-sub">${m.group || "World Cup"}</div>
            </div>
          </div>
          <div class="match-center">
            <div class="match-time">${time}</div>
            <div style="font-size:11px;color:var(--muted);">BST</div>
            ${isLive ? '<div class="match-live-badge">LIVE</div>' : ""}
          </div>
          <div class="match-team right">
            <span class="match-team-flag">${getFlagEmoji(m.awayTeam.tla)}</span>
            <div>
              <div class="match-team-name">${m.awayTeam.shortName || m.awayTeam.name}</div>
              <div class="match-team-sub">${m.venue || "Stadium"}</div>
            </div>
          </div>
          <button class="match-watch-btn ${isLive ? "" : "upcoming"}">
            ${isLive ? "🔴 লাইভ" : "🔔 রিমাইন্ডার"}
          </button>
        </div>
      `;
      });
    });

  if (html) container.innerHTML = html;
}

// -----------------------------------------------
// RENDER: STANDINGS
// -----------------------------------------------
function renderAPIStandings(standings) {
  const container = document.getElementById("standingsContent");
  if (!container) return;

  // First group
  const group = standings[0];
  if (!group) return;

  const html = `
    <table class="standings-table">
      <thead>
        <tr>
          <th>#</th>
          <th style="text-align:left;padding-left:16px;">দল</th>
          <th>P</th><th>W</th><th>D</th><th>L</th>
          <th>GF</th><th>GA</th><th>GD</th>
          <th>PTS</th>
        </tr>
      </thead>
      <tbody>
        ${group.table
          .map(
            (t, i) => `
          <tr>
            <td><div class="team-pos ${i < 2 ? "qualify" : ""}">${t.position}</div></td>
            <td>
              <div class="team-cell">
                <img src="${t.team.crest}" width="20" height="20" style="border-radius:2px;" onerror="this.style.display='none'"/>
                <span style="font-weight:600;">${t.team.shortName || t.team.name}</span>
              </div>
            </td>
            <td>${t.playedGames}</td>
            <td>${t.won}</td>
            <td>${t.draw}</td>
            <td>${t.lost}</td>
            <td>${t.goalsFor}</td>
            <td>${t.goalsAgainst}</td>
            <td style="color:${t.goalDifference > 0 ? "var(--green)" : t.goalDifference < 0 ? "var(--red)" : "var(--muted)"};">
              ${t.goalDifference > 0 ? "+" : ""}${t.goalDifference}
            </td>
            <td class="pts-cell">${t.points}</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
    <div class="standings-legend">
      <span><span style="color:var(--green)">■</span> পরের রাউন্ডে</span>
    </div>
  `;

  container.innerHTML = html;
}

// -----------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------
function getToday() {
  return new Date().toISOString().split("T")[0];
}

function getNextDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function formatTime(utcDate) {
  const d = new Date(utcDate);
  // BST = UTC+6 (Bangladesh)
  return d.toLocaleTimeString("bn-BD", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
  });
}

function formatTimeBST(utcDate) {
  const d = new Date(utcDate);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  });
}

// Team code থেকে flag emoji
function getFlagEmoji(tla) {
  const flags = {
    ARG: "🇦🇷",
    BRA: "🇧🇷",
    FRA: "🇫🇷",
    GER: "🇩🇪",
    ESP: "🇪🇸",
    POR: "🇵🇹",
    ENG: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    NED: "🇳🇱",
    BEL: "🇧🇪",
    ITA: "🇮🇹",
    URU: "🇺🇾",
    MEX: "🇲🇽",
    USA: "🇺🇸",
    CAN: "🇨🇦",
    JPN: "🇯🇵",
    KOR: "🇰🇷",
    AUS: "🇦🇺",
    MAR: "🇲🇦",
    SEN: "🇸🇳",
    GHA: "🇬🇭",
    CMR: "🇨🇲",
    NGA: "🇳🇬",
    CRO: "🇭🇷",
    DEN: "🇩🇰",
    SUI: "🇨🇭",
    POL: "🇵🇱",
    TUN: "🇹🇳",
    IRN: "🇮🇷",
    SAU: "🇸🇦",
    QAT: "🇶🇦",
    ECU: "🇪🇨",
    SRB: "🇷🇸",
    WAL: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    COL: "🇨🇴",
    VEN: "🇻🇪",
  };
  return flags[tla] || "🏳️";
}

// -----------------------------------------------
// NOTIFICATION — গোল হলে
// -----------------------------------------------
let lastScores = {};

function checkForGoals(matches) {
  matches.forEach((m) => {
    const key = m.id;
    const currentScore = `${m.score?.fullTime?.home}-${m.score?.fullTime?.away}`;

    if (lastScores[key] && lastScores[key] !== currentScore) {
      showToast(
        "⚽ গোল!",
        `${m.homeTeam.shortName} ${m.score?.fullTime?.home} - ${m.score?.fullTime?.away} ${m.awayTeam.shortName}`,
      );
    }
    lastScores[key] = currentScore;
  });
}

// -----------------------------------------------
// AUTO UPDATE — প্রতি ৬০ সেকেন্ডে
// -----------------------------------------------
async function startLiveUpdates() {
  // প্রথমবার load
  await fetchLiveMatches();
  await fetchSchedule();
  await fetchStandings();

  // প্রতি ৩০ সেকেন্ডে update
  setInterval(async () => {
    await fetchLiveMatches();
  }, 30000);

  // প্রতি ৫ মিনিটে schedule update
  setInterval(async () => {
    await fetchSchedule();
    await fetchStandings();
  }, 300000);
}

// Page load হলে শুরু করো
document.addEventListener("DOMContentLoaded", () => {
  startLiveUpdates();
});
