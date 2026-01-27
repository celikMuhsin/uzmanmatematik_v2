// Saniye Savaşları Game Logic

let config = {
    count: 10,
    duration: 1 // seconds
};

let gameState = {
    numbers: [],
    currentIndex: 0,
    timer: null
};

document.addEventListener('DOMContentLoaded', () => {
    // Load High Score
    const highScore = localStorage.getItem('um_saniye_highscore') || 0;
    // updated ID
    const hsEl = document.getElementById('saniye-high-score');
    if (hsEl) hsEl.innerText = highScore;

    // Enter key support for input
    const inputEl = document.getElementById('saniye-sum-input');
    if (inputEl) {
        inputEl.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkSaniyeResult();
            }
        });
    }
});

window.startSaniyeGame = function () {
    // 1. Get Settings
    config.count = parseInt(document.getElementById('saniye-count-input').value) || 10;
    config.duration = parseFloat(document.getElementById('saniye-duration-input').value) || 1;

    // 2. Generate Numbers (-10 to 10)
    gameState.numbers = [];
    for (let i = 0; i < config.count; i++) {
        // Random int between -10 and 10
        let num = Math.floor(Math.random() * 21) - 10;
        gameState.numbers.push(num);
    }

    gameState.currentIndex = 0;

    // 3. Switch View
    switchSaniyeView('saniye-game-view');

    // 4. Start Sequence loop
    showNextSaniyeNumber();
}

function showNextSaniyeNumber() {
    if (gameState.currentIndex >= gameState.numbers.length) {
        endSaniyeGame();
        return;
    }

    const num = gameState.numbers[gameState.currentIndex];
    const display = document.getElementById('saniye-number-display');
    const badge = document.getElementById('saniye-counter-badge');
    const bar = document.getElementById('saniye-progress-bar');


    // Update UI
    display.innerText = num;
    display.style.transform = 'scale(1.2)';
    setTimeout(() => display.style.transform = 'scale(1)', 100);

    badge.innerText = `${gameState.currentIndex + 1} / ${config.count}`;

    // Reset Bar
    bar.style.transition = 'none';
    bar.style.transform = 'scaleX(1)';

    // Start Animation
    // Force reflow
    void bar.offsetWidth;

    bar.style.transition = `transform ${config.duration}s linear`;
    bar.style.transform = 'scaleX(0)';

    // Schedule next
    gameState.timer = setTimeout(() => {
        gameState.currentIndex++;
        showNextSaniyeNumber();
    }, config.duration * 1000);
}

function endSaniyeGame() {
    switchSaniyeView('saniye-input-view');
    document.getElementById('saniye-sum-input').value = '';
    document.getElementById('saniye-sum-input').focus();
}

window.checkSaniyeResult = function () {
    const userSum = parseInt(document.getElementById('saniye-sum-input').value);
    if (isNaN(userSum)) {
        alert("Lütfen bir sayı girin.");
        return;
    }

    const trueSum = gameState.numbers.reduce((a, b) => a + b, 0);
    const diff = Math.abs(trueSum - userSum);

    // Scoring Formula: 100 - (Diff * Duration)
    // If diff is 0, score 100.
    // Error penalty scales with duration (easier settings = higher penalty for error potentially?) 
    // Wait, the user said: "yanlışsa doğru cevap ile söylediği ceap arasındaki farkın başta ayarladığı saniye ayarı ile çarpımı olan sayı 100 den çıkarılacak"

    let penalty = diff * config.duration;
    // Let's cap penalty so score isn't super negative? User didn't specify. Assuming raw calc.
    // If duration is small (hard mode), penalty is small? That seems inverse.
    // "saniye ayarı ile çarpımı". 
    // If I set 10 seconds (Easy), Penalty = Diff * 10 (Huge penalty).
    // If I set 0.5 seconds (Hard), Penalty = Diff * 0.5 (Small penalty).
    // This logic rewards Hard mode by being lenient on errors? Or maybe "Duration" acts as a multiplier.
    // Let's stick strictly to user request.

    let score = Math.max(0, 100 - penalty);
    if (diff === 0) score = 100; // Bonus for exact match just in case logic floats

    // Save High Score
    const currentHigh = localStorage.getItem('um_saniye_highscore') || 0;
    if (score > currentHigh) {
        localStorage.setItem('um_saniye_highscore', Math.floor(score));
    }

    showSaniyeResult(score, trueSum, diff);
}

function showSaniyeResult(score, trueSum, diff) {
    switchSaniyeView('saniye-result-view');

    document.getElementById('saniye-final-score').innerText = Math.floor(score);
    document.getElementById('saniye-true-sum').innerText = trueSum;

    // Populate User Answer
    const userSum = parseInt(document.getElementById('saniye-sum-input').value);
    document.getElementById('saniye-user-answer').innerText = isNaN(userSum) ? "-" : userSum;

    // We no longer update title or details since we changed the layout
    // Kept empty to satisfy structure if needed, or just removed logic.

    // Show History
    const historyContainer = document.getElementById('saniye-history-list');
    historyContainer.innerHTML = '';
    gameState.numbers.forEach(num => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerText = num;
        // Color positive/negative?
        if (num < 0) item.style.color = '#e74c3c';
        else item.style.color = '#27ae60';

        historyContainer.appendChild(item);
    });
}

function switchSaniyeView(viewId) {
    // Hide all
    ['saniye-start-view', 'saniye-game-view', 'saniye-input-view', 'saniye-result-view'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    // Show one
    const target = document.getElementById(viewId);
    if (target) target.style.display = 'flex';
}
