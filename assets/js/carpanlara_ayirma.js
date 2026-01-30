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
        watermark.innerText = 'xders.com ile çözüldü';
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
            link.download = `xders-cozum-${dateStr}.png`;
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

    kapat: function () {
        // Doğrudan raporu göster
        this.durdur();
        this.raporGoster();
    },

    cikisiOnayla: function () {
        // Rapordan tam çıkış
        const container = document.getElementById('math-exam-container');
        if (container) container.innerHTML = "";
        this.initialized = false;
        // Opsiyonel: Ana sayfaya yönlendir veya menüyü aç
    },

    raporGoster: function () {
        const container = document.getElementById('math-exam-container');
        if (!container) return;

        // İstatistikleri Hesapla
        // gecmisIndex = 0-based index. Length = gecmisIndex + 1 (görülen soru sayısı)

        let toplamSoru = this.gecmisIndex + 1;

        // SON SORU SÜRE KONTROLÜ:
        // Eğer son soru çözülmediyse VE ekranda 1 dakikadan (60000ms) AZ kaldıysa, 
        // onu toplam sorudan düş (yani hiç sorulmamış say).
        if (this.soruBaslamaZamani) {
            const gecenSure = Date.now() - this.soruBaslamaZamani;
            const sonSoru = this.soruGecmisi[this.gecmisIndex];
            // Son soru varsa ve çözülmediyse
            if (sonSoru && !sonSoru.cozulduMu && gecenSure < 60000) {
                toplamSoru = Math.max(0, toplamSoru - 1);
                // console.log("Son soru 1 dakikadan az durduğu için istatistiğe dahil edilmedi.");
            }
        }

        // Eğer son soru henüz çözülmediyse onu da "Boş" veya "Görülmedi" sayabiliriz.
        // Basitlik için gördüğü kadarını raporla.

        // -------------------------------------------------------------
        // PUANLAMA SİSTEMİ (v3 - Gelişmiş)
        // -------------------------------------------------------------

        // 1. Temel Veriler
        const T = toplamSoru > 0 ? toplamSoru : 1; // Bölen sıfır olmasın
        const birimPuan = 100 / T;

        const dogru = this.dogruSayisi;
        const yanlis = this.yanlisSayisi;
        const bos = Math.max(0, toplamSoru - dogru - yanlis);
        const sureSnTotal = this.timer > 0 ? this.timer : 1;

        // 2. Net Hesabı (4 Yanlış 1 Doğruyu Götürür)
        const netSayisi = Math.max(0, dogru - (yanlis / 4));

        // 3. Puan Kalemleri
        // A) Taban Puan (Potansiyel): Sadece doğrular
        const tabanPuan = Math.round(dogru * birimPuan);

        // B) Net Puanı (Akademik - ANA PUAN): Netler üzerinden
        const netPuan = Math.round(netSayisi * birimPuan);

        // C) Metrikler
        // Hız (Dk/Soru)
        const hızVal = (sureSnTotal / 60) / T;

        // ne_sa (Net/Saat): Saatte yapılan net sayısı
        // Formül: (Net / Süre(sn)) * 3600
        const ne_sa = Math.round((netSayisi / sureSnTotal) * 3600);

        // Diğer Metrikler (Ekranda gösterim için)
        // so_sa (Soru/Saat), do_sa (Doğru/Saat) vb.
        const speed = Math.round((T / sureSnTotal) * 3600);
        const dogruHiz = Math.round((dogru / sureSnTotal) * 3600);
        const yanlisHiz = Math.round((yanlis / sureSnTotal) * 3600);
        const bosHiz = Math.round((bos / sureSnTotal) * 3600);

        // D) Hız Bonusu (Turbo Puan) - Kriter: ne_sa
        let hizBonusu = 0;
        if (ne_sa > 60) hizBonusu = 15;
        else if (ne_sa > 50) hizBonusu = 10;
        else if (ne_sa > 40) hizBonusu = 5;

        // Eğer hiç net yoksa hız bonusu verme (Sallamayı önle)
        if (netSayisi <= 0) hizBonusu = 0;

        // E) SKERA Etkisi
        let skeraPuan = 0;

        // -------------------------------------------------------------
        // PERFORMANS ANALİZİ (V2.1) - FİZİKSEL VERİMLİLİK
        // -------------------------------------------------------------

        // 1. Hesaplamalar
        // V_net (Net Hız): (Net / Saniye) * 3600
        const v_net = Math.max(0, Math.round((netSayisi / sureSnTotal) * 3600));

        // V_ham (Ham Hız): (Toplam Soru / Saniye) * 3600 -> "speed" değişkeni zaten bu
        const v_ham = speed;

        // Verimlilik Skoru: (V_net / V_ham) * 100
        // Sıfıra bölünme hatası olmasın
        const verimlilik = v_ham > 0 ? Math.min(100, Math.max(0, Math.round((v_net / v_ham) * 100))) : 0;

        // Kaçış Oranı: Boş / Toplam Soru
        const kacis_orani = T > 0 ? (bos / T) : 0;

        // 2. 10 Basamaklı Performans Karar Ağacı
        let perfBaslik = "";
        let perfMesaj = "";
        let perfSeviye = 0; // 1-10

        // BÖLÜM 1: KRİTİK BÖLGE (%0 - %29)
        if (verimlilik < 30) {
            // SEVİYE 1: %0 - %9 (Etkisiz Eleman)
            if (verimlilik < 10) {
                perfSeviye = 1;
                if (kacis_orani > 0.80) {
                    perfBaslik = "HAYALET MODU 👻";
                    perfMesaj = "Sadece 'İleri' tuşuna basıyorsun. Soruların %80'inden fazlasını boş geçerek elde ettiğin bu hızın hiçbir değeri yok. Bu bir yarış değil, öğrenme süreci.";
                } else {
                    perfBaslik = "ENERJİ İSRAFI ⚠️";
                    perfMesaj = "Çok fazla yanlışın var. Yaptığın her 10 işlemden 9'u boşa gidiyor. Hızlanmayı tamamen bırak ve konu çalış.";
                }
            }
            // SEVİYE 2: %10 - %19 (Karavana)
            else if (verimlilik < 20) {
                perfSeviye = 2;
                if (kacis_orani > 0.60) {
                    perfBaslik = "SEÇİCİ GEÇİRGEN";
                    perfMesaj = "Çok fazla soruyu pas geçiyorsun. Sadece çok kolay gelenleri çözüp diğerlerine bakmıyorsun. Bu stratejiyle netlerin artmaz.";
                } else {
                    perfBaslik = "ODAK SORUNU";
                    perfMesaj = "Hızın var ama isabetin yok. Attığın taş ürküttüğün kurbağaya değmiyor. Verimin %20'nin altında.";
                }
            }
            // SEVİYE 3: %20 - %29 (Verimsiz Çaba)
            else {
                perfSeviye = 3;
                perfBaslik = "PATİNAJ ÇEKİYOR";
                perfMesaj = "Motor bağırıyor ama araba gitmiyor. Çok efor harcıyorsun ama bu puana dönüşmüyor. Yanlışlarını analiz etmeden yeni soruya geçme.";
            }
        }
        // BÖLÜM 2: GELİŞİM BÖLGESİ (%30 - %59)
        else if (verimlilik < 60) {
            // SEVİYE 4: %30 - %39 (Acemi Sürücü)
            if (verimlilik < 40) {
                perfSeviye = 4;
                perfBaslik = "ZORLANIYOR";
                perfMesaj = "Harcadığın eforun sadece üçte biri puana dönüşüyor. Konu eksiklerin hızını baltalıyor.";
            }
            // SEVİYE 5: %40 - %49 (Ortalamanın Altı)
            else if (verimlilik < 50) {
                perfSeviye = 5;
                perfBaslik = "TOPARLANMA SÜRECİ";
                perfMesaj = "Yarı yarıya bir başarı. Hızın fena değil ama dikkatsizlik yüzünden potansiyelinin yarısını çöpe atıyorsun.";
            }
            // SEVİYE 6: %50 - %59 (Kırılma Noktası)
            else {
                perfSeviye = 6;
                perfBaslik = "YARI YARIYA";
                perfMesaj = "Kritik eşiktesin. Biraz daha dikkatle verimliliğini pozitif tarafa taşıyabilirsin. Yanlış sayını azaltmaya odaklan.";
            }
        }
        // BÖLÜM 3: PERFORMANS BÖLGESİ (%60 - %89)
        else if (verimlilik < 90) {
            // SEVİYE 7: %60 - %69 (Vites Yükseliyor)
            if (verimlilik < 70) {
                perfSeviye = 7;
                perfBaslik = "İVMELENME";
                perfMesaj = "Güzel. Harcadığın eforun çoğu artık nete dönüşüyor. Hızını koruyarak isabet oranını artırabilirsin.";
            }
            // SEVİYE 8: %70 - %79 (Verimli Çalışma)
            else if (verimlilik < 80) {
                perfSeviye = 8;
                perfBaslik = "ETKİLİ TEMPO";
                perfMesaj = "Gayet sağlıklı bir istatistik. Soruları bilinçli çözüyorsun. Küçük hataları da temizlersen harika olacak.";
            }
            // SEVİYE 9: %80 - %89 (Yüksek Performans)
            else {
                perfSeviye = 9;
                perfBaslik = "USTALAŞIYOR";
                perfMesaj = "Çok iyi! Boşa giden enerjin çok az. Hem hızlısın hem de isabetlisin. Sınav kondisyonun harika.";
            }
        }
        // BÖLÜM 4: ZİRVE (%90 - %100)
        else {
            // SEVİYE 10: %90 - %100 (Prime Dönemi)
            perfSeviye = 10;
            perfBaslik = "MAKİNE 🤖";
            perfMesaj = "İnanılmaz! Neredeyse hiç enerji kaybın yok. Her hamlen puana dönüşüyor. Bu verimlilikle çözemeyeceğin sınav yok.";
        }

        // Basit Başarı Mesajları (Eski kod uyumu için)
        // const basariOrani = (dogru / T) * 100; (Yukarıda hesaplandı)
        let basariMesaj = "Daha fazla pratik yapmalısın.";
        let basariEmoji = "💪";
        let analizMetni = "Konu eksiklerini tamamlayarak tekrar denemeni öneririm.";


        // SKERA (Stratejik Karar Eğilimi ve Risk Analizi)
        // -------------------------------------------------------------

        // 1. Hesaplama Mantığı (Algoritma)
        const so = toplamSoru; // Toplam Soru
        const hata_orani = so > 0 ? (1 - (dogru / so)) : 0;
        const yapilamayan = yanlis + bos;

        // Dürtüsellik İndeksi (Impulsivity Index - I_imp)
        const i_imp = yapilamayan > 0 ? (yanlis / yapilamayan) * hata_orani : 0;

        // Çekimserlik İndeksi (Timidity Index - I_timid)
        const i_timid = yapilamayan > 0 ? (bos / yapilamayan) * hata_orani : 0;

        // 2. Karar Ağacı (Logic Flow)
        let skeraBaslik = "";
        let skeraDetay = "";

        // HIZ KONTROL KATMANI (İLK FİLTRE)
        // -------------------------------------------------------------
        // Eşik Değer: 20 so/sa
        if (speed < 20) {
            // DURUM 0: RÖLANTİ / AĞIR VASITA (Low Velocity Mode)
            if (hata_orani < 0.10) {
                // Alt Durum A (Doğru yapıyor ama yavaş)
                skeraBaslik = "AŞIRI YAVAŞSIN";
                skeraPuan = -5;
                skeraDetay = "Soruları doğru çözüyorsun ama hızın bir sınav temposunun çok altında (Kaplumbağa Modu). Bir soru üzerinde bu kadar vakit harcamak seni yetiştirememe riskine sokar. Biraz hızlanmayı dene.";
            } else {
                // Alt Durum B (Hem yavaş hem yanlış)
                skeraBaslik = "ODAKLANMA SORUNU";
                skeraPuan = -5;
                skeraDetay = "Hem hızın çok düşük hem de hata yapıyorsun. Bu durum, konuyu anlamakta güçlük çektiğini veya dikkatinin tamamen dağıldığını gösteriyor.";
            }
        }
        else {
            // STANDART ANALİZ KATMANI (Hız > 20)
            // -------------------------------------------------------------

            // DURUM 1: MASTER SEVİYE (Sniper Mode)
            // Şart: Hata yoksa veya çok azsa VE Hız > 40
            if (hata_orani < 0.05 && speed > 40) {
                skeraBaslik = "KESKİN NİŞANCI";
                skeraPuan = 10;
                skeraDetay = "Mükemmel kombinasyon! Hem çok hızlısın hem de hatasız ilerliyorsun. Gerçek bir sınav performansı budur.";
            }
            // DURUM 2: DÜRTÜSEL / RİSKLİ (Gambler Mode)
            else if (i_imp > 0.30) {
                // Eski mesajlar korunuyor
                if (i_imp <= 0.50) {
                    skeraBaslik = "Hafif Riskli Davranış";
                    skeraPuan = -5;
                    skeraDetay = "Hızını seviyoruz ama bazı sorularda acele edip işlem hatası yapıyorsun. Emin olmadığında durup düşünmek, yanlış yapmaktan daha iyidir.";
                } else if (i_imp <= 0.75) {
                    skeraBaslik = "Ciddi Riskli Davranış";
                    skeraPuan = -10;
                    skeraDetay = "Dikkat! Yanlışların doğrularını götürmeye başladı. Bilmediğin soruyu boş bırakmak bir stratejidir. Her şıkkı işaretlemek zorunda değilsin, fren yap!";
                } else {
                    skeraBaslik = "Kumarbaz Modu (Rastgele)";
                    skeraPuan = -10;
                    skeraDetay = "Analizler, soruları okumadan veya rastgele işaretlediğini gösteriyor. Bu bir sayısal loto değil. Lütfen sadece çözümünden emin olduğun soruları işaretle.";
                }
            }
            // DURUM 3: ÇEKİMSER / PASİF (Timid Mode)
            else if (i_timid > 0.40) {
                if (i_timid <= 0.60) {
                    skeraBaslik = "Temkinli Yaklaşım";
                    skeraPuan = 0;
                    skeraDetay = "Biraz fazla garantici oynuyorsun. Kalemin ucunu kağıda değdirmekten korkma. Yanlış yapsan bile doğrusunu öğrenirsin. Biraz daha atak olmalısın.";
                } else if (i_timid <= 0.80) {
                    skeraBaslik = "Aşırı Çekimser";
                    skeraPuan = -5;
                    skeraDetay = "Çok fazla soruyu pas geçiyorsun. Bu kadar boş bırakmak, konuyu bilmediğini veya kendine güvenmediğini gösterir. En azından işlem yapmayı dene.";
                } else {
                    skeraBaslik = "Donmuş / Pasif";
                    skeraPuan = -5;
                    skeraDetay = "Sistemi sadece izliyor gibisin. Neredeyse hiçbir soruya müdahale etmemişsin. Hata yapmaktan bu kadar korkma, öğrenmenin ilk adımı denemektir.";
                }
            }
            // DURUM 4: DENGELİ GELİŞİM (Balanced)
            else {
                if (hata_orani < 0.15) {
                    skeraBaslik = "Umut Vaat Ediyor";
                    skeraPuan = 5;
                    skeraDetay = "Dengen çok iyi. Hem hızın yerinde hem de risk almıyorsun. Doğru sayını artırmak için konu tekrarlarına ağırlık ver.";
                } else if (hata_orani < 0.30) {
                    skeraBaslik = "Çalışması Gerek";
                    skeraPuan = 0;
                    skeraDetay = "Kötü değil ama daha yolumuz var. Yanlış ve boşların dengeli dağılmış. Bu, konu eksikliğine işaret ediyor. Konu anlatımına dönmelisin.";
                } else {
                    skeraBaslik = "Kritik Bölge";
                    skeraPuan = 0;
                    skeraDetay = "Zorlanıyorsun. Stratejik bir hatan yok (sallamıyorsun) ama bilgi eksiğin fazla. Test çözmeyi bırakıp konuyu baştan çalışmanı öneririm.";
                }
            }
        }

        // -------------------------------------------------------------
        // KONDİSYON ANALİZİ (v3.0) - DİNAMİK TREND VE GRAFİK
        // -------------------------------------------------------------

        // 1. Veri Segmentasyonu (5 Eşit Parça)
        const segmentCount = 5;
        const segmentSize = Math.ceil(toplamSoru / segmentCount);
        const segmentData = [];

        // Soruları zaman damgasına göre sırala (Garanti olsun)
        const sortedHistory = [...this.soruGecmisi].sort((a, b) => (a.cozumSaniyesi || 999999) - (b.cozumSaniyesi || 999999));

        let prevTime = 0;
        for (let i = 0; i < segmentCount; i++) {
            const startIdx = i * segmentSize;
            const endIdx = Math.min((i + 1) * segmentSize, toplamSoru);
            const segmentQuestions = sortedHistory.slice(startIdx, endIdx);

            // Segment Metrikleri
            if (segmentQuestions.length === 0) {
                segmentData.push({ netHiz: 0, dogruluk: 0, bosOrani: 0 });
                continue;
            }

            let sDogru = 0, sYanlis = 0, sBos = 0;
            let lastTime = prevTime;

            segmentQuestions.forEach(q => {
                // Eğer cevaplanmamışsa (cozumSaniyesi yoksa) boş sayılır
                if (q.cozumSaniyesi) {
                    lastTime = q.cozumSaniyesi;
                    // Cevap kontrolü (siklar üzerinden)
                    if (q.cozulduMu) {
                        const secilen = q.siklar[q.secilenSikIndex];
                        if (secilen.dogruMu) sDogru++;
                        else sYanlis++;
                    } else {
                        sBos++;
                    }
                } else {
                    // İşaretlenmeden geçilenler
                    sBos++;
                }
            });

            // Segment Süresi (Saniye)
            // Eğer segmentte hiç zaman damgası yoksa (full boş), tahmini süre ver (ortlama)
            let sDuration = Math.max(1, lastTime - prevTime);
            if (sDuration === 1 && segmentQuestions.length > 0) sDuration = 10 * segmentQuestions.length; // Fallback

            prevTime = lastTime;

            const sNet = Math.max(0, sDogru - (sYanlis / 4));
            const sNetHiz = Math.round((sNet / sDuration) * 3600); // Net/Saat
            const sTotal = sDogru + sYanlis + sBos;
            const sDogruluk = sTotal > 0 ? (sDogru / sTotal) * 100 : 0;
            const sBosOrani = sTotal > 0 ? (sBos / sTotal) : 0;

            segmentData.push({
                netHiz: sNetHiz,
                dogruluk: Math.round(sDogruluk),
                bosOrani: sBosOrani
            });
        }

        // 2. Dinamik Trend Analizi (10 Senaryo)
        // Varsayılan
        let kondisyonBaslik = "NORMAL SEYİR";
        let kondisyonMesaj = "Dengeli bir sınav geçirdin. Belirgin bir kopuş veya patlama yok.";
        let kondisyonTavsiye = "Bu tempoyu koruyarak doğruluğunu artırmaya odaklan.";

        // Verileri Hazırla
        const v = segmentData.map(d => d.netHiz);
        const d = segmentData.map(d => d.dogruluk);
        const b = segmentData.map(d => d.bosOrani);

        // Yardımcı Fonksiyonlar
        const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

        // SENARYO KONTROLLERİ (Öncelik Sırasıyla)

        // (6) PES EDEN: Son 2 parçada boş oranı %90+
        if (b[3] > 0.9 && b[4] > 0.9) {
            kondisyonBaslik = "PES EDEN (The Quitter) 🏳️";
            kondisyonMesaj = "Sınavı kafanda erken bitirmişsin. Sonlara doğru kalemi bırakıp sadece izlemişsin.";
            kondisyonTavsiye = "Mücadeleyi son saniyeye kadar bırakma. Bir soru bile sıralamanı değiştirir.";
        }
        // (2) KONDİSYON ÇÖKÜŞÜ: İlk 2 yüksek, Son 2 %40+ düşüş
        else if (avg([v[0], v[1]]) > 40 && avg([v[3], v[4]]) < avg([v[0], v[1]]) * 0.6) {
            kondisyonBaslik = "KONDİSYON ÇÖKÜŞÜ 📉";
            kondisyonMesaj = "Sınava harika başladın ama 3. çeyrekten sonra pilin bitti. Sorun bilgi değil, zihinsel dayanıklılık.";
            kondisyonTavsiye = "Uzun süreli odaklanma antrenmanları yapmalısın. Pomodoro tekniği işe yarayabilir.";
        }
        // (5) SAMAN ALEVİ: 1. parça mükemmel, gerisi çöküş
        else if (v[0] > 50 && d[0] > 70 && v[1] < 20) {
            kondisyonBaslik = "SAMAN ALEVİ 🔥";
            kondisyonMesaj = "Çok hızlı ve hevesli başladın ama enerjini ilk dakikalarda tükettin. Maratonu sprint gibi koşamazsın.";
            kondisyonTavsiye = "Heyecanını kontrol et. Enerjini tüm sınava yaymayı öğrenmelisin.";
        }
        // (4) PANİK ATAK: Ortada Hız Artıyor, Doğruluk Çakılıyor (Ters Orantı)
        // Segment 2 veya 3'te: Hız > (Ort*1.5) VE Doğruluk < 50
        else if ((v[2] > avg(v) * 1.5 && d[2] < 50) || (v[3] > avg(v) * 1.5 && d[3] < 50)) {
            kondisyonBaslik = "PANİK ATAK ⚠️";
            kondisyonMesaj = "Dikkat! Sınavın ortasında bir kriz yaşamışsın. Muhtemelen zor bir soru seni paniğe sürükledi.";
            kondisyonTavsiye = "Kriz anında 'turlama taktiği'ni kullan. Yapamadığın soruyla inatlaşma, geç.";
        }
        // (7) SON DAKİKA GOLCÜSÜ: Son parça hızı çok yüksek
        else if (v[4] > avg(v.slice(0, 4)) * 3 && v[4] > 40) {
            kondisyonBaslik = "SON DAKİKA GOLCÜSÜ ⚽";
            kondisyonMesaj = "Süreyi iyi yönetemedin. Son kısımda 'ne kurtarırsam kardır' diyerek saldırmışsın.";
            kondisyonTavsiye = "Zaman yönetimine çalış. Her soruya eşit süre ayırmaya gayret et.";
        }
        // (3) DİZEL MOTOR: İlk parça düşük, sonra artıyor
        else if (v[0] < 20 && v[1] > v[0] && v[2] > v[1]) {
            kondisyonBaslik = "DİZEL MOTOR 🚜";
            kondisyonMesaj = "Isınman zaman alıyor. Sınavın başında tutuksun, sonradan açılıyorsun.";
            kondisyonTavsiye = "Sınav öncesi zihinsel ısınma egzersizleri veya 3-5 tane kolay işlem sorusu çöz.";
        }
        // (10) NİNJA: Düşük başla, hatasız hızlan
        else if (v[0] < 40 && v[4] > v[0] && avg(d) > 90) {
            kondisyonBaslik = "NİNJA 🥷";
            kondisyonMesaj = "Sessiz ve derinden. Önce ortamı kokladın, sonra avlamaya başladın. mükemmel strateji.";
            kondisyonTavsiye = "Bu stratejiyi koru. Sadece hızını biraz daha erkene çekebilirsin.";
        }
        // (1) İSTİKRARLI MAKİNE: Sapma az
        else if (Math.max(...v) - Math.min(...v) < 15 && avg(v) > 40) {
            kondisyonBaslik = "İSTİKRARLI MAKİNE 🤖";
            kondisyonMesaj = "Robot gibisin! Başladığın tempoda bitirdin. Muazzam bir kondisyon.";
            kondisyonTavsiye = "Artık sadece hız sınırlarını zorlamaya odaklanabilirsin.";
        }
        // (9) UYURGEZER: Hepsi düşük
        else if (Math.max(...v) < 20 && avg(d) < 50) {
            kondisyonBaslik = "UYURGEZER 🧟";
            kondisyonMesaj = "Sınav boyunca uyanamamışsın. Zihnin burada değildi.";
            kondisyonTavsiye = "Uykunu ve enerjini kontrol et. Sınava daha dinç girmelisin.";
        }
        // (8) HIZ TRENİ: Zikzak
        else if (Math.abs(v[1] - v[0]) > 20 && Math.abs(v[2] - v[1]) > 20) {
            kondisyonBaslik = "HIZ TRENİ 🎢";
            kondisyonMesaj = "Odaklanma sorunu yaşıyorsun. Bir dalıp bir çıkıyorsun. Konsantrasyonunu bir çizgiye oturtmalısın.";
            kondisyonTavsiye = "Dikkatin dağıldığında derin bir nefes al ve sıfırla.";
        }

        // -------------------------------------------------------------
        // TOPLAM PUAN HESAPLAMA (Final Score)
        // -------------------------------------------------------------
        // skeraPuan undefined ise 0 al
        const sPuan = typeof skeraPuan !== 'undefined' ? skeraPuan : 0;
        const toplamSkor = Math.max(0, netPuan + hizBonusu + sPuan);

        // Renklendirme Sınıfları
        const puanColor = toplamSkor >= 80 ? "#16a34a" : (toplamSkor >= 50 ? "#ca8a04" : "#dc2626");

        // UI Renkleri (Performans İçin)
        let perfColor = "#dc2626";
        if (perfSeviye >= 8) perfColor = "#16a34a"; //şil
        else if (perfSeviye >= 6) perfColor = "#1d4ed8"; // Mavi
        else if (perfSeviye >= 4) perfColor = "#ca8a04"; // Turuncu

        // SKERA Bar Hesabı (Kabaca -10 ile +10 arası, 0-100'e maple)
        const skeraYuzde = Math.min(100, Math.max(0, ((sPuan + 10) / 20) * 100));
        let skeraRenk = "#2563eb"; // Mavi ton
        if (sPuan < 0) skeraRenk = "#dc2626"; // Negatifse kırmızı
        else if (sPuan > 5) skeraRenk = "#16a34a"; // Çok iyiyse yeşil

        const raporHTML = `
            <div class="exam-card" style="text-align: left; padding: 0;">
                <div class="exam-header">
                    <div style="font-weight: bold; font-size: 1rem;">SINAV SONUÇ RAPORU</div>
                     <button id="btn-close" onclick="Arayuz.yenidenBaslat()" class="close-btn" title="Kapat">✕</button>
                </div>

                <div style="padding: 20px; overflow-y: auto; max-height: 75vh;">
                     
                     <!-- ÖZET PUAN BLOĞU (Renkli) -->
                     <div style="margin-bottom: 20px; text-align: center; border-bottom: 2px solid #f3f4f6; padding-bottom: 15px;">
                        <div style="font-size: 0.9rem; color: #6b7280; margin-bottom: 5px;">TOPLAM PUAN</div>
                        <div style="font-size: 2.5rem; font-weight: 800; color: ${puanColor}; line-height: 1;">${toplamSkor}</div>
                        <div style="font-size: 0.8rem; color: #9ca3af; margin-top: 5px;">(Maksimum 100 Puan)</div>
                        
                        <!-- PUAN DETAYLARI (Geri Geldi) -->
                        <div style="margin-top: 12px; display: flex; justify-content: center; gap: 8px; font-size: 0.8rem;">
                             <div style="background: #f9fafb; padding: 4px 8px; border-radius: 6px; border: 1px solid #e5e7eb; color: #4b5563;">
                                Net Puan: <strong>${netPuan}</strong>
                             </div>
                             <div style="background: #eff6ff; padding: 4px 8px; border-radius: 6px; border: 1px solid #dbeafe; color: #1d4ed8;">
                                Hız: <strong>+${hizBonusu}</strong>
                             </div>
                             <div style="background: ${sPuan >= 0 ? '#f0fdf4' : '#fef2f2'}; padding: 4px 8px; border-radius: 6px; border: 1px solid ${sPuan >= 0 ? '#bbf7d0' : '#fecaca'}; color: ${sPuan >= 0 ? '#15803d' : '#b91c1c'};">
                                SKERA: <strong>${sPuan >= 0 ? '+' + sPuan : sPuan}</strong>
                             </div>
                        </div>
                    </div>

                    <!-- DETAYLI İSTATİSTİKLER (Kart - Beyaz) -->
                    <div style="margin-bottom: 15px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; background: #ffffff;">
                        <h4 style="margin: 0 0 6px 0; font-size: 0.85rem; font-weight: bold; color: #374151; border-bottom: 1px solid #f3f4f6; padding-bottom: 4px;">Detaylı İstatistikler</h4>
                        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.7rem; color: #4b5563;">
                            <li style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 0.7rem;">
                                <span style="font-size: 0.7rem;">Doğru / Yanlış / Boş / Net:</span> 
                                <span style="font-size: 0.7rem;">
                                    <strong style="color: #16a34a;">${dogru}</strong> / 
                                    <strong style="color: #dc2626;">${yanlis}</strong> / 
                                    <strong style="color: #9ca3af;">${bos}</strong> / 
                                    <strong style="color: #2563eb;">${netSayisi.toFixed(2)}</strong>
                                </span>
                            </li>
                            <li style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 0.7rem;"><span style="font-size: 0.7rem;">Süre:</span> <strong style="font-size: 0.7rem;">${Math.floor(sureSnTotal / 60)} dk ${sureSnTotal % 60} sn</strong></li>
                            <li style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 0.7rem;"><span style="font-size: 0.7rem;">Soru Hızı:</span> <strong style="font-size: 0.7rem;">${speed} soru/sa</strong></li>
                            <li style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 0.7rem;"><span style="font-size: 0.7rem;">Net Hızı:</span> <strong style="font-size: 0.7rem;">${ne_sa} net/sa</strong></li>
                        </ul>
                    </div>
                    
                    <!-- PERFORMANS ANALİZİ (Kart - Krem) -->
                    <div style="margin-bottom: 15px; border: 1px solid #fde68a; border-radius: 8px; padding: 12px; background: #fffbeb;">
                        <h4 style="margin: 0 0 8px 0; font-size: 0.9rem; font-weight: bold; color: #d97706; display: flex; justify-content: space-between;">
                            <span>Performans Analizi (Fiziksel)</span>
                            <span style="background: ${perfColor}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">Seviye ${perfSeviye}/10</span>
                        </h4>
                        <div style="font-size: 0.95rem; font-weight: 700; color: #1f2937; margin-bottom: 3px;">${perfBaslik}</div>
                        <p style="margin: 0; font-size: 0.85rem; color: #4b5563; line-height: 1.4;">${perfMesaj}</p>
                        
                        <div style="margin-top: 8px; background: rgba(0,0,0,0.05); height: 6px; border-radius: 3px; overflow: hidden;">
                             <div style="width: ${verimlilik}%; background: ${perfColor}; height: 100%;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #6b7280; margin-top: 3px;">
                            <span>Verimlilik: %${verimlilik}</span>
                            <span>Kaçış: %${(kacis_orani * 100).toFixed(0)}</span>
                        </div>
                    </div>

                    <!-- SKERA ANALİZİ (Kart - Mavi) -->
                    <div style="margin-bottom: 15px; border: 1px solid #dbeafe; border-radius: 8px; padding: 12px; background: #eff6ff;">
                        <h4 style="margin: 0 0 8px 0; font-size: 0.9rem; font-weight: bold; color: #1e40af; display: flex; justify-content: space-between;">
                            <span>SKERA Analizi (Zihinsel)</span>
                             <span style="background: ${skeraRenk}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">Puan: ${sPuan > 0 ? '+' + sPuan : sPuan}</span>
                        </h4>
                        <div style="font-size: 0.95rem; font-weight: 700; color: #1e3a8a; margin-bottom: 3px;">${skeraBaslik}</div>
                        <p style="margin: 0; font-size: 0.85rem; color: #1e3a8a; line-height: 1.4; opacity: 0.8;">${skeraDetay}</p>

                        <div style="margin-top: 8px; background: rgba(255,255,255,0.5); height: 6px; border-radius: 3px; overflow: hidden;">
                             <div style="width: ${skeraYuzde}%; background: ${skeraRenk}; height: 100%;"></div>
                        </div>
                         <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #60a5fa; margin-top: 3px;">
                            <span>Stratejik Kontrol: %${Math.round(skeraYuzde)}</span>
                        </div>
                    </div>

                     <!-- KONDİSYON ANALİZİ (Kart - Mor) -->
                    <div style="margin-top: 15px; border: 1px solid #ede9fe; border-radius: 8px; padding: 12px; background: #f5f3ff;">
                        <h4 style="margin: 0 0 10px 0; font-size: 0.9rem; font-weight: bold; color: #7c3aed;">Kondisyon Analizi (Zaman): <span style="color: #4c1d95;">${kondisyonBaslik}</span></h4>
                        <p style="margin: 0 0 15px 0; font-size: 0.85rem; color: #5b21b6; line-height: 1.4;">
                            ${kondisyonMesaj}<br>
                            <strong style="color: #7c3aed;">💡 Tavsiye:</strong> ${kondisyonTavsiye}
                        </p>
                        <div style="position: relative; height: 180px; width: 100%;">
                            <canvas id="kondisyonChart"></canvas>
                        </div>
                    </div>

                </div>
                 
                <!-- BUTONLAR (Footer) -->
                <div class="control-panel" style="margin-top: auto; display: flex; gap: 8px; padding: 15px; border-top: 1px solid #f3f4f6; background: white;">
                    <button onclick="Arayuz.yenidenBaslat()" class="btn-action btn-secondary" style="flex: 1; font-size: 0.85rem;">🔄 TEKRAR ÇÖZ</button>
                    <button onclick="window.print()" class="btn-action btn-secondary" style="flex: 0.8; font-size: 0.85rem;">🖨️ YAZDIR</button>
                    <button onclick="Arayuz.raporuPaylas()" class="btn-action btn-primary" style="flex: 1.2; font-size: 0.85rem;">📤 PAYLAŞ</button>
                </div>
            </div>
        `;

        container.innerHTML = raporHTML;

        // GRAFİK ÇİZİMİ (Chart.js)
        setTimeout(() => {
            const ctx = document.getElementById('kondisyonChart');
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['%0-20', '%20-40', '%40-60', '%60-80', '%80-100'],
                        datasets: [
                            {
                                label: 'Net Hız (ne/sa)',
                                data: v,
                                borderColor: '#7c3aed',
                                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                                tension: 0.4,
                                yAxisID: 'y'
                            },
                            {
                                label: 'Doğruluk (%)',
                                data: d,
                                borderColor: '#10b981',
                                borderDash: [5, 5],
                                tension: 0.4,
                                yAxisID: 'y1'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            mode: 'index',
                            intersect: false,
                        },
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { boxWidth: 10, font: { size: 10 } }
                            }
                        },
                        scales: {
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                title: { display: true, text: 'Hız' },
                                min: 0
                            },
                            y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                title: { display: true, text: 'Doğruluk %' },
                                min: 0,
                                max: 100,
                                grid: {
                                    drawOnChartArea: false
                                }
                            },
                            x: {
                                grid: { display: false }
                            }
                        }
                    }
                });
            }
        }, 100);
    },

    // YENİ: Rapor ekranından çıkıp testi yeniden başlatmak için
    yenidenBaslat: function () {
        this.initialized = false; // UI'ın tekrar çizilmesi için false yap
        this.acilis(); // Baştan başlat
    },

    sifirlaVeBaslat: function () {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timer = 0;

        // UI Elementlerini Bul veya Yeniden Oluştur (Eğer rapordan geliyorsak elem'ler yok olmuştur)
        const tEl = document.getElementById('exam-timer');
        if (!tEl) {
            // Eğer timer elementi yoksa (ki rapor ekranındaysak yoktur), 
            // acilis() fonksiyonu zaten getHtmlTemplate() ile bunları oluşturmalı.
            // Ancak initialized true ise oluşturmaz. O yüzden initialized=false yaparak çağrılmalı.
            console.warn("Elementler bulunamadı, yeniden başlatılıyor...");
            this.initialized = false;
            this.acilis();
            return;
        }

        tEl.innerText = "00:00";
        // ... (Diğer sıfırlamalar devam eder)


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

        // ZAMAN TAKİBİ: Sorunun ne zaman görüntülendiğini kaydet
        this.soruBaslamaZamani = Date.now();

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

        guncelSoru.cozumSaniyesi = this.timer; // Kondisyon Analizi için zaman damgası
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
    },

    raporuPaylas: function () {
        // Rapor kartını seç
        const raporElement = document.querySelector('.exam-card');
        if (!raporElement) return;

        // html2canvas ile görüntü al
        html2canvas(raporElement).then(canvas => {
            canvas.toBlob(blob => {
                const file = new File([blob], "sinav_sonuc_raporu.png", { type: "image/png" });

                // Web Share API Desteği (Mobil vs)
                if (navigator.share) {
                    navigator.share({
                        title: 'Sınav Sonucum',
                        text: 'XDERS Uzman Matematik sınav sonucum! Sen de dene!',
                        files: [file]
                    }).catch(err => console.log('Paylaşım iptal:', err));
                } else {
                    // Masaüstü Fallback: İndirme
                    const link = document.createElement('a');
                    link.download = 'sinav_sonuc_raporu.png';
                    link.href = canvas.toDataURL();
                    link.click();
                    alert("Görüntü indirildi (Tarayıcın direkt paylaşımı desteklemiyor).");
                }
            });
        });
    }
};

// Window assignments moved to definition
// window.CarpanlaraAyirmaMotoru = CarpanlaraAyirmaMotoru;
// window.Arayuz = Arayuz;