/* ==========================================
   WorldCup2026 - Main App Logic
   File: frontend/js/app.js
   ========================================== */

// -----------------------------------------------
// RENDER: LIVE SCORE STRIP
// -----------------------------------------------
function renderLiveStrip() {
  document.getElementById('liveScoreStrip').innerHTML = liveMatches.map(m => `
    <div class="score-card ${m.status === 'live' ? 'live-now' : ''}" onclick="openStreamModal('bbc')">
      <div class="score-team">
        <span class="team-flag">${m.home}</span>
        <span class="team-name">${m.homeN}</span>
      </div>
      <div class="score-box">
        <span class="score-num">${m.hs}</span>
        <span class="score-sep">—</span>
        <span class="score-num">${m.as}</span>
      </div>
      <div class="score-team" style="flex-direction:row-reverse;text-align:right;">
        <span class="team-flag">${m.away}</span>
        <span class="team-name">${m.awayN}</span>
      </div>
      <span class="score-status ${m.status === 'live' ? 'status-live' : m.status === 'ft' ? 'status-ft' : 'status-upcoming'}">
        ${m.status === 'live' ? '🔴 ' + m.time : m.status === 'ft' ? 'FT' : m.time}
      </span>
    </div>
  `).join('');
}

// -----------------------------------------------
// RENDER: WATCH CARDS
// -----------------------------------------------
function renderWatchCards(tabId, cards) {
  const el = document.getElementById('watchGrid-' + tabId);
  if (!el) return;
  el.innerHTML = cards.map(c => `
    <div class="watch-card" onclick="openStreamModal('${c.src}')">
      <div class="watch-thumb">
        <div class="channel-badge">${c.channel}</div>
        <div class="quality-badge">${c.quality}</div>
        <div class="play-btn">▶</div>
      </div>
      <div class="watch-info">
        <div class="watch-title">${c.title}</div>
        <div class="watch-meta">
          <span>${c.icon} ${c.sub}</span>
          <span style="color:${c.statusColor === 'green' ? 'var(--green)' : 'var(--gold)'}">${c.status}</span>
        </div>
        <button class="watch-action">▶ এখনই দেখুন</button>
        <button class="watch-action secondary" onclick="event.stopPropagation();openVpnGuide()">ℹ️ VPN গাইড</button>
      </div>
    </div>
  `).join('');
}

// -----------------------------------------------
// RENDER: SCHEDULE
// -----------------------------------------------
function renderSchedule(tab) {
  const data = scheduleData[tab] || scheduleData.today;
  const labels = { today:'আজকের ম্যাচ (BST)', tomorrow:'আগামীকালের ম্যাচ', week:'এই সপ্তাহের ম্যাচ' };

  document.getElementById('scheduleContent').innerHTML = `
    <div class="schedule-date-header">📅 ${labels[tab]}</div>
    ${data.map(m => `
      <div class="match-row" onclick="openStreamModal('bbc')">
        <div class="match-team">
          <span class="match-team-flag">${m.home.split(' ')[0]}</span>
          <div>
            <div class="match-team-name">${m.home.split(' ').slice(1).join(' ')}</div>
            <div class="match-team-sub">${m.group}</div>
          </div>
        </div>
        <div class="match-center">
          <div class="match-time">${m.time}</div>
          <div style="font-size:11px;color:var(--muted);">BST</div>
          ${m.live ? '<div class="match-live-badge">LIVE</div>' : ''}
        </div>
        <div class="match-team right">
          <span class="match-team-flag">${m.away.split(' ')[0]}</span>
          <div>
            <div class="match-team-name">${m.away.split(' ').slice(1).join(' ')}</div>
            <div class="match-team-sub">${m.stadium}</div>
          </div>
        </div>
        <button class="match-watch-btn ${m.live ? '' : 'upcoming'}">
          ${m.live ? '🔴 লাইভ' : '🔔 রিমাইন্ডার'}
        </button>
      </div>
    `).join('')}
  `;
}

// -----------------------------------------------
// RENDER: STANDINGS TABLE
// -----------------------------------------------
function renderStandings(group) {
  const data = standingsData[group];
  document.getElementById('standingsContent').innerHTML = `
    <table class="standings-table">
      <thead>
        <tr>
          <th>#</th>
          <th style="text-align:left;padding-left:16px;">দল</th>
          <th>P</th><th>W</th><th>D</th><th>L</th>
          <th>GF</th><th>GA</th><th>GD</th>
          <th>PTS</th><th>ফর্ম</th>
        </tr>
      </thead>
      <tbody>
        ${data.map((t, i) => `
          <tr>
            <td><div class="team-pos ${i < 2 ? 'qualify' : i === 3 ? 'danger' : ''}">${t.pos}</div></td>
            <td><div class="team-cell"><span style="font-size:20px;">${t.flag}</span><span style="font-weight:600;">${t.name}</span></div></td>
            <td>${t.p}</td><td>${t.w}</td><td>${t.d}</td><td>${t.l}</td>
            <td>${t.gf}</td><td>${t.ga}</td>
            <td style="color:${t.gd > 0 ? 'var(--green)' : t.gd < 0 ? 'var(--red)' : 'var(--muted)'};">${t.gd > 0 ? '+' : ''}${t.gd}</td>
            <td class="pts-cell">${t.pts}</td>
            <td><div class="form-dots">${t.form.map(f => `<div class="form-dot form-${f}"></div>`).join('')}</div></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="standings-legend">
      <span><span style="color:var(--green)">■</span> পরের রাউন্ডে</span>
      <span><span style="color:var(--red)">■</span> বাদ পড়ছে</span>
    </div>
  `;
}

// -----------------------------------------------
// RENDER: VPN GUIDE STEPS
// -----------------------------------------------
function renderVpnSteps(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = vpnSteps.map(s => `
    <div class="vpn-step">
      <div class="step-num">${s.num}</div>
      <div class="step-text">
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
        ${s.links.map(l => `<a href="${l.url}" target="_blank" class="step-link">${l.text}</a>`).join('')}
      </div>
    </div>
  `).join('');
}

// -----------------------------------------------
// TAB SWITCHERS
// -----------------------------------------------
function switchTab(btn, id) {
  // Watch section tabs
  btn.closest('.section').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.closest('.section').querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + id).classList.add('active');
}

function switchScheduleTab(btn, tab) {
  btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSchedule(tab);
}

function switchGroupTab(btn, group) {
  btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderStandings(group);
}

// -----------------------------------------------
// MODAL: STREAM OPTIONS
// -----------------------------------------------
function openStreamModal(src) {
  const sources = streamSources[src] || streamSources.bbc;
  document.getElementById('streamOptions').innerHTML = sources.map(s => `
    <div class="stream-option">
      <div class="stream-info">
        <div class="stream-icon">${s.icon}</div>
        <div>
          <div class="stream-name">${s.name}</div>
          <div class="stream-desc">${s.desc}</div>
          <span class="stream-quality">${s.quality}</span>
        </div>
      </div>
      <a href="${s.url}" target="_blank">
        <button class="stream-go-btn">▶ দেখুন</button>
      </a>
    </div>
  `).join('') + `
    <div class="info-box blue" style="margin-top:14px;">
      🔒 BBC/ITV দেখতে VPN লাগবে।
      <button onclick="closeModal('streamModal');openVpnGuide();"
        style="background:none;border:none;color:var(--gold);cursor:pointer;font-size:13px;font-weight:600;font-family:inherit;">
        VPN গাইড দেখুন →
      </button>
    </div>
  `;
  document.getElementById('streamModal').classList.add('open');
}

// -----------------------------------------------
// MODAL: VPN GUIDE
// -----------------------------------------------
function openVpnGuide() {
  const body = document.getElementById('vpnModalBody');
  body.innerHTML = `
    <p style="color:var(--muted);font-size:14px;margin-bottom:16px;">মাত্র ৪টি ধাপে সব ম্যাচ দেখুন:</p>
    <div class="vpn-steps" id="vpnModalSteps"></div>
  `;
  document.getElementById('vpnModal').classList.add('open');
  renderVpnSteps('vpnModalSteps');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
});

// -----------------------------------------------
// COUNTDOWN TIMER
// -----------------------------------------------
function updateCountdown() {
  const target = new Date('2026-06-11T20:00:00-06:00'); // Opening ceremony
  const diff = target - new Date();

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<div class="count-box"><div class="count-num" style="color:var(--green)">🔴</div><div class="count-label">LIVE NOW</div></div>';
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  document.getElementById('countdown').innerHTML = `
    <div class="count-box"><div class="count-num">${d}</div><div class="count-label">দিন</div></div>
    <div class="count-box"><div class="count-num">${String(h).padStart(2,'0')}</div><div class="count-label">ঘণ্টা</div></div>
    <div class="count-box"><div class="count-num">${String(m).padStart(2,'0')}</div><div class="count-label">মিনিট</div></div>
    <div class="count-box"><div class="count-num">${String(s).padStart(2,'0')}</div><div class="count-label">সেকেন্ড</div></div>
  `;
}

// -----------------------------------------------
// TOAST NOTIFICATION
// -----------------------------------------------
function showToast(title, msg) {
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastMsg').textContent = msg;
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

// -----------------------------------------------
// MOBILE MENU
// -----------------------------------------------
function toggleMenu() {
  const nav = document.getElementById('mainNav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  nav.style.flexDirection = 'column';
  nav.style.position = 'absolute';
  nav.style.top = '64px';
  nav.style.right = '0';
  nav.style.background = 'var(--dark2)';
  nav.style.padding = '10px';
  nav.style.borderRadius = '0 0 12px 12px';
  nav.style.border = '1px solid var(--border)';
  nav.style.width = '200px';
}

// -----------------------------------------------
// INIT — সব কিছু শুরু করো
// -----------------------------------------------
function init() {
  renderLiveStrip();
  renderWatchCards('hd', watchCards.hd);
  renderWatchCards('multi', watchCards.multi);
  renderWatchCards('free', watchCards.free);
  renderSchedule('today');
  renderStandings('A');
  renderVpnSteps('vpnSteps');
  updateCountdown();

  // প্রতি সেকেন্ডে countdown update
  setInterval(updateCountdown, 1000);

  // Demo goal notification (৩ সেকেন্ড পরে)
  setTimeout(() => showToast('⚽ গোল!', 'আর্জেন্টিনা ১-০ ফ্রান্স — ৬৭ মিনিট'), 3000);
}

// Page load হলে init করো
document.addEventListener('DOMContentLoaded', init);
