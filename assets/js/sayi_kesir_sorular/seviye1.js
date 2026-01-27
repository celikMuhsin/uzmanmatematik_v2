// Sayı - Kesir Problemleri - Seviye 1
// Bu dosya SayiKesirMotoru nesnesini genişletir.

SayiKesirMotoru.seviye1Tipleri = [
    {
        kod: "sk1_1",
        aciklama: "Basit Kesir Toplama (a/b + 1/b)",
        uret: function (motor) {
            const a = motor.random(1, 5);
            const b = motor.random(2, 5);
            const soruMetni = `$\\frac{${a}}{${b}} + \\frac{1}{${b}}$ işleminin sonucu nedir?`;
            const dogruCevap = `$\\frac{${a + 1}}{${b}}$`;

            const yanlislar = [
                `$\\frac{${a}}{${b + 1}}$`,
                `$\\frac{${a - 1}}{${b}}$`,
                `1`,
                `0`
            ];

            return {
                metin: soruMetni,
                siklar: motor.hazirlaSiklar(dogruCevap, yanlislar),
                ipucu: "Paydalar eşit, payları topla."
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
