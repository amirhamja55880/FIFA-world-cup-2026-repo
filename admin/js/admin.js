/* ==========================================
   WorldCup2026 - Admin Panel Logic
   File: admin/js/admin.js
   ========================================== */

// -----------------------------------------------
// LOGIN SYSTEM
// password এখানে change করুন
// -----------------------------------------------
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'worldcup2026'; // ⚠️ এটা পরিবর্তন করুন

function doLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    showToast('✅ লগইন সফল!', 'success');
    renderScoreCards();
    renderTickerItems();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}

function doLogout() {
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('loginPass').value = '';
}

// Enter key on login
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginPass').addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin();
  });
});

// -----------------------------------------------
// SECTION NAVIGATION
// -----------------------------------------------
const sectionTitles = {
  overview: '📊 Overview',
  streams:  '📺 Stream Links',
  scores:   '⚽ Live Scores',
  schedule: '📅 Schedule',
  ticker:   '📢 Ticker Text',
  settings: '⚙️ Settings',
};

function showSection(name) {
  // সব section hide করো
  document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // selected section show করো
  document.getElementById('section-' + name).classList.add('active');
  document.getElementById('sectionTitle').textContent = sectionTitles[name];

  // active nav item
  event.target.classList.add('active');
}

// -----------------------------------------------
// STREAM LINK SAVE
// -----------------------------------------------
function saveStream(type) {
  const links = {
    bbc:    { bbc: document.getElementById('bbcLink')?.value, bbcSport: document.getElementById('bbcSportLink')?.value },
    itv:    { itv: document.getElementById('itvLink')?.value },
    fifa:   { fifa: document.getElementById('fifaLink')?.value },
    others: {
      sbs: document.getElementById('sbsLink')?.value,
      trt: document.getElementById('trtLink')?.value,
      tvp: document.getElementById('tvpLink')?.value,
    }
  };

  // localStorage-এ save করো (production-এ server API-তে পাঠাবে)
  localStorage.setItem('streamLinks_' + type, JSON.stringify(links[type]));
  showToast('✅ Stream link save হয়েছে!', 'success');
}

// -----------------------------------------------
// LIVE SCORE — MATCH CARDS
// -----------------------------------------------
let matchData = [
  { home:'🇦🇷', homeN:'আর্জেন্টিনা', away:'🇫🇷', awayN:'ফ্রান্স',       hs:1, as:0, status:'live',     time:"67'" },
  { home:'🇧🇷', homeN:'ব্রাজিল',      away:'🇩🇪', awayN:'জার্মানি',      hs:0, as:0, status:'upcoming', time:'রাত ১২:০০' },
  { home:'🇪🇸', homeN:'স্পেন',        away:'🇵🇹', awayN:'পর্তুগাল',     hs:2, as:1, status:'ft',        time:'FT' },
];

function renderScoreCards() {
  const container = document.getElementById('scoreCards');
  if (!container) return;

  container.innerHTML = matchData.map((m, i) => `
    <div class="score-edit-card">
      <div>
        <div style="font-size:20px;">${m.home}</div>
        <div style="font-size:13px;font-weight:600;">${m.homeN}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <input type="number" class="score-input form-group input" value="${m.hs}" min="0"
          onchange="updateScore(${i},'hs',this.value)" style="width:55px;background:var(--dark2);border:1px solid var(--border);border-radius:6px;color:white;text-align:center;padding:6px;font-size:18px;" />
        <span style="color:var(--muted);">—</span>
        <input type="number" class="score-input" value="${m.as}" min="0"
          onchange="updateScore(${i},'as',this.value)" style="width:55px;background:var(--dark2);border:1px solid var(--border);border-radius:6px;color:white;text-align:center;padding:6px;font-size:18px;" />
      </div>
      <div>
        <div style="font-size:20px;">${m.away}</div>
        <div style="font-size:13px;font-weight:600;">${m.awayN}</div>
      </div>
      <select onchange="updateScore(${i},'status',this.value)" style="background:var(--dark2);border:1px solid var(--border);border-radius:6px;color:white;padding:6px 10px;font-family:'Hind Siliguri',sans-serif;">
        <option value="upcoming" ${m.status==='upcoming'?'selected':''}>Upcoming</option>
        <option value="live"     ${m.status==='live'?'selected':''}>🔴 Live</option>
        <option value="ft"       ${m.status==='ft'?'selected':''}>FT</option>
      </select>
      <button class="btn-save btn-danger" onclick="deleteMatch(${i})" style="padding:8px 12px;">🗑️</button>
    </div>
  `).join('');
}

function updateScore(index, field, value) {
  matchData[index][field] = field === 'hs' || field === 'as' ? parseInt(value) : value;
  showToast('✅ Score update হয়েছে!', 'success');
}

function addMatch() {
  const newMatch = {
    home:   document.getElementById('newHome').value || '🏳️',
    homeN:  document.getElementById('newHomeN').value || 'Home Team',
    away:   document.getElementById('newAway').value || '🏳️',
    awayN:  document.getElementById('newAwayN').value || 'Away Team',
    hs:     parseInt(document.getElementById('newHS').value) || 0,
    as:     parseInt(document.getElementById('newAS').value) || 0,
    status: document.getElementById('newStatus').value,
    time:   document.getElementById('newTime').value || 'TBD',
  };
  matchData.push(newMatch);
  renderScoreCards();
  showToast('✅ Match যোগ হয়েছে!', 'success');
}

function deleteMatch(index) {
  if (confirm('এই match delete করবেন?')) {
    matchData.splice(index, 1);
    renderScoreCards();
    showToast('🗑️ Match delete হয়েছে।', 'success');
  }
}

// -----------------------------------------------
// SCHEDULE SAVE
// -----------------------------------------------
function saveSchedule() {
  try {
    const data = JSON.parse(document.getElementById('todaySchedule').value);
    localStorage.setItem('todaySchedule', JSON.stringify(data));
    showToast('✅ Schedule save হয়েছে!', 'success');
  } catch (e) {
    showToast('❌ JSON format ঠিক নেই!', 'error');
  }
}

// -----------------------------------------------
// TICKER MANAGEMENT
// -----------------------------------------------
let tickerItems = [
  '🏆 FIFA World Cup 2026 — ১১ জুন থেকে ১৯ জুলাই',
  '📺 BBC iPlayer ও ITV Hub-এ সব ম্যাচ ফ্রিতে দেখুন',
  '🇺🇸 USA | 🇨🇦 Canada | 🇲🇽 Mexico — মোট ১০৪টি ম্যাচ',
];

function renderTickerItems() {
  const container = document.getElementById('tickerItems');
  if (!container) return;
  container.innerHTML = tickerItems.map((item, i) => `
    <div class="ticker-item">
      <span>${item}</span>
      <button class="ticker-delete" onclick="deleteTicker(${i})">✕</button>
    </div>
  `).join('');
}

function addTicker() {
  const val = document.getElementById('newTicker').value.trim();
  if (!val) { showToast('❌ কিছু লিখুন!', 'error'); return; }
  tickerItems.push(val);
  document.getElementById('newTicker').value = '';
  renderTickerItems();
  localStorage.setItem('tickerItems', JSON.stringify(tickerItems));
  showToast('✅ Ticker যোগ হয়েছে!', 'success');
}

function deleteTicker(i) {
  tickerItems.splice(i, 1);
  renderTickerItems();
  showToast('🗑️ Ticker delete হয়েছে।', 'success');
}

// -----------------------------------------------
// SETTINGS
// -----------------------------------------------
function changePassword() {
  const np = document.getElementById('newPass').value;
  const cp = document.getElementById('confirmPass').value;
  if (!np) { showToast('❌ Password লিখুন!', 'error'); return; }
  if (np !== cp) { showToast('❌ Password match করেনি!', 'error'); return; }
  showToast('✅ Password পরিবর্তন হয়েছে! (server-side implement করুন)', 'success');
}

function saveGA() {
  const gaId = document.getElementById('gaId').value.trim();
  if (!gaId) { showToast('❌ GA ID লিখুন!', 'error'); return; }
  localStorage.setItem('gaId', gaId);
  showToast('✅ Google Analytics ID save হয়েছে!', 'success');
}

// -----------------------------------------------
// TOAST NOTIFICATION
// -----------------------------------------------
function showToast(msg, type = 'success') {
  const t = document.getElementById('adminToast');
  t.textContent = msg;
  t.className = `admin-toast show ${type}`;
  setTimeout(() => t.classList.remove('show'), 3000);
}
