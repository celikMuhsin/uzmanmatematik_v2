// carpanlara_ayirma.js Refactoring - Seviye 4 (Özel Sorular)
// Bu dosya CarpanlaraAyirmaMotoru nesnesini genişletir.

// #region Sophie Germain Sorusu
CarpanlaraAyirmaMotoru.uretSophieGermain = function () {
    const n = this.random(1, 2);
    const sabit = 4 * Math.pow(n, 4);
    const hamDogru = `(x² - ${2 * n}x + ${2 * n * n})(x² + ${2 * n}x + ${2 * n * n})`;
    const hamYanlislar = [
        `(x² + ${2 * n}x - ${2 * n * n})(x² - ${2 * n}x - ${2 * n * n})`,
        `(x² + ${n}x + ${2 * n * n})(x² - ${n}x + ${2 * n * n})`,
        `(x² + ${4 * n})²`, `(x⁴ + ${sabit / 2})(x⁴ + 2)`
    ];
    return {
        metin: `x⁴ + ${sabit} ifadesinin çarpanlarına ayrılmış hali hangisidir?`,
        siklar: this.hazirlaSiklar(hamDogru, hamYanlislar),
        ipucu: "Bu ifade Sophie Germain özdeşliğidir (a⁴ + 4b⁴). Terim ekleyip (tam kareye tamamlayıp) tekrar çıkarmayı dene."
    };
};
// #endregion

// #region Değişken Değiştirme Sorusu
CarpanlaraAyirmaMotoru.uretDegiskenDegistirme = function () {
    const val = 64;
    const hamDogru = `(x - 2)(x + 2)(x² + 2x + 4)(x² - 2x + 4)`;
    const hamYanlislar = [
        `(x - 2)³(x + 2)³`, `(x² - 4)(x⁴ - 4x² + 16)`,
        `(x - 4)(x + 4)(x⁴ + 16)`, `(x³ - 4)(x³ + 16)`
    ];
    return {
        metin: `x⁶ - ${val} ifadesinin çarpanlarına ayrılmış hali hangisidir?`,
        siklar: this.hazirlaSiklar(hamDogru, hamYanlislar),
        ipucu: "x⁶ ifadesini (x³)² olarak düşün. Önce iki kare farkını uygula, çıkan sonuçları küp açılımına göre tekrar ayır."
    };
};
// #endregion
