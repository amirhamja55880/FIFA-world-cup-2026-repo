# 🏆 WorldCup2026.live — Project Structure

## 📁 Folder Structure

```
worldcup2026/
│
├── 📁 frontend/              ← মূল Website (দর্শকরা যা দেখবে)
│   ├── index.html            ← মেইন পেজ
│   ├── 📁 css/
│   │   └── style.css         ← সব Design/Style এখানে
│   ├── 📁 js/
│   │   ├── data.js           ← সব Data (match, score, links)
│   │   └── app.js            ← সব Logic/Function এখানে
│   └── 📁 images/            ← Logo, banner ইত্যাদি
│
├── 📁 admin/                 ← Admin Panel (শুধু আপনি দেখবেন)
│   ├── index.html            ← Admin Login + Dashboard
│   ├── 📁 css/
│   │   └── admin.css         ← Admin panel design
│   └── 📁 js/
│       └── admin.js          ← Admin এর সব function
│
└── 📁 backend/               ← Server (পরে Node.js দিয়ে বানাবো)
    └── (coming soon)
```

---

## 🔑 Admin Panel Login

- **URL:** `yoursite.com/admin/`
- **Username:** `admin`
- **Password:** `worldcup2026`
- ⚠️ Password পরিবর্তন করুন `admin/js/admin.js` ফাইলে

---

## ✏️ কিভাবে Edit করবেন

### Stream Link পরিবর্তন করতে:
→ `frontend/js/data.js` খুলুন → `streamSources` object-এ url পরিবর্তন করুন

### Match Score পরিবর্তন করতে:
→ Admin Panel এ যান → Live Scores section

### Schedule পরিবর্তন করতে:
→ `frontend/js/data.js` খুলুন → `scheduleData` object edit করুন

### Design পরিবর্তন করতে:
→ `frontend/css/style.css` খুলুন

---

## 🚀 Hosting (Netlify — বিনামূল্যে)

1. netlify.com এ account খুলুন
2. `worldcup2026` folder টা zip করুন
3. Netlify-তে drag & drop করুন
4. ✅ Site live!

---

## 💰 আয়ের উপায়

1. **Google AdSense** → analytics.google.com
2. **NordVPN Affiliate** → nordvpn.com/affiliates
3. **ExpressVPN Affiliate** → expressvpn.com/affiliates

---

Made with ❤️ for বাংলাদেশ 🇧🇩
