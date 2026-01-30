// Sayı - Kesir Problemleri - Seviye 1
// Bu dosya SayiKesirMotoru nesnesini genişletir.

SayiKesirMotoru.seviye1Tipleri = [
    {
        kod: "sk1_1",
        aciklama: "Para Paylaşım Problemi (Zincirleme Fark)",
        uret: function (motor) {
            // --- 1. PARAMETRELER ---
            const kisiSayisi = motor.random(2, 5); // 2 ile 5 kişi arası
            const birimler = ["₺", "$", "€"];
            const birim = birimler[Math.floor(Math.random() * birimler.length)];

            // Kişiler arasındaki ilişkileri tutacak dizi
            // iliskiler[0]: 1. kişi ile 2. kişi arasındaki ilişki
            let iliskiler = [];
            for (let i = 0; i < kisiSayisi - 1; i++) {
                iliskiler.push({
                    miktar: motor.random(2, 20) * 50, // 100, 150... 1000 arası (50'nin katları)
                    fazlaMi: Math.random() < 0.5 // true: fazla, false: az
                });
            }

            // --- 2. MATEMATİKSEL MODEL ---
            // En son kişiye (kisiSayisi. kişi) x diyelim.
            // Önceki kişiler buna göre belirlenir.
            // Örn: 3 kişi. 1. 2.den 500 fazla, 2. 3.den 200 az.
            // 3. Kişi = x
            // 2. Kişi = x - 200
            // 1. Kişi = (x - 200) + 500 = x + 300

            // Sabit değerleri hesapla (x'in katsayısı hep 1)
            let sabitler = new Array(kisiSayisi).fill(0); // [?, ?, ..., 0]

            // Sondan başa doğru git
            for (let i = kisiSayisi - 2; i >= 0; i--) {
                const iliski = iliskiler[i];
                const sonrakiSabit = sabitler[i + 1];

                // İlişki: i. kişi (i+1). kişiden ...
                if (iliski.fazlaMi) {
                    sabitler[i] = sonrakiSabit + iliski.miktar;
                } else {
                    sabitler[i] = sonrakiSabit - iliski.miktar;
                }
            }

            // Toplam Para Hesabı
            // Toplam = (n * x) + (sabitlerin toplamı)
            const sabitToplami = sabitler.reduce((a, b) => a + b, 0);

            // Rastgele bir x (en az alanın negatif olmaması için güvenli bir taban seçelim)
            // En küçük sabit ne kadar negatifse x en az o kadar büyük olmalı + biraz marj
            const minSabit = Math.min(...sabitler);
            const minX = Math.abs(Math.min(0, minSabit)) + motor.random(2, 20) * 50;
            const x = minX;

            const toplamPara = (kisiSayisi * x) + sabitToplami;

            // Herkesin aldığı parayı hesapla
            const paylar = sabitler.map(s => x + s);

            // --- 3. METİN OLUŞTURMA ---
            const sayiIsimleri = ["Birinci", "İkinci", "Üçüncü", "Dördüncü", "Beşinci"];
            const kucukIsimler = ["birinci", "ikinci", "üçüncü", "dördüncü", "beşinci"];

            let soruMetni = `<div style="text-align: left;">
            ${motor.sayiyiYaziyaCevir(kisiSayisi, true)} kişi ${toplamPara} ${birim} paylaşıyor. `;

            for (let i = 0; i < kisiSayisi - 1; i++) {
                const k1 = (i === 0) ? sayiIsimleri[i] + " kişi" : kucukIsimler[i]; // Cümle başı veya devamı
                const k2 = kucukIsimler[i + 1];
                const miktar = iliskiler[i].miktar;
                const tur = iliskiler[i].fazlaMi ? "fazla" : "az";

                // virgül kullanımı: son eleman değilse virgül
                const virgul = (i < kisiSayisi - 2) ? "," : ".";

                // İlk harfi büyük/küçük ayarlama
                let baslangic = "";
                if (i === 0) baslangic = `Bu paylaşımda ${kucukIsimler[i]} kişi`; // "Bu paylaşımda birinci kişi..."
                else baslangic = `${kucukIsimler[i]}`;

                // Daha akıcı bir metin için:
                // "Bu paylaşımda birinci kişi ikinciden 500 TL fazla, ikinci üçüncüden..."
                if (i === 0) {
                    soruMetni += `Bu paylaşımda ${kucukIsimler[0]} kişi ${kucukIsimler[1]}den ${miktar} ${birim} ${tur}`;
                } else {
                    // ismin son ekine dikkat: ikinci'den, üçüncü'den...
                    // Basit ekleme: "ikinci üçüncüden"
                    // Türkçede ekler: 
                    // ikinci(n)den, üçüncü(den), dördüncü(den)
                    // Basitleştirilmiş: direk "den" ekliyoruz, "ikinciden" (biraz bozuk olabilir ama kabul edilebilir), "üçüncüden"
                    soruMetni += `, ${kucukIsimler[i]} ${kucukIsimler[i + 1]}den ${miktar} ${birim} ${tur}`;
                }
            }
            soruMetni += " alıyor.";

            // Soru Kökü: En fazla veya En az
            const sorulacakTip = Math.random() < 0.5 ? "en fazla" : "en az";

            // Cevabı bul
            let dogruCevapVal;
            if (sorulacakTip === "en fazla") {
                dogruCevapVal = Math.max(...paylar);
            } else {
                dogruCevapVal = Math.min(...paylar);
            }

            // Boşluk ayarı: <br> yerine margin-top ile kontrol
            soruMetni += `<div style="margin-top: 10px;"><b>Buna göre ${sorulacakTip} alan kaç ${birim} almıştır?</b></div></div>`;

            // --- 4. ŞIKLAR ---
            const dogruCevap = dogruCevapVal.toString();
            let yanlislar = [];

            // Yanlış cevap türetme stratejileri
            // 1. Diğer kişilerin payları (güçlü çeldirici)
            paylar.forEach(p => {
                if (p !== dogruCevapVal && !yanlislar.includes(p.toString())) {
                    yanlislar.push(p.toString());
                }
            });

            // 2. İşlem hatası veya rastgele yakınlar
            while (yanlislar.length < 4) {
                const r = dogruCevapVal + motor.random(-5, 5) * 50;
                if (r > 0 && r !== dogruCevapVal && !yanlislar.includes(r.toString())) {
                    yanlislar.push(r.toString());
                }
            }

            // --- İPUCU OLUŞTURMA ---
            // YENİ MANTIK: Birinci ve İkinci arasındaki ilişkiye göre x belirle.
            // 1. > 2. ise İkinciye x de. (Böylece 1. pozitif olur)
            // 1. < 2. ise Birinciye x de. (Böylece 2. pozitif olur)

            let refIndex = 0;
            let ipucuXKim = "";
            let ipucuMetinGiris = "";

            // İlk ilişki analizi (iliskiler[0]: 1 ve 2 arası)
            if (iliskiler[0].fazlaMi) {
                // 1 > 2. İkinciye x diyelim.
                refIndex = 1; // 2. kişi (index 1)
                ipucuXKim = "ikinciye";
                ipucuMetinGiris = "Birinci ikinciden fazla aldığı için";
            } else {
                // 1 < 2. Birinciye x diyelim.
                refIndex = 0; // 1. kişi (index 0)
                ipucuXKim = "birinciye";
                ipucuMetinGiris = "Birinci ikinciden az aldığı için";
            }

            // Şimdi tüm kişilerin refIndex'e göre değerlerini (sabit farklarını) hesaplayalım.
            // ipucuSabitleri[i] => i. kişinin x'e göre farkı (x + 500 fb)
            let ipucuSabitleri = new Array(kisiSayisi).fill(0);

            // 1. İleriye doğru tarama (refIndex'ten sonrakiler)
            for (let i = refIndex; i < kisiSayisi - 1; i++) {
                // iliskiler[i]: i ile i+1 arası.
                // i. kişi (i+1)'den [fazla/az].
                // Yani: val[i] = val[i+1] + (fazla?m:-m)
                // Tersten: val[i+1] = val[i] - (fazla?m:-m) => val[i+1] = val[i] + (fazla ? -m : +m)

                const m = iliskiler[i].miktar;
                const fazla = iliskiler[i].fazlaMi;

                // x'i referans alıyoruz (ipucuSabitleri[i]).
                // ipucuSabitleri[i+1] buna göre ne olur?
                // Örn: i=1 (x), i+1=2.
                // 2. 3.den fazla (i=1, 2-3 ilişkisi bu değil, iliskiler[1] 2-3 ilişkisi)
                // Düzeltme: iliskiler[i] -> (i+1). kişi ve (i+2). kişi arası. (Indexler 0'dan başlıyor: iliskiler[0] => 1-2 arası)
                // Kişi indexleri: 0, 1, 2...
                // iliskiler[k], k ve k+1. kişiler arası.

                // i şu anki kişi. Bir sonraki (i+1) ile ilişkisine bakıyoruz.
                // iliskiler[i] => i ve i+1 arası.
                const rel = iliskiler[i];
                // i. = (i+1) + (fazla?m:-m)  => (i+1) = i - (fazla?m:-m)
                // (i+1) = i + (fazla ? -m : m)

                if (rel.fazlaMi) {
                    ipucuSabitleri[i + 1] = ipucuSabitleri[i] - rel.miktar;
                } else {
                    ipucuSabitleri[i + 1] = ipucuSabitleri[i] + rel.miktar;
                }
            }

            // 2. Geriye doğru tarama (refIndex'ten öncekiler)
            for (let i = refIndex - 1; i >= 0; i--) {
                // iliskiler[i] => i ve i+1 arası.
                // i. = (i+1) + (fazla?m:-m)
                // Zaten (i+1)'i biliyoruz (döngü geriye gidiyor çünkü).

                const rel = iliskiler[i];
                if (rel.fazlaMi) {
                    ipucuSabitleri[i] = ipucuSabitleri[i + 1] + rel.miktar;
                } else {
                    ipucuSabitleri[i] = ipucuSabitleri[i + 1] - rel.miktar;
                }
            }

            // Toplam sabit hesabı
            const ipucuToplamSabit = ipucuSabitleri.reduce((a, b) => a + b, 0);

            // Denklem Metni
            const sIsaret = ipucuToplamSabit >= 0 ? `+ ${ipucuToplamSabit}` : `- ${Math.abs(ipucuToplamSabit)}`;
            // Sabit 0 ise gösterme
            const sMetin = ipucuToplamSabit === 0 ? "" : ` ${sIsaret}`;

            const denklem = `${kisiSayisi}x${sMetin} = ${toplamPara}`;
            const ipucu = `${ipucuMetinGiris} ${ipucuXKim} x diyerek başlayalım ve denklem kuralım:<br>${denklem} `;

            return {
                metin: soruMetni,
                siklar: motor.hazirlaSiklar(dogruCevap, yanlislar),
                ipucu: ipucu
            };
        }
    }
];

// #region Seviye 1 Üretim Fonksiyonu
SayiKesirMotoru.uretSeviye1 = function () {
    // Rastgele bir tip seç
    let mevcutTipler = this.seviye1Tipleri;
    const secilenTip = mevcutTipler[Math.floor(Math.random() * mevcutTipler.length)];
    const soruData = secilenTip.uret(this);
    soruData.soruKodu = secilenTip.kod;

    return soruData;
};
// #endregion
