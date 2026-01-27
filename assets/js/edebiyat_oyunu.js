/* Edebiyat Game - Internal Module */

let intState = {
    active: false,
    categories: 'all',
    score: 0,
    questions: [],
    currentIdx: 0
};

// --- LOBBY LOGIC ---
window.selectInternalCategory = function (cat, btn) {
    intState.categories = cat;

    // UI
    document.querySelectorAll('#edebiyat-categories .filter-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    // Show selected text
    document.getElementById('game-start-area').style.display = 'block';

    let map = {
        'all': 'Karışık (Hepsi)',
        'yazar_eser': 'Yazar & Eser',
        'ilkler': 'İlkler',
        'terim': 'Terimler',
        'donem': 'Dönemler',
        'unvan': 'Unvanlar'
    };
    document.getElementById('selected-cat-name').innerText = map[cat] || cat;
};

window.startInternalGame = function () {
    // 1. Prepare Data
    if (!window.edebiyatSorulari) {
        console.error("Data not loaded");
        return;
    }

    let data = window.edebiyatSorulari;
    if (intState.categories !== 'all') {
        data = data.filter(q => q.tur === intState.categories);
    }

    if (data.length < 1) {
        alert("Bu kategoride soru bulunamadı.");
        return;
    }

    intState.questions = [...data].sort(() => 0.5 - Math.random());
    intState.active = true;
    intState.score = 0;
    intState.currentIdx = 0;

    updateIntScore(0);

    // 2. Switch UI
    document.querySelector('.lobby-internal').style.display = 'none';
    document.getElementById('internal-game-play-area').style.display = 'block';

    renderIntQuestion();
};

window.exitInternalGame = function () {
    intState.active = false;
    document.getElementById('internal-game-play-area').style.display = 'none';
    document.querySelector('.lobby-internal').style.display = 'block';
    // Reset Start Area
    document.getElementById('game-start-area').style.display = 'none';
    document.querySelectorAll('#edebiyat-categories .filter-btn').forEach(b => b.classList.remove('selected'));
};

function updateIntScore(val) {
    intState.score += val;
    document.getElementById('int-score').innerText = intState.score;
}

function renderIntQuestion() {
    if (!intState.active) return;

    if (intState.currentIdx >= intState.questions.length) {
        alert("Oyun Bitti! Skorunuz: " + intState.score);
        exitInternalGame();
        return;
    }

    const q = intState.questions[intState.currentIdx];

    // Wrong options
    const allAnswers = window.edebiyatSorulari.map(x => x.cevap);
    const distractors = allAnswers.filter(a => a !== q.cevap)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    const options = [q.cevap, ...distractors].sort(() => 0.5 - Math.random());

    const container = document.getElementById('int-quiz-area');
    container.innerHTML = `
        <div class="question-card">${q.soru}</div>
        <div class="options-grid">
            ${options.map(opt => `<button class="option-btn" onclick="handleIntAnswer(this, '${opt.replace(/'/g, "\\'")}')">${opt}</button>`).join('')}
        </div>
    `;
}

window.handleIntAnswer = function (btn, ans) {
    if (!intState.active) return;
    const q = intState.questions[intState.currentIdx];

    if (ans === q.cevap) {
        btn.classList.add('correct');
        updateIntScore(10);
        setTimeout(() => {
            intState.currentIdx++;
            renderIntQuestion();
        }, 600);
    } else {
        btn.classList.add('wrong');
        updateIntScore(-5);
        // Dont advance immediately? Or Maybe do. Let's wait.
    }
};

// --- OPEN CARD MATCHING GAME LOGIC (Refactored to match Denklik Arenası Structure) ---
let memState = {
    cards: [], // { uniqueId, pairId, text, status: 'normal'|'selected'|'matched'|'error' }
    selectedIds: [], // List of uniqueIds
    matches: 0,
    timeLimit: 90,
    timeLeft: 90,
    timerInterval: null,
    score: 0,
    locked: false
};

window.setMemoryTime = function (sec) {
    memState.timeLimit = parseInt(sec);
    // UI Update
    ['30', '60', '90', '120'].forEach(t => {
        const btn = document.getElementById(`mem-time-${t}`);
        if (btn) btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`mem-time-${sec}`);
    if (activeBtn) activeBtn.classList.add('active');

    const timerDisplay = document.getElementById('mem-timer-display');
    if (timerDisplay) timerDisplay.innerText = sec + 's';
};

window.toggleMemoryGame = function () {
    const container = document.getElementById('memory-game-container');
    if (!container) return;

    if (container.style.display === 'block') {
        container.style.display = 'none';
        if (memState.timerInterval) clearInterval(memState.timerInterval);
    } else {
        container.style.display = 'block';
        initMemoryGame();
    }
};

function initMemoryGame() {
    // 1. Data Preparation
    if (!window.eserListesi) {
        alert("Veri bulunamadı!");
        return;
    }

    let potentialPairs = [...window.eserListesi];
    if (potentialPairs.length < 8) {
        alert("Yeterli veri yok!");
        return;
    }

    // Shuffle and Select 8 Unique Pairs with Unique Authors
    potentialPairs.sort(() => 0.5 - Math.random());
    const selectedData = [];
    const usedKeys = new Set();
    const usedAuthors = new Set();

    for (const item of potentialPairs) {
        if (selectedData.length >= 8) break;
        const key = item.id;

        // Ensure both ID is unique AND Author is not already used
        if (!usedKeys.has(key) && !usedAuthors.has(item.yazar)) {
            selectedData.push(item);
            usedKeys.add(key);
            usedAuthors.add(item.yazar);
        }
    }

    // Create Deck
    let deck = [];
    selectedData.forEach((item, idx) => {
        // pairId is the common ID for matching
        deck.push({
            uniqueId: idx * 2,
            pairId: item.id,
            text: item.eserAdi,
            status: 'normal'
        });
        deck.push({
            uniqueId: idx * 2 + 1,
            pairId: item.id,
            text: item.yazar,
            status: 'normal'
        });
    });

    // Shuffle Deck
    deck.sort(() => 0.5 - Math.random());

    // Initialize State
    memState.cards = deck;
    memState.selectedIds = [];
    memState.matches = 0;
    memState.score = 0;
    memState.timeLeft = memState.timeLimit;
    memState.locked = false;

    // UI Reset
    document.getElementById('mem-score-display').innerText = 0;
    document.getElementById('mem-timer-display').innerText = memState.timeLeft + 's';
    document.getElementById('mem-timer-display').style.background = '#eee';
    document.getElementById('mem-timer-display').style.color = '#333';

    // Start Timer
    startMemoryTimer();

    // Initial Render
    renderMemoryGrid();

    // Expose handler for inline clicks
    window.handleMemCardClick = handleMemCardClick;
}

function renderMemoryGrid() {
    const grid = document.getElementById('memory-grid');
    if (!grid) return;
    grid.innerHTML = '';

    memState.cards.forEach(card => {
        const div = document.createElement('div');
        // Base class + status class (controlled by rendering logic)
        div.className = `mem-card ${card.status}`;

        // Standard small font for consistency
        div.style.fontSize = "0.85rem";
        div.style.padding = "4px"; /* Ensure padding handles small text well */

        div.innerText = truncateText(card.text || '', 60);

        // Apply visual styles based on status directly to ensure no CSS conflict
        if (card.status === 'matched') {
            div.style.backgroundColor = '#dcfce7'; // green-100
            div.style.borderColor = '#22c55e'; // green-500
            div.style.opacity = '0.7';
            div.style.cursor = 'default';
        } else if (card.status === 'error') {
            div.style.backgroundColor = '#fee2e2'; // red-100
            div.style.borderColor = '#ef4444'; // red-500
        } else if (card.status === 'selected') {
            div.style.backgroundColor = '#e0f2fe'; // blue-100
            div.style.borderColor = '#3b82f6'; // blue-500
            div.style.transform = 'translateY(-2px)';
        } else {
            // Normal
            div.style.backgroundColor = '';
            div.style.borderColor = '';
            div.style.transform = '';
        }

        // Inline click handler - The Most Robust Method
        div.setAttribute('onclick', `window.handleMemCardClick(${card.uniqueId})`);

        grid.appendChild(div);
    });
}

function handleMemCardClick(uniqueId) {
    if (memState.locked) return;

    const card = memState.cards.find(c => c.uniqueId === uniqueId);

    // Ignore if invalid, already matched, or already selected
    if (!card || card.status === 'matched' || card.status === 'selected') return;

    // Select Card
    card.status = 'selected';
    memState.selectedIds.push(uniqueId);

    // Update UI immediately to show selection
    renderMemoryGrid();

    // Check Match if 2 cards selected
    if (memState.selectedIds.length === 2) {
        checkMemMatch();
    }
}

function checkMemMatch() {
    memState.locked = true; // Prevent clicks during check
    const [id1, id2] = memState.selectedIds;
    const c1 = memState.cards.find(c => c.uniqueId === id1);
    const c2 = memState.cards.find(c => c.uniqueId === id2);

    if (c1.pairId === c2.pairId) {
        // MATCH SUCCESS
        setTimeout(() => {
            c1.status = 'matched';
            c2.status = 'matched';
            memState.score += 12.5;
            memState.matches++;
            document.getElementById('mem-score-display').innerText = memState.score;

            // Clean up turn
            memState.selectedIds = [];
            memState.locked = false;
            renderMemoryGrid();

            // Win Condition
            if (memState.matches === 8) {
                setTimeout(() => {
                    if (memState.timerInterval) clearInterval(memState.timerInterval);
                    alert("Tebrikler! Tüm eşleşmeleri buldunuz. Skor: " + memState.score);
                }, 500);
            }
        }, 500); // Short delay for user to see the second selection
    } else {
        // MATCH FAIL
        c1.status = 'error';
        c2.status = 'error';
        renderMemoryGrid(); // Show red

        setTimeout(() => {
            c1.status = 'normal';
            c2.status = 'normal';
            memState.selectedIds = [];
            memState.locked = false;
            renderMemoryGrid(); // Reset to normal
        }, 800);
    }
}

function startMemoryTimer() {
    if (memState.timerInterval) clearInterval(memState.timerInterval);
    memState.timerInterval = setInterval(() => {
        memState.timeLeft--;
        const disp = document.getElementById('mem-timer-display');
        if (disp) {
            disp.innerText = memState.timeLeft + 's';
            if (memState.timeLeft <= 10) {
                disp.style.background = '#f43f5e';
                disp.style.color = 'white';
            }
        }

        if (memState.timeLeft <= 0) {
            endMemoryGame();
        }
    }, 1000);
}

function endMemoryGame() {
    if (memState.timerInterval) clearInterval(memState.timerInterval);
    alert("Süre Doldu! Oyun Bitti.");
    // Disable all
    memState.cards.forEach(c => c.status = 'matched'); // Just lock them visually or logic wise
    memState.locked = true;
    renderMemoryGrid();
}

function truncateText(str, n) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
}


// --- SUMMARY - FEATURE GAME LOGIC ---
let sumState = {
    active: false,
    questions: [],
    currentIdx: 0,
    score: 0,
    totalQuestions: 10,
    timerInterval: null,
    secondsElapsed: 0,
    quizData: [],       // Stores { question, options, correctFeature } for all questions
    userAnswers: []     // Stores { selectedOption, isCorrect } for each index
};

// Inject Custom Styles for Summary Game
const style = document.createElement('style');
style.innerHTML = `
    .opt-correct { background-color: #dcfce7 !important; border: 2px solid #22c55e !important; color: #15803d !important; }
    .opt-wrong { background-color: #fee2e2 !important; border: 2px solid #ef4444 !important; color: #b91c1c !important; }
    
    /* Navigation Buttons */
    .sum-btn {
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        border: none;
        color: white;
        transition: opacity 0.2s;
    }
    .sum-next-btn {
        background: linear-gradient(135deg, var(--secondary-color), #d35400); 
        float: right;
    }
    .sum-prev-btn {
        background-color: #94a3b8; /* Grayish */
        float: left;
    }
    .sum-btn:hover { opacity: 0.9; }

    /* Aesthetic Close Button - VISIBLE & STATIC */
    .close-btn-aesthetic {
        background-color: transparent !important;
        color: #ef4444; /* Standard Red */
        border: none !important;
        padding: 8px;
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        transition: transform 0.2s;
    }
    .close-btn-aesthetic:hover {
        transform: scale(1.1);
        background-color: transparent !important;
    }
    }
    .close-btn-aesthetic:hover {
        background-color: #ffe4e6; /* Rose-100 */
        border-color: #fda4af; /* Rose-300 */
    }
    .close-btn-aesthetic svg {
        width: 20px;
        height: 20px;
        stroke-width: 3px; /* Make cross thicker/bolder */
    }
`;
document.head.appendChild(style);

window.setSummaryQuestionCount = function (val) {
    sumState.totalQuestions = parseInt(val);

    // UI Update
    ['5', '10', '15', '20'].forEach(q => {
        const btn = document.getElementById(`sum-q-${q}`);
        if (btn) btn.classList.remove('active');
    });

    const activeBtn = document.getElementById(`sum-q-${val}`);
    if (activeBtn) activeBtn.classList.add('active');
};


function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

window.toggleSummaryGame = function () {
    const container = document.getElementById('summary-game-container');
    if (!container) return;

    if (container.style.display === 'block') {
        container.style.display = 'none';
        sumState.active = false;
        if (sumState.timerInterval) clearInterval(sumState.timerInterval);
    } else {
        // Close other games if open
        const memContainer = document.getElementById('memory-game-container');
        if (memContainer) {
            memContainer.style.display = 'none';
            if (memState.timerInterval) clearInterval(memState.timerInterval);
        }

        container.style.display = 'block';
        initSummaryGame();
    }
};

function initSummaryGame() {
    if (!window.eserListesi || window.eserListesi.length === 0) {
        alert("Oyun verisi yüklenemedi (edebiyat_data_2.js).");
        return;
    }

    // 1. Prepare Questions
    // Shuffle all works and use config total
    let pool = [...window.eserListesi].sort(() => 0.5 - Math.random());
    const count = Math.min(sumState.totalQuestions, pool.length);
    const selectedQuestions = pool.slice(0, count);

    // If pool is smaller than requested, update state to avoid finish errors
    sumState.totalQuestions = count;

    // 2. Pre-generate Quiz Data (Questions + Options) to ensure stability for Back navigation
    sumState.quizData = [];
    sumState.userAnswers = new Array(count).fill(null); // Reset answers

    selectedQuestions.forEach(q => {
        // A. Correct Answer
        const correctFeature = q.ozellikler[Math.floor(Math.random() * q.ozellikler.length)];

        // B. Distractors
        const otherWorks = window.eserListesi.filter(w => w.id !== q.id);
        let distractors = [];

        // Safety check
        if (otherWorks.length < 4) {
            // Fallback if not enough data, just duplicate
        }

        while (distractors.length < 4) {
            const randomWork = otherWorks[Math.floor(Math.random() * otherWorks.length)];
            if (randomWork.ozellikler && randomWork.ozellikler.length > 0) {
                const randomFeature = randomWork.ozellikler[Math.floor(Math.random() * randomWork.ozellikler.length)];
                if (!distractors.includes(randomFeature) && randomFeature !== correctFeature) {
                    distractors.push(randomFeature);
                }
            }
        }

        // C. Combine and Shuffle Options
        const options = [correctFeature, ...distractors].sort(() => 0.5 - Math.random());

        sumState.quizData.push({
            questionObj: q,
            correctFeature: correctFeature,
            options: options
        });
    });


    sumState.currentIdx = 0;
    sumState.score = 0;
    sumState.active = true;
    sumState.secondsElapsed = 0;

    // Start Timer
    if (sumState.timerInterval) clearInterval(sumState.timerInterval);
    document.getElementById('sum-timer-display').innerText = "00:00";
    sumState.timerInterval = setInterval(() => {
        sumState.secondsElapsed++;
        document.getElementById('sum-timer-display').innerText = formatTime(sumState.secondsElapsed);
    }, 1000);

    updateSummaryScore(0);

    // Reset Container Inner HTML structure
    const playArea = document.getElementById('summary-game-play-area');
    playArea.innerHTML = `
        <div class="question-card" id="sum-question-text" style="font-size: 1rem; margin-bottom: 20px;"></div>
        <div class="options-grid" id="sum-options-grid" style="grid-template-columns: 1fr; gap: 10px;"></div>
        <div id="sum-controls-area" style="overflow: auto; margin-top: 20px;">
            <button id="sum-prev-btn" class="sum-btn sum-prev-btn" onclick="prevSummaryQuestion()" style="display:none;">⬅ Geri</button>
            <button id="sum-next-btn" class="sum-btn sum-next-btn" onclick="nextSummaryQuestion()" style="display:none;">İleri ➡</button>
        </div>
    `;

    renderSummaryQuestion();
}

// Override or update updateSummaryScore to update the new display
function updateSummaryScore(val) {
    sumState.score += val;
    // Update header badge if exists
    const disp = document.getElementById('sum-score-display');
    if (disp) disp.innerText = Math.round(sumState.score); // Round for cleaner display
}



function renderSummaryQuestion() {
    if (!sumState.active) return;

    // Safety check
    if (sumState.currentIdx >= sumState.quizData.length) {
        // Finish game handled by nextSummaryQuestion generally, but simple safety:
        finishSummaryGame();
        return;
    }

    const data = sumState.quizData[sumState.currentIdx];
    const q = data.questionObj;
    const userAnswer = sumState.userAnswers[sumState.currentIdx]; // Check if already answered

    // Update Header Badge for Question Count
    const qLabel = document.getElementById('sum-q-num');
    if (qLabel) qLabel.innerText = `${sumState.currentIdx + 1} / ${sumState.totalQuestions}`;

    // Render Text
    const qContainer = document.getElementById('sum-question-text');
    qContainer.innerHTML = `
        <div style="font-size: 1.25rem; font-weight: 700; color: #1e293b; line-height: 1.5;">
            Aşağıdakilerden hangisi <span style="color: var(--secondary-color);">"${q.eserAdi}"</span> eserinin özelliklerinden biridir?
        </div>
    `;

    // Render Options
    const optGrid = document.getElementById('sum-options-grid');
    optGrid.innerHTML = '';
    optGrid.style.gridTemplateColumns = '1fr';

    const letters = ['A', 'B', 'C', 'D', 'E'];

    data.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.style.fontSize = '1.0rem';
        btn.style.padding = '12px';
        btn.style.textAlign = 'left';

        const letterPrefix = `<b>${letters[idx]})</b> `;
        btn.innerHTML = letterPrefix + opt;

        // If already answered, apply styling
        if (userAnswer) {
            btn.style.pointerEvents = 'none'; // Disable clicks
            if (opt === data.correctFeature) {
                btn.classList.add('opt-correct');
            }
            if (userAnswer.selectedOption === opt && !userAnswer.isCorrect) {
                btn.classList.add('opt-wrong');
            }
        } else {
            // New question interaction
            btn.onclick = () => handleSummaryAnswer(btn, opt, data.correctFeature);
        }

        optGrid.appendChild(btn);
    });

    // Handle Buttons Visibility
    const prevBtn = document.getElementById('sum-prev-btn');
    const nextBtn = document.getElementById('sum-next-btn');

    // START: Always hide first, then show based on logic
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    // BACK Button: Show if idx > 0
    if (sumState.currentIdx > 0 && prevBtn) {
        prevBtn.style.display = 'block';
    }

    // NEXT Button: Show if Answered OR if we want to allow skipping (Assuming answer required to proceed? Logic was: answer -> show next)
    // The user requested "Forward button ... appear". 
    // Logic: If user HAS ANSWERED, we show the Next/Finish button.
    if (userAnswer) {
        if (nextBtn) {
            nextBtn.style.display = 'block';
            if (sumState.currentIdx >= (sumState.totalQuestions - 1)) {
                nextBtn.innerText = "Oyunu Bitir 🏁";
                nextBtn.onclick = finishSummaryGame;
            } else {
                nextBtn.innerText = "İleri ➡";
                nextBtn.onclick = nextSummaryQuestion;
            }
        }
    }
}

window.handleSummaryAnswer = function (btn, selected, correct) {
    if (!sumState.active) return;

    // Save User Answer
    const isCorrect = (selected === correct);
    sumState.userAnswers[sumState.currentIdx] = {
        selectedOption: selected,
        isCorrect: isCorrect
    };

    // Disable all buttons immediately
    const allBtns = document.querySelectorAll('#sum-options-grid .option-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    // Visual Feedback
    if (isCorrect) {
        btn.classList.add('opt-correct');
        const pointsPerQ = 100 / sumState.totalQuestions;
        updateSummaryScore(pointsPerQ);
    } else {
        btn.classList.add('opt-wrong');
        // Highlight correct one
        allBtns.forEach(b => {
            if (b.innerText.includes(correct)) {
                b.classList.add('opt-correct');
            }
        });
    }

    // Show Next Button
    const nextBtn = document.getElementById('sum-next-btn');
    if (nextBtn) {
        nextBtn.style.display = 'block';
        if (sumState.currentIdx >= (sumState.totalQuestions - 1)) {
            nextBtn.innerText = "Oyunu Bitir 🏁";
            nextBtn.onclick = finishSummaryGame;
        } else {
            nextBtn.innerText = "İleri ➡";
            nextBtn.onclick = nextSummaryQuestion;
        }
    }
}

window.nextSummaryQuestion = function () {
    sumState.currentIdx++;
    renderSummaryQuestion();
};

window.prevSummaryQuestion = function () {
    if (sumState.currentIdx > 0) {
        sumState.currentIdx--;
        renderSummaryQuestion();
    }
};

window.finishSummaryGame = function () {
    if (sumState.timerInterval) clearInterval(sumState.timerInterval);
    const timeStr = formatTime(sumState.secondsElapsed);

    alert(`🎉 OYUN BİTTİ!\n\n🏆 Toplam Puan: ${sumState.score} / 100\n⏱️ Süre: ${timeStr}\n\nTebrikler!`);

    // Reset/Close
    sumState.active = false;
    document.getElementById('summary-game-container').style.display = 'none';
};
