// sayi_kesir.js - Sayı ve Kesir Problemleri Motoru

window.SayiKesirMotoru = {
    gecmisSorular: new Set(),

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

    kesirHTML: function (pay, payda) {
        return `<span class="fraction-wrap" style="vertical-align: middle;">
            <span class="fraction-top">${pay}</span>
            <span class="fraction-bottom">${payda}</span>
        </span>`;
    },

    // --- SORU ÜRETİMİ ---
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
        } else {
            return {
                metin: `Seviye ${seviye} soruları yapım aşamasında!`,
                siklar: [],
                ipucu: "..."
            };
        }

        if (deneme >= 10) this.gecmisSorular.clear();
        this.gecmisSorular.add(soruData.metin);

        soruData.cozulduMu = false;
        soruData.secilenSikIndex = -1;
        return soruData;
    },

    // CarpanlaraAyirmaMotoru'ndan kopyalanan yardımcılar (Gerekirse)
    hazirlaSiklar: function (dogru, yanlislar) {
        let siklar = yanlislar.slice(0, 4).map(text => ({ text, dogruMu: false }));
        siklar.push({ text: dogru, dogruMu: true });
        return this.karistir(siklar);
    },

    // --- SEVİYE 1 SORU ÜRETİMİ ---
    uretSeviye1: function () {
        // Basit Kesir İşlemleri (Örnek)
        const a = this.random(1, 5);
        const b = this.random(2, 5);
        const soruMetni = `$\\frac{${a}}{${b}} + \\frac{1}{${b}}$ işleminin sonucu nedir?`;
        const dogruCevap = `$\\frac{${a + 1}}{${b}}$`;
        const yanlislar = [`$\\frac{${a}}{${b + 1}}$`, `$\\frac{${a - 1}}{${b}}$`, `1`, `0`];
        const ipucu = "Paydalar eşit, payları topla.";

        return {
            metin: soruMetni,
            siklar: this.hazirlaSiklar(dogruCevap, yanlislar),
            ipucu: ipucu
        };
    },

    // --- SEVİYE 2 SORU ÜRETİMİ ---
    uretSeviye2: function () {
        // Level 2: Lineer Denklem Problemleri (Kullanıcı Talebi)
        // Denklem: (A * x) - (x / B + C) = (D * x) + E

        // 1. ADIM: Rastgelelik
        // this.random zaten var.

        // 2. ADIM: Cevap ve Bölen
        const bolenler = [2, 3, 4, 5];
        const secilenBolen = bolenler[this.random(0, bolenler.length - 1)];

        const carpan = this.random(2, 10);
        const x = secilenBolen * carpan; // Doğru Cevap

        // 3. ADIM: Katsayılar
        const A = this.random(3, 6);
        const C = this.random(1, 10);

        // D, A'dan küçük olmalı ki x pozitif kalsın denklemde karmaşa çıkmasın (Genelde)
        // A - 2 < 1 ise sıkıntı olabilir, A min 3 olduğu için A-2 min 1. Sorun yok.
        const D = this.random(1, A - 2);

        // 4. ADIM: E (Sonuç sabiti)
        // Sol Taraf = Ax - (x/B + C)
        const solTarafDegeri = (A * x) - ((x / secilenBolen) + C);
        // Sağ Taraf = Dx + E => E = Sol - Dx
        const E = solTarafDegeri - (D * x);

        // 5. ADIM: Metin
        const bolenMetinleri = { 2: "yarısının", 3: "üçte birinin", 4: "dörtte birinin", 5: "beşte birinin" };
        const bolenMetni = bolenMetinleri[secilenBolen];

        const sagTarafMetni = E >= 0
            ? `${E} fazlası`
            : `${Math.abs(E)} eksiği`;

        // "1 katı" düzeltmesi
        const dMetni = D === 1 ? "aynı sayının" : `aynı sayının ${D} katının`;

        const soruMetni = `Bir sayının ${A} katından, ${bolenMetni} ${C} fazlası çıkarıldığında, ${dMetni} ${sagTarafMetni} elde ediliyor.<br><br>Buna göre, bu sayı kaçtır?`;

        const dogruCevap = x.toString();
        const ipucu = `Denklem kur: ${A}x - (x/${secilenBolen} + ${C}) = ${D}x + ${E}`;

        // Yanlış Şıklar
        let yanlislar = [];
        // 1. Yakın cevaplar
        yanlislar.push((x + secilenBolen).toString());
        yanlislar.push((x - secilenBolen).toString());
        // 2. İşlem Hatası (C'yi ters işaretli alma vs)
        yanlislar.push((x * 2).toString());
        // 3. Rastgele
        while (yanlislar.length < 4) {
            const r = x + this.random(-10, 10);
            if (r > 0 && r !== x && !yanlislar.includes(r.toString())) {
                yanlislar.push(r.toString());
            }
        }

        return {
            metin: soruMetni,
            siklar: this.hazirlaSiklar(dogruCevap, yanlislar),
            ipucu: ipucu
        };
    }
};
