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
    clearInterval(timerInterval);

    // Calculate Score
    let correct = 0;
    let wrong = 0;
    let empty = 0;

    questions.forEach((q, i) => {
        const ans = userAnswers[i];
        if (ans === null) {
            empty++;
        } else if (ans === q.answer) {
            correct++;
        } else {
            wrong++;
        }
    });

    const score = correct * 5; // 20 questions * 5 pts = 100

    // Save Score
    saveScore(score);

    // Show Results
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';

    document.getElementById('final-score').textContent = score;
    document.getElementById('res-correct').textContent = correct;
    document.getElementById('res-wrong').textContent = wrong;
    document.getElementById('res-empty').textContent = empty;

    const timeTaken = (40 * 60) - timeLeft;
    const timeMin = Math.floor(timeTaken / 60);
    const timeSec = timeTaken % 60;
    document.getElementById('time-taken-text').textContent = `Tamamlama Süresi: ${timeMin} dk ${timeSec} sn`;
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
