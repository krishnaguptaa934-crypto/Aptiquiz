/**
 * AptiQuiz - Modern Live Multiplayer Web Application Engine
 * Pure Vanilla JavaScript (ES6+)
 * 
 * Features:
 * - 5 Seamless Screen Transitions (Home, Live Arena, Results, Leaderboard, Dashboard)
 * - 10-Question Comprehensive Aptitude Flow with 10s Countdown per Question
 * - Realtime Simulated Rival Players with Dynamic Score Shuffling & Live Activity Feed
 * - Speed Multipliers & Streak Rewards
 * - Interactive Canvas Confetti & Web Audio API Synth Sound Effects
 * - Room Generator, Clipboard Copier, and Live Leaderboard Filtering
 */

// ==========================================================================
// 1. QUESTION DATABASE (10 Verified Placement Aptitude Questions)
// ==========================================================================
const APTITUDE_QUESTIONS = [
  {
    id: 1,
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    question: "If a train travels 360 km in 4 hours, what is its average speed?",
    options: ["80 km/h", "90 km/h", "100 km/h", "120 km/h"],
    correctIndex: 1, // 90 km/h
    explanation: "Formula: Speed = Distance / Time. Here, Speed = 360 km / 4 hours = 90 km/h."
  },
  {
    id: 2,
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    question: "If 6 workers can complete a coding sprint in 12 days, how many days will 9 workers take working at the same pace?",
    options: ["6 days", "8 days", "9 days", "10 days"],
    correctIndex: 1, // 8 days
    explanation: "Total Work = Men × Days = 6 × 12 = 72 man-days. Days for 9 workers = 72 / 9 = 8 days."
  },
  {
    id: 3,
    category: "Logical Reasoning",
    difficulty: "Easy",
    question: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "46"],
    correctIndex: 2, // 42
    explanation: "Differences between consecutive terms are +4, +6, +8, +10. Next difference is +12, so 30 + 12 = 42 (or n² + n for n=1,2,3,4,5,6)."
  },
  {
    id: 4,
    category: "Quantitative Aptitude",
    difficulty: "Easy",
    question: "An electronic component was purchased for ₹500 and sold for ₹625. What is the profit percentage?",
    options: ["20%", "25%", "30%", "33.3%"],
    correctIndex: 1, // 25%
    explanation: "Profit = ₹625 - ₹500 = ₹125. Profit % = (Profit / Cost Price) × 100 = (125 / 500) × 100 = 25%."
  },
  {
    id: 5,
    category: "Logical Reasoning",
    difficulty: "Medium",
    question: "Statements: 'All laptops are devices.' 'All devices are electronic.' What is the valid deductive conclusion?",
    options: ["All laptops are electronic", "Some electronic are laptops", "All electronic are laptops", "No device is a laptop"],
    correctIndex: 0, // All laptops are electronic
    explanation: "By classical categorical syllogism: If A ⊆ B and B ⊆ C, then A ⊆ C. Hence, all laptops are electronic."
  },
  {
    id: 6,
    category: "Data Interpretation",
    difficulty: "Medium",
    question: "A Campus Tech Club has 150 members. 60% are in Web Dev, 20% in AI, and the remainder in UI/UX Design. How many members are in UI/UX Design?",
    options: ["20 members", "25 members", "30 members", "35 members"],
    correctIndex: 2, // 30 members
    explanation: "UI/UX percentage = 100% - (60% + 20%) = 20%. Members = 20% of 150 = 0.20 × 150 = 30 members."
  },
  {
    id: 7,
    category: "Verbal Ability",
    difficulty: "Easy",
    question: "Select the word closest in meaning to 'EPHEMERAL':",
    options: ["Perpetual", "Transitory / Fleeting", "Massive", "Resilient"],
    correctIndex: 1, // Transitory / Fleeting
    explanation: "'Ephemeral' describes something lasting for a very short duration, synonym for fleeting or transitory."
  },
  {
    id: 8,
    category: "Quantitative Aptitude",
    difficulty: "Easy",
    question: "If a student scores 45 marks out of 60 in Round 1 of the campus screener, what is their percentage score?",
    options: ["70%", "75%", "80%", "82.5%"],
    correctIndex: 1, // 75%
    explanation: "Percentage = (45 / 60) × 100 = 3/4 × 100 = 75%."
  },
  {
    id: 9,
    category: "Logical Reasoning",
    difficulty: "Hard",
    question: "In a substitution cipher, 'LOGIC' is encrypted as 'MQHJD'. Applying the same rule (+1 shift), how is 'SMART' encrypted?",
    options: ["TNBSU", "TOBSU", "TMBRU", "SKZQS"],
    correctIndex: 0, // TNBSU
    explanation: "Every character is shifted forward by 1 letter: S→T, M→N, A→B, R→S, T→U. The result is TNBSU."
  },
  {
    id: 10,
    category: "Quantitative Aptitude",
    difficulty: "Hard",
    question: "Two trains traveling in opposite directions at 50 km/h and 40 km/h cross each other. What is their relative speed?",
    options: ["10 km/h", "45 km/h", "90 km/h", "200 km/h"],
    correctIndex: 2, // 90 km/h
    explanation: "When two bodies move towards each other in opposite directions, relative speed = Speed 1 + Speed 2 = 50 + 40 = 90 km/h."
  }
];

// ==========================================================================
// 2. MOCK PLAYERS DATA FOR LIVE ARENA & LEADERBOARD
// ==========================================================
const MOCK_PLAYERS = [
  { id: 'p1', name: "Aarav Sharma", college: "IIT Delhi", baseScore: 1940, accuracy: 100, streak: 18, status: "In Battle" },
  { id: 'p2', name: "Sneha Rao", college: "BITS Pilani", baseScore: 1820, accuracy: 90, streak: 12, status: "In Battle" },
  { id: 'p3', name: "Rohan Nair", college: "NIT Trichy", baseScore: 1690, accuracy: 80, streak: 8, status: "In Battle" },
  { id: 'p4', name: "Alex Verma (You)", college: "IIT Bombay", baseScore: 0, accuracy: 100, streak: 0, isUser: true, status: "In Battle" },
  { id: 'p5', name: "Ananya Iyer", college: "Delhi University", baseScore: 1540, accuracy: 80, streak: 6, status: "In Battle" },
  { id: 'p6', name: "Vikram Malhotra", college: "IIIT Hyderabad", baseScore: 1480, accuracy: 70, streak: 4, status: "In Battle" },
  { id: 'p7', name: "Tanvi Deshmukh", college: "COEP Pune", baseScore: 1390, accuracy: 80, streak: 5, status: "In Battle" },
  { id: 'p8', name: "Kabir Mehta", college: "DTU Delhi", baseScore: 1310, accuracy: 70, streak: 3, status: "Ready" },
  { id: 'p9', name: "Meera Sen", college: "Jadavpur University", baseScore: 1240, accuracy: 80, streak: 7, status: "In Battle" },
  { id: 'p10', name: "Arjun Reddy", college: "Osmania Univ", baseScore: 1190, accuracy: 60, streak: 2, status: "Ready" },
  { id: 'p11', name: "Pooja Patel", college: "SVNIT Surat", baseScore: 1120, accuracy: 70, streak: 4, status: "Ready" },
  { id: 'p12', name: "Karan Johar", college: "MIT-WPU Pune", baseScore: 980, accuracy: 60, streak: 1, status: "In Battle" }
];

// ==========================================================================
// 3. APPLICATION STATE
// ==========================================================================
const AppState = {
  currentScreen: 'home',
  roomCode: 'APTI-7489',
  userName: 'Alex Verma (You)',
  userCollege: 'IIT Bombay',
  totalPlayers: 38,
  
  // Quiz Session State
  activeQuestions: [...APTITUDE_QUESTIONS],
  currentQuestionIdx: 0,
  selectedOptionIdx: null,
  isLocked: false,
  timerDuration: 10, // 10 seconds per question
  timeLeft: 10,
  timerInterval: null,
  
  // Player Stats for current match
  userScore: 0,
  streak: 0,
  bestStreak: 0,
  userAnswers: [], // { questionId, selectedIndex, isCorrect, timeTaken, points }
  
  // Sound FX State
  soundEnabled: true,
  
  // Live Arena Simulated Standings
  liveContenders: []
};

// ==========================================================================
// 4. WEB AUDIO API SYNTHESIZER (No External Files Required)
// ==========================================================================
class SoundFXEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) { console.debug(e); }
  }

  playTick() {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) { console.debug(e); }
  }

  playCorrect() {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.15, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.22);
      });
    } catch (e) { console.debug(e); }
  }

  playWrong() {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) { console.debug(e); }
  }

  playFanfare() {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.2, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.4);
      });
    } catch (e) { console.debug(e); }
  }
}

const AudioSFX = new SoundFXEngine();

// ==========================================================================
// 5. TOAST NOTIFICATION UTILITY
// ==========================================================================
function showToast(message, type = 'info', icon = '⚡') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'warning' ? 'toast-warning' : ''}`;
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// 6. PURE JS CONFETTI GENERATOR (Zero dependencies)
// ==========================================================================
function launchConfetti(durationMs = 3000) {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 100;
  const particles = [];
  const colors = ['#00f0ff', '#38bdf8', '#fbbf24', '#10b981', '#f43f5e', '#a855f7'];

  for (let i = 0; i < confettiCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 3,
      speedX: (Math.random() - 0.5) * 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    });
  }

  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    if (elapsed > durationMs) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();

      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================================================
// 7. NAVIGATION & SCREEN CONTROLLER
// ==========================================================================
function switchScreen(targetScreenId) {
  AudioSFX.playPop();

  // Hide all screens
  document.querySelectorAll('.view-screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Activate target screen
  const targetElement = document.getElementById(`screen-${targetScreenId}`);
  if (targetElement) {
    targetElement.classList.add('active');
    AppState.currentScreen = targetScreenId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update navigation tab highlights
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-target') === targetScreenId);
  });

  // Screen specific hooks
  if (targetScreenId === 'leaderboard') {
    renderLeaderboardTable();
  } else if (targetScreenId === 'quiz') {
    if (AppState.userAnswers.length === 0 && !AppState.timerInterval) {
      startQuizSession();
    }
  }
}

// ==========================================================================
// 8. LIVE ARENA SIMULATOR (Realtime Competitors & Dynamic Ranks)
// ==========================================================================
function initializeLiveContenders() {
  // Deep clone mock players
  AppState.liveContenders = MOCK_PLAYERS.map(p => ({
    ...p,
    score: p.isUser ? AppState.userScore : Math.round(p.baseScore * 0.4) // start initial match round
  }));
}

function updateLiveRankingSidebar() {
  const rankingList = document.getElementById('live-ranking-list');
  if (!rankingList) return;

  // Sync user score
  const userContender = AppState.liveContenders.find(c => c.isUser);
  if (userContender) {
    userContender.score = AppState.userScore;
    userContender.name = AppState.userName;
    userContender.college = AppState.userCollege;
  }

  // Sort descending by score
  AppState.liveContenders.sort((a, b) => b.score - a.score);

  // Render top 8 for sidebar
  rankingList.innerHTML = AppState.liveContenders.slice(0, 8).map((player, idx) => {
    const rank = idx + 1;
    const isUser = player.isUser;
    const rankClass = rank === 1 ? 'top1' : rank === 2 ? 'top2' : rank === 3 ? 'top3' : '';

    return `
      <div class="live-player-row ${isUser ? 'current-user' : ''}">
        <div class="player-left">
          <span class="rank-badge-num ${rankClass}">#${rank}</span>
          <div class="player-names-col">
            <span class="player-row-name">${player.name} ${isUser ? '⚡' : ''}</span>
            <span class="player-row-college">${player.college}</span>
          </div>
        </div>
        <div class="player-right-score">${player.score.toLocaleString()} pts</div>
      </div>
    `;
  }).join('');
}

function simulateRivalAction() {
  if (AppState.currentScreen !== 'quiz') return;

  const nonUsers = AppState.liveContenders.filter(c => !c.isUser);
  const randomRival = nonUsers[Math.floor(Math.random() * nonUsers.length)];
  if (!randomRival) return;

  // Chance to score
  const isCorrect = Math.random() > 0.25;
  const timeTaken = (Math.random() * 5 + 1.2).toFixed(1);
  const speedBonus = Math.max(0, Math.round((10 - timeTaken) * 10));
  const points = isCorrect ? 100 + speedBonus : 0;

  if (isCorrect) {
    randomRival.score += points;
    addFeedEvent(`<strong>${randomRival.name.split(' ')[0]}</strong> locked in ${timeTaken}s (+${points} pts)`, 'speed');
  } else {
    addFeedEvent(`<strong>${randomRival.name.split(' ')[0]}</strong> timed out / incorrect`, '');
  }

  updateLiveRankingSidebar();
}

function addFeedEvent(textHtml, type = '') {
  const feed = document.getElementById('live-activity-feed');
  if (!feed) return;

  const eventDiv = document.createElement('div');
  eventDiv.className = `feed-event ${type}`;
  eventDiv.innerHTML = `<span>⚡</span><span>${textHtml}</span>`;

  feed.prepend(eventDiv);

  // Keep max 6 items
  while (feed.children.length > 6) {
    feed.lastElementChild.remove();
  }
}

// ==========================================================================
// 9. QUIZ ENGINE (10s Countdown, Options, Locking & Speed Bonuses)
// ==========================================================================
function startQuizSession(categoryFilter = null) {
  // Reset session state
  if (categoryFilter && categoryFilter !== 'All') {
    AppState.activeQuestions = APTITUDE_QUESTIONS.filter(q => q.category === categoryFilter);
    if (AppState.activeQuestions.length === 0) {
      AppState.activeQuestions = [...APTITUDE_QUESTIONS];
    }
  } else {
    AppState.activeQuestions = [...APTITUDE_QUESTIONS];
  }

  AppState.currentQuestionIdx = 0;
  AppState.userScore = 0;
  AppState.streak = 0;
  AppState.bestStreak = 0;
  AppState.userAnswers = [];
  AppState.selectedOptionIdx = null;
  AppState.isLocked = false;

  initializeLiveContenders();
  updateLiveRankingSidebar();

  // Update room label
  const roomTag = document.getElementById('quiz-room-tag');
  if (roomTag) roomTag.textContent = `ROOM ${AppState.roomCode}`;

  loadQuestion(0);
}

function loadQuestion(index) {
  clearInterval(AppState.timerInterval);

  AppState.currentQuestionIdx = index;
  AppState.selectedOptionIdx = null;
  AppState.isLocked = false;

  const q = AppState.activeQuestions[index];
  if (!q) {
    finishQuizSession();
    return;
  }

  // Hide feedback banner
  const feedbackBanner = document.getElementById('feedback-banner');
  if (feedbackBanner) feedbackBanner.classList.add('hidden');

  // Enable lock button state
  const lockBtn = document.getElementById('btn-lock-answer');
  if (lockBtn) {
    lockBtn.disabled = true;
    lockBtn.innerHTML = `
      <svg class="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
      <span>Lock Answer</span>
    `;
  }

  const hintText = document.getElementById('lock-hint-text');
  if (hintText) hintText.textContent = "Select an option to lock your submission";

  // Update Meta Header
  document.getElementById('question-index-badge').textContent = `QUESTION 0${index + 1} OF ${AppState.activeQuestions.length}`;
  document.getElementById('quiz-progress-text').textContent = `Question 0${index + 1} of ${AppState.activeQuestions.length}`;
  document.getElementById('quiz-category-pill').textContent = q.category;
  document.getElementById('question-diff-badge').textContent = `⚡ ${q.difficulty} • 10s Round`;
  document.getElementById('quiz-user-score').textContent = AppState.userScore.toLocaleString();
  document.getElementById('quiz-streak-count').textContent = `${AppState.streak}x Streak`;

  // Progress Bar
  const pct = ((index + 1) / AppState.activeQuestions.length) * 100;
  document.getElementById('quiz-progress-bar').style.width = `${pct}%`;

  // Question Prompt
  document.getElementById('question-prompt-text').textContent = q.question;

  // Options
  const optionsGrid = document.getElementById('options-grid');
  optionsGrid.innerHTML = '';

  const letters = ['A', 'B', 'C', 'D'];
  q.options.forEach((optText, optIdx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.setAttribute('data-index', optIdx);
    btn.innerHTML = `
      <div class="option-letter">${letters[optIdx]}</div>
      <div class="option-text">${optText}</div>
      <div class="option-status-icon"></div>
    `;

    btn.addEventListener('click', () => selectOption(optIdx));
    optionsGrid.appendChild(btn);
  });

  // Start 10-Second Timer
  startQuestionTimer();
}

function selectOption(optIdx) {
  if (AppState.isLocked) return;

  AppState.selectedOptionIdx = optIdx;
  AudioSFX.playPop();

  // Update UI selection
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach((btn, idx) => {
    btn.classList.toggle('selected', idx === optIdx);
  });

  // Enable Lock button
  const lockBtn = document.getElementById('btn-lock-answer');
  if (lockBtn) lockBtn.disabled = false;

  const hintText = document.getElementById('lock-hint-text');
  if (hintText) hintText.textContent = "Option selected! Click Lock Answer before the timer expires.";
}

function startQuestionTimer() {
  AppState.timeLeft = AppState.timerDuration;
  updateTimerUI(AppState.timeLeft);

  const totalDash = 264; // circle circumference for r=42: 2 * π * 42 ≈ 263.89

  AppState.timerInterval = setInterval(() => {
    AppState.timeLeft -= 0.1;

    // Small chance for simulated rival action every 1.5s
    if (Math.random() < 0.12) {
      simulateRivalAction();
    }

    if (AppState.timeLeft <= 0) {
      AppState.timeLeft = 0;
      clearInterval(AppState.timerInterval);
      updateTimerUI(0);
      handleQuestionTimeout();
    } else {
      updateTimerUI(AppState.timeLeft);
    }
  }, 100);
}

function updateTimerUI(seconds) {
  const timerNum = document.getElementById('timer-number');
  const radialBar = document.getElementById('radial-bar');
  const speedIndicator = document.getElementById('speed-bonus-indicator');

  const ceilSec = Math.ceil(seconds);
  if (timerNum) {
    timerNum.textContent = ceilSec;
    timerNum.classList.toggle('danger', seconds <= 3);
  }

  // Calculate speed bonus available
  const potentialBonus = Math.max(0, Math.round(seconds * 10));
  if (speedIndicator) {
    speedIndicator.innerHTML = `<span class="bonus-flash">⚡ Speed Bonus: +${potentialBonus} pts</span>`;
  }

  // Sound tick in last 3 seconds
  if (ceilSec <= 3 && Math.abs(seconds - ceilSec) < 0.1) {
    AudioSFX.playTick();
  }

  // Radial dashoffset animation
  if (radialBar) {
    const totalDash = 264;
    const progress = seconds / AppState.timerDuration;
    const offset = totalDash - (progress * totalDash);
    radialBar.style.strokeDashoffset = offset;

    // Color shift
    radialBar.classList.remove('warning', 'danger');
    if (seconds <= 3) {
      radialBar.classList.add('danger');
    } else if (seconds <= 6) {
      radialBar.classList.add('warning');
    }
  }
}

function lockCurrentAnswer() {
  if (AppState.isLocked || AppState.selectedOptionIdx === null) return;

  clearInterval(AppState.timerInterval);
  AppState.isLocked = true;

  const q = AppState.activeQuestions[AppState.currentQuestionIdx];
  const isCorrect = AppState.selectedOptionIdx === q.correctIndex;
  const timeTaken = (AppState.timerDuration - AppState.timeLeft).toFixed(1);

  // Calculate Score
  let pointsAwarded = 0;
  let speedBonus = 0;
  let streakBonus = 0;

  if (isCorrect) {
    speedBonus = Math.max(0, Math.round(AppState.timeLeft * 10));
    AppState.streak += 1;
    if (AppState.streak > AppState.bestStreak) {
      AppState.bestStreak = AppState.streak;
    }
    streakBonus = (AppState.streak - 1) * 20;
    pointsAwarded = 100 + speedBonus + streakBonus;
    AppState.userScore += pointsAwarded;

    AudioSFX.playCorrect();
    showToast(`Correct! +${pointsAwarded} pts (Speed: +${speedBonus})`, 'success', '🎯');
  } else {
    AppState.streak = 0;
    AudioSFX.playWrong();
    showToast(`Incorrect! The correct answer was (${['A','B','C','D'][q.correctIndex]})`, 'warning', '❌');
  }

  // Record Answer
  AppState.userAnswers.push({
    questionId: q.id,
    questionText: q.question,
    selectedOption: AppState.selectedOptionIdx,
    correctOption: q.correctIndex,
    isCorrect,
    timeTaken: parseFloat(timeTaken),
    points: pointsAwarded
  });

  // UI Option Highlighting
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correctIndex) {
      btn.classList.add('correct');
    } else if (idx === AppState.selectedOptionIdx && !isCorrect) {
      btn.classList.add('wrong');
    }
  });

  // Update Header User Score
  document.getElementById('quiz-user-score').textContent = AppState.userScore.toLocaleString();
  document.getElementById('quiz-streak-count').textContent = `${AppState.streak}x Streak`;

  // Render Feedback Explanation Box
  showFeedbackBanner(isCorrect, pointsAwarded, speedBonus, streakBonus, q.explanation);

  // Update live ranking
  updateLiveRankingSidebar();
}

function handleQuestionTimeout() {
  if (AppState.isLocked) return;

  AppState.isLocked = true;
  const q = AppState.activeQuestions[AppState.currentQuestionIdx];
  AppState.streak = 0;

  AudioSFX.playWrong();
  showToast("Time's Up! 0 points awarded.", 'warning', '⏱️');

  AppState.userAnswers.push({
    questionId: q.id,
    questionText: q.question,
    selectedOption: null,
    correctOption: q.correctIndex,
    isCorrect: false,
    timeTaken: 10.0,
    points: 0
  });

  // Highlight correct option
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correctIndex) {
      btn.classList.add('correct');
    }
  });

  document.getElementById('quiz-streak-count').textContent = `0x Streak`;

  showFeedbackBanner(false, 0, 0, 0, q.explanation, true);
  updateLiveRankingSidebar();
}

function showFeedbackBanner(isCorrect, points, speedBonus, streakBonus, explanation, isTimeout = false) {
  const banner = document.getElementById('feedback-banner');
  const icon = document.getElementById('feedback-icon');
  const headline = document.getElementById('feedback-headline');
  const pointsText = document.getElementById('feedback-points-awarded');
  const expBox = document.getElementById('feedback-explanation');
  const nextBtn = document.getElementById('btn-next-question');

  if (!banner) return;

  banner.classList.remove('hidden');

  if (isCorrect) {
    icon.className = 'feedback-icon correct';
    icon.textContent = '✓';
    headline.textContent = 'Correct! Lightning Reflexes!';
    pointsText.textContent = `+${points} Points (+${speedBonus} Speed Bonus ${streakBonus > 0 ? `+${streakBonus} Streak Fire` : ''})`;
  } else if (isTimeout) {
    icon.className = 'feedback-icon wrong';
    icon.textContent = '⏱️';
    headline.textContent = "Time Expired!";
    pointsText.textContent = `0 Points Awarded`;
  } else {
    icon.className = 'feedback-icon wrong';
    icon.textContent = '✕';
    headline.textContent = 'Incorrect Submission';
    pointsText.textContent = `0 Points Awarded`;
  }

  expBox.innerHTML = `<strong>Solution & Logic:</strong> ${explanation}`;

  const isLastQuestion = AppState.currentQuestionIdx >= AppState.activeQuestions.length - 1;
  nextBtn.innerHTML = `
    <span>${isLastQuestion ? 'View Final Results 🏆' : 'Next Question ⏭'}</span>
  `;
}

function advanceNextQuestion() {
  AudioSFX.playPop();
  if (AppState.currentQuestionIdx < AppState.activeQuestions.length - 1) {
    loadQuestion(AppState.currentQuestionIdx + 1);
  } else {
    finishQuizSession();
  }
}

// ==========================================================================
// 10. QUIZ COMPLETION & RESULTS SUMMARY
// ==========================================================================
function finishQuizSession() {
  clearInterval(AppState.timerInterval);

  // Sync user score to liveContenders
  const userContender = AppState.liveContenders.find(c => c.isUser);
  if (userContender) {
    userContender.score = AppState.userScore;
  }

  // Sort overall standings
  AppState.liveContenders.sort((a, b) => b.score - a.score);
  const userRank = AppState.liveContenders.findIndex(c => c.isUser) + 1;

  // Calculate Accuracy & Average Speed
  const totalAttempted = AppState.userAnswers.length;
  const correctCount = AppState.userAnswers.filter(a => a.isCorrect).length;
  const accuracyPct = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;
  const totalTime = AppState.userAnswers.reduce((acc, curr) => acc + curr.timeTaken, 0);
  const avgTime = totalAttempted > 0 ? (totalTime / totalAttempted).toFixed(1) : '0.0';

  // Populate Result Screen
  document.getElementById('res-final-score').textContent = AppState.userScore.toLocaleString();
  document.getElementById('res-final-rank').textContent = `#${userRank}`;
  document.getElementById('res-final-accuracy').textContent = `${accuracyPct}%`;
  document.getElementById('res-final-speed').textContent = `${avgTime}s`;

  // Dynamic Headline
  const headTitle = document.getElementById('results-headline-title');
  const headSub = document.getElementById('results-headline-sub');
  if (userRank === 1) {
    headTitle.textContent = "Campus Champion! 🥇";
    headSub.textContent = `You dominated the live arena with ${AppState.userScore.toLocaleString()} points!`;
  } else if (userRank <= 3) {
    headTitle.textContent = "Podium Finish! 🏆";
    headSub.textContent = `Outstanding performance! You placed #${userRank} out of ${AppState.totalPlayers} contestants.`;
  } else {
    headTitle.textContent = "Battle Completed!";
    headSub.textContent = `You finished rank #${userRank}. Sharpen your speed drills to break into the Top 3.`;
  }

  // Render Podium HTML in Results
  renderResultsPodium();

  // Render Breakdown List
  renderQuestionBreakdown();

  // Switch to results screen
  switchScreen('results');

  // Launch celebration confetti and sound
  if (userRank <= 3) {
    launchConfetti(4000);
    AudioSFX.playFanfare();
  }
}

function renderResultsPodium() {
  const container = document.getElementById('results-podium-container');
  if (!container) return;

  const top3 = AppState.liveContenders.slice(0, 3);
  if (top3.length < 3) return;

  const [first, second, third] = top3;

  container.innerHTML = `
    <!-- 2nd Place Silver -->
    <div class="podium-stand silver">
      <div class="avatar-bubble">${second.name.charAt(0)}</div>
      <div class="podium-stand-name">${second.name}</div>
      <div class="podium-stand-college">${second.college}</div>
      <div class="podium-stand-score">${second.score.toLocaleString()} pts</div>
      <div class="podium-pillar p-2">#2</div>
    </div>

    <!-- 1st Place Gold -->
    <div class="podium-stand gold">
      <div class="avatar-bubble">👑</div>
      <div class="podium-stand-name">${first.name}</div>
      <div class="podium-stand-college">${first.college}</div>
      <div class="podium-stand-score">${first.score.toLocaleString()} pts</div>
      <div class="podium-pillar p-1">#1</div>
    </div>

    <!-- 3rd Place Bronze -->
    <div class="podium-stand bronze">
      <div class="avatar-bubble">${third.name.charAt(0)}</div>
      <div class="podium-stand-name">${third.name}</div>
      <div class="podium-stand-college">${third.college}</div>
      <div class="podium-stand-score">${third.score.toLocaleString()} pts</div>
      <div class="podium-pillar p-3">#3</div>
    </div>
  `;
}

function renderQuestionBreakdown() {
  const list = document.getElementById('results-breakdown-list');
  if (!list) return;

  list.innerHTML = AppState.userAnswers.map((ans, idx) => {
    return `
      <div class="breakdown-item ${ans.isCorrect ? 'is-correct' : 'is-wrong'}">
        <div class="breakdown-q-info">
          <div class="breakdown-q-title">Q${idx + 1}: ${ans.questionText}</div>
          <div class="breakdown-q-sub">
            ${ans.isCorrect ? '✓ Correct Answer' : '✕ Missed/Incorrect'} • Responded in ${ans.timeTaken}s
          </div>
        </div>
        <div class="breakdown-score-badge ${ans.isCorrect ? 'text-green' : 'text-rose'}">
          ${ans.isCorrect ? `+${ans.points} pts` : '0 pts'}
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// 11. LEADERBOARD SCREEN CONTROLLER
// ==========================================================================
function renderLeaderboardTable(filterText = '') {
  const tbody = document.getElementById('leaderboard-table-body');
  if (!tbody) return;

  // Make sure user is reflected in contenders
  const userContender = AppState.liveContenders.find(c => c.isUser);
  if (userContender) {
    userContender.score = Math.max(userContender.score, AppState.userScore);
    userContender.name = AppState.userName;
    userContender.college = AppState.userCollege;
  }

  // Sort descending
  const sorted = [...AppState.liveContenders].sort((a, b) => b.score - a.score);

  // Filter if search input present
  const filtered = sorted.filter(p => {
    if (!filterText) return true;
    const term = filterText.toLowerCase();
    return p.name.toLowerCase().includes(term) || p.college.toLowerCase().includes(term);
  });

  const countText = document.getElementById('leaderboard-count-text');
  if (countText) {
    countText.textContent = `Showing ${filtered.length} Contenders`;
  }

  tbody.innerHTML = filtered.map((player, idx) => {
    const rank = idx + 1;
    const isUser = player.isUser;

    return `
      <tr class="${isUser ? 'current-user-row' : ''}">
        <td>
          <span class="table-rank-num ${rank <= 3 ? 'text-gold' : ''}">#${rank}</span>
        </td>
        <td>
          <div class="table-player-cell">
            <div class="tbl-avatar">${player.name.charAt(0)}</div>
            <div class="tbl-name-wrap">
              <span class="tbl-player-name">${player.name}</span>
              ${isUser ? '<span class="you-tag">YOU</span>' : ''}
            </div>
          </div>
        </td>
        <td>${player.college}</td>
        <td>${player.accuracy || 85}%</td>
        <td>🔥 ${player.streak || 0}</td>
        <td>
          <span class="status-live-chip">
            <span class="pulse-dot green"></span>
            ${player.status || 'Active'}
          </span>
        </td>
        <td class="text-right">
          <span class="table-score-val">${player.score.toLocaleString()}</span>
        </td>
      </tr>
    `;
  }).join('');
}

// ==========================================================================
// 12. ROOM GENERATION & CLIPBOARD UTILITIES
// ==========================================================================
function generateRandomRoomCode() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `APTI-${randomNum}`;
}

function copyRoomCode(codeToCopy) {
  navigator.clipboard.writeText(codeToCopy).then(() => {
    AudioSFX.playPop();
    showToast(`Room code ${codeToCopy} copied to clipboard!`, 'success', '📋');
  }).catch(() => {
    // Fallback
    showToast(`Room code: ${codeToCopy}`, 'info', '📋');
  });
}

// ==========================================================================
// 13. LIVE TICKER ROTATION
// ==========================================================================
function initLiveTicker() {
  const tickerItems = [
    "🔥 <strong>Aarav</strong> (IIT Delhi) answered in 1.4s (+186 pts)",
    "⚡ <strong>BITS Pilani</strong> took #1 campus spot",
    "🎯 <strong>Sneha</strong> unlocked 5-Streak Fire bonus!",
    "🏆 <strong>Room APTI-7489</strong>: 42 contestants currently battling",
    "📊 <strong>Alex Verma</strong> climbed to Rank #2 in Quant Sprint",
    "🚀 <strong>NIT Trichy</strong> just joined the live inter-college room"
  ];

  let tickerIdx = 0;
  const track = document.getElementById('live-ticker-track');
  if (!track) return;

  setInterval(() => {
    tickerIdx = (tickerIdx + 1) % tickerItems.length;
    track.style.opacity = '0';
    setTimeout(() => {
      track.innerHTML = `
        <span class="ticker-item">${tickerItems[tickerIdx]}</span>
        <span class="ticker-sep">•</span>
        <span class="ticker-item">${tickerItems[(tickerIdx + 1) % tickerItems.length]}</span>
      `;
      track.style.opacity = '1';
      track.style.transition = 'opacity 0.4s ease';
    }, 400);
  }, 4800);
}

// ==========================================================================
// 14. EVENT LISTENERS & APPLICATION INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

  // Initialize Contenders
  initializeLiveContenders();

  // Navigation tab clicks
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      switchScreen(target);
    });
  });

  // Brand click returns to Home
  document.getElementById('nav-brand').addEventListener('click', () => {
    switchScreen('home');
  });

  // Sound FX Toggle
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundOnIcon = document.getElementById('sound-on-icon');
  const soundOffIcon = document.getElementById('sound-off-icon');

  soundBtn.addEventListener('click', () => {
    AppState.soundEnabled = !AppState.soundEnabled;
    soundOnIcon.classList.toggle('hidden', !AppState.soundEnabled);
    soundOffIcon.classList.toggle('hidden', AppState.soundEnabled);
    AudioSFX.playPop();
    showToast(AppState.soundEnabled ? "Audio FX Enabled" : "Audio FX Muted", 'info', '🔊');
  });

  // Header active room chip click
  document.getElementById('header-room-chip').addEventListener('click', () => {
    copyRoomCode(AppState.roomCode);
  });

  // Copy Room Code Button on Home Hero
  document.getElementById('btn-copy-room').addEventListener('click', () => {
    copyRoomCode(AppState.roomCode);
  });

  // Quick Join Button
  document.getElementById('btn-quick-join').addEventListener('click', () => {
    AudioSFX.playPop();
    document.getElementById('modal-join-room').classList.remove('hidden');
  });

  // Create Room Button
  document.getElementById('btn-open-create').addEventListener('click', () => {
    AudioSFX.playPop();
    const newCode = generateRandomRoomCode();
    document.getElementById('modal-created-code').textContent = newCode;
    document.getElementById('modal-create-room').classList.remove('hidden');
  });

  // Modal Close buttons
  document.getElementById('btn-close-join-modal').addEventListener('click', () => {
    document.getElementById('modal-join-room').classList.add('hidden');
  });
  document.getElementById('btn-cancel-join').addEventListener('click', () => {
    document.getElementById('modal-join-room').classList.add('hidden');
  });
  document.getElementById('btn-close-create-modal').addEventListener('click', () => {
    document.getElementById('modal-create-room').classList.add('hidden');
  });
  document.getElementById('btn-cancel-create').addEventListener('click', () => {
    document.getElementById('modal-create-room').classList.add('hidden');
  });

  // Quick Fill Active Code in Join Modal
  document.getElementById('btn-quick-fill-code').addEventListener('click', () => {
    document.getElementById('input-room-code').value = AppState.roomCode;
    AudioSFX.playPop();
  });

  // Copy modal code
  document.getElementById('btn-copy-modal-code').addEventListener('click', () => {
    const code = document.getElementById('modal-created-code').textContent;
    copyRoomCode(code);
  });

  // Confirm Join Match
  document.getElementById('btn-confirm-join').addEventListener('click', () => {
    const codeInput = document.getElementById('input-room-code').value.trim();
    const nameInput = document.getElementById('input-player-name').value.trim();
    const collegeInput = document.getElementById('input-player-college').value.trim();

    if (codeInput) AppState.roomCode = codeInput.toUpperCase();
    if (nameInput) AppState.userName = nameInput;
    if (collegeInput) AppState.userCollege = collegeInput;

    document.getElementById('header-room-val').textContent = AppState.roomCode;
    document.getElementById('home-room-code').textContent = AppState.roomCode;
    document.getElementById('modal-join-room').classList.add('hidden');

    showToast(`Entering Live Room ${AppState.roomCode}!`, 'success', '🚀');
    switchScreen('quiz');
    startQuizSession();
  });

  // Chip options in Join Modal
  document.querySelectorAll('.chip-choice-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip-choice-btn').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      document.getElementById('input-room-code').value = chip.getAttribute('data-room');
      AudioSFX.playPop();
    });
  });

  // Launch Created Room
  document.getElementById('btn-launch-created-room').addEventListener('click', () => {
    const newCode = document.getElementById('modal-created-code').textContent;
    const cat = document.getElementById('create-select-category').value;

    AppState.roomCode = newCode;
    document.getElementById('header-room-val').textContent = newCode;
    document.getElementById('home-room-code').textContent = newCode;
    document.getElementById('modal-create-room').classList.add('hidden');

    showToast(`Room ${newCode} created! Commencing battle...`, 'success', '🎉');
    switchScreen('quiz');
    startQuizSession(cat);
  });

  // Capacity Slider in Create Modal
  const capacitySlider = document.getElementById('capacity-slider');
  const capacityVal = document.getElementById('capacity-val');
  capacitySlider.addEventListener('input', (e) => {
    capacityVal.textContent = `${e.target.value} Players`;
  });

  // Play Mixed Arena / All Categories button
  document.getElementById('btn-start-all-categories').addEventListener('click', () => {
    switchScreen('quiz');
    startQuizSession('All');
  });

  // Category Start Buttons on Home Page
  document.querySelectorAll('.btn-category-start').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      switchScreen('quiz');
      startQuizSession(cat);
    });
  });

  // Lock Answer Button
  document.getElementById('btn-lock-answer').addEventListener('click', () => {
    lockCurrentAnswer();
  });

  // Next Question Button
  document.getElementById('btn-next-question').addEventListener('click', () => {
    advanceNextQuestion();
  });

  // Demo Controls
  document.getElementById('btn-demo-prev').addEventListener('click', () => {
    if (AppState.currentQuestionIdx > 0) {
      loadQuestion(AppState.currentQuestionIdx - 1);
    }
  });

  document.getElementById('btn-demo-next').addEventListener('click', () => {
    advanceNextQuestion();
  });

  document.getElementById('btn-demo-restart').addEventListener('click', () => {
    startQuizSession();
    showToast("Quiz restarted!", 'info', '🔄');
  });

  // Result CTA buttons
  document.getElementById('btn-results-restart').addEventListener('click', () => {
    switchScreen('quiz');
    startQuizSession();
  });

  document.getElementById('btn-results-leaderboard').addEventListener('click', () => {
    switchScreen('leaderboard');
  });

  document.getElementById('btn-results-dashboard').addEventListener('click', () => {
    switchScreen('dashboard');
  });

  // Dashboard CTA Jump to Quiz
  document.getElementById('btn-dash-start-quiz').addEventListener('click', () => {
    switchScreen('quiz');
    startQuizSession();
  });

  // Leaderboard Search Filter
  const leadSearch = document.getElementById('leaderboard-search');
  if (leadSearch) {
    leadSearch.addEventListener('input', (e) => {
      renderLeaderboardTable(e.target.value);
    });
  }

  // Leaderboard Filter Tabs
  document.querySelectorAll('.lead-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lead-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AudioSFX.playPop();
      renderLeaderboardTable();
    });
  });

  // Live Ticker Initiation
  initLiveTicker();

  // Mobile Menu Hamburger Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-open');
      AudioSFX.playPop();
    });
  }

  // Close mobile nav when tab clicked
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (mainNav) mainNav.classList.remove('mobile-open');
    });
  });

  // Keyboard Navigation Shortcuts (Space / Enter to Lock, 1-4 for options)
  window.addEventListener('keydown', (e) => {
    if (AppState.currentScreen !== 'quiz') return;

    if (['1', '2', '3', '4'].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      selectOption(idx);
    } else if (e.key === 'Enter') {
      const feedbackBanner = document.getElementById('feedback-banner');
      if (feedbackBanner && !feedbackBanner.classList.contains('hidden')) {
        advanceNextQuestion();
      } else if (!AppState.isLocked && AppState.selectedOptionIdx !== null) {
        lockCurrentAnswer();
      }
    }
  });

  console.log("⚡ AptiQuiz Engine initialized successfully. Ready for hackathon demo!");
});
