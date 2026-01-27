const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence } = window.Motion;

/* 
 * =========================================================================================
 *  VERİ YAPISI (DATA STRUCTURE) - KATEGORİLEŞTİRİLMİŞ
 *  category: 'STORY', 'STORYBOOK', 'STORYTEST', 'STORYGAME'
 *  featured: true/false (Ana sayfada üstte görünsün mü?)
 * =========================================================================================
 */
const STORY_SETS = [
    // -------------------------------------------------------------------------------------
    // 1. STORY: SIFIRIN GÜCÜ
    // -------------------------------------------------------------------------------------
    {
        id: 1,
        type: 'story',
        category: 'STORY',
        featured: true, // Ana sayfa favorisi
        user: "STORY Matematik",
        subUser: "MOTİVASYON",
        coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop",
        authorImage: "assets/images/yazarlar/muhsin_celik.png",
        ringColor: "from-yellow-400 via-red-500 to-purple-600",
        slides: [
            {
                id: 1,
                title: "Matematik Temeli",
                subtitle: " ",
                text: "Görünmeyen temeller, görünen muazzam yapıları ayakta tutar; matematik işte o görünmeyen güçtür.\n\nZirveye asansörle çıkılmaz; temeli sağlam atıp merdivenleri tek tek tırmanmak gerekir. \n\n Matematik, bilimin üzerine inşa edildiği sarsılmaz zemindir; o temel olmadan hiçbir teori ayakta kalamaz.",
                color: "from-blue-600 to-blue-900",
                icon: "∞"
            },
            {
                id: 2,
                title: "HIZ?",
                subtitle: " ",
                text: "Matematik temeli sadece sayılarla oynamak değil, doğru düşünme sanatıdır. \n\n En karmaşık denklemler bile, temelde basit mantıkların mükemmel bir uyumla birleşmesidir.  \n\n Hızlı işlem yapmak bir yetenektir, ancak neyi neden yaptığını bilmek gerçek temeldir. ",
                color: "from-purple-600 to-purple-900",
                icon: "🚀"
            },
            {
                id: 3,
                title: "KAOS NE Kİ?",
                subtitle: "Muhsin ÇELİK",
                text: "Kaosun içindeki düzeni görmek, matematiksel bakış açısıyla mümkündür. \n\nİnsan zihninin gerçekliğe dokunduğu en saf noktadır matematik.",
                color: "from-emerald-600 to-emerald-900",
                icon: "💪"
            },
            {
                id: 4,
                title: "GERÇEK TEMEL",
                subtitle: "Muhsin ÇELİK",
                text: "Bilinmeyenin karanlığında yolunu bulmanı sağlayan pusula, mantık ve matematiktir. \n\n Rakamlarla dost olanın, hayatla arası iyi olur. \n\n Gerçek temel, formülleri ezberlemek değil, 'neden' ve 'nasıl' sorularının peşinden gitmektir.",
                color: "from-emerald-600 to-emerald-900",
                icon: "❓❓❓"
            }
        ]
    },
    // -------------------------------------------------------------------------------------
    // 2. STORY: Pİ SAYISI (Fizik)
    // -------------------------------------------------------------------------------------
    {
        id: 2,
        type: 'story',
        category: 'STORY',
        featured: true,
        user: "STORY Fizik",
        subUser: "MOTİVASYON",
        coverImage: "GRADIENT",
        authorImage: "https://cdn-icons-png.flaticon.com/512/5230/5230872.png",
        ringColor: "from-cyan-500 via-blue-700 to-blue-900",
        slides: [
            {
                id: 1,
                title: "EYLEMSİZ ZİHİN",
                subtitle: "Harekete Geç Artık!",
                text: "Eylemsizlik sadece kütleler için değil, zihinler için de geçerlidir; duran bir zihni harekete geçirmek, gideni durdurmaktan zordur. \n\n Hatta sürtünme olmasaydı hiçbir yere varamazdık; hayattaki zorluklar da bizi ileri taşıyan tutunma noktalarıdır",
                color: "from-indigo-600 to-indigo-900",
                icon: "🚆"
            },
            {
                id: 2,
                title: "POTANSİYELİN VAR, HAREKETE GEÇSENE!",
                subtitle: "Potansiyel Enerji",
                text: "Potansiyel enerji sessizdir ama kinetiğe dönüştüğünde dünyayı sarsar; dolayısıyla yeteneğin sen eyleme geçene kadar sadece işe yaramaz potansiyelindir.",
                color: "from-orange-600 to-orange-900",
                icon: "🏛️"
            },
            {
                id: 3,
                title: "DEĞİŞİM ŞART!",
                subtitle: "Farklı ol artık...",
                text: "Sıcaklık farkı olmadan ısı akışı olmaz; değişim istiyorsan, çevrenden farklı bir enerjiye sahip olmalısın",
                color: "from-teal-600 to-teal-900",
                icon: "🌌"
            }
        ]
    },
    // -------------------------------------------------------------------------------------
    // 3. İNTERAKTİF STORYBOOK
    // -------------------------------------------------------------------------------------
    {
        id: 3,
        type: 'interactive_story',
        category: 'STORYBOOK', // Alt menü: STORYBOOK
        featured: true,
        user: "STORYBOOK Matematik",
        subUser: "İnteraktif Macera",
        coverImage: "GRADIENT",
        authorImage: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png",
        ringColor: "from-fuchsia-600 via-purple-700 to-indigo-900",
        slides: [
            // SAYFA 1: GİRİŞ (Resimli)
            {
                id: 1,
                type: "cover",
                title: "Matematik Ormanı",
                subtitle: "İnteraktif Bir Gezi",
                text: "Bu hikayede kararlar verip soruları çözeceksiniz. Hazırsanız başlayalım!",
                color: "from-slate-800 to-slate-900 bg-[url('https://img.freepik.com/free-vector/math-background-with-formulas_23-2148163013.jpg')] bg-cover bg-center bg-blend-overlay",
                icon: "🌲",
                duration: 3000 // ÖRNEK: Bu slayt 3 saniye kalacak (Varsayılan 5sn)
            },
            // SAYFA 2: SÖZLÜK ÖZELLİĞİ
            {
                id: 2,
                type: "content",
                title: "Terimler",
                subtitle: "Kelimelere Tıkla",
                // {{kelime}} formatı
                text: "Matematik, evrenin dilidir. {{Algoritma}} ve {{Fonksiyon}} gibi kavramlar hayatımızı yönetir.",
                color: "from-indigo-600 to-purple-800",
                icon: "📚",
                dictionary: {
                    "Algoritma": "Bir problemi çözmek için izlenen adım adım yol haritası.",
                    "Fonksiyon": "Bir girdiyi alıp belirli bir kurala göre çıktı üreten işlem."
                }
            },
            // SAYFA 3: QUIZ (TEST)
            {
                id: 3,
                type: "quiz",
                question: "Üçgenin iç açıları toplamı?",
                options: ["180°", "360°", "90°", "270°"],
                correctIndex: 0,
                feedbackCorrect: "Tebrikler! Doğru bildin.",
                feedbackWrong: "Yanlış. Cevap 180°.",
                color: "from-blue-600 to-cyan-800",
                icon: "❓"
            },
            // SAYFA 4: SONUÇ
            {
                id: 4,
                type: "end",
                title: "Tebrikler!",
                subtitle: "Yolculuk Bitti",
                text: "İnteraktif demoyu tamamladın. Gemini ile daha fazlasını üretebilirsin!",
                color: "from-green-600 to-emerald-900",
                icon: "🎉"
            }
        ]
    }
];

// =========================================================================================
// GLOBAL MATH STORY COMPONENT
// props: { mode: 'featured' | 'category' }
// mode='featured' -> Sadece featured:true olanları ana sayfada yan yana gösterir.
// mode='category' -> 'CHANGE_STORY_CATEGORY' event'ini dinler ve grid şeklinde gösterir.
// =========================================================================================
const MathStory = ({ mode }) => {
    // --- STATE ---
    const [activeStorySetId, setActiveStorySetId] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isReading, setIsReading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Kategori Modu için State
    const [currentCategory, setCurrentCategory] = useState('STORY'); // Varsayılan: STORY

    // İnteraktif State'ler
    const [selectedQuizOption, setSelectedQuizOption] = useState(null);
    const [showDict, setShowDict] = useState({ visible: false, word: "", def: "" });

    // --- EVENT LISTENER (Kategori Değişimi İçin) ---
    useEffect(() => {
        if (mode === 'category') {
            const handleCategoryChange = (e) => {
                if (e.detail) {
                    setCurrentCategory(e.detail);
                }
            };
            window.addEventListener('CHANGE_STORY_CATEGORY', handleCategoryChange);
            return () => {
                window.removeEventListener('CHANGE_STORY_CATEGORY', handleCategoryChange);
            };
        }
    }, [mode]);

    // --- GLOBAL AÇMA EVENT'İ (Başka yerlerden tetiklemek için) ---
    useEffect(() => {
        const handleOpenStory = (e) => {
            if (e.detail && e.detail.id) {
                openStory(e.detail.id); // Overlay'i açar
            }
        };
        // Her iki modda da çalışsın, overlay global gibi davranır
        window.addEventListener('OPEN_STORY', handleOpenStory);
        return () => window.removeEventListener('OPEN_STORY', handleOpenStory);
    }, []);


    // --- COMPUTED DATA ---
    const visibleStories = STORY_SETS.filter(story => {
        if (mode === 'featured') {
            return story.featured === true;
        } else if (mode === 'category') {
            return story.category === currentCategory;
        }
        return false;
    });

    const currentStorySet = STORY_SETS.find(s => s.id === activeStorySetId);
    const contentList = currentStorySet ? currentStorySet.slides : [];

    // --- ZAMANLAYICI (TIMER) ---
    useEffect(() => {
        if (!activeStorySetId || (selectedQuizOption === null && contentList[activeSlide]?.type === 'quiz') || isPaused || isReading) return;

        const slideDuration = contentList[activeSlide]?.duration || 5000;
        const tickRate = 50;
        const increment = 100 / (slideDuration / tickRate);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    handleNext();
                    return 0;
                }
                return prev + increment;
            });
        }, tickRate);

        return () => clearInterval(timer);
    }, [activeStorySetId, isPaused, isReading, activeSlide, selectedQuizOption]);

    // Sayfa değişince resetler
    useEffect(() => {
        setProgress(0);
        setSelectedQuizOption(null);
        setShowDict({ visible: false, word: "", def: "" });
    }, [activeSlide, activeStorySetId]);

    // --- NAVİGASYON ---
    const handleNext = () => {
        if (activeSlide < contentList.length - 1) {
            setActiveSlide(prev => prev + 1);
        } else {
            closeStory();
        }
        stopReading();
    };

    const handlePrev = () => {
        if (activeSlide > 0) {
            setActiveSlide(prev => prev - 1);
        }
        stopReading();
    };

    // --- TTS (SESLİ OKUMA) ---
    const handleRead = (text) => {
        if (isReading) {
            stopReading();
            return;
        }
        const cleanText = text ? text.replace(/{{|}}/g, "") : "";
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'tr-TR';
        utterance.onend = () => setIsReading(false);
        window.speechSynthesis.speak(utterance);
        setIsReading(true);
    };

    const stopReading = () => {
        window.speechSynthesis.cancel();
        setIsReading(false);
    };

    const closeStory = () => {
        setActiveStorySetId(null);
        setActiveSlide(0);
        setProgress(0);
        stopReading();
    };

    const openStory = (id) => {
        setActiveStorySetId(id);
        setActiveSlide(0);
        setProgress(0);
    };

    // --- RENDER HELPERS ---
    const renderTextWithDict = (text, dictionary) => {
        if (!dictionary) return text;
        const parts = text.split(/({{.*?}})/g);
        return parts.map((part, index) => {
            if (part.startsWith('{{') && part.endsWith('}}')) {
                const word = part.slice(2, -2);
                const def = dictionary[word];
                return (
                    <span
                        key={index}
                        className="border-b-2 border-dotted border-white/40 cursor-help hover:bg-white/10 transition-colors pb-0.5"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsPaused(true);
                            setShowDict({ visible: true, word: word, def: def });
                        }}
                    >
                        {word}
                    </span>
                );
            }
            return part;
        });
    };

    // =====================================================================================
    // RENDER: LIST VIEW (Triggers)
    // =====================================================================================
    if (!activeStorySetId) {

        // Eğer KATEGORİ sayfasındaysak ve hiç story yoksa:
        if (mode === 'category' && visibleStories.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center p-10 text-gray-500">
                    <div className="text-4xl mb-2">📭</div>
                    <p>Bu kategoride henüz hikaye bulunmuyor.</p>
                </div>
            );
        }

        return (
            <div className={`flex gap-4 p-2 ${mode === 'category' ? 'flex-wrap justify-center' : 'overflow-x-auto no-scrollbar'}`}>
                {/* HEADLINE (Sadece Kategori sayfasında) */}
                {mode === 'category' && (
                    <div className="w-full text-center mb-6 mt-4">
                        <h2 className="text-2xl font-bold text-[#1a5f7a] border-b-2 border-[#1a5f7a] inline-block pb-1">
                            {currentCategory}
                        </h2>
                    </div>
                )}

                {visibleStories.map((storySet, index) => (
                    // Halka: w-20 h-20, Gradient border
                    <div key={storySet.id} className="flex flex-col items-center cursor-pointer group px-2 flex-shrink-0" onClick={() => openStory(storySet.id)}>

                        <div className={`w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr ${storySet.ringColor} hover:scale-105 transition-transform duration-300 shadow-lg`}>
                            {/* coverImage kontrolü: URL mi GRADIENT mi? */}
                            <div className={`w-full h-full rounded-full border-2 border-white overflow-hidden relative group-hover:border-transparent ${storySet.coverImage === 'GRADIENT' ? 'bg-gradient-to-br ' + storySet.ringColor : 'bg-black'}`}>

                                {/* coverImage varsa ve Gradient değilse göster */}
                                {storySet.coverImage !== 'GRADIENT' && (
                                    <img
                                        src={storySet.coverImage}
                                        alt={storySet.user}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                )}

                                {/* --- MERKEZİ ESTETİK YAZI ALANI (STANDART) --- */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-1 bg-black/20 backdrop-blur-[0.5px]">
                                    <span className={`${storySet.user.split(' ')[0].length > 6 ? 'text-[7px] tracking-wide' : 'text-[10px] tracking-widest'} font-black text-white leading-none drop-shadow-md uppercase mb-0.5`}>
                                        {storySet.user.split(' ')[0]}
                                    </span>
                                    <div className="w-8 h-[1px] bg-white/60 mb-0.5"></div>
                                    <span className="text-[9px] font-bold text-white/90 leading-none tracking-wide text-center uppercase">
                                        {storySet.user.split(' ').slice(1).join(' ')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // =====================================================================================
    // RENDER: STORY OVERLAY (TEK FORMAT - DİKEY)
    // =====================================================================================
    const currentPageData = contentList[activeSlide];

    return (
        <div className="fixed inset-0 z-[99999] bg-black bg-opacity-95 flex items-center justify-center p-0 md:p-4 backdrop-blur-md">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                div className="relative w-full h-full md:w-[400px] md:h-[80vh] md:rounded-2xl overflow-hidden shadow-2xl bg-gray-900 text-white"
            >
                {/* Background Dynamic Class or Image */}
                <div className={`absolute inset-0 transition-all duration-700 ${currentPageData.color.includes('url') ? currentPageData.color : 'bg-gradient-to-br ' + currentPageData.color}`}>
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')" }}>
                    </div>
                </div>

                {/* Progress Bars */}
                <div className="absolute top-4 left-0 right-0 z-20 flex gap-1 px-2">
                    {contentList.map((story, index) => (
                        <div key={story.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white"
                                initial={{ width: index < activeSlide ? "100%" : "0%" }}
                                animate={{ width: index < activeSlide ? "100%" : (index === activeSlide ? `${progress}%` : "0%") }}
                                transition={{ ease: "linear", duration: 0 }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header (UserInfo + Close) */}
                <div className="absolute top-8 left-0 right-0 z-20 px-4 flex justify-between items-center">
                    <div className="flex items-center gap-3 bg-black/20 p-1 pr-3 rounded-full backdrop-blur-sm">
                        <div className="w-8 h-8 rounded-full bg-white border border-white overflow-hidden">
                            {/* GÜNCELLEME: Header artık 'authorImage' kullanıyor */}
                            <img src={currentStorySet.authorImage} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white shadow-black drop-shadow-md">{currentStorySet.user}</p>
                            <p className="text-[10px] text-white/80 shadow-black drop-shadow-md">{currentStorySet.subUser}</p>
                        </div>
                    </div>
                    <button onClick={closeStory} className="text-white hover:opacity-70 z-50 bg-black/20 rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* --- ANA İÇERİK ALANI --- */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10 pointer-events-none">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeSlide}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="pointer-events-auto w-full"
                        >
                            {/* İKON / EMOJİ */}
                            <div className="text-6xl mb-6 font-bold opacity-90 drop-shadow-lg animate-bounce duration-[3000ms]">
                                {currentPageData.icon}
                            </div>

                            {/* BAŞLIKLAR */}
                            <h2 className="text-3xl font-bold mb-2 drop-shadow-lg text-white">{currentPageData.title}</h2>
                            {currentPageData.subtitle && <h3 className="text-lg font-medium text-white/90 mb-6 drop-shadow-md bg-white/10 inline-block px-3 py-1 rounded-full">{currentPageData.subtitle}</h3>}

                            {/* --- QUIZ MODU İSE --- */}
                            {currentPageData.type === 'quiz' ? (
                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 w-full">
                                    <h3 className="text-xl font-semibold mb-4 text-white line-clamp-3">{currentPageData.question}</h3>
                                    <div className="flex flex-col gap-2">
                                        {currentPageData.options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                disabled={selectedQuizOption !== null}
                                                onClick={() => setSelectedQuizOption(idx)}
                                                className={`p-3 text-left rounded-lg text-sm transition-all border font-medium ${selectedQuizOption !== null
                                                    ? (idx === currentPageData.correctIndex
                                                        ? 'bg-green-500/80 border-green-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                                                        : (idx === selectedQuizOption
                                                            ? 'bg-red-500/80 border-red-400 text-white'
                                                            : 'bg-white/5 border-white/5 opacity-40')
                                                    )
                                                    : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                                                    }`}
                                            >
                                                {opt}
                                                {selectedQuizOption !== null && idx === currentPageData.correctIndex && " ✓"}
                                                {selectedQuizOption !== null && idx === selectedQuizOption && idx !== currentPageData.correctIndex && " ✕"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* --- NORMAL METİN MODU İSE (PARAGRAF DESTEKLİ) --- */
                                <div className="w-full">
                                    {currentPageData.text.split(/\n+/).map((paragraph, index) => (
                                        <p key={index} className={`text-xl leading-relaxed font-light drop-shadow-md text-white ${index > 0 ? 'mt-6' : ''}`}>
                                            {renderTextWithDict(paragraph, currentPageData.dictionary)}
                                        </p>
                                    ))}
                                </div>
                            )}

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Touch Areas */}
                <div className="absolute inset-0 z-0 flex"
                    onMouseDown={() => setIsPaused(true)}
                    onMouseUp={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    <div className="w-1/3 h-full" onClick={handlePrev}></div>
                    <div className="w-2/3 h-full" onClick={handleNext}></div>
                </div>

                {/* Footer Controls (TTS) */}
                <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center pointer-events-none">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleRead(currentPageData.text || currentPageData.question); }}
                        className="pointer-events-auto flex items-center gap-2 px-6 py-3 bg-black/30 backdrop-blur-md rounded-full hover:bg-black/50 transition border border-white/20 text-white"
                    >
                        {isReading ? '🔊 Dinleniyor...' : '🔈 Dinle'}
                    </button>
                </div>

                {/* Sözlük Pop-up (Overlay) */}
                {showDict.visible && (
                    <div className="absolute bottom-24 left-4 right-4 bg-white text-black p-4 rounded-xl shadow-2xl z-50 text-sm animate-bounce-in">
                        <strong className="block text-indigo-600 mb-1 text-lg">{showDict.word}</strong>
                        <p>{showDict.def}</p>
                        <button onClick={() => { setShowDict({ ...showDict, visible: false }); setIsPaused(false); }} className="absolute top-2 right-2 text-gray-400 p-2">✕</button>
                    </div>
                )}

            </motion.div>
        </div>
    );
};

// =========================================================================================
// MOUNTING LOGIC (DUAL ROOT)
// 1. Featured Stories (Home Page) -> #math-story-root
// 2. Category Page (Story Page) -> #story-category-react-root
// =========================================================================================

const homeRoot = document.getElementById('math-story-root');
if (homeRoot) {
    const root1 = ReactDOM.createRoot(homeRoot);
    root1.render(<MathStory mode="featured" />);
}

const categoryRoot = document.getElementById('story-category-react-root');
if (categoryRoot) {
    const root2 = ReactDOM.createRoot(categoryRoot);
    root2.render(<MathStory mode="category" />);
}
