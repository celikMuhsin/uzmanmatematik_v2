// carpanlara_ayirma.js Refactoring - Seviye 2
// Bu dosya CarpanlaraAyirmaMotoru nesnesini genişletir.

// #region Seviye 2 Soru Tipleri
CarpanlaraAyirmaMotoru.seviye2Tipleri = [
    {
        kod: "car2_1",
        aciklama: "Küp Açılımları (ax)³ ± (by)³",
        uret: function (motor) {
            // a ve b katsayılarını seç (1-5 arası)
            const a = motor.random(1, 5);
            let b;
            do {
                b = motor.random(1, 5);
            } while (a === b); // a ve b eşit olmasın

            // y değişkeni kullanılsın mı? (%50)
            // a=1 iken y olmazsa car1_5 ile aynı olur, o yüzden y zorunlu.
            const useY = (a === 1) || (Math.random() > 0.5);

            // İşaret seç (+ veya -)
            const isaret = Math.random() > 0.5 ? '+' : '-';
            const tersIsaret = isaret === '+' ? '-' : '+';

            // Terimleri hazırla
            // A = ax (eğer a=1 ise sadece x)
            // B = by (eğer b=1 ise sadece y) VEYA b (eğer y yoksa)

            const A_str = a === 1 ? 'x' : `${a}x`;
            const B_str = useY ? (b === 1 ? 'y' : `${b}y`) : `${b}`;

            // Gösterim için küpleri hesapla
            // x^3 katsayısı
            const a3 = a * a * a;
            const term1 = a3 === 1 ? 'x³' : `${a3}x³`;

            // İkinci terim
            const b3 = b * b * b;
            let term2 = '';
            if (useY) {
                term2 = b3 === 1 ? 'y³' : `${b3}y³`;
            } else {
                term2 = `${b3}`;
            }

            const soruMetni = `${term1} ${isaret} ${term2}`;

            // Çözüm Parçaları
            // (A ± B)
            const part1 = `(${A_str} ${isaret} ${B_str})`;

            // (A² ∓ AB + B²)
            // A² = a*a x²
            const a2 = a * a;
            const A2_str = a2 === 1 ? 'x²' : `${a2}x²`;

            // AB = a*b xy (veya x)
            const ab = a * b;
            let AB_str = '';
            if (useY) {
                AB_str = ab === 1 ? 'xy' : `${ab}xy`;
            } else {
                AB_str = ab === 1 ? 'x' : `${ab}x`; // b sabit sayıysa katsayı olur
            }

            // B² = b*b y² (veya sabit)
            const b2 = b * b;
            let B2_str = '';
            if (useY) {
                B2_str = b2 === 1 ? 'y²' : `${b2}y²`;
            } else {
                B2_str = `${b2}`;
            }

            const part2 = `(${A2_str} ${tersIsaret} ${AB_str} + ${B2_str})`;

            const hamDogru = `${part1}${part2}`;

            // Yanlış Şıklar
            const hamYanlislar = [];

            // 1. İşaret Hatası (İkinci parantezde ters işaret yerine aynı işaret)
            hamYanlislar.push(`${part1}(${A2_str} ${isaret} ${AB_str} + ${B2_str})`);

            // 2. İşaret Hatası (İlk parantezde ters işaret)
            hamYanlislar.push(`(${A_str} ${tersIsaret} ${B_str})(${A2_str} ${isaret} ${AB_str} + ${B2_str})`);

            // 3. Eksik Orta Terim (Tam kare benzeri hata)
            hamYanlislar.push(`${part1}(${A2_str} + ${B2_str})`);

            // 4. Katsayı Hatası (Orta terim 2 katı - Tam kare karışıklığı)
            hamYanlislar.push(`${part1}(${A2_str} ${tersIsaret} ${useY ? (2 * ab === 1 ? 'xy' : 2 * ab + 'xy') : (2 * ab + 'x')} + ${B2_str})`);

            // 5. Basit Kuvvet Hatası (Küp alma yerine kare alma gibi veya parantez küpü)
            hamYanlislar.push(`(${A_str} ${isaret} ${B_str})³`);

            return {
                metin: `${soruMetni} ifadesinin çarpanlarına ayrılmış hali hangisidir?`,
                siklar: motor.hazirlaSiklar(hamDogru, hamYanlislar),
                ipucu: `a³ ${isaret} b³ = (a ${isaret} b)(a² ${tersIsaret} ab + b²) özdeşliğini kullan. Dikkat et: A=${A_str}, B=${B_str}`
            };
        }
    }
];
// #endregion

// #region Seviye 2 Üretim Fonksiyonu
CarpanlaraAyirmaMotoru.uretSeviye2 = function () {
    // Rastgele bir tip seç (bir öncekiyle aynı olmasın)
    let mevcutTipler = this.seviye2Tipleri;

    // Filtre varsa ve boş değilse uygula
    if (this.seviye2Filtre && this.seviye2Filtre.length > 0) {
        mevcutTipler = mevcutTipler.filter(t => this.seviye2Filtre.includes(t.kod));
    }

    // Eğer filtre sonucu boşsa (hatalı kod vs), tümünü kullan
    if (mevcutTipler.length === 0) {
        mevcutTipler = this.seviye2Tipleri;
    }

    // Eğer 1'den fazla tip varsa ve son seçileni biliyorsak filtrele
    let adayTipler = mevcutTipler;
    if (mevcutTipler.length > 1 && this.sonSeviye2Tipi) {
        adayTipler = mevcutTipler.filter(t => t.kod !== this.sonSeviye2Tipi);
    }

    // Adaylardan birini seç
    const secilenTip = adayTipler[Math.floor(Math.random() * adayTipler.length)];

    // Durumu güncelle
    this.sonSeviye2Tipi = secilenTip.kod;

    // Soruyu üret
    const soruData = secilenTip.uret(this);

    // soruKodu'nu ekle
    soruData.soruKodu = secilenTip.kod;

    return soruData;
};
// #endregion
