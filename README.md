# ⚡ AptiQuiz — Live Multiplayer Aptitude Battle Arena

> *"Aptitude practice re-engineered as a live multiplayer game for campus placements & hackathons."*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 🎯 About AptiQuiz

Placement aptitude tests demand fast-paced mental math, logic, and extreme composure under time pressure. However, traditional preparation tools are monotonous, solitary, and slow.

**AptiQuiz** gamifies aptitude practice into a **real-time multiplayer showdown**. Compete in high-stakes speed rounds with peers across colleges, earn speed multipliers, watch dynamic rankings shuffle in real-time, and climb the campus league leaderboard.

---

## 🌟 Key Features

* **⚡ 10-Second Lockdown Timer:** Strict circular SVG countdown with dynamic color shifts (Cyan $\to$ Amber $\to$ Pulsing Crimson Heartbeat) simulating placement screener pressure.
* **🎯 Velocity & Streak Scoring:**
  * Base $+100$ points for correct answers.
  * Real-time **Speed Bonus** up to $+100$ points for lightning-fast responses within 1–3 seconds.
  * Consecutive streak fire multipliers ($\text{Streak} \ge 3$).
* **👥 Live Multiplayer Simulation:** 
  * 12 rival contenders from top institutions (*IIT Delhi, BITS Pilani, NIT Trichy, IIIT Hyderabad*).
  * Real-time rival actions stream into a live activity feed.
  * Standings shuffle dynamically in the live sidebar as opponents submit answers.
* **🏆 Victory Podium & Celebration:** 3D-styled Gold, Silver, and Bronze pedestals with pure JS canvas confetti and synthesized Web Audio fanfare.
* **🥇 Campus Leaderboard:** Global college rankings with live search and filter tabs (*All Campuses*, *Top Colleges*, *Weekly League*).
* **📊 Analytics Dashboard:** 
  * Student KPI metrics: Total Score, Accuracy %, Max Streak, and Attempted Questions.
  * Scalable SVG 7-day performance area chart.
  * Topic proficiency breakdown across Quantitative, Logical, DI, and Verbal modules.
* **🛠️ Host / Join Custom Rooms:** Create 6-digit room codes (e.g. `APTI-7489`) with category filters and player capacity sliders.
* **🔊 Web Audio API Synthesizer:** Built-in retro-modern UI sounds (clicks, countdown ticks, correct chords, buzzer, and fanfare) without external audio files.

---

## 📚 Categories Covered

1. **Quantitative Aptitude:** Train speeds, time & work equivalence, profit & loss, percentages.
2. **Logical Reasoning:** Number sequences, syllogisms, deduction, substitution ciphers.
3. **Data Interpretation:** Caselets, ratios, percentage breakdowns, rapid chart analysis.
4. **Verbal Ability:** Contextual vocabulary, synonyms, grammatical precision.

---

## 🚀 Getting Started

### Prerequisites
* Any modern web browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).
* No Node.js or backend server required!

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/aptiquiz.git
   cd aptiquiz
   ```

2. **Open directly in browser:**
   Simply double-click `index.html` or open it with your browser.

3. **Or serve via Python (Optional):**
   ```bash
   python -m http.server 8080
   ```
   Then visit `http://localhost:8080`.

---

## ⌨️ Keyboard Shortcuts (Arena Mode)

| Key | Action |
|---|---|
| `1` / `2` / `3` / `4` | Select Option A, B, C, or D |
| `Enter` | Lock answer or advance to next question |

---

## 📂 Project Structure

```
aptiquiz/
├── index.html       # Semantic HTML5 app structure (5 screens & modals)
├── style.css        # Cyber-championship dark theme & responsive layout
├── script.js        # Core game engine, Web Audio synth & simulation
└── README.md        # Documentation
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
