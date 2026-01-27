// carpanlara_ayirma.js - V13.1 (Modüler Yapı Refactoring)

window.CarpanlaraAyirmaMotoru = {
    // --- TEMEL ÖZELLİKLER ---
    gecmisSorular: new Set(),

    // Seviye tipleri ve filtreleri modüler dosyalardan (seviye1.js vb.) doldurulacak.
    seviye1Tipleri: [],
    seviye2Tipleri: [],
    seviye3Tipleri: [],

    seviye1Filtre: [],      //  'car1_6'
    seviye2Filtre: [],
    seviye3Filtre: [],

    sonSeviye1Tipi: null,
    sonSeviye2Tipi: null,
    sonSeviye3Tipi: null,

    // --- YARDIMCI METOTLAR ---
    random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    karistir: function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    temizlePolinom: function (metin) {
        return metin
            .replace(/([+\-])\s*1x/g, '$1 x') // + 1x -> + x (boşluk esnek)
            .replace(/^1x/g, 'x') // 1x başta -> x
            .replace(/\(x\s*[+\-]\s*0\)/g, 'x') // (x-0) veya (x+0) -> x
            .replace(/\s+/g, ' ') // fazla boşlukları sil
            .replace(/\s\.\s/g, '')
            .replace(/\s·\s/g, '')
            .replace(/\(x/g, '(x')
            .replace(/x\^1/g, 'x');
    },

    normalizeSecenek: function (metin) {
        // Boşlukları temizle
        let cleaned = metin.replace(/\s+/g, '');
        // (A)(B) formatındaysa parçalayıp sırala
        // Not: Basit faktorizasyon için yeterli. x(x-2) gibi durumlara dokunmaz.
        if (cleaned.startsWith('(') && cleaned.endsWith(')') && cleaned.includes(')(')) {
            let content = cleaned.substring(1, cleaned.length - 1);
            let parts = content.split(')(');
            parts.sort();
            return '(' + parts.join(')(') + ')';
        }
        return cleaned;
    },

    hazirlaSiklar: function (dogru, yanlislar) {
        const temizDogru = this.temizlePolinom(dogru);
        const normDogru = this.normalizeSecenek(temizDogru);

        // Yanlış şıkları filtrele
        let uniqueYanlislar = [];
        const seen = new Set();
        seen.add(normDogru);

        // Mevcut yanlışları ekle
        for (let y of yanlislar) {
            const temizY = this.temizlePolinom(y);
            const normY = this.normalizeSecenek(temizY);

            if (!seen.has(normY)) {
                uniqueYanlislar.push(temizY);
                seen.add(normY);
            }
        }

        // Eğer 4 yanlış şıkkımız yoksa, tamamla
        let guvenlikSayaci = 0;
        while (uniqueYanlislar.length < 4 && guvenlikSayaci < 50) {
            guvenlikSayaci++;
            // Rastgele bir kaynak seç (doğru veya mevcut yanlışlardan biri)
            const kaynak = Math.random() > 0.3 && uniqueYanlislar.length > 0
                ? uniqueYanlislar[Math.floor(Math.random() * uniqueYanlislar.length)]
                : temizDogru;

            // Kaynağı biraz değiştir (Perturbasyon)
            const yeniSecenek = this.yeniSecenekUret(kaynak);
            const normYeni = this.normalizeSecenek(yeniSecenek);

            if (!seen.has(normYeni)) {
                uniqueYanlislar.push(yeniSecenek);
                seen.add(normYeni);
            }
        }

        // Eğer hala dolmadıysa (çok nadir), en azından boş kalmasın diye mevcutları duplicate etmeyelim, az kalsın.

        let siklar = uniqueYanlislar.slice(0, 4).map(text => ({ text, dogruMu: false }));
        siklar.push({ text: temizDogru, dogruMu: true });
        return this.karistir(siklar);
    },

    yeniSecenekUret: function (metin) {
        // Metindeki bir sayıyı bul ve değiştir
        // Örn: (x-3)(x+4) -> (x-3)(x+5) veya (x-2)(x+4)

        // Sayıları bul
        const sayilar = metin.match(/\d+/g);
        if (!sayilar) return metin.replace('+', '-'); // Sayı yoksa işareti değiştir

        // Rastgele bir sayıyı seç
        const hedefSayi = sayilar[Math.floor(Math.random() * sayilar.length)];
        const yeniSayi = parseInt(hedefSayi) + (Math.random() > 0.5 ? 1 : -1);

        // Sadece ilk eşleşmeyi değiştir (basit tutalım)
        // Dikkat: Replace string kullanırsa sadece ilkini değiştirir, regex global değilse ilkini.
        return metin.replace(hedefSayi, Math.max(1, yeniSayi)); // 0 veya negatif olmasın şimdilik
    },

    // --- ANA ÜRETİCİ ---
    soruUret: function (seviye) {
        let soruData;
        let deneme = 0;
        if (seviye == 1) {
            do {
                if (this.uretSeviye1) soruData = this.uretSeviye1();
                else return { metin: "Seviye 1 (Modül Yüklenmedi)", siklar: [] };
                deneme++;
            } while (this.gecmisSorular.has(soruData.metin) && deneme < 10);
        } else if (seviye == 2) {
            do {
                if (this.uretSeviye2) soruData = this.uretSeviye2();
                else return { metin: "Seviye 2 (Modül Yüklenmedi)", siklar: [] };
                deneme++;
            } while (this.gecmisSorular.has(soruData.metin) && deneme < 10);
        } else if (seviye == 3) {
            do {
                if (this.uretSeviye3) soruData = this.uretSeviye3();
                else return { metin: "Seviye 3 (Modül Yüklenmedi)", siklar: [] };
                deneme++;
            } while (this.gecmisSorular.has(soruData.metin) && deneme < 10);
        } else if (seviye == 4) {
            do {
                const zar = Math.random();
                if (zar > 0.5) {
                    if (this.uretSophieGermain) soruData = this.uretSophieGermain();
                    else soruData = { metin: "Seviye 4 (Sophie Germain Yüklenmedi)", siklar: [] };
                }
                else {
                    if (this.uretDegiskenDegistirme) soruData = this.uretDegiskenDegistirme();
                    else soruData = { metin: "Seviye 4 (Değişken Yüklenmedi)", siklar: [] };
                }
                deneme++;
            } while (this.gecmisSorular.has(soruData.metin) && deneme < 10);
        } else if (seviye == 5) {
            do {
                if (this.uretSeviye5) soruData = this.uretSeviye5();
                else return { metin: "Seviye 5 (Modül Yüklenmedi)", siklar: [] };
                deneme++;
            } while (this.gecmisSorular.has(soruData.metin) && deneme < 10);
        } else {
            return {
                metin: `Seviye ${seviye} soruları yapım aşamasında!`,
                siklar: [],
                ipucu: "..."
            };
        }
        if (deneme >= 10) this.gecmisSorular.clear();
        this.gecmisSorular.add(soruData.metin);
        // Durum izleme özellikleri ekle
        soruData.cozulduMu = false;
        soruData.secilenSikIndex = -1;
        return soruData;
    }
};

window.Arayuz = {
    aktifMotor: null, // Dinamik motor (Soru Kaynağı)
    mevcutSeviye: 1, // Seviye 1 varsayılan oldu
    timer: 0,
    timerInterval: null,

    soruGecmisi: [],
    gecmisIndex: -1,
    dogruSayisi: 0,
    yanlisSayisi: 0,
    initialized: false,

    // --- SCRATCHPAD STATE ---
    isDrawingMode: false,
    isEraser: false,
    canvas: null,
    ctx: null,
    isDrawing: false,
    lastX: 0,
    lastY: 0,

    initCanvas: function () {
        this.canvas = document.getElementById('drawing-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');

        // High DPI (Retina) Desteği
        const dpr = window.devicePixelRatio || 1;
        const parent = this.canvas.parentElement;

        // CSS Boyutları (Görünür Boyut)
        const rect = parent.getBoundingClientRect();
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';

        // Fiziksel Boyutlar (DPR ile Çarpılmış)
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;

        // Context Ölçekleme
        this.ctx.scale(dpr, dpr);

        // Render Kalitesi
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        // Hassasiyet ve Lag Önleme
        this.canvas.style.touchAction = 'none';

        // Resize olayını dinle
        window.addEventListener('resize', () => {
            if (this.canvas && this.canvas.parentElement) {
                const dpr = window.devicePixelRatio || 1;
                const parent = this.canvas.parentElement;

                // Mevcut içeriği kaydet (Fiziksel Boyutlarda)
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = this.canvas.width;
                tempCanvas.height = this.canvas.height;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(this.canvas, 0, 0);

                // Yeni Boyutları Ayarla
                const rect = parent.getBoundingClientRect();
                this.canvas.style.width = rect.width + 'px';
                this.canvas.style.height = rect.height + 'px';
                this.canvas.width = rect.width * dpr;
                this.canvas.height = rect.height * dpr;

                // Context Scalesini Yenile (Resize width/height'i sıfırladığı için scale de sıfırlanır)
                this.ctx.scale(dpr, dpr);

                // Eski Çizimi Geri Yükle
                // TempCanvas fiziksel boyutta, ana canvas da scale edilmiş mantıksal koordinatlarda.
                // drawImage ölçeklenmiş context'e çizerken koordinatları user space (CSS piksel) olarak bekler.
                // Bu yüzden tempCanvas'ı sığdırmak için (width / dpr) boyutunda çizmeliyiz.
                this.ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width / dpr, tempCanvas.height / dpr);
            }
        });

        // Event Listeners
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());

        this.canvas.addEventListener('touchstart', (e) => this.startDrawing(e), { passive: false });
        this.canvas.addEventListener('touchmove', (e) => this.draw(e), { passive: false });
        this.canvas.addEventListener('touchend', () => this.stopDrawing());
    },

    toggleDrawingMode: function () {
        // Özel Durum: Silgi açıksa, kaleme basınca silgiyi kapat, kalemi aç (Modu kapatma)
        if (this.isDrawingMode && this.isEraser) {
            this.toggleEraser();
            return;
        }

        this.isDrawingMode = !this.isDrawingMode;

        const btn = document.getElementById('btn-pen');
        const extras = document.getElementById('extra-tools');
        const canvas = document.getElementById('drawing-canvas');

        if (this.isDrawingMode) {
            btn.classList.add('active');
            extras.style.display = 'flex';
            canvas.style.pointerEvents = 'auto'; // Çizime izin ver
            canvas.style.zIndex = '10'; // Öne al
            // document.body.style.overflow = 'hidden'; // DESKTOP FIX: Scrollbar gidince ekran kayıyor. CSS touch-action yeterli.
        } else {
            btn.classList.remove('active');
            extras.style.display = 'none';
            canvas.style.pointerEvents = 'none'; // Tıklamalar alta geçsin
            canvas.style.zIndex = '0'; // Arkaya al
            // document.body.style.overflow = ''; 
        }
    },

    toggleEraser: function () {
        this.isEraser = !this.isEraser;
        const btnEraser = document.getElementById('btn-eraser');
        const btnPen = document.getElementById('btn-pen');

        if (this.isEraser) {
            btnEraser.classList.add('active'); // Silgi Yeşil
            btnPen.classList.remove('active'); // Kalem Yeşilden Çıksın
            btnPen.classList.add('paused'); // Kalem Kırmızı (Pasif)
        } else {
            btnEraser.classList.remove('active'); // Silgi Normale Dönsün
            btnPen.classList.remove('paused'); // Kalem Kırmızıdan Çıksın
            btnPen.classList.add('active'); // Kalem Tekrar Yeşil (Aktif)
        }
    },

    clearCanvas: function () {
        if (!this.ctx || !this.canvas) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    getEventPos: function (e) {
        const rect = this.canvas.getBoundingClientRect();
        let clientX, clientY;

        if (e.changedTouches) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    },

    startDrawing: function (e) {
        if (!this.isDrawingMode) return;
        e.preventDefault(); // Scroll engelle
        this.isDrawing = true;

        const pos = this.getEventPos(e);
        this.lastX = pos.x;
        this.lastY = pos.y;

        // Stil ayarlarını başlangıçta yap (Performans için)
        if (this.isEraser) {
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.lineWidth = 20;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
        } else {
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.lineWidth = 3; // Kalınlık artırıldı (2 -> 3)
            this.ctx.strokeStyle = '#ef4444'; // Kırmızı kalem
            this.ctx.lineCap = 'round'; // Yuvarlak uçlar (Netlik ve yumuşaklık için)
            this.ctx.lineJoin = 'round'; // Köşe birleşimleri
        }
    },

    draw: function (e) {
        if (!this.isDrawing || !this.isDrawingMode) return;
        e.preventDefault();

        const pos = this.getEventPos(e);
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        this.lastX = pos.x;
        this.lastY = pos.y;
    },

    stopDrawing: function () {
        this.isDrawing = false;
    },

    saveCanvasState: function () {
        if (!this.canvas || !this.soruGecmisi[this.gecmisIndex]) return;
        this.soruGecmisi[this.gecmisIndex].cizimData = this.canvas.toDataURL();
    },

    loadCanvasState: function () {
        this.clearCanvas(); // Önce temizle (veya yeni soru için boşalt)

        if (!this.soruGecmisi[this.gecmisIndex] || !this.soruGecmisi[this.gecmisIndex].cizimData) return;

        const img = new Image();
        img.onload = () => {
            if (this.ctx) {
                const dpr = window.devicePixelRatio || 1;
                // Kayıtlı resim fiziksel piksellerde, context ise ölçeklenmiş durumda.
                // Bu yüzden resmi mantıksal boyutlara (img.width / dpr) çizmeliyiz.
                this.ctx.drawImage(img, 0, 0, img.width / dpr, img.height / dpr);
            }
        };
        img.src = this.soruGecmisi[this.gecmisIndex].cizimData;
    },

    acilis: function () {
        const container = document.getElementById('math-exam-container');
        if (!container) return;

        if (!this.initialized) {
            this.stilEkle();
            container.innerHTML = this.getHtmlTemplate();
            this.initialized = true;
            setTimeout(() => this.initCanvas(), 100); // DOM render için kısa süre tanı
        }
        this.sifirlaVeBaslat();
    },

    downloadSolution: function () {
        if (typeof html2canvas === 'undefined') {
            alert("Ekran görüntüsü alma kütüphanesi yüklenemedi!");
            return;
        }

        const element = document.querySelector('.exam-card'); // Tüm kartı yakala
        if (!element) return;

        // Geçici filigran ekle
        const watermark = document.createElement('div');
        watermark.innerText = 'uzmanmatematik.com ile çözüldü';
        watermark.style.position = 'absolute';
        watermark.style.bottom = '5px';
        watermark.style.right = '5px';
        watermark.style.fontSize = '12px';
        watermark.style.color = 'rgba(0,0,0,0.3)';
        watermark.style.fontWeight = 'bold';
        watermark.style.zIndex = '1000';
        element.appendChild(watermark);

        // html2canvas ile yakala
        html2canvas(element, {
            scale: 2, // Yüksek çözünürlük
            backgroundColor: '#ffffff', // Şeffaflık sorununu önle
            useCORS: true // External image'lar varsa diye
        }).then(canvas => {
            // Filigranı kaldır
            if (watermark.parentNode) watermark.parentNode.removeChild(watermark);

            // İndirme işlemi
            const now = new Date();
            const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '') + '-' +
                now.toTimeString().slice(0, 5).replace(':', '');

            const link = document.createElement('a');
            link.download = `uzmanmatematik-cozum-${dateStr}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        }).catch(err => {
            console.error("Ekran görüntüsü hatası:", err);
            if (watermark.parentNode) watermark.parentNode.removeChild(watermark);
            alert("Görüntü oluşturulurken bir hata oluştu.");
        });
    },

    durdur: function () {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = null;
    },

    kapat: function () {
        this.durdur();
        const container = document.getElementById('math-exam-container');
        if (container) container.innerHTML = ""; // Temizle ve kapat
        this.initialized = false; // Tekrar açıldığında yeniden render etsin
    },

    getHtmlTemplate: function () {
        return `
            <div class="exam-card">
                <!-- Header: Sol(Zaman) - Orta(Hız) - Sağ(Puan) -->
                <div class="exam-header">
                    <div class="header-left">
                        <span id="exam-timer" class="timer-text">00:00</span>
                        <!-- Scratchpad Toolbar (Header Entegre) -->
                        <div id="scratchpad-controls" style="display:flex; align-items:center; margin-left:8px; gap: 2px;">
                             <button id="btn-pen" onclick="Arayuz.toggleDrawingMode()" class="header-tool-btn" title="Karalama Modu">✎</button>
                             <div id="extra-tools" style="display:none; align-items:center; gap:2px;">
                                  <button id="btn-eraser" onclick="Arayuz.toggleEraser()" class="header-tool-btn small-icon" title="Silgi">🧼</button>
                                  <button id="btn-clear" onclick="Arayuz.clearCanvas()" class="header-tool-btn small-icon" title="Temizle">🗑️</button>
                                  <button id="btn-share" onclick="Arayuz.downloadSolution()" class="header-tool-btn small-icon" title="Çözümü İndir / Paylaş">📷</button>
                             </div>
                        </div>
                    </div>

                    <div class="header-center">
                        <div id="exam-speed" class="timer-text" style="display:flex; align-items:center; justify-content:center;">
                            <div class="speed-metric">
                                <span class="speed-value">0</span>
                                <span class="speed-unit">so/sa</span>
                            </div>
                            <span class="speed-divider">|</span>
                            <div id="speed-correct" class="speed-metric speed-correct">
                                <span class="speed-value">0</span>
                                <span class="speed-unit">do/sa</span>
                            </div>
                            <span class="speed-divider">|</span>
                            <div id="speed-wrong" class="speed-metric speed-wrong">
                                <span class="speed-value">0</span>
                                <span class="speed-unit">ya/sa</span>
                            </div>
                            <span class="speed-divider">|</span>
                            <div id="speed-empty" class="speed-metric speed-empty">
                                <span class="speed-value">0</span>
                                <span class="speed-unit">bo/sa</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="header-right">
                         <div class="score-box score-correct" id="correct-box" style="display:none">0</div>
                         <div class="score-box score-wrong" id="wrong-box" style="display:none">0</div>
                         <div class="score-box score-empty" id="empty-box" style="display:none">0</div>
                         <button id="btn-close" onclick="Arayuz.kapat()" class="close-btn" title="Kapat">✕</button>
                    </div>
                </div>

                <!-- Soru Alanı -->
                <div id="soru-alan-kaplayici" style="position: relative; flex: 1;">
                    <div id="soru-alani" class="question-area"></div>
                    <canvas id="drawing-canvas"></canvas>
                </div>

                <!-- İpucu Metni -->
                <div id="ipucu-metni" class="hint-box" style="display:none;"></div>

                <!-- Footer Grid -->
                <div id="kontrol-paneli" class="control-panel">
                    <button onclick="Arayuz.oncekiSoru()" class="btn-action btn-secondary" id="btn-prev">
                        Geri
                    </button>

                    <button id="btn-hint" onclick="Arayuz.ipucuGoster()" class="btn-action btn-secondary btn-hint-trig">
                        İpucu
                    </button>

                    <div class="level-selector">
                        <select id="seviye-sec" onchange="Arayuz.seviyeDegistir(this.value)">
                            <option value="1" selected>Seviye 1</option>
                            <option value="2">Seviye 2</option>
                            <option value="3">Seviye 3</option>
                            <option value="4">Seviye 4</option>
                            <option value="5">Seviye 5</option>
                        </select>
                    </div>

                    <button onclick="Arayuz.sonrakiSoru()" class="btn-action btn-primary" id="btn-next">
                        İleri
                    </button>
                </div>
            </div>
        `;
    },

    sifirlaVeBaslat: function () {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timer = 0;

        const tEl = document.getElementById('exam-timer');
        if (tEl) tEl.innerText = "00:00";

        const sEl = document.getElementById('exam-speed');
        if (sEl) {
            // Reset main speed icon/text only if needed, but here we just ensure structure is clean or reset values
            // Actually, we can just reset the inner values effectively by targeting IDs if we reconstructed it,
            // but since previous code replaced innerHTML, let's stick to that pattern for consistency, keeping the structured HTML.
            sEl.innerHTML = `<div class="speed-metric"><span class="speed-value">0</span><span class="speed-unit">so/sa</span></div>
             <span class="speed-divider">|</span>
             <div id="speed-correct" class="speed-metric speed-correct"><span class="speed-value">0</span><span class="speed-unit">do/sa</span></div>
             <span class="speed-divider">|</span>
             <div id="speed-wrong" class="speed-metric speed-wrong"><span class="speed-value">0</span><span class="speed-unit">ya/sa</span></div>
             <span class="speed-divider">|</span>
             <div id="speed-empty" class="speed-metric speed-empty"><span class="speed-value">0</span><span class="speed-unit">bo/sa</span></div>`;
        }

        this.dogruSayisi = 0;
        this.yanlisSayisi = 0;
        this.guncelleIstatistikUI();

        this.soruGecmisi = [];
        this.gecmisIndex = -1;
        this.soruGecmisi = [];
        this.gecmisIndex = -1;
        if (this.aktifMotor) this.aktifMotor.gecmisSorular.clear();

        this.sonrakiSoru();

        this.timerInterval = setInterval(() => {
            this.timer++;

            // Timer Güncelle
            const dk = Math.floor(this.timer / 60).toString().padStart(2, '0');
            const sn = (this.timer % 60).toString().padStart(2, '0');
            const el = document.getElementById('exam-timer');
            if (el) el.innerText = `${dk}:${sn}`;

            // Hızlar
            const tamamlanan = this.gecmisIndex; // Şu anki soru indexi kaçıncı soruda olduğumuzu gösterir (0-based)
            // Ancak tamamlanan soru sayısı = cevaplananlar. 
            // Eğer gecmisIndex = 0 ise 1. sorudayız, 0 tamamlandı.
            // Eğer gecmisIndex = 1 ise 2. sorudayız, 1 tamamlandı.

            // Boş sayısı = Toplam Tamamlanan (veya Görülüp geçilen) - (Doğru + Yanlış)
            // Eğer sadece "Geç" veya "İleri" denilerek boş bırakılabiliyorsa bu mantık doğru.
            // Arayuz.sonrakiSoru() indexi artırıyor. Eğer biz cevap vermeden geçersek doğru/yanlış artmıyor ama index artıyor.
            // Dolayısıyla (gecmisIndex) bize toplam geçilen soru sayısını verir.

            const bosSayisi = Math.max(0, tamamlanan - this.dogruSayisi - this.yanlisSayisi);

            let speed = 0;
            let dogruHiz = 0;
            let yanlisHiz = 0;
            let bosHiz = 0;

            if (this.timer > 0) {
                if (tamamlanan > 0) speed = Math.round((tamamlanan / this.timer) * 3600);
                if (this.dogruSayisi > 0) dogruHiz = Math.round((this.dogruSayisi / this.timer) * 3600);
                if (this.yanlisSayisi > 0) yanlisHiz = Math.round((this.yanlisSayisi / this.timer) * 3600);
                if (bosSayisi > 0) bosHiz = Math.round((bosSayisi / this.timer) * 3600);
            }

            const spEl = document.getElementById('exam-speed');
            // Re-render entire block to keep it synced
            if (spEl) spEl.innerHTML = `<div class="speed-metric"><span class="speed-value">${speed}</span><span class="speed-unit">so/sa</span></div>
            <span class="speed-divider">|</span>
            <div class="speed-metric speed-correct"><span class="speed-value">${dogruHiz}</span><span class="speed-unit">do/sa</span></div>
            <span class="speed-divider">|</span>
            <div class="speed-metric speed-wrong"><span class="speed-value">${yanlisHiz}</span><span class="speed-unit">ya/sa</span></div>
            <span class="speed-divider">|</span>
            <div class="speed-metric speed-empty"><span class="speed-value">${bosHiz}</span><span class="speed-unit">bo/sa</span></div>`;

        }, 1000);
    },

    guncelleIstatistikUI: function () {
        const cBox = document.getElementById('correct-box');
        const wBox = document.getElementById('wrong-box');
        const eBox = document.getElementById('empty-box');

        // Şu anki soru çözüldü ise, onu da hesaba kat (gecmisIndex 0-based, +1 yaparsak toplam soru)
        // Eğer çözülmediyse, henüz "tamamlanmış" değildir, o yüzden dahil etmeyiz.
        // Ama eğer GEÇMİŞ soruları hesaplıyorsak...
        // Soru 1 (Index 0): Çözüldü -> Toplam 1, D+Y=1 -> Boş 0.
        // Soru 2 (Index 1): Çözülmedi (bekliyor) -> Toplam 1 (Soru 1 bitti), D+Y=1 -> Boş 0.
        // Soru 2 (Index 1) -> Sonraki Soru'ya tıklandı (PAS GEÇİLDİ).
        // Soru 3 (Index 2): Bekliyor. Toplam 2 (Soru 1 ve 2 bitti). D+Y=1. Boş = 1.

        let totalProcessed = this.gecmisIndex;
        if (this.soruGecmisi[this.gecmisIndex] && this.soruGecmisi[this.gecmisIndex].cozulduMu) {
            totalProcessed += 1;
        }

        const bosSayisi = Math.max(0, totalProcessed - this.dogruSayisi - this.yanlisSayisi);

        if (cBox) {
            cBox.innerText = this.dogruSayisi;
            cBox.style.display = this.dogruSayisi > 0 ? 'flex' : 'none';
        }

        if (wBox) {
            wBox.innerText = this.yanlisSayisi;
            wBox.style.display = this.yanlisSayisi > 0 ? 'flex' : 'none';
        }

        if (eBox) {
            eBox.innerText = bosSayisi;
            eBox.style.display = bosSayisi > 0 ? 'flex' : 'none';
        }
    },

    seviyeDegistir: function (yeniSeviye) {
        this.saveCanvasState(); // Seviye değişirken mevcut çizimi kaydet
        this.mevcutSeviye = yeniSeviye;
        this.sifirlaVeBaslat();
    },

    sonrakiSoru: function () {
        this.saveCanvasState(); // Mevcut çizimi kaydet
        if (this.gecmisIndex < this.soruGecmisi.length - 1) {
            this.gecmisIndex++;
            this.renderSoru(this.soruGecmisi[this.gecmisIndex]);
        } else {
            const yeniData = this.aktifMotor.soruUret(this.mevcutSeviye);
            this.soruGecmisi.push(yeniData);
            this.gecmisIndex++;
            this.renderSoru(yeniData);
        }
        this.butonDurumlariniGuncelle();
        this.guncelleIstatistikUI(); // İlerlediğimizde sayaçları güncelle (boş sayısı için)
    },

    oncekiSoru: function () {
        this.saveCanvasState(); // Mevcut çizimi kaydet
        if (this.gecmisIndex > 0) {
            this.gecmisIndex--;
            this.renderSoru(this.soruGecmisi[this.gecmisIndex]);
            this.butonDurumlariniGuncelle();
        }
    },

    butonDurumlariniGuncelle: function () {
        const btnPrev = document.getElementById('btn-prev');
        if (btnPrev) {
            btnPrev.disabled = (this.gecmisIndex <= 0);
            btnPrev.style.opacity = (this.gecmisIndex <= 0) ? '0.5' : '1';
        }
    },

    renderSoru: function (soruData) {
        const alan = document.getElementById('soru-alani');
        const ipucuKutu = document.getElementById('ipucu-metni');
        if (ipucuKutu) ipucuKutu.style.display = 'none';

        // Canvas Temizle ve Varsa Kayıtlı Çizimi Yükle
        this.loadCanvasState();

        if (soruData.siklar.length === 0) {
            alan.innerHTML = `<div class="math-text">${soruData.metin}</div>`;
            return;
        }

        const soruNo = this.gecmisIndex + 1;

        let kisaKod = '';
        if (soruData.soruKodu) {
            const parts = soruData.soruKodu.split('_');
            kisaKod = parts[parts.length - 1]; // "car1_1" -> "1"
        }

        // İpucu butonuna kodu ekle (Hafif silik)
        const btnHint = document.getElementById('btn-hint');
        if (btnHint) {
            // Buton içeriğini yenile
            btnHint.innerHTML = kisaKod
                ? `İpucu <span style="opacity: 0.15; font-size: 0.8em; margin-left: 5px; font-weight: normal;">${kisaKod}</span>`
                : `İpucu`;
        }

        let html = `<div class="math-text">
            <span class="question-prefix">${soruNo}) </span>
            <div style="flex: 1;">${soruData.metin}</div>
        </div><div class="options-grid">`;

        soruData.siklar.forEach((sik, i) => {
            const harf = ["A)", "B)", "C)", "D)", "E)"][i];

            // Geçmişten gelen cevap kontrolü
            let ekSinif = '';
            let disabledAtt = soruData.cozulduMu ? 'disabled' : '';

            if (soruData.cozulduMu) {
                // Seçilen şıkkı işaretle
                if (i === soruData.secilenSikIndex) {
                    ekSinif = sik.dogruMu ? 'correct' : 'wrong';
                }
                if (sik.dogruMu) {
                    ekSinif += ' correct';
                }
            }

            html += `<button class="option-btn ${ekSinif}" onclick="Arayuz.kontrolEt(this, ${i}, ${sik.dogruMu})" ${disabledAtt}>
                <span class="option-label">${harf}</span>
                <span>${sik.text}</span>
            </button>`;
        });
        html += `</div>`;
        alan.innerHTML = html;
        this.aktifIpucu = soruData.ipucu;

        // MathJax'i Tetikle (Varsa - Artık HTML kullanıyoruz ama ilerde lazım olursa kalsın, boş kontrol)
        // if (window.MathJax && window.MathJax.typesetPromise) {
        //    window.MathJax.typesetPromise([alan, ipucuKutu]).catch((err) => console.log('MathJax error:', err));
        // }
    },

    kontrolEt: function (btn, index, dogruMu) {
        const guncelSoru = this.soruGecmisi[this.gecmisIndex];
        if (guncelSoru.cozulduMu) return;

        guncelSoru.cozulduMu = true;
        guncelSoru.secilenSikIndex = index;

        const butonlar = document.querySelectorAll('.option-btn');
        butonlar.forEach(b => b.disabled = true);

        if (dogruMu) {
            btn.classList.add('correct');
            this.dogruSayisi++;
            // Otomatik geçiş (Doğru: 1sn)
            setTimeout(() => this.sonrakiSoru(), 1000);
        } else {
            btn.classList.add('wrong');
            this.yanlisSayisi++;
            // Doğru olanı bul ve yak
            butonlar.forEach((b, k) => {
                const sData = guncelSoru.siklar[k];
                if (sData.dogruMu) b.classList.add('correct');
            });
            // Otomatik geçiş (Yanlış: 2sn)
            setTimeout(() => this.sonrakiSoru(), 2000);
        }
        this.guncelleIstatistikUI();
    },

    ipucuGoster: function () {
        const kutu = document.getElementById('ipucu-metni');
        if (this.aktifIpucu) {
            kutu.innerHTML = this.aktifIpucu;
            kutu.style.display = 'block';
        }
    },

    stilEkle: function () {
        const style = document.createElement('style');
        style.innerHTML = `
            .exam-card { 
                background: white; 
                border-radius: 12px; 
                border: 1px solid #f3f4f6;
                box-shadow: 0 4px 15px rgba(0,0,0,0.03); 
                max-width: 600px; 
                margin: 0 auto; 
                font-family: 'Inter', system-ui, sans-serif;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            /* --- HEADER (Kompakt ve Gri) --- */
            .exam-header {
                display: flex;
                justify-content: space-between; /* 3 Elemanı Yay */
                align-items: center;
                padding: 10px 15px;
                background: #fff;
                border-bottom: 1px solid #f3f4f6;
                height: 40px; 
                margin-bottom: 0;
            }
            
            /* Sol ve Sağ için sabit genişlik verilebilir veya flex ile dengelenebilir */
            .header-left, .header-right { 
                flex: 1; 
                display: flex; 
                align-items: center;
            }
            .header-right { justify-content: flex-end; gap: 2px; }

            .header-center {
                flex: 2;
                display: flex;
                justify-content: center;
            }

            .timer-text {
                font-size: 0.85rem; /* Standart boyut - Hepsi eşit */
                font-weight: 500;
                color: #6b7280;
                letter-spacing: 0.5px;
                font-variant-numeric: tabular-nums;
                display: flex;
                align-items: center;
                gap: 3px; 
            }

            .timer-text svg {
                position: relative;
                top: 2.5px; /* İkonu görsel olarak aşağı it */
            }
            
            .speed-unit {
                font-size: 0.5em; 
                opacity: 0.85;
                font-weight: 700;
                margin-left: 1px;
            }

            .speed-divider {
                color: #e5e7eb;
                margin: 0 3px; /* Daha havadar */
            }

            /* --- RESPONSIVE HEADER DÜZENLEMESİ VE DİĞERLERİ --- */
            @media (min-width: 600px) {
                .speed-metric {
                     font-size: 0.70rem;
                }
            }

            @media (max-width: 480px) {
                .exam-header {
                    padding: 8px 10px;
                    gap: 5px;
                }
                .timer-text {
                    font-size: 0.8rem; /* Mobilde daha küçük */
                    gap: 3px;
                }
                .speed-unit {
                    font-size: 0.7em; /* Birimler daha da küçük */
                }
                .speed-divider {
                    margin: 0 2px; /* Ayıraçları sıkıştır */
                }
                .score-box {
                    padding: 2px 6px;
                    min-width: 20px;
                    font-size: 0.75rem;
                }
            }

            .score-box {
                padding: 1px 4px;
                border-radius: 4px;
                font-size: 0.70rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                min-width: 18px;
                height: 18px;
                flex-shrink: 0; /* Prevent shrinking */
            }

            .score-correct { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
            .score-wrong { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
            .score-empty { background: #f3f4f6; color: #4b5563; border: 1px solid #e5e7eb; }

            .close-btn {
                background: transparent;
                border: none;
                color: #9ca3af;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: color 0.2s;
            }
            .close-btn:hover { color: #ef4444; }

            .speed-metric {
                font-size: 0.6rem;
                display: flex;
                align-items: baseline;
                color: #000;
            }

            .speed-correct { color: #22c55e; }
            .speed-wrong { color: #ef4444; }
            .speed-empty { color: #6c757d; }

            /* --- SCRATCHPAD (CANVAS) --- */
            #drawing-canvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 0; /* Pasifken arkada veya etkileşimsiz */
                pointer-events: none; /* Pasifken tıklamaları alta geçir */
                touch-action: none; /* Çizim yaparken browser'ın default touch actionlarını engelle */
            }

            .header-tool-btn {
                background: transparent;
                border: none;
                color: #6b7280; /* Timer rengi */
                font-size: 0.8rem; 
                cursor: pointer;
                padding: 1px 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                border-radius: 4px;
            }
            .header-tool-btn.small-icon { font-size: 0.7rem; } /* Daha küçük ikonlar için */

            .header-tool-btn:hover { color: #374151; background: #f3f4f6; }
            .header-tool-btn.active { color: #22c55e; background: #dcfce7; } /* Açık yeşil (Aktif) */
            .header-tool-btn.paused { color: #ef4444; background: #fee2e2; } /* Açık Kırmızı (Kalem Pasif/Silgi Modu) */

            /* --- CONTENT --- */
            .question-area { 
                padding: 5px 15px 20px 15px; 
                flex: 1;
                /* Canvas üzerindeyken de içerik görünmeli, z-index ayarına gerek yok, canvas position absolute */
            }

            .math-text { 
                font-size: 0.95rem; 
                color: #000; 
                margin-bottom: 20px; 
                font-weight: 400; 
                text-align: left; 
                line-height: 1.5;
                position: relative;
                display: flex;
                align-items: flex-start;
            }

            .question-code {
                position: absolute;
                bottom: -25px; /* Soru metninin biraz altına */
                right: 0;
                font-size: 0.65rem;
                color: #e5e7eb; /* Çok silik gri */
                font-family: monospace;
                pointer-events: none;
                user-select: none;
            }

            .question-prefix { font-weight: 800; color: #000; margin-right: 5px; flex-shrink: 0; }

            .options-grid { display: flex; flex-direction: column; gap: 8px; }

            .option-btn { 
                padding: 12px 14px; 
                border: 1px solid #e5e7eb; 
                border-radius: 8px; 
                background: white; 
                text-align: left; 
                cursor: pointer; 
                font-size: 0.95rem; 
                color: #000;
                display: flex;
                align-items: center;
                width: 100%;
            }
            .option-btn:hover { background: #f9fafb; border-color: #d1d5db; }

            .option-label { font-weight: 800; margin-right: 10px; color: #000; min-width: 20px; }

            /* --- FOOTER (GRID) --- */
            .control-panel { 
                padding: 10px 10px; 
                background: #fff; 
                border-top: 1px solid #f3f4f6; 
                display: grid;
                grid-template-columns: 1fr 1fr 1.2fr 1fr;
                gap: 8px; 
                align-items: center;
            }

            .btn-action {
                padding: 10px 0;
                border-radius: 6px; 
                border: none;
                cursor: pointer;
                font-weight: 600;
                font-size: 0.85rem;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 36px;
            }

            .level-selector select {
                width: 100%;
                height: 36px;
                padding: 0 4px;
                border-radius: 6px;
                border: 1px solid #d1d5db;
                background: #f9fafb;
                color: #374151;
                font-weight: 600;
                font-size: 0.85rem;
                outline: none;
                text-align: center;
            }

            .btn-secondary { background: #e5e7eb; color: #374151; }
            .btn-secondary:hover { background: #d1d5db; }

            .btn-primary { background: #2563eb; color: white; }
            .btn-primary:hover { background: #1d4ed8; }

            .hint-box { 
                background: #f0fdf4; 
                color: #166534; 
                padding: 10px; 
                margin: 0 15px 15px 15px; 
                border-radius: 8px; 
                font-size: 0.85rem; 
                text-align: center;
                border: 1px solid #dcfce7;
            }
            
            .correct { background: #dcfce7 !important; border-color: #86efac !important; }
            .wrong { background: #fee2e2 !important; border-color: #fca5a5 !important; }

            /* --- KESİR STİLLERİ (HTML Modu) --- */
            .fraction-wrap {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                vertical-align: middle;
                margin: 0 4px;
                font-family: inherit;
            }
            .fraction-top {
                border-bottom: 2px solid currentColor;
                padding-bottom: 0px; /* Reduced from 1px */
                text-align: center;
                display: block;
                width: 100%;
                line-height: 1.1; /* Tighter line height helps too */
            }
            .fraction-bottom {
                padding-top: 0px; /* Reduced from 1px */
                text-align: center;
                display: block;
                width: 100%;
                line-height: 1.1;
            }
        `;
        document.head.appendChild(style);
    }
};

// Window assignments moved to definition
// window.CarpanlaraAyirmaMotoru = CarpanlaraAyirmaMotoru;
// window.Arayuz = Arayuz;