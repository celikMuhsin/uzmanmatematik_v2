// Denklik Arenası (Fraction Fusion) Game Logic

const DENKLIK_STATE = {
    difficulty: 'medium',
    timeMode: 90,
    cards: [], // { id, num, den, value, status } status: normal, selected, matched, error
    selectedIds: [],
    score: 0,
    streak: 0,
    timeLeft: 90,
    timerInterval: null,
    isPaused: false
};

// --- CONFIG ---
window.setDenklikDifficulty = function (diff) {
    DENKLIK_STATE.difficulty = diff;
    ['easy', 'medium', 'hard'].forEach(d => {
        const el = document.getElementById(`denklik-diff-${d}`);
        if (el) el.classList.remove('active');
    });
    const active = document.getElementById(`denklik-diff-${diff}`);
    if (active) active.classList.add('active');
};

window.setDenklikTime = function (sec) {
    DENKLIK_STATE.timeMode = parseInt(sec);
    ['30', '60', '90', '120'].forEach(t => {
        const el = document.getElementById(`denklik-time-${t}`);
        if (el) el.classList.remove('active');
    });
    const active = document.getElementById(`denklik-time-${sec}`);
    if (active) active.classList.add('active');
};

// --- LOGIC ---
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function generateFractions(diff) {
    const pairs = [];
    const maxVal = diff === 'easy' ? 10 : diff === 'medium' ? 30 : 90;

    while (pairs.length < 8) {
        let n = Math.floor(Math.random() * (maxVal / 2)) + 1;
        let d = Math.floor(Math.random() * (maxVal / 2)) + 2;

        const common = gcd(n, d);
        n /= common;
        d /= common;

        if (n >= d) continue; // Keep proper fractions

        // Generate Multipliers
        const mult1 = Math.floor(Math.random() * 3) + 1;
        let mult2;
        do { mult2 = Math.floor(Math.random() * 4) + 1; } while (mult1 === mult2);

        const f1 = { n: n * mult1, d: d * mult1 };
        const f2 = { n: n * mult2, d: d * mult2 };

        const val = f1.n / f1.d;
        // Unique Check
        if (!pairs.some(p => (p.n1 / p.d1) === val)) {
            pairs.push({ n1: f1.n, d1: f1.d, n2: f2.n, d2: f2.d });
        }
    }

    const newCards = [];
    pairs.forEach((p, idx) => {
        newCards.push({ id: idx * 2, num: p.n1, den: p.d1, value: p.n1 / p.d1, status: 'normal' });
        newCards.push({ id: idx * 2 + 1, num: p.n2, den: p.d2, value: p.n2 / p.d2, status: 'normal' });
    });

    return newCards.sort(() => Math.random() - 0.5);
}

window.startDenklikGame = function () {
    try {
        DENKLIK_STATE.cards = generateFractions(DENKLIK_STATE.difficulty);
        DENKLIK_STATE.score = 0;
        DENKLIK_STATE.streak = 0;
        DENKLIK_STATE.timeLeft = DENKLIK_STATE.timeMode;
        DENKLIK_STATE.selectedIds = [];

        // Switch Views
        const configView = document.getElementById('denklik-config-view');
        const playingView = document.getElementById('denklik-playing-view');
        const resultView = document.getElementById('denklik-result-view');
        const cardsContainer = document.getElementById('denklik-cards-container');

        if (!configView || !playingView || !resultView) {
            throw new Error("HTML Elementleri bulunamadı! (Views)");
        }

        configView.style.display = 'none';
        resultView.style.display = 'none';
        playingView.style.display = 'flex';

        // Initial Fade Out for smooth start
        if (cardsContainer) cardsContainer.style.opacity = '0';

        renderGrid().then(() => {
            // Fade In after render
            if (cardsContainer) cardsContainer.style.opacity = '1';
        });
        updateStats();

        // Start Timer
        if (DENKLIK_STATE.timerInterval) clearInterval(DENKLIK_STATE.timerInterval);
        DENKLIK_STATE.timerInterval = setInterval(() => {
            if (!DENKLIK_STATE.isPaused) {
                DENKLIK_STATE.timeLeft--;
                const timerDisplay = document.getElementById('denklik-timer-display');
                if (timerDisplay) timerDisplay.textContent = DENKLIK_STATE.timeLeft + 's';

                if (DENKLIK_STATE.timeLeft <= 0) {
                    endDenklikGame();
                } else if (DENKLIK_STATE.timeLeft <= 10) {
                    const timerBox = document.getElementById('denklik-timer-box');
                    if (timerBox) timerBox.style.backgroundColor = '#f43f5e';
                    if (timerDisplay) timerDisplay.style.color = 'white';
                }
            }
        }, 1000);
    } catch (e) {
        alert("Oyun başlatılırken hata oluştu: " + e.message);
        console.error(e);
    }
}

function handleCardClick(id) {
    if (DENKLIK_STATE.isPaused || DENKLIK_STATE.selectedIds.length >= 2) return;

    const card = DENKLIK_STATE.cards.find(c => c.id === id);
    if (!card || card.status === 'matched' || card.status === 'selected') return;

    DENKLIK_STATE.selectedIds.push(id);
    card.status = 'selected';
    renderGrid(); // Re-render to show selection

    if (DENKLIK_STATE.selectedIds.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [id1, id2] = DENKLIK_STATE.selectedIds;
    const c1 = DENKLIK_STATE.cards.find(c => c.id === id1);
    const c2 = DENKLIK_STATE.cards.find(c => c.id === id2);

    if (c1.value === c2.value) {
        // MATCH
        setTimeout(() => {
            DENKLIK_STATE.streak++;
            const bonus = DENKLIK_STATE.streak > 1 ? 1 : 0;
            const points = 3 + bonus;
            DENKLIK_STATE.score += points;

            c1.status = 'matched';
            c2.status = 'matched';
            DENKLIK_STATE.selectedIds = [];

            showFeedback(bonus > 0 ? `✓ Doğru! +${points} (Seri x${DENKLIK_STATE.streak})` : `✓ Eşleşti! +3 Puan`, bonus > 0 ? 'bonus' : 'success');
            renderGrid(); // Hide cards
            updateStats();

            // Check Win
            if (DENKLIK_STATE.cards.every(c => c.status === 'matched')) {
                setTimeout(endDenklikGame, 500);
            }
        }, 400);
    } else {
        // ERROR
        c1.status = 'error';
        c2.status = 'error';
        renderGrid(); // Show red

        setTimeout(() => {
            DENKLIK_STATE.score = Math.max(0, DENKLIK_STATE.score - 1);
            DENKLIK_STATE.streak = 0;

            c1.status = 'normal';
            c2.status = 'normal';
            DENKLIK_STATE.selectedIds = [];

            showFeedback(`✗ Yanlış! -1 Puan. Seri Sıfırlandı.`, 'error');
            renderGrid(); // Reset
            updateStats();
        }, 600);
    }
}

function renderGrid() {
    const container = document.getElementById('denklik-cards-container');
    // Ensure container exists
    if (!container) return Promise.resolve();

    let newCardsRequested = false;

    DENKLIK_STATE.cards.forEach(card => {
        let btn = document.getElementById(`denklik-card-${card.id}`);

        if (!btn) {
            btn = document.createElement('div');
            btn.id = `denklik-card-${card.id}`;
            btn.onclick = () => handleCardClick(card.id);
            // Initial content
            let content = `$\\frac{${card.num}}{${card.den}}$`;
            btn.innerHTML = `<div>${content}</div>`;
            container.appendChild(btn);
            newCardsRequested = true;
        }

        // Update class safely to preserve animation state
        // Only touch DOM if class actually changes
        const targetClass = `card-btn ${card.status}`;
        if (btn.className !== targetClass) {
            btn.className = targetClass;
        }
    });

    if (newCardsRequested && window.MathJax) {
        // Only typeset if new elements added
        return MathJax.typesetPromise([container]);
    }
    return Promise.resolve();
}

function updateStats() {
    const scoreEl = document.getElementById('denklik-score-display');
    const streakDisplay = document.getElementById('denklik-streak-display');

    if (scoreEl) scoreEl.textContent = DENKLIK_STATE.score;
    if (streakDisplay) streakDisplay.textContent = 'x' + DENKLIK_STATE.streak;

    const streakBox = document.getElementById('denklik-streak-box');
    if (streakBox && streakDisplay) {
        if (DENKLIK_STATE.streak >= 2) {
            streakBox.style.backgroundColor = '#f97316'; // orange-500
            streakBox.style.color = 'white';
            streakDisplay.style.color = 'white';
        } else {
            streakBox.style.backgroundColor = '#f1f5f9';
            streakBox.style.color = '#64748b';
            streakDisplay.style.color = '#64748b'; // gray-500
        }
    }
}

function showFeedback(msg, type) {
    const toast = document.getElementById('denklik-feedback-toast');
    toast.textContent = msg;
    toast.className = `feedback-toast show feedback-${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function endDenklikGame() {
    clearInterval(DENKLIK_STATE.timerInterval);
    document.getElementById('denklik-playing-view').style.display = 'none';
    document.getElementById('denklik-result-view').style.display = 'flex';
    document.getElementById('denklik-final-score').textContent = DENKLIK_STATE.score;
}
