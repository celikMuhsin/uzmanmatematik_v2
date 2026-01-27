// Sayı - Kesir Problemleri - Seviye 2
// Bu dosya SayiKesirMotoru nesnesini genişletir.

SayiKesirMotoru.seviye2Tipleri = [
    {
        kod: "sk2_1",
        aciklama: "Lineer Denklem (Genişletilmiş Varyasyonlar)",
        uret: function (motor) {
            // Genişletilmiş Level 2:
            // (T1) [+/-] (T2) = (T3) + E

            // --- YARDIMCI VERİLER ---
            const bolenIsimleri = { 2: "yarısı", 3: "üçte biri", 4: "dörtte biri", 5: "beşte biri" };
            const bolenIsimleriDan = { 2: "yarısından", 3: "üçte birinden", 4: "dörtte birinden", 5: "beşte birinden" };
            const bolenIsimleriNin = { 2: "yarısının", 3: "üçte birinin", 4: "dörtte birinin", 5: "beşte birinin" };

            // --- 1. KOMPOZİSYON SEÇİMİ ---
            // Sol Taraf İşlemi: true = Toplama (+), false = Çıkarma (-)
            const isToplama = Math.random() < 0.5;

            // T1 Tipi: true = Kat (Ax), false = Kesir (x/A)
            const t1KatMi = Math.random() < 0.6;
            const A = t1KatMi ? motor.random(2, 5) : motor.random(2, 5); // Kat ise katsayı, Kesir ise payda

            // T2 (İkinci Terim): Her zaman kesirli ve sabitli (x/B + C)
            // Ancak C negatif de olabilir ("eksiği")
            const B = motor.random(2, 5);
            const C = motor.random(1, 10);
            const cPozitif = Math.random() < 0.5; // true = fazlası, false = eksiği

            // T3 (Sağ Taraf): true = Kat (Dx), false = Kesir (x/D)
            const t3KatMi = Math.random() < 0.6;
            const D = t3KatMi ? motor.random(2, 4) : motor.random(2, 4);

            // --- 2. DENKLEM VE X HESABI ---
            // x, paydaların katı olmalı (Kesir paydaları: A(eğer kesirse), B, D(eğer kesirse))
            let paydalar = [B];
            if (!t1KatMi) paydalar.push(A);
            if (!t3KatMi) paydalar.push(D);

            // Basit EKOK yerine çarpım (sayılar küçük zaten)
            const ortakKat = paydalar.reduce((acc, val) => acc * val, 1);
            const carpan = motor.random(2, 5);
            const x = ortakKat * carpan; // DOĞRU CEVAP

            // Değerleri Hesapla
            // T1 Değeri
            let valT1 = t1KatMi ? (A * x) : (x / A);

            // T2 Değeri (x/B +/- C)
            let valT2Base = (x / B);
            let valT2 = cPozitif ? (valT2Base + C) : (valT2Base - C);

            // Sol Taraf Sonucu
            let solSonuc = isToplama ? (valT1 + valT2) : (valT1 - valT2);

            // T3 Değeri
            let valT3 = t3KatMi ? (D * x) : (x / D);

            // E (Dengeleyici) => Sol = T3 + E  => E = Sol - T3
            const E = solSonuc - valT3;

            // --- 3. METİN OLUŞTURMA ---
            let metinT1 = "";
            if (isToplama) {
                // ... ile ... toplandığında
                if (t1KatMi) metinT1 = `Bir sayının ${A} katı ile`;
                // 'ile' suffix logic is basic here, assuming simple cases. For more complex Turkish vowel harmony, we might need a helper, but:
                // 2: yarısı ile, 3: üçte biri ile... seems safe.
                // Correction: "A katı ile" is ok. "5 katı ile".
                else metinT1 = `Bir sayının ${bolenIsimleri[A]} ile`;
            } else {
                // ... dan ... çıkarıldığında 
                if (t1KatMi) metinT1 = `Bir sayının ${A} katından`;
                else metinT1 = `Bir sayının ${bolenIsimleriDan[A]}`;
            }

            let metinT2 = ""; // ... yarısının 3 fazlası/eksiği
            const cYazi = cPozitif ? "fazlası" : "eksiği";
            metinT2 = `${bolenIsimleriNin[B]} ${C} ${cYazi}`;

            // Bağlaç
            const islemMetni = isToplama ? "toplandığında" : "çıkarıldığında";

            // Sağ Taraf (T3 + E)
            let t3Bas = "";
            if (t3KatMi) {
                t3Bas = D === 1 ? "aynı sayının" : `aynı sayının ${D} katının`;
            } else {
                t3Bas = `aynı sayının ${bolenIsimleriNin[D]}`;
            }

            const eYazi = E >= 0 ? "fazlası" : "eksiği";
            const eSayi = Math.abs(E);

            // Nihayi Soru Metni
            const soruMetni = `<div style="text-align: left;">
${metinT1}, ${metinT2} ${islemMetni}, ${t3Bas} ${eSayi} ${eYazi} elde ediliyor.
<div style="margin-top: 10px; font-weight: bold;">Buna göre, bu sayı kaçtır?</div>
</div>`;

            // --- 4. İPUCU OLUŞTURMA ---
            // Denklem: T1 (op) (x/B (+/-) C) = T3 + E

            const fmt = (k) => k === 1 ? "" : (k === -1 ? "-" : k);

            // T1 Str
            let t1Str = t1KatMi ? `${fmt(A)}x` : motor.kesirHTML("x", A);

            // T2 Str (Parantez içi)
            let cIsaret = cPozitif ? "+" : "-";
            let t2Str = `(${motor.kesirHTML("x", B)} ${cIsaret} ${C})`;

            // Op
            let opStr = isToplama ? "+" : "-";

            // T3 Str
            let t3Str = t3KatMi ? `${fmt(D)}x` : motor.kesirHTML("x", D);

            // E Str
            let eStr = E >= 0 ? `+ ${E}` : `- ${Math.abs(E)}`;

            const ipucu = `Denklem kur: ${t1Str} ${opStr} ${t2Str} = ${t3Str} ${eStr}`;

            // --- 5. ŞIKLAR ---
            const dogruCevap = x.toString();
            let yanlislar = [];
            yanlislar.push((x + B).toString()); // Payda kadar hata
            yanlislar.push((x - B).toString());
            yanlislar.push((x * 2).toString());
            while (yanlislar.length < 4) {
                const r = x + motor.random(-20, 20);
                if (r > 0 && r !== x && !yanlislar.includes(r.toString())) {
                    yanlislar.push(r.toString());
                }
            }

            return {
                metin: soruMetni,
                siklar: motor.hazirlaSiklar(dogruCevap, yanlislar),
                ipucu: ipucu
            };
        }
    }
];

// #region Seviye 2 Üretim Fonksiyonu
SayiKesirMotoru.uretSeviye2 = function () {
    // Rastgele bir tip seç
    let mevcutTipler = this.seviye2Tipleri;
    const secilenTip = mevcutTipler[Math.floor(Math.random() * mevcutTipler.length)];
    const soruData = secilenTip.uret(this);
    soruData.soruKodu = secilenTip.kod;

    return soruData;
};
// #endregion
