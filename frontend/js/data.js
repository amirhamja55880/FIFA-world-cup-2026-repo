/* ==========================================
   WorldCup2026 - Data File
   File: frontend/js/data.js
   এখানে সব data থাকবে — সহজে edit করা যাবে
   ========================================== */

// -----------------------------------------------
// LIVE MATCHES DATA
// Admin panel থেকে এই data update হবে
// -----------------------------------------------
const liveMatches = [
  { home:'🇦🇷', homeN:'আর্জেন্টিনা', away:'🇫🇷', awayN:'ফ্রান্স', hs:1, as:0, status:'live', time:"67'" },
  { home:'🇧🇷', homeN:'ব্রাজিল',      away:'🇩🇪', awayN:'জার্মানি',  hs:0, as:0, status:'upcoming', time:'রাত ১২:০০' },
  { home:'🇪🇸', homeN:'স্পেন',        away:'🇵🇹', awayN:'পর্তুগাল', hs:2, as:1, status:'ft',       time:'FT' },
  { home:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', homeN:'ইংল্যান্ড',   away:'🇳🇱', awayN:'নেদারল্যান্ড', hs:0, as:0, status:'upcoming', time:'রাত ৩:০০' },
  { home:'🇺🇾', homeN:'উরুগুয়ে',     away:'🇲🇽', awayN:'মেক্সিকো', hs:1, as:1, status:'ft',       time:'FT' },
];

// -----------------------------------------------
// SCHEDULE DATA — BST সময়ে
// -----------------------------------------------
const scheduleData = {
  today: [
    { time:'রাত ১২:০০', home:'🇧🇷 ব্রাজিল',    away:'🇩🇪 জার্মানি',       group:'গ্রুপ E', stadium:'MetLife Stadium',   live:false },
    { time:'রাত ৩:০০',  home:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 ইংল্যান্ড',  away:'🇳🇱 নেদারল্যান্ড', group:'গ্রুপ B', stadium:'SoFi Stadium',       live:false },
    { time:'রাত ৬:০০',  home:'🇮🇹 ইতালি',      away:'🇧🇪 বেলজিয়াম',      group:'গ্রুপ F', stadium:'Rose Bowl',           live:false },
  ],
  tomorrow: [
    { time:'রাত ১২:০০', home:'🇺🇸 USA',         away:'🇲🇽 মেক্সিকো',      group:'গ্রুপ A', stadium:"AT&T Stadium",        live:false },
    { time:'রাত ৩:০০',  home:'🇯🇵 জাপান',       away:'🇰🇷 কোরিয়া',       group:'গ্রুপ C', stadium:"Levi's Stadium",      live:false },
  ],
  week: [
    { time:'শুক্র ১২:০০',home:'🇵🇹 পর্তুগাল',   away:'🇭🇷 ক্রোয়েশিয়া',   group:'গ্রুপ D', stadium:'Hard Rock Stadium',   live:false },
    { time:'শনি ৩:০০',  home:'🇲🇦 মরক্কো',     away:'🇸🇳 সেনেগাল',       group:'গ্রুপ G', stadium:'Rose Bowl',           live:false },
    { time:'রবি ১২:০০', home:'🇦🇺 অস্ট্রেলিয়া', away:'🇸🇦 সৌদি আরব',      group:'গ্রুপ H', stadium:'SoFi Stadium',        live:false },
  ],
};

// -----------------------------------------------
// WATCH CARDS — কোন channel দেখানো হবে
// -----------------------------------------------
const watchCards = {
  hd: [
    { channel:'BBC iPlayer', quality:'1080p HD', icon:'🇬🇧', title:'BBC iPlayer — সব ম্যাচ ফ্রি',         sub:'UK Channel',   statusColor:'green', status:'✅ এখন Live',    src:'bbc'  },
    { channel:'ITV Hub',     quality:'HD 720p',  icon:'🇬🇧', title:'ITV Hub — লাইভ ম্যাচ',                sub:'UK Channel',   statusColor:'green', status:'✅ এখন Live',    src:'itv'  },
    { channel:'FIFA+',       quality:'HD FREE',  icon:'🏆',   title:'FIFA+ — Official বিনামূল্যে',          sub:'Global',       statusColor:'gold',  status:'⚠️ কিছু ম্যাচ', src:'fifa' },
  ],
  multi: [
    { channel:'SBS Australia', quality:'FREE HD', icon:'🇦🇺', title:'SBS — অস্ট্রেলিয়া চ্যানেল',          sub:'Australia',    statusColor:'green', status:'✅ সব ম্যাচ ফ্রি', src:'sbs' },
    { channel:'TRT Spor',      quality:'HD',      icon:'🇹🇷', title:'TRT Spor — তুরস্ক চ্যানেল',           sub:'Turkey',       statusColor:'green', status:'✅ ফ্রি',          src:'trt' },
    { channel:'TVP Sport',     quality:'HD',      icon:'🇵🇱', title:'TVP Sport — পোল্যান্ড চ্যানেল',       sub:'Poland',       statusColor:'green', status:'✅ ফ্রি',          src:'tvp' },
  ],
  free: [
    { channel:'YouTube',  quality:'FREE', icon:'📺', title:'FIFA Official YouTube Channel',              sub:'Global',       statusColor:'gold',  status:'⚠️ হাইলাইটস',     src:'youtube' },
    { channel:'FIFA+',    quality:'FREE', icon:'🏆', title:'FIFA+ Free Matches',                          sub:'Global',       statusColor:'gold',  status:'⚠️ কিছু ম্যাচ',  src:'fifa'    },
  ],
};

// -----------------------------------------------
// STREAM SOURCES — click করলে যে links আসবে
// Admin panel থেকে এই links update করা যাবে
// -----------------------------------------------
const streamSources = {
  bbc: [
    { name:'BBC iPlayer — BBC One Live',   icon:'🇬🇧', desc:'UK-র সেরা HD stream (VPN দরকার)',     quality:'1080p HD', url:'https://www.bbc.co.uk/iplayer/live/bbcone' },
    { name:'BBC Sport Live',                icon:'🏟️',  desc:'BBC Sport live page',                  quality:'HD',       url:'https://www.bbc.co.uk/sport/live'          },
  ],
  itv: [
    { name:'ITV Hub — Live TV',             icon:'🇬🇧', desc:'ITV-র live stream (VPN দরকার)',        quality:'720p HD',  url:'https://www.itv.com/watch/live'            },
  ],
  fifa: [
    { name:'FIFA+',                          icon:'🏆',  desc:'FIFA-র official platform (কিছু ম্যাচ)', quality:'HD',       url:'https://www.fifa.com/fifaplus'             },
  ],
  sbs: [
    { name:'SBS On Demand',                  icon:'🇦🇺', desc:'অস্ট্রেলিয়ার সব ম্যাচ ফ্রি (VPN)',    quality:'HD',       url:'https://www.sbs.com.au/ondemand/sport'     },
  ],
  trt: [
    { name:'TRT Spor',                       icon:'🇹🇷', desc:'তুরস্কের ফ্রি stream (VPN দরকার)',    quality:'HD',       url:'https://www.trtspor.com.tr'                },
  ],
  tvp: [
    { name:'TVP Sport',                      icon:'🇵🇱', desc:'পোল্যান্ডের ফ্রি stream (VPN)',       quality:'HD',       url:'https://sport.tvp.pl'                      },
  ],
  youtube: [
    { name:'FIFA Official YouTube',          icon:'📺',  desc:'Official FIFA YouTube Channel',        quality:'HD',       url:'https://www.youtube.com/fifa'              },
  ],
};

// -----------------------------------------------
// STANDINGS DATA — পয়েন্ট টেবিল
// -----------------------------------------------
const standingsData = {
  A: [
    { pos:1, flag:'🇺🇸', name:'USA',        p:2, w:2, d:0, l:0, gf:4, ga:1, gd:3,  pts:6, form:['w','w'] },
    { pos:2, flag:'🇨🇦', name:'কানাডা',     p:2, w:1, d:0, l:1, gf:2, ga:2, gd:0,  pts:3, form:['l','w'] },
    { pos:3, flag:'🇲🇽', name:'মেক্সিকো',   p:2, w:0, d:1, l:1, gf:1, ga:2, gd:-1, pts:1, form:['d','l'] },
    { pos:4, flag:'🇳🇬', name:'নাইজেরিয়া', p:2, w:0, d:1, l:1, gf:1, ga:3, gd:-2, pts:1, form:['d','l'] },
  ],
  B: [
    { pos:1, flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', name:'ইংল্যান্ড',   p:2, w:2, d:0, l:0, gf:5, ga:1, gd:4,  pts:6, form:['w','w'] },
    { pos:2, flag:'🇳🇱', name:'নেদারল্যান্ড', p:2, w:1, d:1, l:0, gf:3, ga:2, gd:1,  pts:4, form:['d','w'] },
    { pos:3, flag:'🇮🇷', name:'ইরান',         p:2, w:0, d:1, l:1, gf:1, ga:3, gd:-2, pts:1, form:['d','l'] },
    { pos:4, flag:'🇵🇦', name:'Panama',        p:2, w:0, d:0, l:2, gf:0, ga:3, gd:-3, pts:0, form:['l','l'] },
  ],
  C: [
    { pos:1, flag:'🇯🇵', name:'জাপান',        p:2, w:1, d:1, l:0, gf:3, ga:1, gd:2,  pts:4, form:['d','w'] },
    { pos:2, flag:'🇰🇷', name:'কোরিয়া',      p:2, w:1, d:1, l:0, gf:2, ga:1, gd:1,  pts:4, form:['w','d'] },
    { pos:3, flag:'🇦🇺', name:'অস্ট্রেলিয়া', p:2, w:1, d:0, l:1, gf:2, ga:2, gd:0,  pts:3, form:['w','l'] },
    { pos:4, flag:'🇸🇦', name:'সৌদি আরব',     p:2, w:0, d:0, l:2, gf:0, ga:3, gd:-3, pts:0, form:['l','l'] },
  ],
  D: [
    { pos:1, flag:'🇵🇹', name:'পর্তুগাল',   p:2, w:2, d:0, l:0, gf:5, ga:2, gd:3,  pts:6, form:['w','w'] },
    { pos:2, flag:'🇭🇷', name:'ক্রোয়েশিয়া', p:2, w:1, d:0, l:1, gf:3, ga:3, gd:0,  pts:3, form:['w','l'] },
    { pos:3, flag:'🇩🇰', name:'ডেনমার্ক',    p:2, w:0, d:1, l:1, gf:2, ga:3, gd:-1, pts:1, form:['l','d'] },
    { pos:4, flag:'🇹🇳', name:'তিউনিসিয়া',  p:2, w:0, d:1, l:1, gf:2, ga:4, gd:-2, pts:1, form:['d','l'] },
  ],
  E: [
    { pos:1, flag:'🇧🇷', name:'ব্রাজিল',    p:1, w:1, d:0, l:0, gf:2, ga:0, gd:2,  pts:3, form:['w'] },
    { pos:2, flag:'🇩🇪', name:'জার্মানি',   p:1, w:0, d:1, l:0, gf:1, ga:1, gd:0,  pts:1, form:['d'] },
    { pos:3, flag:'🇨🇴', name:'কলম্বিয়া',  p:1, w:0, d:1, l:0, gf:1, ga:1, gd:0,  pts:1, form:['d'] },
    { pos:4, flag:'🇬🇭', name:'ঘানা',       p:1, w:0, d:0, l:1, gf:0, ga:2, gd:-2, pts:0, form:['l'] },
  ],
  F: [
    { pos:1, flag:'🇪🇸', name:'স্পেন',      p:2, w:2, d:0, l:0, gf:6, ga:1, gd:5,  pts:6, form:['w','w'] },
    { pos:2, flag:'🇧🇪', name:'বেলজিয়াম',  p:2, w:1, d:0, l:1, gf:3, ga:3, gd:0,  pts:3, form:['l','w'] },
    { pos:3, flag:'🇮🇹', name:'ইতালি',      p:2, w:1, d:0, l:1, gf:2, ga:2, gd:0,  pts:3, form:['w','l'] },
    { pos:4, flag:'🇦🇱', name:'আলবেনিয়া',  p:2, w:0, d:0, l:2, gf:0, ga:5, gd:-5, pts:0, form:['l','l'] },
  ],
};

// -----------------------------------------------
// VPN GUIDE STEPS
// -----------------------------------------------
const vpnSteps = [
  {
    num: '১',
    title: 'NordVPN ডাউনলোড করুন',
    desc: 'Phone বা Computer-এ NordVPN ডাউনলোড করুন। ৩০ দিনের মানি-ব্যাক গ্যারান্টি আছে।',
    links: [{ text:'⬇️ NordVPN (30 দিন ফ্রি)', url:'https://nordvpn.com' }]
  },
  {
    num: '২',
    title: 'UK Server-এ Connect করুন',
    desc: 'NordVPN চালু করুন → "United Kingdom" বেছে নিন → Connect করুন। মাত্র ৩০ সেকেন্ড লাগে।',
    links: []
  },
  {
    num: '৩',
    title: 'BBC iPlayer বা ITV Hub খুলুন',
    desc: 'ফ্রি account খুলুন (UK postcode: SW1A 1AA) তারপর দেখুন।',
    links: [
      { text:'▶️ BBC iPlayer', url:'https://www.bbc.co.uk/iplayer/live/bbcone' },
      { text:'▶️ ITV Hub',     url:'https://www.itv.com/watch/live' },
    ]
  },
  {
    num: '৪',
    title: 'উপভোগ করুন! ⚽',
    desc: 'HD quality-তে সব ম্যাচ বিনামূল্যে দেখুন। World Cup 2026 এর প্রতিটি মুহূর্ত মিস করবেন না।',
    links: []
  },
];
