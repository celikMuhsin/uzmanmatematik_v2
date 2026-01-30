// Quiz Application Logic

let questions = [];
let currentQuestionIndex = 0;
let userAnswers = {}; // { quesionId: optionIndex }
let timerInterval;
let timeLeft = 40 * 60; // 40 minutes in seconds
let startTime = Date.now();
let userName = "";

document.addEventListener('DOMContentLoaded', () => {
    loadScoreboard();
});

// 1. Start Quiz
async function startQuiz() {
    const nameInput = document.getElementById('username-input');
    if (!nameInput.value.trim()) {
        alert("Lütfen adınızı giriniz.");
        return;
    }
    userName = nameInput.value.trim();

    // UI Switch
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    // Load Data
    await loadQuestions();

    // Start Timer
    startTimer();

    // Show First Question
    renderQuestion();
}

async function loadQuestions() {
    try {
        const response = await fetch('assets/data/questions.json');
        questions = await response.json();
        // Initialize user answers with null
        questions.forEach((q, i) => userAnswers[i] = null);
        updateStats();
    } catch (e) {
        console.error("Error loading questions:", e);
    }
}

// 2. Timer
function startTimer() {
    const timerDisplay = document.getElementById('timer');
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            finishQuiz();
        }
    }, 1000);
}

// 3. Render Question
function renderQuestion() {
    const container = document.getElementById('question-container');
    const question = questions[currentQuestionIndex];

    // Update Question Number
    document.getElementById('current-q-num').textContent = currentQuestionIndex + 1;

    // Fix LaTeX sizing by ensuring \displaystyle is present
    const formatLatex = (text) => {
        // Replace all $...$ with $\displaystyle ...$ if not already present
        // This is a naive regex but works for simple cases
        return text.replace(/\$([^\$]+)\$/g, (match, content) => {
            if (content.includes('displaystyle')) return match;
            return `$\\displaystyle ${content}$`;
        });
    };

    const formattedQuestion = formatLatex(question.question);

    // Determine Layout
    // Calculate max length of options to decide layout
    const maxLength = Math.max(...question.options.map(opt => opt.length));

    let layoutClass = 'layout-stack'; // Default Long
    if (maxLength < 10) {
        layoutClass = 'layout-row'; // Short
    } else if (maxLength < 30) {
        layoutClass = 'layout-split'; // Medium
    }

    // Template
    let html = `<div class="question-text">${currentQuestionIndex + 1}. ${formattedQuestion}</div>`;
    html += `<div class="options-grid ${layoutClass}">`;

    question.options.forEach((opt, index) => {
        const isSelected = userAnswers[currentQuestionIndex] === index ? 'selected' : '';
        const formattedOption = formatLatex(opt);
        html += `
            <div class="option-btn ${isSelected}" onclick="selectOption(${index})">
                <span style="font-weight:bold; margin-right:10px;">${String.fromCharCode(65 + index)})</span>
                ${formattedOption}
            </div>
        `;
    });
    html += `</div>`;

    container.innerHTML = html;

    // Trigger MathJax
    if (window.MathJax) {
        MathJax.typesetPromise([container]);
    }

    // Button States
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;

    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('finish-btn').style.display = 'inline-block';
    } else {
        document.getElementById('next-btn').style.display = 'inline-block';
        document.getElementById('finish-btn').style.display = 'none';
    }
}

// 4. Navigation & Selection
window.changeQuestion = (dir) => {
    currentQuestionIndex += dir;
    renderQuestion();
};

window.selectOption = (optionIndex) => {
    userAnswers[currentQuestionIndex] = optionIndex;
    renderQuestion(); // Re-render to show selection state
    // updateStats(); // Stats turned off during exam
};

function updateStats() {
    // Empty function (disabled)
}

// 5. Finish & Score
window.finishQuiz = () => {
    try {
        console.log("FinishQuiz started");
        clearInterval(timerInterval);

        // Calculate Stats
        let correct = 0;
        let wrong = 0;
        let empty = 0;

        questions.forEach((q, i) => {
            const ans = userAnswers[i];
            if (ans === null || ans === undefined) {
                empty++;
            } else if (ans === q.answer) {
                correct++;
            } else {
                wrong++;
            }
        });

        const score = correct * 5;
        const timeTakenSeconds = (40 * 60) - timeLeft;

        // Save Score
        saveScore(score);

        // Show Detailed Report
        showReportPage({
            score: score,
            correct: correct,
            wrong: wrong,
            empty: empty,
            timeTaken: timeTakenSeconds,
            totalQuestions: questions.length
        });
    } catch (e) {
        alert("FinishQuiz Hatası: " + e.message);
        console.error(e);
    }
};

// 6. Scoreboard (LocalStorage)
function saveScore(score) {
    const scores = JSON.parse(localStorage.getItem('um_scores') || '[]');
    scores.push({
        name: userName,
        score: score,
        date: new Date().toLocaleDateString()
    });
    // Sort by score desc
    scores.sort((a, b) => b.score - a.score);
    // Keep top 10
    const top10 = scores.slice(0, 10);
    localStorage.setItem('um_scores', JSON.stringify(top10));
}

function loadScoreboard() {
    const list = document.getElementById('scoreboard-list');
    const scores = JSON.parse(localStorage.getItem('um_scores') || '[]');

    if (scores.length === 0) {
        list.innerHTML = "<li>Henüz kayıtlı skor yok. İlk siz olun!</li>";
        return;
    }

    let html = "";
    scores.forEach((s, i) => {
        html += `
            <li style="display:flex; justify-content:space-between; padding: 5px 0; border-bottom:1px solid #eee;">
                <span>${i + 1}. ${s.name}</span>
                <span style="font-weight:bold; color:var(--secondary-color)">${s.score} P</span>
            </li>
        `;
    });
    list.innerHTML = html;
}

// 7. Quit Quiz (New)
window.quitQuiz = () => {
    try {
        if (confirm('Sınavı yarıda bırakmak istediğinize emin misiniz? Şu ana kadarki sonuçlarınızla rapor oluşturulacak.')) {
            finishQuiz();
        }
    } catch (e) {
        alert("QuitQuiz Hatası: " + e.message);
    }
};

// 8. Show Report Page (New)
window.showReportPage = (stats) => {
    try {
        console.log("ShowReportPage started", stats);

        // Hide Quiz Screens
        const quizScreen = document.getElementById('quiz-screen');
        const resultScreen = document.getElementById('result-screen');
        const startScreen = document.getElementById('start-screen');

        if (quizScreen) quizScreen.style.display = 'none';
        if (resultScreen) resultScreen.style.display = 'none';
        if (startScreen) startScreen.style.display = 'none';

        // Show Report Page
        const reportPage = document.getElementById('detailed-report-page');
        if (!reportPage) {
            alert("HATA: Rapor sayfası HTML'de bulunamadı (id='detailed-report-page')!");
            return;
        }
        reportPage.style.display = 'block';

        // 1. Date
        const now = new Date();
        const dateEl = document.getElementById('report-date');
        if (dateEl) dateEl.textContent = now.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        // 2. User Info
        const userEl = document.getElementById('report-username');
        if (userEl) userEl.textContent = userName || "Misafir Öğrenci";

        const scoreEl = document.getElementById('report-total-score');
        if (scoreEl) scoreEl.textContent = stats.score;

        // 3. Stats Grid
        const correctEl = document.getElementById('report-correct');
        if (correctEl) correctEl.textContent = stats.correct;

        const wrongEl = document.getElementById('report-wrong');
        if (wrongEl) wrongEl.textContent = stats.wrong;

        const emptyEl = document.getElementById('report-empty');
        if (emptyEl) emptyEl.textContent = stats.empty;

        // Time Formatting
        const min = Math.floor(stats.timeTaken / 60);
        const sec = stats.timeTaken % 60;
        const timeEl = document.getElementById('report-time');
        if (timeEl) timeEl.textContent = `${min}dk ${sec}sn`;

        // Speed (min/question)
        const timePerQ = stats.timeTaken > 0 ? (stats.timeTaken / 60) / (stats.correct + stats.wrong + stats.empty || 1) : 0;
        const speedEl = document.getElementById('report-speed');
        if (speedEl) speedEl.textContent = timePerQ.toFixed(2);

        // 4. Dynamic Analysis & Status
        let statusMsg = "";
        let analysisText = "";

        const totalQ = stats.totalQuestions || 20; // Default to 20 if undefined
        const successRate = (stats.correct / totalQ) * 100;

        if (successRate >= 90) {
            statusMsg = "Mükemmel Performans! 🏆";
            analysisText = "Konulara oldukça hakimsin. Dikkat süren ve işlem hızın üst seviyede.";
        } else if (successRate >= 70) {
            statusMsg = "Çok İyisin! 🌟";
            analysisText = "Genel olarak başarılısın ancak birkaç küçük hata var.";
        } else if (successRate >= 50) {
            statusMsg = "İyi Gidiyorsun 👍";
            analysisText = "Temel kavramları anlamışsın ama pratik eksiğin var gibi duruyor.";
        } else {
            statusMsg = "Daha Fazla Çalışmalısın 💪";
            analysisText = "Bazı konularda eksiklerin olabilir. Pes etmek yok!";
        }

        const msgEl = document.getElementById('report-status-msg');
        if (msgEl) msgEl.textContent = statusMsg;

        const analysisEl = document.getElementById('report-analysis-text');
        if (analysisEl) analysisEl.textContent = analysisText;

    } catch (e) {
        alert("Rapor Gösterme Hatası: " + e.message + "\n" + e.stack);
        console.error(e);
    }
}
