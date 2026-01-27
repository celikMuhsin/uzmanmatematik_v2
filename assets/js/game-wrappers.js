// Game Initialization Wrappers for In-Page Games

// Saniye Savaşları Initialization
window.initSaniyeGame = function () {
    const container = document.getElementById('saniye-game-container');
    if (!container) return;

    // Clear previous content
    container.innerHTML = `
        <!-- View 1: Settings / Start -->
        <div id="saniye-start-view" class="game-container">
            <h1 style="color: var(--primary-color); margin-bottom: 10px;">⏱️ Saniye Savaşları</h1>
            <p style="margin-bottom: 30px; color: var(--text-light);">
                Sırayla gelen sayıları aklında tut ve topla.<br>
                Yanlış cevabın bedeli süreyle çarpılır!
            </p>

            <div class="settings-group">
                <label class="settings-label">Sayı Adedi</label>
                <input type="number" id="saniye-count-input" class="settings-input" value="10" min="3" max="50">
            </div>

            <div class="settings-group">
                <label class="settings-label">Her Sayı İçin Süre (Saniye)</label>
                <input type="number" id="saniye-duration-input" class="settings-input" value="1" min="0.5" max="5" step="0.5">
            </div>

            <button class="btn" onclick="startSaniyeGame()">Oyunu Başlat</button>

            <div style="margin-top: 30px;">
                <h4>🏆 En Yüksek Skor: <span id="saniye-high-score">0</span></h4>
            </div>
        </div>

        <!-- View 2: Gameplay -->
        <div id="saniye-game-view" class="game-container" style="display: none;">
            <div class="counter-badge" id="saniye-counter-badge">1 / 10</div>
            <div class="number-display" id="saniye-number-display">Ready?</div>
            <div class="progress-container">
                <div class="progress-bar" id="saniye-progress-bar"></div>
            </div>
        </div>

        <!-- View 3: Input Result -->
        <div id="saniye-input-view" class="game-container" style="display: none;">
            <h2>Sayıların Toplamı Kaçtır?</h2>
            <input type="number" id="saniye-sum-input" class="settings-input"
                style="max-width: 200px; text-align: center; font-size: 2rem; margin: 20px 0;" autofocus>
            <button class="btn" onclick="checkSaniyeResult()">Sonucu Kontrol Et</button>
        </div>

        <!-- View 4: Score/Summary -->
        <div id="saniye-result-view" class="game-container" style="display: none;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">🏆</div>
            <h2 style="font-size: 2.5rem; color: var(--primary-color); font-weight: 900; margin-bottom: 2rem;">
                SKOR: <span id="saniye-final-score">100</span>
            </h2>
            
            <p id="saniye-score-details" style="display: none;"></p> <!-- Hidden but kept for logic safety -->

            <div style="margin-top: 10px; width: 100%;">
                <h4 style="color: var(--text-color); font-weight: 700; margin-bottom: 1rem;">Sırasıyla Ekrana Çıkan Sayılar:</h4>
                <div class="history-list" id="saniye-history-list" style="margin-bottom: 1.5rem;"></div>
                
                <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 1.2rem; background: #f8fafc; padding: 1.5rem; border-radius: 1rem;">
                    <div>Gerçek Toplam: <span id="saniye-true-sum" style="font-weight: 900; color: #4f46e5;">0</span></div>
                    <div>Sizin Cevabınız: <span id="saniye-user-answer" style="font-weight: 900; color: #ea580c;">0</span></div>
                </div>
            </div>

            <div style="margin-top: 30px; display: flex; gap: 10px;">
                <button class="btn" onclick="initSaniyeGame()">Tekrar Oyna</button>
                <button class="btn btn-outline" onclick="showPage('games')">Oyunlara Dön</button>
            </div>
        </div>
    `;

    // Load high score from localStorage
    const highScore = localStorage.getItem('saniye-high-score') || 0;
    document.getElementById('saniye-high-score').innerText = highScore;
};

// Kuvvet Avcısı Initialization
window.initKuvvetGame = function () {
    const container = document.getElementById('kuvvet-game-container');
    if (!container) return;

    container.innerHTML = `
        <!-- Config View -->
        <div id="kuvvet-config-view" class="ka-container">
            <div style="width: 80px; height: 80px; background: #fffbeb; border-radius: 1.5rem; display: flex; justify-content: center; align-items: center; margin-bottom: 1rem; border: 1px solid #fef3c7;">
                <span style="font-size: 2.5rem;">⚔️</span>
            </div>
            <h2 class="ka-title" style="margin-bottom: 2rem;">Zorluk Seçimi</h2>

            <div class="difficulty-grid">
                <div class="diff-btn unselected" id="kuvvet-btn-easy" onclick="selectKuvvetDifficulty('easy')">
                    <div style="font-weight: 900; font-size: 0.75rem; text-transform: uppercase;">KOLAY</div>
                    <div style="font-size: 10px; color: #64748b; font-weight: 700;">5 Saniye</div>
                </div>
                <div class="diff-btn medium-selected" id="kuvvet-btn-medium" onclick="selectKuvvetDifficulty('medium')">
                    <div style="font-weight: 900; font-size: 0.75rem; text-transform: uppercase;">ORTA</div>
                    <div style="font-size: 10px; color: #64748b; font-weight: 700;">3 Saniye</div>
                </div>
                <div class="diff-btn unselected" id="kuvvet-btn-hard" onclick="selectKuvvetDifficulty('hard')">
                    <div style="font-weight: 900; font-size: 0.75rem; text-transform: uppercase;">ZOR</div>
                    <div style="font-size: 10px; color: #64748b; font-weight: 700;">2 Saniye</div>
                </div>
            </div>

            <button class="start-btn" onclick="startKuvvetGame()">OYUNA BAŞLA</button>
        </div>

        <!-- Playing View -->
        <div id="kuvvet-playing-view" class="ka-container" style="display: none; justify-content: flex-start; padding-top: 2rem;">
            <div class="game-header">
                <div style="text-align: left;">
                    <span style="font-size: 10px; font-weight: 900; color: #cbd5e1; display: block; text-transform: uppercase;">Soru</span>
                    <span id="kuvvet-question-count" style="font-size: 1.125rem; font-weight: 900; color: #1e293b;">1/10</span>
                </div>

                <div class="progress-track" id="kuvvet-streak-track">
                    <div class="progress-fill" id="kuvvet-time-bar" style="width: 100%;"></div>
                </div>

                <div style="text-align: right;">
                    <span style="font-size: 10px; font-weight: 900; color: #cbd5e1; display: block; text-transform: uppercase;">Puan</span>
                    <span id="kuvvet-score-display" style="font-size: 1.125rem; font-weight: 900; color: #4f46e5;">0</span>
                </div>
            </div>

            <!-- Wrapper for dynamic content to handle fade-in without blinking the header -->
            <div id="kuvvet-content-wrapper" style="opacity: 0; transition: opacity 0.2s ease-in-out; width: 100%; flex: 1; display: flex; flex-direction: column; justify-content: center;">
                <div id="kuvvet-game-card" class="question-box">
                    <div id="kuvvet-streak-badge" style="display: none; position: absolute; top: 10px; left: 50%; transform: translateX(-50%); background: #ea580c; color: white; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em;">
                        <span id="kuvvet-streak-val">0</span>X SERİ!
                    </div>
                    <div id="kuvvet-question-text">Loading...</div>
                </div>

                <div class="options-grid" id="kuvvet-options-container"></div>
            </div>
        </div>

        <!-- Result View -->
        <div id="kuvvet-result-view" class="ka-container" style="display: none; text-align: center;">
            <div style="font-size: 4rem;">🏆</div>
            <h2 style="font-size: 3rem; font-weight: 900; color: #1e293b; margin: 1rem 0;">SKOR: <span id="kuvvet-final-score">0</span></h2>
            <p style="color: #94a3b8; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1rem; margin-bottom: 2rem;">
                KUVVET AVCISI SEVİYESİ TAMAMLANDI!</p>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; width: 100%; margin-bottom: 2rem;">
                <div style="background: #f8fafc; padding: 1rem; border-radius: 1rem; border: 1px solid #f1f5f9;">
                    <div style="font-size: 10px; color: #94a3b8; font-weight: 900; text-transform: uppercase;">En İyi Seri</div>
                    <div id="kuvvet-final-streak" style="font-size: 1.25rem; font-weight: 900; color: #ea580c;">0</div>
                </div>
                <div style="background: #f8fafc; padding: 1rem; border-radius: 1rem; border: 1px solid #f1f5f9;">
                    <div style="font-size: 10px; color: #94a3b8; font-weight: 900; text-transform: uppercase;">Zorluk</div>
                    <div id="kuvvet-final-diff" style="font-size: 1.25rem; font-weight: 900; text-transform: uppercase;">ORTA</div>
                </div>
            </div>

            <button class="start-btn" onclick="initKuvvetGame()">TEKRAR OYNA</button>
            <a href="#" onclick="showPage('games')" style="margin-top: 1rem; color: #94a3b8; font-weight: 700; text-decoration: none; display: block;">Çıkış</a>
        </div>
    `;

    // Set default difficulty
    window.kuvvetDifficulty = 'medium';
};

// Denklik Arenası Initialization
window.initDenklikGame = function () {
    const container = document.getElementById('denklik-game-container');
    if (!container) return;

    container.innerHTML = `
        <!-- Config View -->
        <div id="denklik-config-view" class="da-container" style="align-items: center; justify-content: center; text-align: center;">
            <div style="width: 80px; height: 80px; background: #4f46e5; border-radius: 1.5rem; display: flex; justify-content: center; align-items: center; margin-bottom: 2rem; transform: rotate(6deg);">
                <span style="font-size: 2.5rem; color: white; transform: rotate(-6deg);">🎯</span>
            </div>

            <h3 style="font-size: 1.5rem; font-weight: 900; margin-bottom: 0.5rem;">Denk Kesirleri Bul!</h3>
            <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 2rem;">Bütün kartlar açık. En hızlı şekilde eşle, seriyi yakala!</p>

            <div class="config-grid">
                <div class="config-box">
                    <span class="config-label">Zorluk Seviyesi</span>
                    <div class="opt-row">
                        <button class="config-btn" id="denklik-diff-easy" onclick="setDenklikDifficulty('easy')">Kolay</button>
                        <button class="config-btn active" id="denklik-diff-medium" onclick="setDenklikDifficulty('medium')">Orta</button>
                        <button class="config-btn" id="denklik-diff-hard" onclick="setDenklikDifficulty('hard')">Zor</button>
                    </div>
                </div>
                <div class="config-box">
                    <span class="config-label">Süre Sınırı</span>
                    <div class="opt-row" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="config-btn" id="denklik-time-30" onclick="setDenklikTime('30')">30s</button>
                        <button class="config-btn" id="denklik-time-60" onclick="setDenklikTime('60')">60s</button>
                        <button class="config-btn active" id="denklik-time-90" onclick="setDenklikTime('90')">90s</button>
                        <button class="config-btn" id="denklik-time-120" onclick="setDenklikTime('120')">120s</button>
                    </div>
                </div>
            </div>

            <button onclick="startDenklikGame()" style="background: #4f46e5; color: white; padding: 1rem 3rem; border-radius: 1.5rem; font-weight: 900; font-size: 1.125rem; border: none; cursor: pointer; box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.1);">OYUNU BAŞLAT</button>
        </div>

        <!-- Playing View -->
        <div id="denklik-playing-view" class="da-container" style="display: none;">
            <div class="stats-bar" style="display: flex; gap: 5px; justify-content: space-between; margin-bottom: 2rem; width: 100%;">
                <div class="stat-box-bold" style="background: #0f172a; color: white;">
                    <span>SKOR</span> <span id="denklik-score-display" style="margin-left: 5px; color: #fbbf24;">0</span>
                </div>
                <div class="stat-box-bold" id="denklik-streak-box" style="background: #f1f5f9; color: #64748b;">
                    <span>SERİ</span> <span id="denklik-streak-display" style="margin-left: 5px;">x0</span>
                </div>
                <div class="stat-box-bold" id="denklik-timer-box" style="background: #4f46e5; color: white;">
                    <span>SÜRE</span> <span id="denklik-timer-display" style="margin-left: 5px;">90s</span>
                </div>
            </div>

            <div class="game-grid" id="denklik-cards-container"></div>

            <div id="denklik-feedback-toast" class="feedback-toast"></div>
        </div>

        <!-- Result View -->
        <div id="denklik-result-view" class="da-container" style="display: none; align-items: center; justify-content: center; text-align: center;">
            <div style="font-size: 4rem; color: #f59e0b; margin-bottom: 1rem;">🏆</div>
            <h2 style="font-size: 2rem; font-weight: 900; margin-bottom: 0.5rem;">KUTLARIZ!</h2>
            <p style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 2rem;">
                Denklik Arenası Tamamlandı</p>

            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 1.5rem; border: 1px solid #e2e8f0; margin-bottom: 2rem; width: 100%; max-width: 300px;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.5rem;">Final Skor</div>
                <div style="font-size: 3rem; font-weight: 900; color: #4f46e5;" id="denklik-final-score">0</div>
            </div>

            <div style="display: flex; gap: 1rem; width: 100%; max-width: 400px;">
                <button onclick="initDenklikGame()" style="flex: 1; background: #4f46e5; color: white; padding: 1rem; border-radius: 1.5rem; font-weight: 900; border: none; cursor: pointer;">TEKRAR</button>
                <button onclick="showPage('games')" style="flex: 1; background: #0f172a; color: white; padding: 1rem; border-radius: 1.5rem; font-weight: 900; border: none; cursor: pointer;">ÇIKIŞ</button>
            </div>
        </div>
    `;

    // Set default settings
    window.denklikDifficulty = 'medium';
    window.denklikTime = 90;
};
