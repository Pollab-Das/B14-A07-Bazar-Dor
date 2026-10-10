# 🛒 বাজার দর (BazarDor)

> **প্রয়োজনীয় পণ্যের দাম এক নজরে** — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর।

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![BetterAuth](https://img.shields.io/badge/BetterAuth-latest-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

---

## 🔗 Live Links

- **🌐 Live Site:** [https://b14-a07-bazar-dor-mpe7.vercel.app](https://b14-a07-bazar-dor-mpe7.vercel.app)
- **📦 GitHub Repo:** [https://github.com/Pollab-Das/B14-A07-Bazar-Dor](https://github.com/Pollab-Das/B14-A07-Bazar-Dor)

---

## 📖 প্রজেক্টের বিবরণ (Description)

**BazarDor (বাজার দর)** হলো একটি সম্পূর্ণ রেসপনসিভ নেক্সট-জেনারেশন ওয়েব অ্যাপ্লিকেশন যা বাংলাদেশের বাজারের বিভিন্ন প্রয়োজনীয় পণ্যের দৈনিক দাম এক জায়গায় দেখায়। ইউজাররা বাজারভিত্তিক (ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, সিলেট, ময়মনসিংহ) আলাদা আলাদা দাম, সর্বনিম্ন-সর্বোচ্চ, গড় দাম এবং গতকালের তুলনায় পরিবর্তন এক নজরে দেখতে পারেন।

অ্যাপটিতে **Email/Password, Google, এবং GitHub** — এই তিন উপায়ে অ্যাকাউন্ট তৈরি ও সাইন ইন করা যায়। Product Details page টি **Protected Route** — শুধু লগইন করা ইউজাররাই বিস্তারিত বাজারভিত্তিক দাম দেখতে পারেন।

---

## 🛠️ ব্যবহৃত টেকনোলজি (Technologies Used)

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Authentication** | [BetterAuth](https://better-auth.com) (Email/Password + Google OAuth + GitHub OAuth) |
| **Database** | MongoDB Atlas |
| **State Management** | React Hooks + Server/Client Components |
| **Icons** | lucide-react |
| **Notifications** | react-hot-toast |
| **Fonts** | Hind Siliguri (Google Fonts) |
| **Data Source** | [BazarDor Public API](https://api.api-store.workers.dev/api/bazardor) |
| **Deployment** | Vercel |
| **Version Control** | Git + GitHub |

---

## ✨ প্রধান ফিচার (Key Features)

### ১. 🔐 ত্রি-মুখী অথেন্টিকেশন (Triple Authentication)
Email/Password দিয়ে ম্যানুয়ালি **সাইন আপ ও সাইন ইন**, অথবা এক ক্লিকে **Google** বা **GitHub** দিয়ে লগইন। BetterAuth + MongoDB Atlas দিয়ে সম্পূর্ণ session management।

### ২. 📊 বাজারভিত্তিক দামের বিস্তারিত (Market-wise Price Details)
প্রতিটি পণ্যের জন্য ১২টি বাজারের (কারওয়ান বাজার, গ্রীন মার্কেট, চৌদগ্রাম, আমতলী, সদর, বাসারহাট, মাঠ, চৌর, বাজারহাট, ডবলগেট, আমবাজার, চৌরাস্তা) **সর্বনিম্ন, সর্বোচ্চ ও গড় দাম** টেবিল আকারে দেখানো হয়েছে।

### ৩. 📈 দাম বাড়া-কমার লাইভ ট্র্যাকিং (Price Change Tracking)
প্রতিটি পণ্যের কার্ডে **▲ লাল (দাম বেড়েছে)** বা **▼ সবুজ (দাম কমেছে)** ব্যাজ দেখা যায়, সাথে শতাংশ পরিবর্তন। Navbar এর নিচে **infinite scrolling ticker** এ সব পণ্যের live দাম স্ক্রল করে।

### ৪. 🗂️ ক্যাটাগরি ও সর্টিং (Category Filter & Sort)
৮টি ক্যাটাগরি (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) অনুযায়ী পণ্য ফিল্টার করা যায়। প্রতিটি ক্যাটাগরি পেজে **দাম: কম থেকে বেশি**, **দাম: বেশি থেকে কম** — এই দুটি সর্ট অপশন।

### ৫. 🔒 প্রোটেক্টেড প্রোডাক্ট ডিটেইলস (Protected Product Details)
Product Details page টি **protected route** — লগইন ছাড়া `/product/[id]` এ গেলে অটো `/signin?next=/product/[id]` এ redirect হয়। সাইন ইন করার পর সরাসরি সেই product page এ ফিরে আসে।

### ৬. 👤 ইউজার প্রোফাইল আপডেট (C3 Challenge)
My Profile route এ ইউজার তার নাম পরিবর্তন করতে পারে BetterAuth এর `updateUser` API দিয়ে। সাথে **Sign Out** বাটন।

### ৭. 🌙 কালার-সিস্টেম ও বাংলা সংখ্যা (Color System + Bangla Digits)
সব দাম **বাংলা সংখ্যায়** (১৪৮, ১,৮৫০) দেখানো হয়। ▲ লাল, ▼ সবুজ, — ধূসর সিস্টেম।

### ৮. 📱 সম্পূর্ণ রেসপনসিভ (Fully Responsive)
Mobile (৩৭৫px), Tablet (৭৬৮px), Desktop (১২৮০px+) — সব screen size এ perfect layout।

---

## 📁 প্রজেক্ট স্ট্রাকচার (Project Structure)
bazardor/
├── src/
│ ├── app/
│ │ ├── api/auth/[...all]/route.ts # BetterAuth API endpoints
│ │ ├── category/[slug]/
│ │ │ ├── page.tsx # Category page
│ │ │ └── loading.tsx # Skeleton loader
│ │ ├── product/[id]/
│ │ │ ├── page.tsx # Protected product details
│ │ │ └── loading.tsx # Skeleton loader
│ │ ├── signin/
│ │ │ ├── page.tsx
│ │ │ └── SignInForm.tsx
│ │ ├── signup/
│ │ │ ├── page.tsx
│ │ │ └── SignUpForm.tsx
│ │ ├── profile/page.tsx # User profile + update
│ │ ├── layout.tsx # Root layout + Navbar + Ticker
│ │ ├── page.tsx # Home (Hero + sections)
│ │ ├── loading.tsx # Home skeleton
│ │ ├── not-found.tsx # 404 page
│ │ └── globals.css
│ ├── components/
│ │ ├── auth/
│ │ │ ├── GoogleIcon.tsx
│ │ │ └── GitHubIcon.tsx
│ │ ├── category/
│ │ │ ├── CategoryClient.tsx
│ │ │ └── SortDropdown.tsx
│ │ ├── home/
│ │ │ └── Hero.tsx
│ │ └── shared/
│ │ ├── Navbar.tsx
│ │ ├── PriceTicker.tsx
│ │ ├── ProductCard.tsx
│ │ └── Footer.tsx
│ ├── lib/
│ │ ├── api.ts # API fetch client
│ │ ├── auth.ts # BetterAuth server config
│ │ ├── auth-client.ts # BetterAuth client hooks
│ │ └── format.ts # Bangla number & format utils
│ └── types/
│ └── bazardor.ts # TypeScript interfaces
├── public/
│ ├── bazar-hero.png
│ └── logo-icon.png
├── .env.local # Environment variables (gitignored)
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
---

## 🚀 লোকালি চালানোর নির্দেশনা (Run Locally)

### Prerequisites
- Node.js **v20.11** বা তার উপরে (v24.11.1 recommended)
- npm / pnpm / yarn
- MongoDB Atlas account (free tier)
- Google OAuth Client ID
- GitHub OAuth App

### ধাপ ১ — Repository Clone করুন

```bash
git clone https://github.com/Pollab-Das/B14-A07-Bazar-Dor.git
cd B14-A07-Bazar-Dor
