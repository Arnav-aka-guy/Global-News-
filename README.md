# Aegis Global News AI Dashboard 🌍🤖

Aegis is a next-generation predictive intelligence and news analysis platform. It aggregates global breaking news in real-time, maps it to a 3D interactive globe, and runs deep AI analysis to extract sentiment, geopolitical ripple effects, counter-perspectives, and source veracity. 

Designed with a brutalist, tactical cyber-intelligence aesthetic ("Kinetic Orange"), Aegis serves as a command center for understanding the world's most critical events as they unfold.

## 🚀 Key Features

*   **Real-time Global Heatmap:** An interactive 3D WebGL globe mapping breaking news origin points, layered with sentiment atmosphere halos.
*   **AI-Powered Analysis:** Leverages **Groq (Llama 3 70B)** with **Google Gemini Fallbacks** to automatically classify articles, analyze sentiment (-1.0 to +1.0 scale), and score source reliability.
*   **Geopolitical Ripple Effects:** AI intelligently predicts how local events might impact global supply chains, international relations, and neighboring economies.
*   **Counter-Perspective Engine:** Automatically generates alternative viewpoints or highlights missing context for complex, highly-sensationalized stories.
*   **Veracity & Sentiment Scoring:** Highlights unverified claims vs. verified reporting and scores the general panic/stability index.
*   **Dynamic Intelligence HUD:** A sleek, brutalist command-center UI built with Framer Motion, featuring marquee feeds, tactical typefaces, and real-time metrics.

## 🛠️ Technology Stack

*   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS + Framer Motion
*   **AI Providers:** [Groq](https://groq.com) (Primary), [Google Gemini](https://ai.google.dev/) (Fallback)
*   **Data Sources:** GNews API, NewsAPI
*   **Deployment:** Optimized for Vercel

## ⚙️ Getting Started

### Prerequisites

Ensure you have Node.js 18+ installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arnav-aka-guy/Global-News-.git
   cd Global-News-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   # AI Providers
   GROQ_API_KEY=your_groq_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here

   # News APIs
   GNEWS_API_KEY=your_gnews_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the Dashboard:** Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deploying to Vercel

Aegis is fully configured and ready to be deployed on the Vercel Platform. 

1. Push your code to a GitHub repository.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
3. Import your repository.
4. **Important**: Add your `GROQ_API_KEY`, `GEMINI_API_KEY`, and `GNEWS_API_KEY` in the Environment Variables section.
5. Click **Deploy**.

## 🛑 Fallback System

Aegis implements a robust "Fail-Open" architecture. If you accidentally exceed API quotas or fail to provide a valid AI key, it seamlessly falls back to cached, highly-detailed mock data arrays to ensure the dashboard intelligence and 3D globe visualization never crashes in production.

---

*Made with ❤️ by Arnav.*
