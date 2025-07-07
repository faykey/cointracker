# 🪙 TokenTrace

A sleek, responsive cryptocurrency tracking dashboard built with **React** — track live prices, view detailed coin charts, and stay updated with the latest crypto news.

![TokenTrace Screenshot](./) 

---

## 🚀 Features

- 🔍 **Live Coin Search**  
  Search and view real-time market data for your favorite cryptocurrencies.

- 🌐 **Multi-Currency Support**  
  View prices in **USD**, **EUR**, or **NGN**.

- 📊 **Detailed Coin Pages**  
  Includes dynamic charts for tracking price history over time.

- 📰 **Crypto News Feed**  
  Fetches the latest cryptocurrency news using the GNews API.

- ⚡ **Responsive UI**  
  Mobile-first design with clean visuals and smooth interactions.

---

## 🛠 Tech Stack

- **React**  
- **React Router DOM**  
- **Context API** (for currency state)  
- **CoinGecko API** (market data)  
- **GNews API** (news articles)  
- **Pure CSS** (custom styling, responsive layout)  

---

## 📁 Folder Structure
src/
│
├── components/ # Reusable components (Navbar, Chart)
├── pages/ # Home, News, Coin detail pages
├── context/ # CoinContext for global state
├── assets/ # Logos, icons, images
└── App.jsx # Main app with routing

## 🌐 Live Demo

👉 [https://cointracker-one.vercel.app](https://cointracker-one.vercel.app)

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/tokentrace.git
cd tokentrace
npm install
npm run dev
```
## ⚠️ Create a .env file for your API keys:
VITE_CG_API_KEY=your_coingecko_key
VITE_GNEWS_API_KEY=your_gnews_key

## ✅ To-Do / Potential Additions
<li>
   Sparkline charts
</li>
<li>
   Candlestick chart toggle
</li>
<li>
  Trending coin section
</li>
<li>
   Theme switch (light/dark)
</li>
<li>
   Authentication & user watchlist
</li>

## 🙌 Acknowledgements
<li>CoinGecko API</li>
<li>GNews API</li>
<li>GreatStack YouTube</li>



---
🧑‍💻 Author
Made with passion by @Faykey
Feel free to reach out!

Let me know if you'd like it customized further — I can add your **LinkedIn**, **GitHub repo link**, or swap out tech choices (e.g. Tailwind if you integrate it later).
