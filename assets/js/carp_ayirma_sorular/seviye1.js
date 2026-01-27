// carpanlara_ayirma.js Refactoring - Seviye 1      Bu dosya CarpanlaraAyirmaMotoru nesnesini genişletir.    #region Seviye 1 Soru Tipleri

CarpanlaraAyirmaMotoru.seviye1Tipleri = [

    {
        kod: "car1_1",
        aciklama: "Ortak Çarpan Parantezi (ax ± b)",       // 10x+90 <==> 10(x+9) 
        uret: function (motor) {
            const katsayi = motor.random(2, 10);
            const kok = motor.random(2, 20);
            const isaret = Math.random() > 0.5 ? '-' : '+';
            const sabit = katsayi * kok;

            // Soru Yönü (%50)
            const sorulanAcilimMi = Math.random() > 0.5;

            if (sorulanAcilimMi) {
                // Soru: k(x ± n) = ? (Açılım)
                let disKatsayi = katsayi;
                if (isaret === '-' && Math.random() > 0.5) {
                    disKatsayi = -katsayi;
                }

                const soruMetni = `${disKatsayi}(x ${isaret} ${kok})`;
                let dogruCevap = "";

                if (disKatsayi < 0 && isaret === '-') {
                    // -10(x - 9) -> 90 - 10x formatı
                    dogruCevap = `${sabit} - ${Math.abs(disKatsayi)}x`;
                } else {
                    // Standart: kx ± sabit
                    const c1 = disKatsayi; // x'in katsayısı
                    const c2 = isaret === '+' ? (disKatsayi * kok) : (disKatsayi * -kok);

                    let p1 = c1 === -1 ? '-x' : (c1 === 1 ? 'x' : `${c1}x`);
                    let p2 = c2 > 0 ? `+ ${c2}` : `- ${Math.abs(c2)}`;
                    dogruCevap = `${p1} ${p2}`;
                }

                // Yanlışlar
                let hamYanlislar = [];
                // 1. Sabit terimi çarpmama hatası (10x + 9)
                hamYanlislar.push(`${disKatsayi}x ${isaret} ${kok}`);

                // 2. Katsayı hatası
                hamYanlislar.push(`${disKatsayi}x ${disKatsayi > 0 ? '+' : '-'} ${sabit + katsayi}`);

                // 3. İşaret hatası
                if (disKatsayi < 0 && isaret === '-') {
                    hamYanlislar.push(`-${Math.abs(disKatsayi)}x - ${sabit}`); // -10x - 90
                } else {
                    // Tersi işaret
                    hamYanlislar.push(`${disKatsayi}x ${isaret === '+' ? '-' : '+'} ${Math.abs(sabit)}`);
                }

                // 4. Dolgu
                while (hamYanlislar.length < 4) {
                    const r1 = motor.random(disKatsayi - 2, disKatsayi + 2);
                    const r2 = motor.random(sabit - 10, sabit + 10);
                    hamYanlislar.push(`${r1}x ${r2 > 0 ? '+' : '-'} ${Math.abs(r2)}`);
                }

                return {
                    metin: `${soruMetni} ifadesinin açılımı (eşiti) hangisidir?`,
                    siklar: motor.hazirlaSiklar(dogruCevap, hamYanlislar),
                    ipucu: "Parantez önündeki sayıyı içerideki her terimle çarp."
                };

            } else {
                // Soru: 10x + 90 = ? (Kapanış)
                const hamDogru = `${katsayi}(x ${isaret} ${kok})`;
                const hamYanlislar = [
                    `${katsayi}(x ${isaret === '-' ? '+' : '-'} ${kok})`,
                    `${katsayi}x ${isaret} ${kok}`,
                    `${katsayi}(x ${isaret} ${kok * katsayi})`,
                    `${kok}(x ${isaret} ${katsayi})`
                ];
                return {
                    metin: `${katsayi}x ${isaret} ${sabit} ifadesinin çarpanlarına ayrılmış hali hangisidir?`,
                    siklar: motor.hazirlaSiklar(hamDogru, hamYanlislar),
                    ipucu: "Her iki terimde de ortak olan bir sayı var mı? Onu parantez dışına çek."
                };
            }
        }
    },

    {
        kod: "car1_1.2",
        aciklama: "Ortak Çarpan - İleri (k(ax ± b))",      // 90x+40 <==> 10(9x+4) 
        uret: function (motor) {
            let k, a, b;
            const gcd = function (x, y) {
                return !y ? x : gcd(y, x % y);
            };

            // k: 2-5, a: 2-5, b: 2-10. a ve b aralarında asal olmalı.
            do {
                k = motor.random(2, 10);
                a = motor.random(2, 10);
                b = motor.random(2, 10);
            } while (gcd(a, b) !== 1);

            const isaret = Math.random() > 0.5 ? '-' : '+';
            const tersIsaret = isaret === '-' ? '+' : '-';

            // Terim Değerleri
            const term1 = k * a;
            const term2 = k * b;

            // Soru Yönü (%50)
            const sorulanAcilimMi = Math.random() > 0.5;

            if (sorulanAcilimMi) {
                // Soru: k(ax ± b) = ? (Açılım)
                // Kural: Parantez içi - ise katsayı - olabilir. + ise katsayı sadece + olabilir.
                let disKatsayi = k;
                if (isaret === '-' && Math.random() > 0.5) {
                    disKatsayi = -k;
                }

                const soruMetni = `${disKatsayi}(${a}x ${isaret} ${b})`;
                let dogruCevap = "";

                if (disKatsayi < 0 && isaret === '-') {
                    // Özel Format: -10(9x - 4) -> 40 - 90x
                    dogruCevap = `${term2} - ${term1}x`;
                } else {
                    // Standart Dağılma
                    // disKatsayi * (ax isaret b)
                    const c1 = disKatsayi * a;
                    const c2 = isaret === '+' ? (disKatsayi * b) : (disKatsayi * -b);

                    // Formatla: c1x + c2 (veya - c2)
                    let p1 = c1 === -1 ? '-x' : (c1 === 1 ? 'x' : `${c1}x`);
                    let p2 = c2 > 0 ? `+ ${c2}` : `- ${Math.abs(c2)}`;
                    dogruCevap = `${p1} ${p2}`;
                }

                // Yanlışlar
                let hamYanlislar = [];
                // 1. İşaret Hatası
                if (disKatsayi < 0 && isaret === '-') {
                    hamYanlislar.push(`-${term1}x - ${term2}`); // -90x - 40
                    hamYanlislar.push(`${term1}x - ${term2}`);  // 90x - 40
                } else {
                    // Basit işaret değişimi
                    // Doğru A + B ise Yanlış A - B
                    // String manipülasyonu yerine mantıklı üretelim
                    // Aksi işaret
                    let y1 = disKatsayi * a;
                    let y2 = isaret === '+' ? (disKatsayi * -b) : (disKatsayi * b); // Tersi
                    hamYanlislar.push(`${y1}x ${y2 > 0 ? '+' : '-'} ${Math.abs(y2)}`);
                }

                // 2. Katsayı Dağıtmama (Sadece ilkine veya ikincisine)
                hamYanlislar.push(`${disKatsayi * a}x ${isaret} ${b}`);
                hamYanlislar.push(`${a}x ${isaret} ${Math.abs(disKatsayi * b)}`); // işaret karışık olabilir

                // 3. Sabit sayıyı toplama gibi yapma
                hamYanlislar.push(`${disKatsayi * a}x ${disKatsayi > 0 ? '+' : '-'} ${Math.abs(disKatsayi) + b}`);

                // Dolgu
                while (hamYanlislar.length < 4) {
                    // Rastgele üret
                    let r1 = motor.random(term1 - 5, term1 + 5);
                    let r2 = motor.random(term2 - 5, term2 + 5);
                    hamYanlislar.push(`${r1}x - ${r2}`);
                }

                return {
                    metin: `${soruMetni} ifadesinin açılımı (eşiti) hangisidir?`,
                    siklar: motor.hazirlaSiklar(dogruCevap, hamYanlislar),
                    ipucu: "Parantez önündeki sayıyı içerideki her terimle tek tek çarpman gerekir. İşaretlere dikkat et!"
                };

            } else {
                // Soru: 90x + 40 = ? (Kapanış - Mevcut)
                const hamDogru = `${k}(${a}x ${isaret} ${b})`;
                const hamYanlislar = [
                    `${k}(${a}x ${tersIsaret} ${b})`,
                    `${a}(${k}x ${isaret} ${b})`,
                    `${k}(${a}x ${isaret} ${term2})`, // Tam çekilmemiş
                    `${term1}(x ${isaret} ${b})`      // Yanlış katsayı
                ];

                return {
                    metin: `${term1}x ${isaret} ${term2} ifadesinin çarpanlarına ayrılmış hali hangisidir?`,
                    siklar: motor.hazirlaSiklar(hamDogru, hamYanlislar),
                    ipucu: "Sayıların en büyük ortak bölenini (EBOB) parantez dışına al."
                };
            }
        }
    },
    {
        kod: "car1_2",
        aciklama: "İki Kare Farkı (x² - y²)",             //  x²-81 <==> (x-9)(x+9)
        uret: function (motor) {
            // Senaryo Seçimi
            // 1. (%25) x² - b²  (x başta, sayı sonda)
            // 2. (%25) a² - x²  (sayı başta, x sonda)
            // 3. (%50) (ax)² - (by)² (katsayılı, x ve y)

            const senaryo = Math.random();
            let term1Str, term2Str, kok1Str, kok2Str;

            if (senaryo < 0.25) {
                // Senaryo 1: x² - b²
                const b = motor.random(1, 16);
                const b2 = b * b;
                term1Str = "x²";
                term2Str = `${b2}`;
                kok1Str = "x";
                kok2Str = `${b}`;
            } else if (senaryo < 0.50) {
                // Senaryo 2: a² - x²
                const a = motor.random(1, 16);
                const a2 = a * a;
                term1Str = `${a2}`;
                term2Str = "x²";
                kok1Str = `${a}`;
                kok2Str = "x";
            } else {
                // Senaryo 3: (ax)² - (by)²
                let a, b;
                do {
                    a = motor.random(2, 6);
                    b = motor.random(2, 6);
                } while (a === b); // Farklı katsayılar

                const a2 = a * a;
                const b2 = b * b;

                // Katsayılar 1 mi? (Nadir ama mümkün)
                const axStr = (a2 === 1) ? "x²" : `${a2}x²`;
                const byStr = (b2 === 1) ? "y²" : `${b2}y²`;

                term1Str = axStr;
                term2Str = byStr;

                kok1Str = (a === 1) ? "x" : `${a}x`;
                kok2Str = (b === 1) ? "y" : `${b}y`;
            }

            // Soru Yönü (%50)
            const sorulanAcilimMi = Math.random() > 0.5;

            if (sorulanAcilimMi) {
                // Soru: (A - B)(A + B) = ? (Açılımı sor)
                // Doğru Cevap: A² - B²
                const dogruCevap = `${term1Str} - ${term2Str}`;

                let hamYanlislar = [];
                // 1. İşaret Hatası (Artı)
                hamYanlislar.push(`${term1Str} + ${term2Str}`);

                // 2. Kare Almama Hatası (A - B)
                hamYanlislar.push(`${kok1Str} - ${kok2Str}`);

                // 3. Tam Kare Açılımı Gibi (A² - 2AB + B²)
                // Basitçe orta terimli bir şey uyduralım
                hamYanlislar.push(`(${kok1Str} - ${kok2Str})²`);

                // 4. Sadece birinin karesi
                hamYanlislar.push(`${term1Str} - ${kok2Str}`);

                // Dolgu
                while (hamYanlislar.length < 4) {
                    // Rastgele ama benzer
                    hamYanlislar.push(`${term1Str} + ${kok2Str}`);
                    if (hamYanlislar.length < 4) hamYanlislar.push(`${kok1Str} + ${term2Str}`);
                }

                return {
                    metin: `(${kok1Str} - ${kok2Str})(${kok1Str} + ${kok2Str}) ifadesinin açılımı (eşiti) hangisidir?`,
                    siklar: motor.hazirlaSiklar(dogruCevap, hamYanlislar),
                    ipucu: "İki kare farkı özdeşliğini hatırla: (A-B)(A+B) = A² - B²"
                };

            } else {
                // Soru: A² - B² = ? (Kapanış / Çarpanlara Ayırma)
                // Doğru Cevap: (A - B)(A + B)
                const dogruCevap = `(${kok1Str} - ${kok2Str})(${kok1Str} + ${kok2Str})`;

                const hamYanlislar = [
                    `(${kok1Str} - ${kok2Str})²`,
                    `(${kok1Str} + ${kok2Str})²`,
                    `(${kok1Str} - ${kok2Str})(${kok1Str} - ${kok2Str})`, // Tekrarlı eksi, aslında kare ile aynı ama görsel fark
                    `${term1Str} + ${term2Str}` // Açık artı
                ];

                return {
                    metin: `${term1Str} - ${term2Str} ifadesinin çarpanlarına ayrılmış hali hangisidir?`,
                    siklar: motor.hazirlaSiklar(dogruCevap, hamYanlislar),
                    ipucu: "İki kare farkı: A² - B² = (A-B)(A+B). Neyin karesi olduğuna dikkat et."
                };
            }
        }
    },
    {
        kod: "car1_3",
        aciklama: "Tam Kare Özdeşliği (x ± n)²",         //   x²±10x±25 <==> (x±5)²
        uret: function (motor) {
            const n = motor.random(1, 15);
            const isaret = Math.random() > 0.5 ? '+' : '-';
            const katsayi = 2 * n;
            const kare = n * n;

            // Soru Yönü Seçimi (%50)
            const sorulanAcilimMi = Math.random() > 0.5;

            if (sorulanAcilimMi) {
                // Soru: (x ± n)² = ? (Açılımı sor)
                // Doğru: x² ± 2nx + n²
                const hamDogru = `x² ${isaret} ${katsayi}x + ${kare}`;
                const hamYanlislar = [
                    `x² ${isaret} ${kare}`,             // Orta terim eksik (x² + 25)
                    `x² ${isaret === '+' ? '-' : '+'} ${katsayi}x + ${kare}`, // İşaret yanlış (x² - 10x + 25)
                    `x² ${isaret} ${n}x + ${kare}`,     // Katsayı yanlış (2 ile çarpılmamış)
                    `x² ${isaret} ${katsayi}x - ${kare}` // Sabit terim işareti yanlış
                ];

                return {
                    metin: `(x ${isaret} ${n})² ifadesinin açılımı hangisidir?`,
                    siklar: motor.hazirlaSiklar(hamDogru, hamYanlislar),
                    ipucu: "(a ± b)² = a² ± 2ab + b² özdeşliğini kullan."
                };

            } else {
                // Soru: x² ± 2nx + n² = ? (Kapanışı sor - Mevcut Durum)
                const hamDogru = `(x ${isaret} ${n})²`;
                const hamYanlislar = [
                    `(x ${isaret === '+' ? '-' : '+'} ${n})²`,
                    `(x ${isaret} ${n})(x ${isaret === '+' ? '-' : '+'} ${n})`,
                    `(x ${isaret} ${kare})²`,
                    `x² ${isaret} ${n}x + ${kare}`
                ];
                return {
                    metin: `x² ${isaret} ${katsayi}x + ${kare} ifadesinin çarpanlarına ayrılmış hali hangisidir?`,
                    siklar: motor.hazirlaSiklar(hamDogru, hamYanlislar),
                    ipucu: "Bu bir tam kare özdeşliğidir. Birincinin karesi, birinci ile ikincinin çarpımlarının 2 katı, ikincinin karesi..."
                };
            }
        }
    },
    {
        kod: "car1_4",
        aciklama: "Üç Terimli İfadeler (x² + bx + c)",   //   x²+bx+c <==> (x+m)(x+n)
        uret: function (motor) {
            // x^2 + bx + c <-> (x+m)(x+n)
            let m, n;
            do {
                m = motor.random(-10, 10);
                n = motor.random(-10, 10);
            } while (m === 0 || n === 0 || (Math.abs(m) === Math.abs(n))); // Karesel olmasın, zıt işaretli eşit olmasın

            const b = m + n;
            const c = m * n;
            const formatla = (val) => val > 0 ? `+ ${val}` : `- ${Math.abs(val)}`;

            // Soru Yönü (%50)
            const sorulanAcilimMi = Math.random() > 0.5;

            if (sorulanAcilimMi) {
                // Soru: (x + m)(x + n) = ? (Açılım)
                const soruMetni = `(x ${formatla(m)})(x ${formatla(n)})`;

                // Doğru Cevap: x^2 + bx + c
                // b ve c formatlama
                let bYazi = "";
                if (b !== 0) {
                    if (b === 1) bYazi = "+ x";
                    else if (b === -1) bYazi = "- x";
                    else bYazi = (b > 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`);
                }
                let cYazi = (c > 0 ? `+ ${c}` : `- ${Math.abs(c)}`);

                // Temizde başa gelen + 'yı veya fazla boşlukları almak için motor.temizlePolinom kullanılabilir ama manuel yapalım temiz olsun
                let dogruCevap = `x² ${bYazi} ${cYazi}`.replace(/\s+/g, ' ').trim();
                // Eğer bYazi boşsa (örneğin b=0) çift boşluk kalabilir, regex halleder.
                // Eğer başta + varsa (örneğin + 5x) regex silmez ama matematiksel olarak şıkların içinde doğru.
                // Sadece x^2 nin arkasına geldiği için sorun yok. (x^2 + 5x ...)

                let hamYanlislar = [];

                // 1. İşaret Hatası (Orta terim ters)
                let bTers = "";
                if (b !== 0) {
                    if (b === 1) bTers = "- x";
                    else if (b === -1) bTers = "+ x";
                    else bTers = (b > 0 ? `- ${b}x` : `+ ${Math.abs(b)}x`);
                }
                hamYanlislar.push(`x² ${bTers} ${cYazi}`.replace(/\s+/g, ' ').trim());

                // 2. Sabit Terim İşaret Hatası
                hamYanlislar.push(`x² ${bYazi} ${c > 0 ? '-' : '+'} ${Math.abs(c)}`.replace(/\s+/g, ' ').trim());

                // 3. Toplam ve Çarpım Yer Değişikliği (x^2 + c*x + b)
                // c katsayı olacak
                let cKatsayi = "";
                if (c !== 0) {
                    if (c === 1) cKatsayi = "+ x";
                    else if (c === -1) cKatsayi = "- x";
                    else cKatsayi = (c > 0 ? `+ ${c}x` : `- ${Math.abs(c)}x`);
                }
                let bSabit = (b > 0 ? `+ ${b}` : `- ${Math.abs(b)}`);
                hamYanlislar.push(`x² ${cKatsayi} ${bSabit}`.replace(/\s+/g, ' ').trim());

                // 4. Dolgu
                while (hamYanlislar.length < 4) {
                    const rB = motor.random(b - 3, b + 3);
                    const rC = motor.random(c - 5, c + 5);
                    const rYaziB = (rB === 0 ? '' : (rB > 0 ? `+ ${rB}x` : `${rB}x`));
                    const rYaziC = (rC > 0 ? `+ ${rC}` : `${rC}`);
                    hamYanlislar.push(`x² ${rYaziB} ${rYaziC}`.replace(/\s+/g, ' ').trim());
                }

                return {
                    metin: `${soruMetni} ifadesinin açılımı (eşiti) hangisidir?`,
                    siklar: motor.hazirlaSiklar(dogruCevap, hamYanlislar),
                    ipucu: "Parantezleri dağıtarak çarp: x ile x'i, x ile sayıyı..."
                };

            } else {
                // Soru: x^2 + bx + c = ? (Kapanış)
                const bYazi = b === 0 ? '' : (b > 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`);
                const cYazi = c > 0 ? `+ ${c}` : `- ${Math.abs(c)}`;

                const hamDogru = `(x ${formatla(m)})(x ${formatla(n)})`;

                let hamYanlislar = [];
                // 1. Ters İşaret
                hamYanlislar.push(`(x ${formatla(-m)})(x ${formatla(-n)})`);

                // 2. Akıllı Çeldirici (Delta)
                const delta = b * b + 4 * c;
                if (delta >= 0) {
                    const karekoke = Math.sqrt(delta);
                    if (Number.isInteger(karekoke)) {
                        const p = (b + karekoke) / 2;
                        const q = (b - karekoke) / 2;
                        if (Number.isInteger(p) && Number.isInteger(q) && p !== 0 && q !== 0) {
                            hamYanlislar.push(`(x ${formatla(p)})(x ${formatla(q)})`);
                            hamYanlislar.push(`(x ${formatla(-p)})(x ${formatla(-q)})`);
                        }
                    }
                }

                // 3. Rastgele
                hamYanlislar.push(`(x ${formatla(m)})(x ${formatla(-n)})`);
                hamYanlislar.push(`(x ${formatla(m + 1)})(x ${formatla(n)})`);
                hamYanlislar.push(`(x ${formatla(m)})(x ${formatla(n + 1)})`);

                let soruMetni = `x² ${bYazi} ${cYazi}`;
                if (b === 0) soruMetni = `x² ${cYazi}`;

                return {
                    metin: `${motor.temizlePolinom(soruMetni)} ifadesinin çarpanlarına ayrılmış hali hangisidir?`,
                    siklar: motor.hazirlaSiklar(hamDogru, hamYanlislar),
                    ipucu: "x² + bx + c ifadesinde çarpımları sabit sayıyı (c), toplamları x'in katsayısını (b) veren iki sayı bul."
                };
            }
        }
    },
    {
        kod: "car1_5",
        aciklama: "Küp Açılımları (x³ ± a³)",            //   x³±a³ <==> (x±a)(x²∓ax+a²)
        uret: function (motor) {
            const zar = Math.random();
            const a = motor.random(1, 5);
            const kup = a * a * a;
            const a2 = a * a;
            const axStr = (a === 1) ? "x" : `${a}x`;

            // Soru Yönü (%50)
            const sorulanAcilimMi = Math.random() > 0.5;

            if (zar > 0.5) {
                // İki Küp Farkı: x^3 - a^3 = (x-a)(x^2 + ax + a^2)
                const acilim = `(x - ${a})(x² + ${axStr} + ${a2})`;
                const kapali = `x³ - ${kup}`;

                if (sorulanAcilimMi) {
                    // Soru: (x-a)(...) = ?
                    // Şıklar kapalı (x^3 - a^3)

                    const hamDogru = kapali;
                    const hamYanlislar = [
                        `x³ + ${kup}`,              // İşaret hatası
                        `x³ - ${a2}`,            // Küp yerine kare
                        `(x - ${a})³`,              // Tam küp sanma
                        `x³ - ${kup}x`              // Gereksiz x
                    ];

                    return {
                        metin: `${acilim} ifadesinin eşiti (veya açılımı) hangisidir?`,
                        siklar: motor.hazirlaSiklar(hamDogru, hamYanlislar),
                        ipucu: "(a-b)(a² + ab + b²) = a³ - b³ özdeşliğini hatırla."
                    };
                } else {
                    // Soru: x^3 - a^3 = ?
                    const hamDogru = acilim;
                    const hamYanlislar = [
                        `(x - ${a})(x² - ${axStr} + ${a2})`, // İkinci parantez işareti yanlış
                        `(x + ${a})(x² - ${axStr} + ${a2})`, // İki küp toplamı formülü
                        `(x - ${a})³`,
                        `(x - ${a})(x² + ${2 * a}x + ${a2})` // Tam kare
                    ];
                    return {
                        metin: `${kapali} ifadesinin açılımı hangisidir?`,
                        siklar: motor.hazirlaSiklar(hamDogru, hamYanlislar),
                        ipucu: "İki küp farkı: a³ - b³ = (a-b)(a² + ab + b²)"
                    };
                }
            } else {
                // İki Küp Toplamı: x^3 + a^3 = (x+a)(x^2 - ax + a^2)
                const acilim = `(x + ${a})(x² - ${axStr} + ${a2})`;
                const kapali = `x³ + ${kup}`;

                if (sorulanAcilimMi) {
                    // Soru: (x+a)(...) = ?
                    const hamDogru = kapali;
                    const hamYanlislar = [
                        `x³ - ${kup}`,
                        `(x + ${a})³`,
                        `x³ + ${a2}`,
                        `x³ + ${3 * a}x`
                    ];
                    return {
                        metin: `${acilim} ifadesinin eşiti (veya açılımı) hangisidir?`,
                        siklar: motor.hazirlaSiklar(hamDogru, hamYanlislar),
                        ipucu: "(a+b)(a² - ab + b²) = a³ + b³ özdeşliğini hatırla."
                    };

                } else {
                    // Soru: x^3 + a^3 = ?
                    const hamDogru = acilim;
                    const hamYanlislar = [
                        `(x + ${a})(x² + ${axStr} + ${a2})`, // İşaret hatası
                        `(x - ${a})(x² + ${axStr} + ${a2})`,
                        `(x + ${a})³`,
                        `(x + ${a})(x² - ${2 * a}x + ${a2})`
                    ];
                    return {
                        metin: `${kapali} ifadesinin açılımı hangisidir?`,
                        siklar: motor.hazirlaSiklar(hamDogru, hamYanlislar),
                        ipucu: "İki küp toplamı: a³ + b³ = (a+b)(a² - ab + b²)"
                    };
                }
            }
        }
    },
    {
        kod: "car1_6",
        aciklama: "Tam Küp Açılımı (ax ± by)³",          //  (ax±by)³ <==> a³x³ ± 3a²xb²y + 3axb²y² ± b³y³
        uret: function (motor) {
            // Kurallar:
            // 1. a ve b [1, 4] aralığında
            // 2. a > 1 ise a != b olmalı. (a=1 ise b=1 olabilir, yani (x+y)^3 serbest)

            const a = motor.random(1, 4);
            let b;
            do {
                b = motor.random(1, 4);
            } while (a > 1 && a === b);

            const isaret = Math.random() > 0.5 ? '+' : '-';

            // Terimler: (ax)^3, 3(ax)^2(by), 3(ax)(by)^2, (by)^3
            // Katsayılar
            const c1 = a * a * a; // x^3 katsayısı
            const c2 = 3 * a * a * b; // x^2y katsayısı
            const c3 = 3 * a * b * b; // xy^2 katsayısı
            const c4 = b * b * b; // y^3 katsayısı

            // Değişken Yazımları
            const x3 = c1 === 1 ? 'x³' : `${c1}x³`;
            const x2y = c2 === 1 ? 'x²y' : `${c2}x²y`; // c2 genelde 1 olmaz ama
            const xy2 = c3 === 1 ? 'xy²' : `${c3}xy²`;
            const y3 = c4 === 1 ? 'y³' : `${c4}y³`;

            // İfadelerin oluşturulması
            // Açılım
            let acilim = "";
            if (isaret === '+') {
                // a^3 + 3a^2b + 3ab^2 + b^3
                acilim = `${x3} + ${x2y} + ${xy2} + ${y3}`;
            } else {
                // a^3 - 3a^2b + 3ab^2 - b^3
                acilim = `${x3} - ${x2y} + ${xy2} - ${y3}`;
            }

            // Kapanış (Çarpan Hali)
            const ax = a === 1 ? 'x' : `${a}x`;
            const by = b === 1 ? 'y' : `${b}y`;
            const kapali = `(${ax} ${isaret} ${by})³`;

            // Soru Yönü Seçimi (%50)
            const sorulanAcilimMi = Math.random() > 0.5;

            if (sorulanAcilimMi) {
                // Soru: (ax+by)^3 = ?
                // Şıklar: Doğru açılım, işaret hataları, katsayı hataları

                const hamDogru = acilim;
                let hamYanlislar = [];

                // Yanlış 1: İşaretlerin hepsi artı/eksi karışık
                if (isaret === '+') {
                    hamYanlislar.push(`${x3} - ${x2y} + ${xy2} - ${y3}`); // Eksi hali
                    hamYanlislar.push(`${x3} + ${x2y} - ${xy2} + ${y3}`); // Yanlış işaret
                } else {
                    hamYanlislar.push(`${x3} + ${x2y} + ${xy2} + ${y3}`); // Artı hali
                    hamYanlislar.push(`${x3} - ${x2y} - ${xy2} - ${y3}`); // Hepsi eksi
                }

                // Yanlış 2: 3 katsayılarını unutma (a^2b ve ab^2)
                // Yanlış katsayılar
                const w2 = a * a * b;
                const w3 = a * b * b;
                const wX2y = w2 === 1 ? 'x²y' : `${w2}x²y`;
                const wXy2 = w3 === 1 ? 'xy²' : `${w3}xy²`;

                if (isaret === '+') hamYanlislar.push(`${x3} + ${wX2y} + ${wXy2} + ${y3}`);
                else hamYanlislar.push(`${x3} - ${wX2y} + ${wXy2} - ${y3}`);

                // Yanlış 3: Sadece iki küp toplamı/farkı sanma
                if (isaret === '+') hamYanlislar.push(`${x3} + ${y3}`);
                else hamYanlislar.push(`${x3} - ${y3}`);

                // Yanlış 4: Kare açılımı gibi katsayı 2 yapma
                const k2 = 2 * a * a * b;
                const k3 = 2 * a * b * b;
                const kX2y = k2 === 1 ? 'x²y' : `${k2}x²y`;
                const kXy2 = k3 === 1 ? 'xy²' : `${k3}xy²`;
                if (isaret === '+') hamYanlislar.push(`${x3} + ${kX2y} + ${kXy2} + ${y3}`);
                else hamYanlislar.push(`${x3} - ${kX2y} + ${kXy2} - ${y3}`);


                return {
                    metin: `${kapali} ifadesinin açılımı hangisidir?`,
                    siklar: motor.hazirlaSiklar(hamDogru, hamYanlislar),
                    ipucu: "(a+b)³ = a³ + 3a²b + 3ab² + b³ özdeşliğini kullan."
                };

            } else {
                // Soru: Açılım verip kapalı halini sorma
                // Soru: ... = ?

                const hamDogru = kapali;
                let hamYanlislar = [];

                // Yanlış 1: İşaret tersi
                hamYanlislar.push(`(${ax} ${isaret === '+' ? '-' : '+'} ${by})³`);

                // Yanlış 2: Kare
                hamYanlislar.push(`(${ax} ${isaret} ${by})²`);

                // Yanlış 3: a ve b yer değişik
                const bx = b === 1 ? 'x' : `${b}x`;
                const ay = a === 1 ? 'y' : `${a}y`;
                hamYanlislar.push(`(${bx} ${isaret} ${ay})³`);

                // Yanlış 4: Sadece küplerin toplamı/farkı çarpanı
                // (ax - by)(ax² ...) yerine daha basit şeyler
                hamYanlislar.push(`(${ax} ${isaret} ${by})(${ax}² + ${by}²)`); // Sallama şık

                return {
                    metin: `${acilim} ifadesinin çarpanlarına ayrılmış hali (veya özdeşi) hangisidir?`,
                    siklar: motor.hazirlaSiklar(hamDogru, hamYanlislar),
                    ipucu: "Verilen ifade bir tam küp açılımıdır: a³ ± 3a²b + 3ab² ± b³ = (a ± b)³"
                };
            }
        }
    }
];





// #endregion

// #region Seviye 1 Üretim Fonksiyonu
CarpanlaraAyirmaMotoru.uretSeviye1 = function () {
    // Rastgele bir tip seç (bir öncekiyle aynı olmasın)
    let mevcutTipler = this.seviye1Tipleri;

    // Filtre varsa ve boş değilse uygula
    if (this.seviye1Filtre && this.seviye1Filtre.length > 0) {
        mevcutTipler = mevcutTipler.filter(t => this.seviye1Filtre.includes(t.kod));
    }

    // Eğer filtre sonucu boşsa (hatalı kod vs), tümünü kullan
    if (mevcutTipler.length === 0) {
        mevcutTipler = this.seviye1Tipleri;
    }

    // Eğer 1'den fazla tip varsa ve son seçileni biliyorsak filtrele
    let adayTipler = mevcutTipler;
    if (mevcutTipler.length > 1 && this.sonSeviye1Tipi) {
        adayTipler = mevcutTipler.filter(t => t.kod !== this.sonSeviye1Tipi);
    }

    // Adaylardan birini seç
    const secilenTip = adayTipler[Math.floor(Math.random() * adayTipler.length)];

    // Durumu güncelle
    this.sonSeviye1Tipi = secilenTip.kod;

    // Soruyu üret
    const soruData = secilenTip.uret(this);

    // soruKodu'nu ekle
    soruData.soruKodu = secilenTip.kod;

    return soruData;
};
// #endregion
