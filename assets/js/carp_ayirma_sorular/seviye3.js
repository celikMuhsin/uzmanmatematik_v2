// carpanlara_ayirma.js Refactoring - Seviye 3
// Bu dosya CarpanlaraAyirmaMotoru nesnesini genişletir.

// #region Seviye 3 Soru Tipleri
CarpanlaraAyirmaMotoru.seviye3Tipleri = [
    {
        kod: "car3_1",
        aciklama: "İki Kare Farkı ile Sadeleştirme (Kesirli)",
        uret: function (motor) {
            // (a² - b²) / c işleminin sonucunu soracağız.
            // a = kx, b = n

            // 1. x'in katsayısını (k) belirle
            // %60 k=1, %40 k=[2,5]
            let k = 1;
            if (Math.random() > 0.6) {
                k = motor.random(2, 5);
            }

            // 2. Sabit sayıyı (n) belirle: 2-12
            const n = motor.random(2, 12);

            // 3. Pay (Numerator) kısmını oluştur: (kx)² - n²
            // Metin olarak kareleri alınmış hali: 9x² - 16 gibi
            const kSq = k * k;
            const nSq = n * n;

            // k=1 ise x², değilse k²x²
            const kSqStr = (kSq === 1) ? "x^2" : `${kSq}x^2`;

            // Pay metni: "9x^2 - 16"
            const payMetni = `${kSqStr} - ${nSq}`;

            // 4. Payda (Denominator - c) kısmını belirle
            // (kx - n) veya (kx + n)
            const isDenomMinus = Math.random() > 0.5; // True ise (kx - n)

            const kStr = (k === 1) ? "x" : `${k}x`;

            const paydaMetni = isDenomMinus ? `${kStr} - ${n}` : `${kStr} + ${n}`;

            // Doğru Cevap
            // Pay = (kx-n)(kx+n)
            // Payda (kx-n) ise Cevap (kx+n)
            // Payda (kx+n) ise Cevap (kx-n)

            let dogruCevapMetni = "";
            let dogruKatsayi = 0; // k
            let dogruSabit = 0;   // +/- n

            if (isDenomMinus) {
                // Payda -, Cevap +
                dogruCevapMetni = `${kStr} + ${n}`;
                dogruKatsayi = k;
                dogruSabit = n;
            } else {
                // Payda +, Cevap -
                dogruCevapMetni = `${kStr} - ${n}`;
                dogruKatsayi = k;
                dogruSabit = -n;
            }

            // ŞIKLAR
            let hamYanlislar = [];

            // 1. İşaret Hatası
            // Doğru 3x+4 ise Yanlış 3x-4
            const yanlisIsaret = isDenomMinus ? `${kStr} - ${n}` : `${kStr} + ${n}`;
            hamYanlislar.push(yanlisIsaret);

            // 2. Karekök almayı unutmuş hali (9x - 16 veya 9x + 16)
            // Cevap formatına benzetelim: doğru kx+n ise, bu k²x + n² gibi bir şey mi?
            // Yönerge: "Örn: 9x - 16" -> Yani katsayıların kareleri alınmış ama x kare değil.
            // Doğru cevap yapısına göre uyduralım. 
            // Eğer doğru cevap (kx + n) ise, yanlış (k²x + n²)
            // Eğer doğru cevap (kx - n) ise, yanlış (k²x - n²)

            const k2 = k * k;
            const n2 = n * n;
            const k2Str = (k2 === 1) ? "x" : `${k2}x`; // 1x yerine x

            // İşareti doğru cevabınkiyle aynı tutalım kafa karıştırmak için
            const yanlisKarekoksuz = isDenomMinus ? `${k2Str} + ${n2}` : `${k2Str} - ${n2}`;
            hamYanlislar.push(yanlisKarekoksuz);

            // 3. Sadece sabit sayının karesini almayı unutmuş hali
            // Örn kx - n² (Cevap 3x-4 ise Yanlış 3x-16)
            // İşaret yine doğru cevapla aynı olsun
            const yanlisSabitKare = isDenomMinus ? `${kStr} + ${n2}` : `${kStr} - ${n2}`;
            hamYanlislar.push(yanlisSabitKare);

            // Ekstra Yanlışlar (Yetmezse dolgu)
            hamYanlislar.push(`${k2Str} + ${n}`);
            hamYanlislar.push(`${kStr} + ${n + 1}`);

            return {
                metin: `<div style="display:inline-block; vertical-align:middle; text-align:center;">
                    <div class="fraction-wrap">
                        <span class="fraction-top">${payMetni.replace(/\^2/g, '<sup>2</sup>')}</span>
                        <span class="fraction-bottom">${paydaMetni}</span>
                    </div>
                </div> ifadesinin en sade hali nedir?`,
                siklar: motor.hazirlaSiklar(dogruCevapMetni, hamYanlislar),
                ipucu: "İki kare farkı özdeşliğini hatırla: a<sup>2</sup> - b<sup>2</sup> = (a-b)(a+b)"
            };
        }
    },
    {
        kod: "car3_2",
        aciklama: "İki Kare Farkı (Sayısal) - Sadeleştirme",
        uret: function (motor) {
            // (a² - b²) / c
            // a ve b sayılarını belirle. a > b olsun.
            const b = motor.random(11, 40);
            const a = b + motor.random(1, 15); // a, b'den büyük

            const payMetni = `${a}^2 - ${b}^2`;

            // Payda (c) belirle: a-b veya a+b
            const fark = a - b;
            const toplam = a + b;
            const isDenomMinus = Math.random() > 0.5; // True ise payda (a-b)

            const c = isDenomMinus ? fark : toplam;
            const paydaMetni = `${c}`;

            // Doğru Cevap
            const dogruCevap = isDenomMinus ? toplam : fark;

            // Yanlış Şıklar
            let hamYanlislar = [];

            // 1. Yanlış Çarpan (Diğer ihtimal)
            hamYanlislar.push(isDenomMinus ? fark : toplam);

            // 2. Yakın sayılar (işlem hatası süsü)
            hamYanlislar.push(dogruCevap + 10);
            hamYanlislar.push(dogruCevap - 10);
            hamYanlislar.push(dogruCevap + 1);

            // 3. Alakasız ama şık duran
            hamYanlislar.push(c); // Paydayı şık olarak koy

            return {
                metin: `<div style="display:inline-block; vertical-align:middle; text-align:center;">
                    <div class="fraction-wrap">
                        <span class="fraction-top">${payMetni.replace(/\^2/g, '<sup>2</sup>')}</span>
                        <span class="fraction-bottom">${paydaMetni}</span>
                    </div>
                </div> işleminin sonucu kaçtır?`,
                siklar: motor.hazirlaSiklar(dogruCevap.toString(), hamYanlislar.map(x => x.toString())),
                ipucu: "Sayıların karelerini almak yerine iki kare farkı özdeşliğini kullan: a<sup>2</sup> - b<sup>2</sup> = (a-b)(a+b)"
            };
        }
    }
];
// #endregion

// #region Seviye 3 Üretim Fonksiyonu
CarpanlaraAyirmaMotoru.uretSeviye3 = function () {
    // Rastgele bir tip seç
    let mevcutTipler = this.seviye3Tipleri;

    if (this.seviye3Filtre && this.seviye3Filtre.length > 0) {
        mevcutTipler = mevcutTipler.filter(t => this.seviye3Filtre.includes(t.kod));
    }

    if (mevcutTipler.length === 0) mevcutTipler = this.seviye3Tipleri;

    let adayTipler = mevcutTipler;
    if (mevcutTipler.length > 1 && this.sonSeviye3Tipi) {
        adayTipler = mevcutTipler.filter(t => t.kod !== this.sonSeviye3Tipi);
    }

    const secilenTip = adayTipler[Math.floor(Math.random() * adayTipler.length)];
    this.sonSeviye3Tipi = secilenTip.kod;

    const soruData = secilenTip.uret(this);
    soruData.soruKodu = secilenTip.kod;

    return soruData;
};
// #endregion
