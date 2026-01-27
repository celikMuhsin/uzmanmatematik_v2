window.vocabularyData = [

    {  // able
        "id": "1001-able", "word": "able",
        "meta": {
            "version": "2.2.0",
            "dictionary_type": "learner_advanced",
            "cefr_level": "A2",
            "frequency_rank": 350,
            "frequency_band": "High Frequency",
            "part_of_speech": "adjective"
        },
        "phonetics": {
            "ipa_us": "/ˈeɪ.bəl/",
            "ipa_uk": "/ˈeɪ.bəl/",
            "audio_us": "/assets/audio/us/able.mp3",
            "audio_uk": "/assets/audio/uk/able.mp3",
            "syllabification": ["a", "ble"],
            "stress_data": {
                "primary_stress_index": 0,
                "pattern": "Trochee (Strong-Weak)"
            }
        },
        "definitions": [
            {
                "sense_id": "def_1",
                "core_meaning_en": "having the ability, power, or skill to do something",
                "core_meaning_tr": "bir şeyi yapabilen, muktedir, gücü yeten",
                "context_tags": ["general", "capability"],
                "grammar_pattern": "be able to + infinitive",
                "example": {
                    "sentence": "Will you be able to come to the meeting?",
                    "translation": "Toplantıya gelebilecek misin?"
                }
            },
            {
                "sense_id": "def_2",
                "core_meaning_en": "clever, skillful, and capable",
                "core_meaning_tr": "yetenekli, becerikli, zeki",
                "context_tags": ["formal", "academic"],
                "grammar_pattern": "attributive adjective (before noun)",
                "example": {
                    "sentence": "She is one of the most able students in the class.",
                    "translation": "Sınıftaki en yetenekli öğrencilerden biridir."
                }
            }
        ],
        "grammar_profile": {
            "structures": [
                {
                    "pattern": "be able to + V1",
                    "usage_level": "Core",
                    "notes_tr": "Tüm zamanlarda (Tenses) çekimlenebilir (is able to, was able to, will be able to)."
                },
                {
                    "pattern": "seem/feel + able to + V1",
                    "usage_level": "Advanced",
                    "notes_tr": "Genellikle his veya görünüş bildiren fiillerle kullanılır."
                }
            ],
            "tense_logic": {
                "why_use_it": "Can modal'ının eksik olduğu zamanlar (Future, Perfect Tenses) için zorunludur.",
                "critical_comparison": {
                    "context": "Past Specific Achievement",
                    "rule": "Geçmişte zor bir durumda 'başarma' anlamı varsa 'could' yerine 'was/were able to' tercih edilir.",
                    "example_wrong": "The fire spread quickly, but everyone could escape. (Yanlış)",
                    "example_right": "The fire spread quickly, but everyone was able to escape. (Doğru)"
                }
            }
        },
        "sentence_progression": {
            "description": "Kelimenin seviyelere göre kullanım karmaşıklığı",
            "levels": [
                {
                    "cefr": "A2",
                    "en": "He is able to read English very well.",
                    "tr": "O, İngilizceyi çok iyi okuyabilir.",
                    "grammar_focus": "Present Tense / General Ability"
                },
                {
                    "cefr": "B1",
                    "en": "After fixing the engine, we were able to continue our journey.",
                    "tr": "Motoru tamir ettikten sonra yolculuğumuza devam edebildik.",
                    "grammar_focus": "Past Tense / Specific Achievement"
                },
                {
                    "cefr": "B2",
                    "en": "With this new funding, the company will be able to expand into new markets.",
                    "tr": "Bu yeni fonla birlikte şirket yeni pazarlara açılabilecek.",
                    "grammar_focus": "Future Tense / Possibility"
                },
                {
                    "cefr": "C1",
                    "en": "Being able to adapt to changing circumstances is a vital skill.",
                    "tr": "Değişen koşullara uyum sağlayabilmek hayati bir beceridir.",
                    "grammar_focus": "Gerund Form (Subject position)"
                }
            ]
        },
        "collocations": {
            "modifiers_adverbs": [
                { "word": "perfectly", "strength": "strong", "example": "I am perfectly able to look after myself." },
                { "word": "barely", "strength": "weak", "example": "He was barely able to stand." },
                { "word": "physically", "strength": "neutral", "example": "Is he physically able to travel?" },
                { "word": "financially", "strength": "neutral", "example": "We are not financially able to buy a house." }
            ],
            "verbs_preceding": [
                { "word": "seem", "example": "They seem able to cope." },
                { "word": "feel", "example": "I don't feel able to drive right now." }
            ]
        },
        "lexical_nuance": {
            "synonym_scale": {
                "concept": "Capability Intensity",
                "turkishConcept": "Yetenek Yoğunluğu",
                "description": "Yeterlilik bildiren kelimelerin güç sıralaması",
                "scale": [
                    {
                        "word": "can",
                        "value": 3,
                        "turkish": "yapabilmek",
                        "note": "En temel, gündelik",
                        "usage": "Günlük konuşma: 'I can swim.'",
                        "example": "I can speak basic English.",
                        "strength": "Düşük"
                    },
                    {
                        "word": "able",
                        "value": 6,
                        "turkish": "muktedir, yapabilen",
                        "note": "Daha resmi, eylem odaklı",
                        "usage": "İş/akademik: 'She is able to lead the team.'",
                        "example": "He is able to solve complex problems.",
                        "strength": "Orta"
                    },
                    {
                        "word": "capable",
                        "value": 8,
                        "turkish": "yetenekli, kapasiteli",
                        "note": "Potansiyel ve kapasite vurgusu",
                        "usage": "Potansiyel: 'He's capable of great things.'",
                        "example": "She is capable of learning quickly.",
                        "strength": "Yüksek"
                    },
                    {
                        "word": "proficient",
                        "value": 10,
                        "turkish": "ustalık derecesinde, yetkin",
                        "note": "Uzmanlık derecesinde yetkinlik",
                        "usage": "Teknik/uzmanlık: 'She is proficient in Python.'",
                        "example": "He is proficient in three languages.",
                        "strength": "En Üst"
                    }
                ]
            },
            "antonyms": [
                {
                    "word": "unable",
                    "value": 2,
                    "turkish": "yapamaz, aciz",
                    "note": "Geçici veya durumsal yapamama",
                    "example": "I'm unable to attend the meeting."
                },
                {
                    "word": "incapable",
                    "value": 1,
                    "turkish": "yetersiz, yeteneksiz",
                    "note": "Kalıcı veya yapısal yetersizlik",
                    "example": "He's incapable of understanding the problem."
                },
                {
                    "word": "inept",
                    "value": 0,
                    "turkish": "beceriksiz, acemi",
                    "note": "Beceriksiz, sakar, tamamen uyumsuz",
                    "example": "His inept handling made things worse.",
                    "warning": "Hakaret içerebilir, dikkatli kullanın!"
                }
            ]
        },
        "pragmatics": {
            "idioms_and_phrases": [
                {
                    "phrase": "ready, willing, and able",
                    "meaning_tr": "dünden razı, her şeye hazır ve nazır",
                    "register": "cliché/idiomatic"
                },
                {
                    "phrase": "able-bodied",
                    "meaning_tr": "eli ayağı tutan, fiziksel engeli olmayan",
                    "register": "neutral"
                }
            ],
            "sociolinguistics": {
                "topic": "Inclusive Language",
                "note_en": "In modern contexts, be mindful of ableist language. 'Disabled' is generally preferred over euphemisms like 'differently abled' by the community.",
                "note_tr": "Modern İngilizcede engellilik bağlamında dil kullanımına dikkat edilmelidir."
            }
        },
        "morphology_tree": {
            "root": "habilis (Latin)",
            "family_members": [
                { "word": "able", "pos": "adj", "level": "A2", "note": "yapabilecek, yetkin, becerikli, yetenekli" },
                { "word": "unable", "pos": "adj", "level": "B1", "prefix": "un-", "note": "yapamayan, aciz, gücü yetmeyen" },
                { "word": "ability", "pos": "n", "level": "A2", "suffix": "-ity", "note": "yetenek, kabiliyet, beceri, yapma yeteneği" },
                { "word": "enable", "pos": "v", "level": "B2", "prefix": "en-", "note": "mümkün kılmak, yetki vermek" },
                { "word": "disable", "pos": "v", "level": "B2", "prefix": "dis-", "note": "engellemek, devre dışı bırakmak, yetki almak" }
            ]
        },
        "pedagogy_engine": {
            "common_errors": [
                {
                    "error_id": "err_modal_double",
                    "incorrect": "I can able to do it.",
                    "correction": "I am able to do it.",
                    "explanation": "'Can' ve 'be able to' aynı cümlede yan yana gelmez."
                },
                {
                    "error_id": "err_verb_be",
                    "incorrect": "I able to swim.",
                    "correction": "I am able to swim.",
                    "explanation": "'Be' fiili (am/is/are/was/were) unutulmamalıdır."
                }
            ],
            "exam_prep": {
                "ielts_tag": "Grammatical Range",
                "tip": "Speaking Part 2 veya Writing Task 1'de sürekli 'can' demek yerine 'was able to' veya 'have been able to' yapılarını kullanmak puanınızı artırır.",
                "keywords": ["capability", "achievement"]
            },
            "gamification": {
                "challenge_type": "gap_fill",
                "question": "Despite the heavy rain, they ___ able to reach the summit.",
                "answer": "were",
                "distractors": ["can", "did", "are"]
            }
        },
        "word_journey": {
            "timeline": [
                { "era": "Latin", "word": "habilis", "meaning": "handy, manageable" },
                { "era": "Old French", "word": "hable/able", "meaning": "capable" },
                { "era": "Modern English", "word": "able", "meaning": "having the power to do" }
            ],
            "turkish_cognate_hint": {
                "word": "Kabiliyet",
                "connection_type": "Conceptual",
                "story": "İngilizce 'capable' ve 'able' kelimeleri ile Türkçedeki 'kabiliyet' (Arapça kökenli olsa da) benzer tını ve anlama sahiptir. Bilimsel (etimolojik) olarak doğrudan akraba değillerdir, ancak anlam mantığı ve ses benzerliği %100 örtüşmektedir.",
                "example": "Bu iki kelime farklı dil ailelerinden gelir, yani 'kardeş' değil, 'benzer giyinen iki yabancı' gibidirler.",
                "example2": "Able / Capable (İngilizce): Kökeni Latince \"Capere\" (tutmak, kavramak, içine almak) fiiline dayanır. Hint-Avrupa dil ailesindendir. (Buradan türeyen diğer kelimeler: Capture, Capacity, Capsule).",
                "example3": "Kabiliyet (Türkçe < Arapça): Kökeni Arapça \"Kabul\" (k-b-l kökü: almak, kabul etmek, önünde olmak) kelimesine dayanır. Hami-Sami dil ailesindendir. (Buradan türeyen kelimeler: Kıble, İkbal, Kabul)."
            }
        },
        "stories": {
            "A1": {
                "tr": "Ben Ela. Birçok şeyi <strong>yapabiliyorum</strong>. Koşabiliyorum ve şarkı söyleyebiliyorum. Ama <strong>uçamıyorum</strong>, bu benim <strong>yetenek</strong>im değil. Öğretmenim bana yardım ediyor. Bu yardım öğrenmemi kolaylaştırıyor. Çok çalışıyorum. Yarın daha iyi <strong>olacağım</strong>.",
                "en": "I am Ela. I <strong>am able</strong> to do many things. I <strong>am able</strong> to run and sing. But I <strong>am unable</strong> to fly, that is not my <strong>ability</strong>. My teacher helps me. This help <strong>enables</strong> my learning. I work hard. Tomorrow I <strong>will be</strong> better."
            },
            "A2": {
                "tr": "Ahmet İngilizce öğreniyor. Dün sınavda bazı soruları <strong>cevaplayamadı</strong>. Çok üzüldü. Ama öğretmeni ona yardım etti. Bu yardım sayesinde daha iyi oldu. Şimdi Ahmet İngilizce <strong>konuşabiliyor</strong>. Onun <strong>yetenek</strong>i arttı. Öğretmeni ona 'Artık kitap <strong>okuyabilirsin</strong>' dedi. Ahmet çok mutlu. Gelecek sınavda tüm soruları <strong>cevaplayabilecek</strong>.",
                "en": "Ahmet is learning English. Yesterday in the exam, he <strong>was unable</strong> to answer some questions. He was sad. But his teacher helped him. This help <strong>enabled</strong> him to improve. Now Ahmet <strong>is able</strong> to speak English. His <strong>ability</strong> increased. His teacher said, 'You <strong>are able</strong> to read a book now.' Ahmet is very happy. In the next exam, he <strong>will be able</strong> to answer all questions."
            },
            "B1": {
                "tr": "Mühendis Can, önemli bir sunum hazırlıyordu. Ancak sunum programı aniden <strong>bozuldu</strong>. Bu sorun onun sunum yapmasını <strong>engelledi</strong>. Can bu sorunu hemen <strong>çözebildi</strong> mi? Evet! Onun hızlı düşünme <strong>yetenek</strong>leri işe yaradı. Teknik bilgisi sorunu çözmesini <strong>mümkün kıldı</strong>. Sunumu zamanında yapmayı <strong>başardı</strong>. Patronu, 'Bu sorunun üstesinden <strong>gelebildiğin</strong> için tebrikler' dedi. Can'ın bu <strong>becerisi</strong> tüm ekibi güçlendirdi.",
                "en": "Engineer Can was preparing an important presentation. However, the presentation software suddenly <strong>became disabled</strong>. This problem <strong>disabled</strong> his presentation. <strong>Was</strong> Can <strong>able</strong> to fix it immediately? Yes! His quick-thinking <strong>abilities</strong> worked. His technical knowledge <strong>enabled</strong> him to solve the problem. He <strong>was able</strong> to present on time. His boss said, 'Congratulations for <strong>being able</strong> to overcome this problem.' Can's <strong>ability</strong> strengthened the whole team."
            },
            "B2": {
                "tr": "Girişimci Deniz, projesi için finansal destek arıyordu. Başlangıçta yatırımcıları <strong>ikna edemedi</strong>. Bu durum projesini <strong>durdurma</strong> tehlikesi yarattı. Ancak pes etmedi ve yeni bir strateji <strong>geliştirmeyi başardı</strong>. Detaylı planı yatırımcıların potansiyeli görmesini <strong>sağladı</strong>. Sonunda gerekli fonu <strong>temin edebildi</strong>. Bu başarı hem kişisel <strong>yetkinliğ</strong>inden hem de azminden kaynaklandı. Şimdi ekibinin yenilik yapmasına <strong>imkan tanıyor</strong>. Gelecekte daha büyük zorlukların üstesinden <strong>gelebilecekler</strong>ine inanıyor.",
                "en": "Entrepreneur Deniz needed financial support for his project. Initially, he <strong>was unable</strong> to persuade investors. This situation created a <strong>disabling</strong> threat to his project. However, he didn't give up and <strong>was able</strong> to develop a new strategy. His detailed plan <strong>enabled</strong> investors to see the potential. Finally, he <strong>was able</strong> to secure the necessary funds. This success came from both his personal <strong>ability</strong> and determination. Now he <strong>is enabling</strong> his team to innovate. He believes they <strong>will be able</strong> to overcome greater challenges in the future."
            },
            "C1": {
                "tr": "Dilbilimci Profesör İdil, yetişkin dil edinimindeki sınırlamaları inceliyordu. Geleneksel görüş, yetişkin beyninin dil inceliklerini öğrenmekten <strong>yoksun</strong> olduğunu savunuyordu. İdil bu <strong>sınırlayıcı</strong> bakış açısını yetersiz buluyordu. Araştırması, bilişsel esnekliği artıran yöntemlerin bu görünürdeki <strong>yetersizliği</strong> nasıl <strong>ortadan kaldırabileceğini</strong> gösterdi. Doğru yaklaşımlar yetişkin öğrencilerin akıcılığa ulaşmalarını <strong>mümkün kılıyor</strong>du. '<strong>Yetenek</strong> statik değil, geliştirilebilir bir kapasitedir' diye savundu. Bir konferansta, 'Eski bir sistemi <strong>devre dışı bırakmak</strong>, daha kapsayıcı yeni sistemler inşa etmemizi <strong>sağlar</strong>' açıklamasını yaptı. Çalışması eğitim yöntemlerini yeniden şekillendirme <strong>potansiyeli</strong> taşıyordu.",
                "en": "Linguist Professor İdil was researching limitations in adult language acquisition. The traditional view claimed the adult brain was inherently <strong>unable</strong> to acquire linguistic subtleties. Idil found this <strong>disabling</strong> perspective inadequate. Her research showed how methods increasing cognitive flexibility could <strong>disable</strong> this apparent <strong>inability</strong>. Correct approaches <strong>enabled</strong> adult learners to achieve fluency. She argued, '<strong>Ability</strong> is not static but an expandable capacity.' At a conference, she stated, '<strong>Disabling</strong> an old system <strong>enables</strong> us to build more inclusive ones.' Her work <strong>had the ability</strong> to reshape educational methodologies."
            },
            "C2": {
                "tr": "Nörobilimci Dr. Alp, travma sonrası rehabilitasyonun sinirsel mekanizmalarını araştırıyordu. Hastası Efe, bir kaza sonrası yürüme <strong>yetisini</strong> kaybetmişti. Alp'ın ekibi, geliştirdikleri nöro-arayüzün beynin hasarlı bölgelerini atlatmasını <strong>sağlayabileceğini</strong> düşünüyordu. Ancak eski sinir yollarını tamamen <strong>devre dışı bırakmak</strong> riskliydi. Temel soru şuydu: Beynin uyum kapasitesi yeni bağlantılar oluşturmasına ne derece <strong>imkan tanıyacaktı</strong>? Terapi ilerledikçe, Efe bacaklarına minimal sinyaller <strong>gönderebildi</strong>. Bu küçük başarı, sistemin işlevselliğini kaybetmeden uyum <strong>sağlayabildiğinin</strong> kanıtıydı. Nihai hedef Efe'nin bağımsız yürüyebilmesini tamamen <strong>mümkün kılmaktı</strong>. Alp şöyle özetledi: '<strong>Yapabilmenin</strong> özü biyolojik bir lütuf değil, nöral plastisitenin ürünüdür. Bir <strong>yetersizliği etkisiz hale getirmek</strong>, mevcut potansiyeli <strong>kullanılabilir kılmaktır</strong>.' Bu çalışma, <strong>yetenek</strong> ve <strong>imkan tanıma</strong> kavramlarının sınırlarını yeniden tanımlıyordu.",
                "en": "Neuroscientist Dr. Alp was studying the neural mechanisms of post-trauma rehabilitation. His patient Efe had lost the <strong>ability</strong> to walk after an accident. Alp's team theorized their neuro-interface <strong>might be able to enable</strong> the brain to bypass damaged areas. However, <strong>to completely disable</strong> the old neural pathways was risky. The fundamental question was: To what extent would the brain's adaptive capacity <strong>enable</strong> it to form new connections? As therapy progressed, Efe <strong>was able</strong> to send minimal signals to his legs. This minor success proved the system <strong>was able</strong> to adapt without <strong>disabling</strong> its functionality. The ultimate goal was <strong>to fully enable</strong> Efe to walk independently. Alp concluded: 'The essence of <strong>being able</strong> is not biological grace but a product of neural plasticity. <strong>To disable a disability is to enable</strong> the existing potential.' This work was redefining the boundaries of <strong>ability</strong> and <strong>enabling</strong>."
            }
        }
    },
    {  // age
        "id": "1002-age", "word": "age",
        "meta": {
            "version": "2.2.0",
            "dictionary_type": "learner_advanced",
            "cefr_level": "A1",
            "frequency_rank": 120,
            "frequency_band": "High Frequency",
            "part_of_speech": "noun / verb"
        },
        "phonetics": {
            "ipa_us": "/eɪdʒ/",
            "ipa_uk": "/eɪdʒ/",
            "audio_us": "/assets/audio/us/age.mp3",
            "audio_uk": "/assets/audio/uk/age.mp3",
            "syllabification": ["age"],
            "stress_data": {
                "pattern": "One Syllable",
                "primary_stress_index": 0
            }
        },
        "definitions": [
            {
                "sense_id": "def_1",
                "core_meaning_en": "the length of time that a person has lived or a thing has existed",
                "core_meaning_tr": "yaş, var olma süresi",
                "context_tags": ["general"],
                "grammar_pattern": "at the age of [number]",
                "example": {
                    "sentence": "He left home at the age of 18.",
                    "translation": "18 yaşında evden ayrıldı."
                }
            },
            {
                "sense_id": "def_2",
                "core_meaning_en": "a particular period of history",
                "core_meaning_tr": "çağ, devir, dönem",
                "context_tags": ["history", "academic"],
                "example": {
                    "sentence": "We live in the digital age.",
                    "translation": "Dijital çağda yaşıyoruz."
                }
            },
            {
                "sense_id": "def_3",
                "core_meaning_en": "to become older",
                "core_meaning_tr": "yaşlanmak, yıllanmak",
                "context_tags": ["verb"],
                "example": {
                    "sentence": "Stress ages you faster.",
                    "translation": "Stres seni daha hızlı yaşlandırır."
                }
            }
        ],
        "grammar_profile": {
            "structures": [
                {
                    "pattern": "at the age of X",
                    "usage_level": "Core",
                    "notes_tr": "Kesin bir yaştan bahsederken kullanılır. Sık yapılan hata: 'in the age of' (yanlış)."
                },
                {
                    "pattern": "act your age",
                    "usage_level": "Intermediate",
                    "notes_tr": "Emir kipi olarak: 'Yaşına göre davran (çocuklaşma)' anlamında."
                },
                {
                    "pattern": "age gracefully",
                    "usage_level": "Advanced",
                    "notes_tr": "Genelde 'iyi yaşlanmak', 'zamanla güzelleşmek' için kullanılan kalıptır."
                }
            ],
            "tense_logic": {
                "why_use_it": "Hem durum (noun) hem de süreç (verb) bildirebilir.",
                "critical_comparison": {
                    "context": "Age vs Grow up",
                    "rule": "'Age' biyolojik yaşlanmayı (hücresel) veya nesnelerin eskimini/yıllanmasını anlatır. 'Grow up' ise çocukluktan yetişkinliğe geçiş (büyümek) anlamındadır.",
                    "example_wrong": "My son is aging fast. (Çocuk büyüyor demek isterken yanlış)",
                    "example_right": "My son is growing up fast. (Doğru)"
                }
            }
        },
        "sentence_progression": {
            "description": "Kelimenin seviyelere göre kullanım karmaşıklığı",
            "levels": [
                {
                    "cefr": "A1",
                    "en": "What is your age?",
                    "tr": "Yaşınız kaç?",
                    "grammar_focus": "Basic Question"
                },
                {
                    "cefr": "A2",
                    "en": "People usually retire at the age of 65.",
                    "tr": "İnsanlar genellikle 65 yaşında emekli olur.",
                    "grammar_focus": "Preposition Phrase (at the age of)"
                },
                {
                    "cefr": "B1",
                    "en": "Wine usually improves as it ages.",
                    "tr": "Şarap genellikle yaşlandıkça (yıllandıkça) güzelleşir.",
                    "grammar_focus": "Verb Usage (aging)"
                },
                {
                    "cefr": "B2",
                    "en": "We are living in an age of rapid technological change.",
                    "tr": "Hızlı bir teknolojik değişim çağında yaşıyoruz.",
                    "grammar_focus": "Abstract Noun Usage (Era/Period)"
                },
                {
                    "cefr": "C1",
                    "en": "His face had aged visibly since the accident.",
                    "tr": "Kazadan beri yüzü gözle görülür şekilde yaşlanmıştı.",
                    "grammar_focus": "Past Perfect + Adverb"
                }
            ]
        },
        "morphology_tree": {
            "root": "aetatem (Latin)",
            "family_members": [
                { "word": "age", "pos": "n/v", "level": "A1", "note": "yaş, çağ; yaşlanmak" },
                { "word": "aged", "pos": "adj", "level": "B1", "note": "yaşlı, ... yaşındaki (middle-aged)" },
                { "word": "aging", "pos": "n/adj", "level": "B2", "note": "yaşlanma, yaşlanan" },
                { "word": "ageless", "pos": "adj", "level": "C1", "suffix": "-less", "note": "yaşsız, ebedi, hiç yaşlanmayan" },
                { "word": "ageism", "pos": "n", "level": "C2", "suffix": "-ism", "note": "yaş ayrımcılığı" }
            ]
        },
        "collocations": {
            "modifiers_adverbs": [
                { "word": "advanced", "strength": "strong", "example": "at an advanced age (ileri yaşta)" },
                { "word": "early", "strength": "neutral", "example": "at an early age (erken yaşta)" },
                { "word": "golden", "strength": "literary", "example": "golden age (altın çağ)" },
                { "word": "middle", "strength": "neutral", "example": "middle age (orta yaş)" }
            ],
            "verbs_preceding": [
                { "word": "reach", "example": "reach the age of 18 (18 yaşına basmak/ulaşmak)" },
                { "word": "look", "example": "look your age (yaşını göstermek)" },
                { "word": "feel", "example": "feel your age (yaşlandığını hissetmek)" }
            ]
        },
        "lexical_nuance": {
            "synonym_scale": {
                "concept": "Time Period / Era",
                "turkishConcept": "Zaman Dilimi / Çağ",
                "scale": [
                    {
                        "word": "period",
                        "value": 2,
                        "turkish": "dönem",
                        "note": "Kısa veya uzun herhangi bir zaman aralığı",
                        "usage": "General: 'a short period of time'",
                        "strength": "Genel"
                    },
                    {
                        "word": "age",
                        "value": 5,
                        "turkish": "çağ",
                        "note": "Belirgin özellikleri olan uzun dönem",
                        "usage": "Historical: 'The Ice Age'",
                        "strength": "Orta"
                    },
                    {
                        "word": "era",
                        "value": 7,
                        "turkish": "devir",
                        "note": "Önemli bir olayla başlayan yeni düzen",
                        "usage": "Grand: 'A new era of peace'",
                        "strength": "Güçlü"
                    },
                    {
                        "word": "epoch",
                        "value": 9,
                        "turkish": "epok, çağ",
                        "note": "Jeolojik veya çok köklü değişim dönemi",
                        "usage": "Scientific: 'The Holocene Epoch'",
                        "strength": "Akademik"
                    }
                ]
            },
            "antonyms": [
                {
                    "word": "youth",
                    "value": 8,
                    "turkish": "gençlik",
                    "note": "Yaşlılığın (old age) zıttı olarak"
                },
                {
                    "word": "childhood",
                    "value": 6,
                    "turkish": "çocukluk",
                    "note": "Yetişkinlik yaşının zıttı"
                }
            ]
        },
        "pragmatics": {
            "idioms_and_phrases": [
                {
                    "phrase": "act your age",
                    "meaning_tr": "yaşına göre davran, çocuk gibi davranma",
                    "register": "informal/command"
                },
                {
                    "phrase": "come of age",
                    "meaning_tr": "reşit olmak, rüştünü ispatlamak",
                    "register": "neutral"
                },
                {
                    "phrase": "age is just a number",
                    "meaning_tr": "yaş sadece bir sayıdır (önemli değildir)",
                    "register": "cliché"
                }
            ],
            "sociolinguistics": {
                "topic": "Politeness",
                "note_en": "In Western cultures, asking a woman's age directly can be considered rude. It's often safer to guess younger or avoid the topic unless necessary.",
                "note_tr": "Batı kültüründe özellikle kadınlara doğrudan yaş sormak kabalık sayılabilir."
            }
        },
        "pedagogy_engine": {
            "common_errors": [
                {
                    "error_id": "err_have_age",
                    "incorrect": "I have 25 years.",
                    "correction": "I am 25 years old.",
                    "explanation": "İspanyolca/Fransızca/Türkçe mantığıyla 'sahip olmak' (have) kullanılmaz, 'olmak' (be) kullanılır."
                },
                {
                    "error_id": "err_noun_adj",
                    "incorrect": "a twenty-years-old man",
                    "correction": "a twenty-year-old man",
                    "explanation": "Sıfat tamlaması yaparken 'year' çoğul eki (-s) almaz."
                }
            ],
            "exam_prep": {
                "ielts_tag": "Vocabulary",
                "tip": "Writing Task 2'de 'old people' yerine 'people of advanced age' veya 'the elderly' kullanmak daha akademik görünür.",
                "keywords": ["elderly", "senior citizens", "adolescent"]
            }
        },
        "word_journey": {
            "timeline": [
                { "era": "Latin", "word": "aetatem", "meaning": "period of life, age" },
                { "era": "Old French", "word": "aage/eage", "meaning": "age, life" },
                { "era": "Middle English", "word": "age", "meaning": "time of life" }
            ],
            "turkish_cognate_hint": {
                "word": "Ebedi / Ezel",
                "connection_type": "Distant Conceptual",
                "story": "İngilizce 'Age' (Çağ/Yaş) kelimesinin kökü Hindu-Avrupa dilindeki *aiw- (hayat gücü, sonsuzluk) köküne gider. Bu kök Latince'de 'aevum' (çağ) olmuştur. Türkçede kullandığımız Arapça kökenli 'Ebedi' (sonsuz) veya 'Ezel' kelimeleriyle ses benzerliği olmasa da, 'çağ/zaman' kavramı ortaktır. Ancak daha akılda kalıcı bir ipucu: 'Age' kelimesini **'Ağaç'** ile kodlayabilirsiniz. Ağaçlar yaş halkalarıyla bilinir; her halka bir 'age' (yaş) gösterir.",
                "example": "Ağaç -> Age (Okunuşu 'eyç', e harfi ağacın tepesi gibi düşünülebilir).",
                "example2": "Age of Empires (İmparatorluklar Çağı) oyununu hatırlayın; her çağ atlamada binalar değişir."
            }
        },
        "stories": {
            "A1": {
                "tr": "Benim adım Ali. Ben 10 <strong>yaşındayım</strong>. Babam 40 <strong>yaşında</strong>. O çok <strong>yaşlı</strong> değil. Bizim evimiz eski. Onun <strong>yaş</strong>ı 100. Ben okulu seviyorum. Okulda benimle aynı <strong>yaş</strong>ta çok arkadaşım var.",
                "en": "My name is Ali. I am 10 years of <strong>age</strong> (old). My father is 40 years of <strong>age</strong>. He is not very <strong>old</strong>. Our house is old. Its <strong>age</strong> is 100. I love school. I have many friends of the same <strong>age</strong> at school."
            },
            "A2": {
                "tr": "Dedemlerin köyünde büyük bir ağaç var. Kimse onun tam <strong>yaşını</strong> bilmiyor. Babam, 'Bu ağaç benimle aynı <strong>yaşta</strong>' diyor. Ama ağaç çok daha büyük görünüyor. Köydeki insanlar uzun zaman önce bu ağacın altında toplanırmış. O zamanlar farklı bir <strong>çağ</strong>dı. Teknoloji yoktu ama insanlar mutluydu.",
                "en": "There is a big tree in my grandfather's village. Nobody knows its exact <strong>age</strong>. My father says, 'This tree is the same <strong>age</strong> as me.' But the tree looks much bigger. People in the village used to gather under this tree long ago. That was a different <strong>age</strong>. There was no technology, but people were happy."
            },
            "B1": {
                "tr": "Orta <strong>yaşa</strong> gelmek ilginç bir deneyim. Annem her zaman '<strong>Yaş</strong> sadece bir sayıdır' der. Ama geçen yıl cildinin <strong>yaşlandığını</strong> fark etmeye başladı. Aynaya baktı ve 'Sanırım yaşlanıyorum' dedi. Ben ona 'Harika görünüyorsun, <strong>yaşlanmak</strong> doğal bir süreç' dedim. Önemli olan kaç yaşında olduğun değil, nasıl hissettiğindir.",
                "en": "Reaching middle <strong>age</strong> is an interesting experience. My mother always says, '<strong>Age</strong> is just a number.' But last year, she started to notice her skin <strong>aging</strong>. She looked in the mirror and said, 'I think I am getting old.' I told her, 'You look great, <strong>aging</strong> is a natural process.' What matters is not what <strong>age</strong> you are, but how you feel."
            },
            "B2": {
                "tr": "Modern tıp sayesinde ortalama yaşam süresi artıyor. Artık insanlar çok ileri bir <strong>yaşa</strong> kadar aktif kalabiliyorlar. Ancak, toplumumuzda hala <strong>yaş ayrımcılığı</strong> var. Bazı şirketler belirli bir <strong>yaşın</strong> üzerindeki insanları işe almak istemiyor. Bu adil değil. Deneyim <strong>yaşla</strong> gelir. <strong>Bilgi çağı</strong>nda, deneyimli insanların bilgeliğine her zamankinden daha çok ihtiyacımız var.",
                "en": "Thanks to modern medicine, life expectancy is increasing. Now people can remain active until a very advanced <strong>age</strong>. However, there is still <strong>ageism</strong> in our society. Some companies do not want to hire people over a certain <strong>age</strong>. This is not fair. Experience comes with <strong>age</strong>. In the <strong>information age</strong>, we need the wisdom of experienced people more than ever."
            },
            "C1": {
                "tr": "Şarap uzmanı, mahzeni gezdirirken yıllanma sürecini anlattı. 'Bu şarap,' dedi, 'meşe fıçılarda zarafetle <strong>yaşlandı</strong>.' Şarabın <strong>yaşlanma</strong> potansiyeli, üzümün kalitesine bağlıdır. Bazı şaraplar gençken içilmelidir, bazıları ise olgunlaşmak için zamana ihtiyaç duyar. Tıpkı insanlar gibi, bazı karakterler zamanla, yani <strong>yaşla</strong> birlikte derinleşir ve karmaşıklaşır. Bu <strong>zamansız</strong> (ageless) bir gerçektir.",
                "en": "The wine expert explained the maturation process while touring the cellar. 'This wine,' he said, 'has <strong>aged</strong> gracefully in oak barrels.' The <strong>aging</strong> potential of a wine depends on the quality of the grape. Some wines should be drunk young, while others need time to mature. Just like people, some characters deepen and become complex with time, that is, with <strong>age</strong>. This is an <strong>ageless</strong> truth."
            },
            "C2": {
                "tr": "Antropoloji profesörü, insanlık tarihini 'Masumiyet <strong>Çağı</strong>' ve 'Deneyim <strong>Çağı</strong>' olarak ikiye ayırdı. Medeniyetimizin teknolojik olarak <strong>reşit olduğunu</strong> (came of age), ancak ahlaki olarak hala emekleme döneminde olduğunu savundu. 'Nükleer <strong>çağ</strong>,' diye uyardı, 'çocukça dürtülerle yönetilemeyecek kadar tehlikeli.' Ona göre, türümüzün hayatta kalması, bilgeliğimizin teknolojimizle aynı hızda <strong>olgunlaşması</strong>na (maturing/aging) bağlıydı. Aksi takdirde, kendi yarattığımız bu <strong>çağın</strong> kurbanı olabiliriz.",
                "en": "The anthropology professor divided human history into the '<strong>Age</strong> of Innocence' and the '<strong>Age</strong> of Experience.' He argued that our civilization technically <strong>came of age</strong>, but morally remains in infancy. 'The nuclear <strong>age</strong>,' he warned, 'is too dangerous to be governed by childish impulses.' According to him, the survival of our species depends on our wisdom <strong>aging</strong> (maturing) at the same pace as our technology. Otherwise, we might become victims of this very <strong>age</strong> we created."
            }
        }
    },
    {  // album
        "id": "1003-album", "word": "album",
        "meta": {
            "version": "2.2.0",
            "dictionary_type": "learner_advanced",
            "cefr_level": "A2",
            "frequency_rank": 850,
            "frequency_band": "High Frequency",
            "part_of_speech": "noun"
        },
        "phonetics": {
            "ipa_us": "/ˈæl.bəm/",
            "ipa_uk": "/ˈæl.bəm/",
            "audio_us": "/assets/audio/us/album.mp3",
            "audio_uk": "/assets/audio/uk/album.mp3",
            "syllabification": ["al", "bum"],
            "stress_data": {
                "pattern": "Trochee (Strong-Weak)",
                "primary_stress_index": 0
            }
        },
        "definitions": [
            {
                "sense_id": "def_1",
                "core_meaning_en": "a collection of music recordings issued as a single item",
                "core_meaning_tr": "müzik albümü",
                "context_tags": ["music", "art"],
                "example": {
                    "sentence": "The band released their debut album yesterday.",
                    "translation": "Grup dün ilk albümünü yayınladı."
                }
            },
            {
                "sense_id": "def_2",
                "core_meaning_en": "a book with blank pages for holding photos, stamps, etc.",
                "core_meaning_tr": "fotoğraf/pul albümü",
                "context_tags": ["memory", "physical"],
                "example": {
                    "sentence": "She showed me her wedding album.",
                    "translation": "Bana düğün albümünü gösterdi."
                }
            }
        ],
        "grammar_profile": {
            "structures": [
                {
                    "pattern": "release/drop an album",
                    "usage_level": "Core",
                    "notes_tr": "Müzik bağlamında en sık kullanılan fiillerdir. 'Drop' daha sokak ağzıdır (slang/informal)."
                },
                {
                    "pattern": "on the album",
                    "usage_level": "Intermediate",
                    "notes_tr": "Bir şarkının albümde olduğunu söylerken 'in' değil 'on' edatı kullanılır. (e.g., 'The best song ON the album')."
                }
            ],
            "tense_logic": {
                "why_use_it": "Sayılabilir (countable) bir isimdir.",
                "critical_comparison": {
                    "context": "Album vs Record",
                    "rule": "'Record' hem tekil şarkı (single) hem de albüm anlamına gelebilir. 'Album' ise her zaman bir koleksiyonu/bütünlüğü ifade eder.",
                    "example_wrong": "I bought a new album featuring just one song. (Genelde yanlış)",
                    "example_right": "I bought a new single. (Doğru)"
                }
            }
        },
        "sentence_progression": {
            "description": "Kelimenin seviyelere göre kullanım karmaşıklığı",
            "levels": [
                {
                    "cefr": "A1",
                    "en": "This is my photo album.",
                    "tr": "Bu benim fotoğraf albümüm.",
                    "grammar_focus": "Demonstrative Pronoun"
                },
                {
                    "cefr": "A2",
                    "en": "I bought a new music album yesterday.",
                    "tr": "Dün yeni bir müzik albümü aldım.",
                    "grammar_focus": "Past Simple"
                },
                {
                    "cefr": "B1",
                    "en": "Have you heard the third track on this album?",
                    "tr": "Bu albümdeki üçüncü parçayı duydun mu?",
                    "grammar_focus": "Present Perfect / Preposition 'on'"
                },
                {
                    "cefr": "B2",
                    "en": "The artist's latest album experiments with jazz influences.",
                    "tr": "Sanatçının son albümü caz etkileşimleri ile deneyler yapıyor.",
                    "grammar_focus": "Subject-Verb Agreement"
                },
                {
                    "cefr": "C1",
                    "en": "Critics praised the album for its cohesive narrative structure.",
                    "tr": "Eleştirmenler, albümü bütünlüklü anlatı yapısı nedeniyle övdü.",
                    "grammar_focus": "Academic vocabulary (cohesive, narrative)"
                }
            ]
        },
        "morphology_tree": {
            "root": "albus (Latin 'White')",
            "family_members": [
                { "word": "album", "pos": "n", "level": "A2", "note": "beyaz tablet -> liste -> albüm" },
                { "word": "albino", "pos": "n/adj", "level": "C1", "note": "renk pigmenti olmayan, beyaz" },
                { "word": "albumen", "pos": "n", "level": "C2", "note": "yumurta akı (beyazı)" },
                { "word": "albedo", "pos": "n", "level": "C2", "note": "yüzeyin ışığı yansıtma gücü (beyazlık derecesi)" }
            ]
        },
        "collocations": {
            "modifiers_adverbs": [
                { "word": "debt", "example": "debut album (ilk çıkış albümü)" },
                { "word": "live", "example": "live album (konser kaydı albümü)" },
                { "word": "compilation", "example": "compilation album (toplama/seçki albüm)" },
                { "word": "solo", "example": "solo album (tek başına yapılan albüm)" }
            ],
            "verbs_preceding": [
                { "word": "release", "example": "release an album (albüm çıkarmak)" },
                { "word": "record", "example": "record an album (albüm kaydetmek)" },
                { "word": "flip through", "example": "flip through an album (albüm sayfalarını çevirmek)" }
            ]
        },
        "lexical_nuance": {
            "synonym_scale": {
                "concept": "Music Collection Formats",
                "turkishConcept": "Müzik Koleksiyon Formatları",
                "scale": [
                    {
                        "word": "single",
                        "value": 2,
                        "turkish": "tekli",
                        "note": "Tek (veya 2) şarkılık çıkış",
                        "usage": "Radio: 'The new single is a hit.'",
                        "strength": "Kısa"
                    },
                    {
                        "word": "EP",
                        "value": 4,
                        "turkish": "kısa çalar",
                        "note": "Extended Play: Albümden kısa, singledan uzun (4-6 şarkı)",
                        "usage": "Indie bands: 'They released a 5-track EP.'",
                        "strength": "Orta"
                    },
                    {
                        "word": "album",
                        "value": 8,
                        "turkish": "albüm",
                        "note": "Tam uzunlukta eser (LP - Long Play)",
                        "usage": "Standard: 'The studio album has 12 tracks.'",
                        "strength": "Tam"
                    },
                    {
                        "word": "discography",
                        "value": 10,
                        "turkish": "diskografi",
                        "note": "Bir sanatçının tüm albümlerinin listesi",
                        "usage": "Career: 'His entire discography.'",
                        "strength": "Bütüncül"
                    }
                ]
            },
            "antonyms": []
        },
        "pragmatics": {
            "idioms_and_phrases": [
                {
                    "phrase": "family album",
                    "meaning_tr": "aile albümü (hatıralar bütünü)",
                    "register": "neutral"
                },
                {
                    "phrase": "difficult second album",
                    "meaning_tr": "ikinci albüm sendromu (ilk başarının ardından gelen baskı)",
                    "register": "music journalism"
                }
            ],
            "sociolinguistics": {
                "topic": "Vinyl Revival",
                "note_en": "Referring to an album as a 'record' or 'LP' (Long Play) has become trendy again due to the resurgence of vinyl, implying a nostalgic or audiophile quality.",
                "note_tr": "Plakların geri dönüşüyle birlikte albümlere 'record' veya 'LP' denmesi (plak formatı kastedilmese bile) havalı/nostaljik bir kullanım oldu."
            }
        },
        "pedagogy_engine": {
            "common_errors": [
                {
                    "error_id": "err_prep_in_on",
                    "incorrect": "My favorite song is in this album.",
                    "correction": "My favorite song is on this album.",
                    "explanation": "Mesafe/yüzey mantığıyla: Şarkılar diskin/kaydın 'üzerine' (on) yazılır."
                }
            ],
            "exam_prep": {
                "ielts_tag": "Arts & Media",
                "tip": "Speaking sınavında müzik zevkiniz sorulursa 'I prefer listening to full albums rather than shuffled playlists' demek, sanat/bütünlük anlayışınızı göstermek için güzel bir cümledir.",
                "keywords": ["tracklist", "cover art", "lyrics"]
            },
            "gamification": {
                "challenge_type": "association",
                "question": "Which word does NOT belong?",
                "answer": "Novel",
                "distractors": ["EP", "Track", "Single", "Novel"]
            }
        },
        "word_journey": {
            "timeline": [
                { "era": "Latin", "word": "albus", "meaning": "white" },
                { "era": "Roman Empire", "word": "album", "meaning": "blank white tablet for notices" },
                { "era": "17th Century", "word": "album", "meaning": "blank book for autographs/collection" },
                { "era": "20th Century", "word": "album", "meaning": "collection of phonograph records" }
            ],
            "turkish_cognate_hint": {
                "word": "Albino / Alp",
                "connection_type": "Direct Root",
                "story": "Latincede 'Albus' (veya 'Alb') BEYAZ demektir. Türkçedeki 'Albino' (beyaz tenli/pigmentsiz) kelimesi buradan gelir. 'Albüm' kelimesi de aslında 'içi boş, BEYAZ sayfalı defter' demektir. Fotoğraflar bu beyazlığın üzerine yapıştırılır. Hatta 'Alpler' (Moutains) isminin bile 'beyaz/karla kaplı dağlar' kökünden geldiği düşünülür.",
                "example": "Albus Dumbledore (Harry Potter) -> İsmi 'Beyaz' demektir, saçı/sakalı ve iyiliği temsil eder.",
                "example2": "Albino -> Bembeyaz."
            }
        },
        "stories": {
            "A1": {
                "tr": "Bu benim evim. Oturma odasında eski bir kitap var. Bu bir fotoğraf <strong>albüm</strong>ü. İçinde ailemin resimleri var. Annem ve babam genç görünüyor. Ben de bebek gibiyim. <strong>Albüm</strong>e bakmayı seviyorum. O beni mutlu ediyor.",
                "en": "This is my house. There is an old book in the living room. It is a photo <strong>album</strong>. There are pictures of my family in it. My mother and father look young. I look like a baby too. I like looking at the <strong>album</strong>. It makes me happy."
            },
            "A2": {
                "tr": "Dün bir müzik mağazasına gittim. En sevdiğim şarkıcı yeni bir <strong>albüm</strong> çıkardı. <strong>Albüm</strong>ün adı 'Mavi Gökyüzü'. İçinde on şarkı var. CD'yi aldım ve eve koştum. Hemen dinledim. <strong>Albüm</strong>deki tüm şarkılar harika.",
                "en": "Yesterday I went to a music store. My favorite singer released a new <strong>album</strong>. The name of the <strong>album</strong> is 'Blue Sky'. There are ten songs in it. I bought the CD and ran home. I listened to it immediately. All the songs <strong>on the album</strong> are great."
            },
            "B1": {
                "tr": "Dijital müzikten önce insanlar fiziksel <strong>albüm</strong>ler biriktirirdi. Babamın büyük bir plak (vinyl) koleksiyonu var. Her bir <strong>albüm</strong>ün güzel bir kapağı var. Hafta sonları bir <strong>albüm</strong> seçer ve baştan sona dinleriz. Şarkıları atlamayız. Bu, sadece bir şarkı dinlemekten farklı bir duygu.",
                "en": "Before digital music, people used to collect physical <strong>albums</strong>. My father has a large vinyl collection. Each <strong>album</strong> has a beautiful cover. On weekends, we choose an <strong>album</strong> and listen to it from start to finish. We don't skip songs. This is a different feeling from just listening to a single song."
            },
            "B2": {
                "tr": "1960'larda Beatles, müzik endüstrisini değiştirdi. Sadece popüler şarkılar (singles) yayınlamak yerine, 'konsept <strong>albüm</strong>' fikrine odaklandılar. Bir <strong>albüm</strong>, birbirine bağlı şarkılardan oluşan bir hikaye gibiydi. 'Sgt. Pepper' buna en iyi örnektir. Sanatçılar <strong>albüm</strong> formatını kullanarak daha derin duygular ifade etmeye başladılar.",
                "en": "In the 1960s, The Beatles changed the music industry. Instead of just releasing popular singles, they focused on the idea of the 'concept <strong>album</strong>'. An <strong>album</strong> was like a story made of connected songs. 'Sgt. Pepper' is the best example of this. Artists started to express deeper emotions using the <strong>album</strong> format."
            },
            "C1": {
                "tr": "Günümüz yayın (streaming) çağında, <strong>albüm</strong> formatının bütünlüğü tehdit altında. Dinleyiciler genellikle seçkiler (playlist) oluşturarak parçaları bağlamından koparıyor. Sanatçılar, dinleyicinin dikkatini 45 dakika boyunca tutacak uyumlu bir <strong>albüm</strong> yaratmakta zorlanıyor. Yine de, birçok eleştirmen <strong>albüm</strong>ün sanatsal ifadenin zirvesi olarak kalması gerektiğini savunuyor; tıpkı bir romanın bölümleri gibi, parçalar bir bütünü oluşturmalı.",
                "en": "In today's streaming era, the integrity of the <strong>album</strong> format is under threat. Listeners often create playlists, tearing tracks out of their context. Artists struggle to create a cohesive <strong>album</strong> that holds the listener's attention for 45 minutes. Nevertheless, many critics argue that the <strong>album</strong> must remain the pinnacle of artistic expression; just like chapters in a novel, the tracks should constitute a whole."
            },
            "C2": {
                "tr": "Dijital parçalanma, '<strong>albüm</strong>ün ölümü' tartışmalarını alevlendirdi. Ancak bu kehanet henüz gerçekleşmedi. Aksine, vinil plakların yeniden dirilişi, somut, dokunsal ve küratörlüğü yapılmış bir deneyime duyulan özlemi kanıtlıyor. Bir <strong>albüm</strong>ü kapağından şarkı sıralamasına kadar bir sanat eseri (artifact) olarak deneyimlemek, algoritma tabanlı tüketimin yüzeyselliğine bir başkaldırıdır. Bu bağlamda <strong>albüm</strong>, sadece bir depolama birimi değil, kültürel bir direnç sembolüdür.",
                "en": "Digital fragmentation has fueled debates about the 'death of the <strong>album</strong>'. However, this prophecy has not yet materialized. On the contrary, the resurrection of vinyl proves the longing for a tangible, tactile, and curated experience. Experiencing an <strong>album</strong> as an artifact, from its cover art to its track sequencing, is a rebellion against the superficiality of algorithm-based consumption. In this context, the <strong>album</strong> is not merely a storage unit, but a symbol of cultural resistance."
            }
        }
    },
    {  // alcohol
        "id": "1004-alcohol", "word": "alcohol",
        "meta": {
            "version": "2.2.0",
            "dictionary_type": "learner_advanced",
            "cefr_level": "B1",
            "frequency_rank": 1500,
            "frequency_band": "Medium Frequency",
            "part_of_speech": "noun"
        },
        "phonetics": {
            "ipa_us": "/ˈæl.kə.hɑːl/",
            "ipa_uk": "/ˈæl.kə.hɒl/",
            "audio_us": "/assets/audio/us/alcohol.mp3",
            "audio_uk": "/assets/audio/uk/alcohol.mp3",
            "syllabification": ["al", "co", "hol"],
            "stress_data": {
                "pattern": "Dactyl (Strong-Weak-Weak)",
                "primary_stress_index": 0
            }
        },
        "definitions": [
            {
                "sense_id": "def_1",
                "core_meaning_en": "drinks such as wine, beer, or spirits",
                "core_meaning_tr": "alkol, alkollü içki",
                "context_tags": ["beverage", "social"],
                "example": {
                    "sentence": "He doesn't drink alcohol for religious reasons.",
                    "translation": "Dini nedenlerle alkol kullanmıyor."
                }
            },
            {
                "sense_id": "def_2",
                "core_meaning_en": "a chemical substance used as fuel or in medicine",
                "core_meaning_tr": "ispirto, etil alkol (kimyasal)",
                "context_tags": ["chemistry", "medical"],
                "example": {
                    "sentence": "Use alcohol to clean the wound.",
                    "translation": "Yarayı temizlemek için alkol kullanın."
                }
            }
        ],
        "grammar_profile": {
            "structures": [
                {
                    "pattern": "uncountable noun",
                    "usage_level": "Core",
                    "notes_tr": "Genellikle sayılamaz (-s almaz). 'Two alcohols' denmez, 'two types of alcohol' denir."
                },
                {
                    "pattern": "alcohol-free",
                    "usage_level": "Intermediate",
                    "notes_tr": "Sıfat olarak: 'alkolsüz' (ör: alcohol-free beer)."
                }
            ],
            "tense_logic": {
                "why_use_it": "Kimyasal madde veya içecek kategorisi olarak.",
                "critical_comparison": {
                    "context": "Alcohol vs Drink/Booze",
                    "rule": "'Alcohol' en resmi ve bilimsel terimdir. 'Drink' genelde 'içki' (sosyal) anlamındadır. 'Booze' ise kaba/argo (zıkkım) anlamındandır.",
                    "example_wrong": "Let's go buy some chemical drinks. (Doğal değil)",
                    "example_right": "Let's go buy some booze. (Argo/Doğal)"
                }
            }
        },
        "sentence_progression": {
            "description": "Kelimenin seviyelere göre kullanım karmaşıklığı",
            "levels": [
                {
                    "cefr": "A1",
                    "en": "No alcohol, please.",
                    "tr": "Alkol olmasın, lütfen.",
                    "grammar_focus": "Imperative / Request"
                },
                {
                    "cefr": "A2",
                    "en": "You must be 18 to buy alcohol.",
                    "tr": "Alkol almak için 18 yaşında olmalısınız.",
                    "grammar_focus": "Modal Verbs (Obligation)"
                },
                {
                    "cefr": "B1",
                    "en": "The doctor advised him to cut down on alcohol.",
                    "tr": "Doktor ona alkolü azaltmasını tavsiye etti.",
                    "grammar_focus": "Phrasal Verb (cut down on)"
                },
                {
                    "cefr": "B2",
                    "en": "Alcohol consumption has decreased among young people.",
                    "tr": "Gençler arasında alkol tüketimi azaldı.",
                    "grammar_focus": "Formal Subject (consumption)"
                },
                {
                    "cefr": "C1",
                    "en": "Excessive alcohol intake impairs cognitive functions.",
                    "tr": "Aşırı alkol alımı bilişsel işlevleri bozar.",
                    "grammar_focus": "Scientific/Academic Register"
                }
            ]
        },
        "morphology_tree": {
            "root": "al-kuhl (Arabic)",
            "family_members": [
                { "word": "alcohol", "pos": "n", "level": "B1", "note": "alkol" },
                { "word": "alcoholic", "pos": "n/adj", "level": "B2", "note": "alkolik, alkol içeren" },
                { "word": "alcoholism", "pos": "n", "level": "C1", "suffix": "-ism", "note": "alkolizm (hastalık)" },
                { "word": "non-alcoholic", "pos": "adj", "level": "B1", "prefix": "non-", "note": "alkolsüz" },
                { "word": "workaholic", "pos": "n", "level": "C1", "note": "işkolik (analoji ile türetilmiş)" }
            ]
        },
        "collocations": {
            "modifiers_adverbs": [
                { "word": "pure", "example": "pure alcohol (saf alkol)" },
                { "word": "strong", "example": "strong alcohol (sert içki)" },
                { "word": "rubbing", "example": "rubbing alcohol (ispirto/pansuman alkolü)" }
            ],
            "verbs_preceding": [
                { "word": "consume", "example": "consume alcohol (alkol tüketmek)" },
                { "word": "abuse", "example": "abuse alcohol (alkolü kötüye kullanmak)" },
                { "word": "avoid", "example": "avoid alcohol (alkolden kaçınmak)" }
            ]
        },
        "lexical_nuance": {
            "synonym_scale": {
                "concept": "Intoxicating Beverages",
                "turkishConcept": "Keyif Verici İçecekler",
                "scale": [
                    {
                        "word": "drink",
                        "value": 3,
                        "turkish": "içki",
                        "note": "En genel tabir: 'Do you want a drink?'",
                        "strength": "Nötr"
                    },
                    {
                        "word": "alcohol",
                        "value": 5,
                        "turkish": "alkol",
                        "note": "Madde veya kategori adı, biraz resmi",
                        "strength": "Resmi"
                    },
                    {
                        "word": "liquor",
                        "value": 7,
                        "turkish": "sert içki",
                        "note": "Viski, votka gibi yüksek alkollü içecekler (ABD)",
                        "strength": "Spesifik"
                    },
                    {
                        "word": "spirits",
                        "value": 8,
                        "turkish": "ispirto / sert içki",
                        "note": "Damıtılmış içkiler için teknik/İngiliz terimi",
                        "strength": "Teknik"
                    },
                    {
                        "word": "booze",
                        "value": 2,
                        "turkish": "zıkkım / içki",
                        "note": "Argo kullanım",
                        "strength": "Argo"
                    }
                ]
            },
            "antonyms": [
                {
                    "word": "sobriety",
                    "value": 10,
                    "turkish": "ayıklık",
                    "note": "Alkol almama durumu"
                },
                {
                    "word": "teetotalism",
                    "value": 9,
                    "turkish": "yeşilaycılık",
                    "note": "Hiç içki içmeme prensibi"
                }
            ]
        },
        "pragmatics": {
            "idioms_and_phrases": [
                {
                    "phrase": "Dutch courage",
                    "meaning_tr": "içkiden gelen (sahte) cesaret",
                    "register": "idiomatic"
                },
                {
                    "phrase": "hold one's liquor",
                    "meaning_tr": "içkiye dayanıklı olmak, sarhoş belli etmemek",
                    "register": "informal"
                },
                {
                    "phrase": "hair of the dog",
                    "meaning_tr": "çivi çiviyi söker (akşamdan kalmalığa karşı sabah içilen içki)",
                    "register": "idiomatic"
                }
            ],
            "sociolinguistics": {
                "topic": "Social Drinking",
                "note_en": "In many cultures, refusing a drink can be socially awkward. Phrases like 'I'm driving' or 'I have an early start' are polite excuses.",
                "note_tr": "İçki ikramını reddederken sebep belirtmek (araba kullanıyorum vb.) kibarlık kuralıdır."
            }
        },
        "pedagogy_engine": {
            "common_errors": [
                {
                    "error_id": "err_plural_s",
                    "incorrect": "They sell many alcohols.",
                    "correction": "They sell many types of alcohol.",
                    "explanation": "Alkol kütle ismidir (uncountable), -s çoğul eki almaz."
                }
            ],
            "exam_prep": {
                "ielts_tag": "Health & Society",
                "tip": "Essay yazarken 'drinking' yerine 'alcohol consumption' veya 'substance abuse' demek daha akademik puan getirir.",
                "keywords": ["addiction", "rehabilitation", "social impact"]
            },
            "gamification": {
                "challenge_type": "true_false",
                "question": "Alcohol acts as a stimulant on the central nervous system.",
                "answer": "False",
                "explanation": "Yanlış. Alkol teknik olarak bir 'Depressant' (baskılayıcı/yavaşlatıcı) maddedir, uyarıcı değildir."
            }
        },
        "word_journey": {
            "timeline": [
                { "era": "Arabic", "word": "al-kuhl", "meaning": "fine powder for eyeliner (sürme)" },
                { "era": "Medieval Latin", "word": "alcohol", "meaning": "fine powder -> distilled essence" },
                { "era": "18th Century", "word": "alcohol", "meaning": "intoxicating ingredient in liquor" }
            ],
            "turkish_cognate_hint": {
                "word": "Alkol",
                "connection_type": "Direct Loan",
                "story": "Kelimenin aslı Arapça 'El-Kuhl'dür (Göz sürmesi). Simyacılar, bir katının ısıtılıp gaz haline geçmesine (süblimleşme) ve sonra tekrar yoğunlaşmasına 'ruhu (özü) ortaya çıkarma' dediler. Göz sürmesi de çok ince bir toz olduğu için, damıtılmış şaraptan elde edilen o saf sıvıya da 'şarabın özü/tozu' mantığıyla 'Alkol' dediler. Türkçedeki 'Alkol' kelimesi de buradan gelir.",
                "example": "Spirit (Ruh) kelimesinin hem 'hayalet' hem de 'ispirto/içki' anlamına gelmesi bu simya geleneğindendir.",
                "example2": "Kohl (Sürme) kelimesi kozmetikte hala kullanılır."
            }
        },
        "stories": {
            "A1": {
                "tr": "Partideyiz. Masada çok içecek var. Meyve suyu, su ve kola var. Ayrıca <strong>alkol</strong> de var. Ben <strong>alkol</strong> sevmem. Tadı acı. Portakal suyu içiyorum. Arkadaşım bira içiyor.",
                "en": "We are at a party. There are many drinks on the table. There is juice, water, and cola. There is also <strong>alcohol</strong>. I do not like <strong>alcohol</strong>. It tastes bitter. I am drinking orange juice. My friend is drinking beer."
            },
            "A2": {
                "tr": "Polis arabamı durdurdu. Bana '<strong>Alkol</strong> içtin mi?' diye sordu. 'Hayır memur bey,' dedim. 'Sadece su içtim.' Polis bana inandı ama test yaptı. Test sonucu temiz çıktı. Araba kullanırken asla <strong>alkol</strong> almam. Bu çok tehlikeli.",
                "en": "The police stopped my car. He asked me, 'Did you drink <strong>alcohol</strong>?' I said, 'No officer. I only drank water.' The police believed me but did a test. The test result was clean. I never drink <strong>alcohol</strong> while driving. It is very dangerous."
            },
            "B1": {
                "tr": "Hastanede hemşire kolumu temizledi. Pamukta keskin bir koku vardı. Bu <strong>ispirto</strong> (birtür alkol) kokusuydu. 'Bu biraz yakabilir,' dedi. <strong>Alkol</strong> yaradaki mikropları öldürür. İğneden korkuyordum ama acımadı. Tıbbi <strong>alkol</strong> içmek için değildir, sadece temizlik içindir.",
                "en": "At the hospital, the nurse cleaned my arm. There was a sharp smell on the cotton. It was the smell of <strong>rubbing alcohol</strong>. 'This might sting a little,' she said. <strong>Alcohol</strong> kills germs in the wound. I was afraid of the needle, but it didn't hurt. Medical <strong>alcohol</strong> is not for drinking, it is only for cleaning."
            },
            "B2": {
                "tr": "Üniversitede sosyal hayat genellikle partiler etrafında döner. Ancak oda arkadaşım bir 'yeşilaycı' (teetotaler). Yani hiç <strong>alkol</strong> kullanmıyor. İlk başta partilerde sıkılacağını düşündüm. Ama yanılmışım. O, <strong>alkol</strong> olmadan da eğlenmeyi biliyor. Hatta sabahları akşamdan kalma (hangover) olmadığı için bizden daha enerjik oluyor.",
                "en": "In college, social life often revolves around parties. However, my roommate is a teetotaler. That means he doesn't consume any <strong>alcohol</strong>. At first, I thought he would be bored at parties. But I was wrong. He knows how to have fun without <strong>alcohol</strong>. In fact, since he doesn't get hangovers, he is more energetic than us in the mornings."
            },
            "C1": {
                "tr": "Yasak Dönemi'nde (Prohibition Era), hükümet <strong>alkol</strong> satışını yasadışı ilan etti. Amaç suçu azaltmaktı, ama tam tersi oldu. İnsanlar gizli barlarda (speakeasies) kalitesiz ve tehlikeli içkiler üretmeye başladılar. Bu dönem bize şunu öğretti: Bir maddeyi yasaklamak, ona olan talebi yok etmez, sadece yeraltına iter. <strong>Alkol</strong>, insanlık tarihi kadar eski, karmaşık bir sosyal fenomendir.",
                "en": "During the Prohibition Era, the government declared the sale of <strong>alcohol</strong> illegal. The aim was to reduce crime, but the opposite happened. People started producing poor quality and dangerous drinks in speakeasies. This era taught us: Banning a substance does not eliminate the demand, it just pushes it underground. <strong>Alcohol</strong> is a complex social phenomenon as old as human history."
            },
            "C2": {
                "tr": "Biyokimyasal açıdan <strong>alkol</strong> (etanol), merkezi sinir sistemi üzerinde baskılayıcı bir etkiye sahiptir. İlk başta dopamin salınımını tetikleyerek bir öfori (neşe) hissi yaratsa da, aslında beyin fonksiyonlarını yavaşlatır. Kronik maruziyet, karaciğerin metabolize etme kapasitesini aşarak siroza yol açabilir. Toplumun <strong>alkol</strong> ile olan bu çalkantılı ilişkisi, hem kutlamaların neşesi hem de bağımlılığın trajedisi arasındaki ince çizgide yürür.",
                "en": "Biochemically, <strong>alcohol</strong> (ethanol) has a depressant effect on the central nervous system. Although it initially triggers dopamine release creating a sense of euphoria, it actually slows down brain functions. Chronic exposure can overwhelm the liver's metabolizing capacity, leading to cirrhosis. Society's turbulent relationship with <strong>alcohol</strong> walks a fine line between the joy of celebration and the tragedy of addiction."
            }
        }
    },
    {  // all right
        "id": "1005-all-right", "word": "all right",
        "meta": {
            "version": "2.2.0",
            "dictionary_type": "learner_advanced",
            "cefr_level": "A1",
            "frequency_rank": 300,
            "frequency_band": "High Frequency",
            "part_of_speech": "adj / adv / interjection"
        },
        "phonetics": {
            "ipa_us": "/ˌɑːl ˈraɪt/",
            "ipa_uk": "/ˌɔːl ˈraɪt/",
            "audio_us": "/assets/audio/us/all-right.mp3",
            "audio_uk": "/assets/audio/uk/all-right.mp3",
            "syllabification": ["all", "right"],
            "stress_data": {
                "pattern": "Spondee (Equal Stress)",
                "primary_stress_index": 1
            }
        },
        "definitions": [
            {
                "sense_id": "def_1",
                "core_meaning_en": "satisfactory, safe, or well",
                "core_meaning_tr": "iyi, yolunda, sorunsuz",
                "context_tags": ["state", "health"],
                "example": {
                    "sentence": "Is everything all right?",
                    "translation": "Her şey yolunda mı?"
                }
            },
            {
                "sense_id": "def_2",
                "core_meaning_en": "used to ask someone or agree to a suggestion",
                "core_meaning_tr": "tamam, pekala, olur",
                "context_tags": ["agreement", "discourse"],
                "example": {
                    "sentence": "'Let's go.' 'All right.'",
                    "translation": "'Gidelim.' 'Tamam/Olur.'"
                }
            }
        ],
        "grammar_profile": {
            "structures": [
                {
                    "pattern": "predicate adjective",
                    "usage_level": "Core",
                    "notes_tr": "Genellikle 'be' fiilinden sonra gelir (The car is all right). İsimden önce (attributive) pek kullanılmaz ('an all right car' nadirdir)."
                },
                {
                    "pattern": "discourse marker",
                    "usage_level": "Intermediate",
                    "notes_tr": "Konuşmada yeni bir konuya geçerken 'Pekala...' anlamında cümlenin başında kullanılır (All right, let's start)."
                }
            ],
            "tense_logic": {
                "why_use_it": "Durum bildirmek veya onay vermek için.",
                "critical_comparison": {
                    "context": "All right vs Alright",
                    "rule": "'All right' (iki kelime) tek resmi ve doğru kabul edilen yazılıştır. 'Alright' (bitişik) çok yaygın olsa da resmiyette (akademik/iş) hala yanlış veya gayriresmi kabul edilir.",
                    "example_wrong": "The essay was alright. (Akademik olarak eksi puan alır)",
                    "example_right": "The essay was all right. (Doğru)"
                }
            }
        },
        "sentence_progression": {
            "description": "Kelimenin seviyelere göre kullanım karmaşıklığı",
            "levels": [
                {
                    "cefr": "A1",
                    "en": "I am all right, thank you.",
                    "tr": "İyiyim, teşekkür ederim.",
                    "grammar_focus": "Subject + Be + Adjective"
                },
                {
                    "cefr": "A2",
                    "en": "Everything will be all right.",
                    "tr": "Her şey yoluna girecek (iyi olacak).",
                    "grammar_focus": "Future Simple (Prediction)"
                },
                {
                    "cefr": "B1",
                    "en": "Did you get home all right last night?",
                    "tr": "Dün gece eve sağ salim (sorunsuz) vardın mı?",
                    "grammar_focus": "Adverbial Usage"
                },
                {
                    "cefr": "B2",
                    "en": "All right, I admit I was wrong.",
                    "tr": "Pekala, haksız olduğumu kabul ediyorum.",
                    "grammar_focus": "Discourse Marker (Concession)"
                },
                {
                    "cefr": "C1",
                    "en": "The performance was strictly all right, nothing spectacular.",
                    "tr": "Performans sadece 'eh işte' (vasat) idi, muhteşem bir şey değildi.",
                    "grammar_focus": "Nuance describing mediocrity"
                }
            ]
        },
        "morphology_tree": {
            "root": "eall + riht (Old English)",
            "family_members": [
                { "word": "all right", "pos": "adj/adv", "level": "A1", "note": "tamamen doğru -> tamam/iyi" },
                { "word": "right", "pos": "adj", "level": "A1", "note": "doğru, haklı" },
                { "word": "all", "pos": "det", "level": "A1", "note": "bütün, hepsi" },
                { "word": "alright", "pos": "adj/adv", "level": "A2", "note": "gayriresmi yazılış (günlük kullanım)" }
            ]
        },
        "collocations": {
            "modifiers_adverbs": [
                { "word": "quite", "example": "quite all right (gayet iyi/uygun)" },
                { "word": "perfectly", "example": "perfectly all right (tamamen uygun/sorunsuz)" }
            ],
            "verbs_preceding": [
                { "word": "turn out", "example": "turn out all right (sonunda iyiye bağlanmak/sonuçlanmak)" },
                { "word": "feel", "example": "feel all right (iyi hissetmek)" },
                { "word": "seem", "example": "seem all right (iyi/düzgün görünmek)" }
            ]
        },
        "lexical_nuance": {
            "synonym_scale": {
                "concept": "Wellness/Satisfaction",
                "turkishConcept": "İyilik/Memnuniyet Durumu",
                "scale": [
                    {
                        "word": "great",
                        "value": 10,
                        "turkish": "harika",
                        "strength": "Duygusal Pik"
                    },
                    {
                        "word": "fine",
                        "value": 6,
                        "turkish": "iyi/hoş",
                        "note": "Standart iyi",
                        "strength": "Pozitif"
                    },
                    {
                        "word": "all right",
                        "value": 5,
                        "turkish": "iyi/idare eder",
                        "note": "'Kötü değil' anlamında nötr bir iyilik.",
                        "strength": "Nötr-Pozitif"
                    },
                    {
                        "word": "okay",
                        "value": 5,
                        "turkish": "tamam",
                        "note": "Benzer anlam, daha informel",
                        "strength": "Nötr"
                    },
                    {
                        "word": "so-so",
                        "value": 3,
                        "turkish": "şöyle böyle",
                        "strength": "Nötr-Negatif"
                    }
                ]
            },
            "antonyms": [
                {
                    "word": "wrong",
                    "value": 1,
                    "turkish": "yanlış/ters",
                    "note": "'Something is wrong' (Bir terslik var)"
                },
                {
                    "word": "unwell",
                    "value": 2,
                    "turkish": "rahatsız/hasta"
                }
            ]
        },
        "pragmatics": {
            "idioms_and_phrases": [
                {
                    "phrase": "Are you all right?",
                    "meaning_tr": "İyi misin? (İngiltere'de bazen sadece 'Naber?' anlamında selamlaşmadır)",
                    "register": "British English"
                },
                {
                    "phrase": "It will be all right on the night",
                    "meaning_tr": "Son ana kadar sorun çıksa da, gösteri zamanı her şey düzelir",
                    "register": "Theatrical idiom"
                }
            ],
            "sociolinguistics": {
                "topic": "Refusal Politeness",
                "note_en": "Saying 'That's all right' is a polite way to accept an apology or refuse an offer gently.",
                "note_tr": "Bir özrü kabul ederken 'That's all right' (Sorun değil) demek çok yaygındır."
            }
        },
        "pedagogy_engine": {
            "common_errors": [
                {
                    "error_id": "err_spelling_alright",
                    "incorrect": "The movie was alright.",
                    "correction": "The movie was all right.",
                    "explanation": "'Alright' yazımı mesajlaşmada kabul görse de, sınavlarda ve resmi yazılarda hala hata sayılır."
                }
            ],
            "exam_prep": {
                "ielts_tag": "Listening Section",
                "tip": "Dinleme sınavında konuşmacı bir konuyu kapatıp diğerine geçerken ses tonunu yükseltip 'All right...' der. Bu bir 'işaret'tir (signpost), yeni konuya geçildiğini haber verir.",
                "keywords": ["signposting", "transition"]
            },
            "gamification": {
                "challenge_type": "multiple_choice",
                "question": "Which sentence implies the food was just acceptable, not great?",
                "answer": "The food was all right.",
                "distractors": ["The food was delicious.", "The food was terrible.", "The food was amazing."]
            }
        },
        "word_journey": {
            "timeline": [
                { "era": "Old English", "word": "eall riht", "meaning": "completely just/correct" },
                { "era": "Middle English", "word": "al right", "meaning": "properly, safely" },
                { "era": "19th Century", "word": "alright", "meaning": "disputed spelling emerges (analogy to already)" }
            ],
            "turkish_cognate_hint": {
                "word": "Ray / Rasyonel",
                "connection_type": "Distant Conceptual",
                "story": "'Right' (doğru/sağ) kelimesi Hint-Avrupa *reg- (düz gitmek, yönetmek) kökünden gelir. Türkçedeki 'Ray' (tren rayı, düz çizgi) veya 'Rasyonel' (akılcı/doğru) kelimeleriyle uzaktan akrabadır. 'All Right' demek, her şeyin 'rayında' olması, düzgün gitmesi demektir.",
                "example": "All right -> Her şey rayında."
            }
        },
        "stories": {
            "A1": {
                "tr": "Ali parkta düştü. Ben koştum. 'İyi misin?' diye sordum. Ali kalktı. Üstünü temizledi. 'Evet, ben <strong>iyiyim</strong> (all right)' dedi. Biz oyun oynamaya devam ettik. Her şey <strong>yolunda</strong>ydı.",
                "en": "Ali fell in the park. I ran. 'Are you <strong>all right</strong>?' I asked. Ali got up. He cleaned his clothes. 'Yes, I am <strong>all right</strong>,' he said. We continued to play. Everything was <strong>all right</strong>."
            },
            "A2": {
                "tr": "Öğretmenim, 'Ödevini yaptın mı?' diye sordu. Ben, 'Üzgünüm, unuttum' dedim. Öğretmen gülümsedi. '<strong>Sorun değil</strong> (That's all right), yarın getirirsin' dedi. Çok mutlu oldum. '<strong>Tamam</strong> (All right), söz veriyorum' dedim.",
                "en": "My teacher asked, 'Did you do your homework?' I said, 'Sorry, I forgot.' The teacher smiled. 'That is <strong>all right</strong>, bring it tomorrow,' she said. I was very happy. '<strong>All right</strong>, I promise,' I said."
            },
            "B1": {
                "tr": "Dün geceki fırtına çok korkutucuydu. Elektrikler kesildi. Annemi aradım, ulaşamadım. Çok endişelendim. Sabah olunca nihayet telefonu açtı. 'Merak etme, biz <strong>iyiyiz</strong> (all right)' dedi. O cümleyi duymak beni rahatlattı. Sonunda her şeyin <strong>yoluna girdiğini</strong> bilmek güzeldi.",
                "en": "The storm last night was very scary. The electricity went out. I called my mom but couldn't reach her. I was very worried. In the morning, she finally answered. 'Don't worry, we are <strong>all right</strong>,' she said. Hearing that sentence relieved me. It was good to know that everything turned out <strong>all right</strong>."
            },
            "B2": {
                "tr": "Bir iş görüşmesindeydim. Görüşme biraz gergin başladı. Sonra, '<strong>Pekala</strong> (All right), şimdi deneyimlerinizden konuşalım' dedi müdür. Bu ifade (all right), konuşmanın resmiyet seviyesini düşürdü ve daha rahat bir aşamaya geçtiğimizi işaret etti. Görüşmenin geri kalanı gayet <strong>iyi</strong> (all right) geçti, ne harikaydı ne de kötü.",
                "en": "I was at a job interview. It started a bit tense. Then, '<strong>All right</strong>, let's talk about your experience now,' said the manager. This phrase signaled a shift to a more comfortable stage. The rest of the interview went quite <strong>all right</strong>; it wasn't amazing, but not bad either."
            },
            "C1": {
                "tr": "Dilbilimciler arasında 'alright' kelimesinin yazımı üzerine bitmeyen bir tartışma vardır. Gelenekselciler bunun tembel bir yazım hatası olduğunu savunur. Ancak, 'already' ve 'altogether' gibi kelimelerin dilde kabul görmesi, 'alright'ın da zamanla meşrulaşacağının sinyalini veriyor. Yazar, 'Eğer anlam açıksa, yazım biçimi <strong>sorun olmamalı</strong> (should be all right)' diyerek betimleyici (descriptive) bir tavır takındı.",
                "en": "There is an endless debate among linguists regarding the spelling of 'alright'. Traditionalists argue it is a lazy spelling error. However, the acceptance of words like 'already' and 'altogether' signals that 'alright' will also be legitimized in time. The author took a descriptive stance, implying that 'If the meaning is clear, the spelling should be <strong>all right</strong>.'"
            },
            "C2": {
                "tr": "Varoluşsal bir krizin ortasında, insan her şeyin kaotik olduğunu düşünme eğilimindedir. Ancak Stoacı felsefe, evrenin doğası gereği mükemmel ve <strong>yerli yerinde</strong> (all right) olduğunu savunur. Olanı olduğu gibi kabul etmek, 'her şey <strong>yolunda</strong>' diyebilen bir zihin yapısına ulaşmaktır. Bu, pasif bir boyun eğme değil, kozmik düzene (Order) aktif bir uyumdur. Bob Marley'in dediği gibi: 'Her küçük şey <strong>yoluna girecek</strong>.'",
                "en": "In the midst of an existential crisis, one tends to think everything is chaotic. However, Stoic philosophy argues that the universe is inherently perfect and <strong>all right</strong>. Accepting what is, implies reaching a mindset that can say 'everything is <strong>all right</strong>.' This is not passive submission, but active attunement to the cosmic Order. As Bob Marley said: 'Every little thing is gonna be <strong>all right</strong>.'"
            }
        }
    },
    {  // alphabet
        "id": "1006-alphabet", "word": "alphabet",
        "meta": {
            "version": "2.2.0",
            "dictionary_type": "learner_advanced",
            "cefr_level": "A2",
            "frequency_rank": 2000,
            "frequency_band": "Medium Frequency",
            "part_of_speech": "noun"
        },
        "phonetics": {
            "ipa_us": "/ˈæl.fə.bet/",
            "ipa_uk": "/ˈæl.fə.bet/",
            "audio_us": "/assets/audio/us/alphabet.mp3",
            "audio_uk": "/assets/audio/uk/alphabet.mp3",
            "syllabification": ["al", "pha", "bet"],
            "stress_data": {
                "pattern": "Dactyl (Strong-Weak-Weak)",
                "primary_stress_index": 0
            }
        },
        "definitions": [
            {
                "sense_id": "def_1",
                "core_meaning_en": "a set of letters arranged in a fixed order",
                "core_meaning_tr": "alfabe, abece",
                "context_tags": ["language", "writing"],
                "example": {
                    "sentence": "The English alphabet has 26 letters.",
                    "translation": "İngiliz alfabesinde 26 harf vardır."
                }
            },
            {
                "sense_id": "def_2",
                "core_meaning_en": "the basic elements of any subject (rudiments)",
                "core_meaning_tr": "temel ilkeler, alfabe (mecazi)",
                "context_tags": ["figurative"],
                "example": {
                    "sentence": "The alphabet of genetics.",
                    "translation": "Genetiğin alfabesi (temelleri)."
                }
            }
        ],
        "grammar_profile": {
            "structures": [
                {
                    "pattern": "in alphabetical order",
                    "usage_level": "Core",
                    "notes_tr": "En sık kullanılan kalıptır: 'Alfabetik sırayla' (e.g., The books are arranged in alphabetical order)."
                },
                {
                    "pattern": "the [Language] alphabet",
                    "usage_level": "Intermediate",
                    "notes_tr": "Belirli bir dilin alfabesinden bahsederken 'the' kullanılır (the Greek alphabet)."
                }
            ],
            "tense_logic": {
                "why_use_it": "Bir sistem veya sıralama bütünü olarak.",
                "critical_comparison": {
                    "context": "Alphabet vs Letter",
                    "rule": "'Letter' tek bir harftir (A, B, C). 'Alphabet' ise bu harflerin oluşturduğu setin tamamıdır.",
                    "example_wrong": "I learned the alphabets A and B. (Yanlış - harfler öğrenilir, alfabe bir bütündür)",
                    "example_right": "I learned the letters A and B. (Doğru)"
                }
            }
        },
        "sentence_progression": {
            "description": "Kelimenin seviyelere göre kullanım karmaşıklığı",
            "levels": [
                {
                    "cefr": "A1",
                    "en": "A is the first letter of the alphabet.",
                    "tr": "A, alfabenin ilk harfidir.",
                    "grammar_focus": "Superlative (first)"
                },
                {
                    "cefr": "A2",
                    "en": "Can you say the alphabet backwards?",
                    "tr": "Alfabeyi tersten sayabilir misin?",
                    "grammar_focus": "Adverb (backwards)"
                },
                {
                    "cefr": "B1",
                    "en": "Please arrange these files in alphabetical order.",
                    "tr": "Lütfen bu dosyaları alfabetik sıraya göre düzenleyin.",
                    "grammar_focus": "Imperative + Collocation"
                },
                {
                    "cefr": "B2",
                    "en": "The Cyrillic alphabet is used in Russia and Bulgaria.",
                    "tr": "Kiril alfabesi Rusya ve Bulgaristan'da kullanılır.",
                    "grammar_focus": "Passive Voice"
                },
                {
                    "cefr": "C1",
                    "en": "The phonetic alphabet is crucial for clear communication in aviation.",
                    "tr": "Fonetik alfabe, havacılıkta net iletişim için hayati önem taşır.",
                    "grammar_focus": "Specific Terminology"
                }
            ]
        },
        "morphology_tree": {
            "root": "Alpha + Beta (Greek)",
            "family_members": [
                { "word": "alphabet", "pos": "n", "level": "A2", "note": "alfabe" },
                { "word": "alphabetical", "pos": "adj", "level": "B1", "suffix": "-ical", "note": "alfabetik, abecesel" },
                { "word": "alphabetize", "pos": "v", "level": "C1", "suffix": "-ize", "note": "alfabetik sıraya koymak" },
                { "word": "literacy", "pos": "n", "level": "B2", "note": "okuryazarlık (alfabe bilgisi)" }
            ]
        },
        "collocations": {
            "modifiers_adverbs": [
                { "word": "phonetic", "example": "phonetic alphabet (sesçil alfabe)" },
                { "word": "Latin/Roman", "example": "Latin alphabet (Latin alfabesi)" },
                { "word": "Cyrillic", "example": "Cyrillic alphabet (Kiril alfabesi)" }
            ],
            "verbs_preceding": [
                { "word": "recite", "example": "recite the alphabet (alfabeyi ezbere okumak)" },
                { "word": "learn", "example": "learn the alphabet (okuma yazma öğrenmek)" },
                { "word": "invent", "example": "invent an alphabet (alfabe icat etmek)" }
            ]
        },
        "lexical_nuance": {
            "synonym_scale": {
                "concept": "Writing Systems",
                "turkishConcept": "Yazı Sistemleri",
                "scale": [
                    {
                        "word": "alphabet",
                        "value": 5,
                        "turkish": "alfabe",
                        "note": "Sesleri temsil eden harfler sistemi (A, B, C)",
                        "strength": "Ses Odaklı"
                    },
                    {
                        "word": "script",
                        "value": 6,
                        "turkish": "yazı sistemi/alfabe",
                        "note": "Genel yazı karakteri türü (Arabic script, Devanagari script)",
                        "strength": "Teknik"
                    },
                    {
                        "word": "hieroglyph",
                        "value": 8,
                        "turkish": "hiyeroglif",
                        "note": "Resim yazısı (harf değil sembol)",
                        "strength": "Tarihi"
                    },
                    {
                        "word": "character set",
                        "value": 9,
                        "turkish": "karakter seti",
                        "note": "Dijital ortamda tüm semboller (ASCII, Unicode)",
                        "strength": "Dijital"
                    }
                ]
            },
            "antonyms": [
                {
                    "word": "illiteracy",
                    "value": 1,
                    "turkish": "okuma yazma bilmeme",
                    "note": "Alfabeye hakim olmama durumu"
                }
            ]
        },
        "pragmatics": {
            "idioms_and_phrases": [
                {
                    "phrase": "alphabet soup",
                    "meaning_tr": "kısaltmalar çorbası (çok fazla kısaltma içeren karışık metin/durum)",
                    "register": "informal/humorous"
                },
                {
                    "phrase": "the ABCs of something",
                    "meaning_tr": "bir işin alfabesi (temel kuralları)",
                    "register": "idiomatic"
                }
            ],
            "sociolinguistics": {
                "topic": "NATO Phonetic Alphabet",
                "note_en": "In phone calls or radio comms, distinct words are used for letters to avoid confusion (Alpha, Bravo, Charlie, Delta...). Essential for spelling names.",
                "note_tr": "Telefonda kodlama yaparken karışıklığı önlemek için kullanılır (Ankara'nın A'sı yerine Alpha, Bravo...)."
            }
        },
        "pedagogy_engine": {
            "common_errors": [
                {
                    "error_id": "err_plural_count",
                    "incorrect": "English contains 26 alphabets.",
                    "correction": "English contains 26 letters.",
                    "explanation": "İngilizcede 1 alfabe (set), 26 harf (parça) vardır. 'Alphabets' derseniz birden fazla dil sistemi (Yunan, Latin, Arap vb.) kastedersiniz."
                }
            ],
            "exam_prep": {
                "ielts_tag": "Linguistics",
                "tip": "Reading parçalarında 'literacy rate' (okuryazarlık oranı) konusu geçtiğinde 'alphabet equivalent' veya 'script' kelimelerine dikkat edin.",
                "keywords": ["phoneme", "grapheme", "transliteration"]
            },
            "gamification": {
                "challenge_type": "sequence",
                "question": "Arrange correctly: Alpha, Charlie, ____, Delta",
                "answer": "Bravo",
                "distractors": ["Beta", "Bingo", "Blue"]
            }
        },
        "word_journey": {
            "timeline": [
                { "era": "Phoenician", "word": "Aleph+Beth", "meaning": "ox + house (first two letters)" },
                { "era": "Greek", "word": "Alpha+Beta", "meaning": "first two letters of Greek alphabet" },
                { "era": "Latin", "word": "alphabetum", "meaning": "list of letters" }
            ],
            "turkish_cognate_hint": {
                "word": "Alfabe",
                "connection_type": "Direct Loan",
                "story": "Türkçedeki 'Alfabe' ile İngilizce 'Alphabet' %100 aynı kökten gelir: Yunan alfabesinin ilk iki harfi 'Alpha' (A) ve 'Beta' (B). Nasıl ki biz eskiden 'Elif-Ba' (Arap alfabesinin ilk iki harfi) diyorsak, veya çocuklara 'ABECE' öğretiyorsak, batı dilleri de 'Alpha-Beta' demiştir. Yani kelimenin anlamı aslında 'A ve B' demektir.",
                "example": "Alpha (A) + Beta (B) = Alphabet."
            }
        },
        "stories": {
            "A1": {
                "tr": "Okulda <strong>alfabe</strong>yi öğreniyoruz. Öğretmenimiz tahtaya 'A, B, C' yazıyor. Biz şarkı söylüyoruz. 'A elma (apple) için, B top (ball) için.' <strong>Alfabe</strong> şarkısını çok seviyorum. Tüm harfleri biliyorum.",
                "en": "We are learning the <strong>alphabet</strong> at school. Our teacher writes 'A, B, C' on the board. We sing a song. 'A is for apple, B is for ball.' I love the <strong>alphabet</strong> song. I know all the letters."
            },
            "A2": {
                "tr": "Kütüphanede kitap bulmak kolaydır. Çünkü kitaplar <strong>alfabetik</strong> sıraya (alphabetical order) göredir. Yazarın adını biliyorsan, kitabı bulabilirsin. 'Z' harfindeki bir kitabı arıyorsan, en sona bakmalısın. <strong>Alfabe</strong> bize düzen sağlar.",
                "en": "Finding a book in the library is easy. Because books are in <strong>alphabetical order</strong>. If you know the author's name, you can find the book. If you are looking for a book at the letter 'Z', you must look at the very end. The <strong>alphabet</strong> provides us order."
            },
            "B1": {
                "tr": "Tarihte ilk gerçek <strong>alfabe</strong>yi Fenikeliler icat etti. Onlar tüccardı ve hızlı yazmaları gerekiyordu. Mısırlıların hiyeroglifleri (resim yazısı) çok zordu. Fenikeliler her ses için bir sembol yaptı. Bu sistem çok basitti. Yunanlılar bunu alıp geliştirdiler ve bugünkü <strong>alfabe</strong>mizin temelini attılar.",
                "en": "In history, the Phoenicians invented the first real <strong>alphabet</strong>. They were merchants and needed to write quickly. Egyptian hieroglyphs (picture writing) were too difficult. Phoenicians made one symbol for each sound. This system was very simple. The Greeks took this and improved it, laying the foundation of our current <strong>alphabet</strong>."
            },
            "B2": {
                "tr": "Uluslararası uçuşlarda pilotlar ve kuleler NATO Fonetik <strong>Alfabe</strong>sini kullanır. Bir harfi yanlış anlamak felakete yol açabilir. Bu yüzden 'B' demezler, 'Bravo' derler. 'M' ve 'N' telefonda çok karışır, bu yüzden 'Mike' ve 'November' kullanılır. Bu standartlaştırılmış <strong>alfabe</strong>, dünya çapında havacılık güvenliğini sağlar.",
                "en": "On international flights, pilots and towers use the NATO Phonetic <strong>Alphabet</strong>. Misunderstanding a letter can lead to disaster. That's why they don't say 'B', they say 'Bravo'. 'M' and 'N' get confused easily on the phone, so 'Mike' and 'November' are used. This standardized <strong>alphabet</strong> ensures aviation safety worldwide."
            },
            "C1": {
                "tr": "Türkiye Cumhuriyeti'nin kuruluşuyla birlikte yapılan en büyük devrimlerden biri Harf Devrimi'ydi. 1928'de Arap alfabesinden Latin <strong>alfabe</strong>sine geçildi. Bu sadece bir sembol değişikliği (transliterasyon) değildi; kültürel bir yön değişimiydi. Yeni <strong>alfabe</strong>, Türkçenin sesli harf yapısına (vokal uyumu) daha uygundu ve okuryazarlık oranının hızla artmasını sağladı.",
                "en": "One of the greatest revolutions following the foundation of the Turkish Republic was the Letter Revolution. In 1928, there was a shift from the Arabic script to the Latin <strong>alphabet</strong>. This was not merely a change of symbols (transliteration); it was a cultural reorientation. The new <strong>alphabet</strong> was more suitable for the vowel structure of Turkish and facilitated a rapid increase in the literacy rate."
            },
            "C2": {
                "tr": "Medeniyet tarihçileri, <strong>alfabe</strong>nin icadını insan zihninin en büyük soyutlama başarısı olarak görür. Somut bir resmi (bir öküz başı) alıp onu soyut bir sesi (/a/) temsil eden bir çizgiye indirgemek, bilişsel bir sıçramadır. Bu 'demokratik' teknoloji, bilgiyi elit rahiplerin tekelinden çıkarıp sıradan insana sunmuştur. Marshall McLuhan'ın dediği gibi, 'Fonetik <strong>alfabe</strong>, gözü kulağa tercih eden, rasyonel ve çizgisel düşünen modern insanı yaratmıştır.'",
                "en": "Historians of civilization view the invention of the <strong>alphabet</strong> as the human mind's greatest feat of abstraction. Taking a concrete image (an ox head) and reducing it to a line representing an abstract sound (/a/) is a cognitive leap. This 'democratic' technology took knowledge out of the monopoly of elite priests and offered it to the common man. As Marshall McLuhan said, 'The phonetic <strong>alphabet</strong> created the modern man who prefers the eye to the ear and thinks rationally and linearly.'"
            }
        }
    },
    {  // ambulance
        "id": "1007-ambulance", "word": "ambulance",
        "meta": {
            "version": "2.2.0",
            "dictionary_type": "learner_advanced",
            "cefr_level": "A2",
            "frequency_rank": 2500,
            "frequency_band": "Medium Frequency",
            "part_of_speech": "noun"
        },
        "phonetics": {
            "ipa_us": "/ˈæm.bjə.ləns/",
            "ipa_uk": "/ˈæm.bjə.ləns/",
            "audio_us": "/assets/audio/us/ambulance.mp3",
            "audio_uk": "/assets/audio/uk/ambulance.mp3",
            "syllabification": ["am", "bu", "lance"],
            "stress_data": {
                "pattern": "Dactyl (Strong-Weak-Weak)",
                "primary_stress_index": 0
            }
        },
        "definitions": [
            {
                "sense_id": "def_1",
                "core_meaning_en": "a special vehicle used to take sick or injured people to hospital",
                "core_meaning_tr": "ambulans, cankurtaran",
                "context_tags": ["medical", "emergency"],
                "example": {
                    "sentence": "The ambulance arrived within ten minutes.",
                    "translation": "Ambulans on dakika içinde geldi."
                }
            }
        ],
        "grammar_profile": {
            "structures": [
                {
                    "pattern": "call an ambulance",
                    "usage_level": "Core",
                    "notes_tr": "En hayati kalıptır. 'Phone' veya 'ring' yerine genellikle 'call' kullanılır."
                },
                {
                    "pattern": "go by ambulance / in an ambulance",
                    "usage_level": "Intermediate",
                    "notes_tr": "Ulaşım aracı olarak: 'He was taken to hospital by ambulance.'"
                }
            ],
            "tense_logic": {
                "why_use_it": "Acil durum aracı olarak.",
                "critical_comparison": {
                    "context": "Ambulance vs Paramedic",
                    "rule": "'Ambulance' araçtır. 'Paramedic' veya 'EMT' ise o aracın içindeki sağlık personelidir.",
                    "example_wrong": "The ambulance treated me. (Yanlış - Araç tedavi etmez)",
                    "example_right": "The paramedics in the ambulance treated me. (Doğru)"
                }
            }
        },
        "sentence_progression": {
            "description": "Kelimenin seviyelere göre kullanım karmaşıklığı",
            "levels": [
                {
                    "cefr": "A1",
                    "en": "Look, an ambulance!",
                    "tr": "Bak, bir ambulans!",
                    "grammar_focus": "Exclamation / Noun"
                },
                {
                    "cefr": "A2",
                    "en": "We need to call an ambulance immediately.",
                    "tr": "Hemen bir ambulans çağırmalıyız.",
                    "grammar_focus": "Modal (need to) + Adverb"
                },
                {
                    "cefr": "B1",
                    "en": "The ambulance siren was very loud.",
                    "tr": "Ambulans sireni çok gürültülüydü.",
                    "grammar_focus": "Past Tense Description"
                },
                {
                    "cefr": "B2",
                    "en": "Drivers must pull over to let the ambulance pass.",
                    "tr": "Sürücüler ambulansın geçmesi için kenara çekilmelidir.",
                    "grammar_focus": "Phrasal Verb (pull over) + Purpose Clause"
                },
                {
                    "cefr": "C1",
                    "en": "He was rushed to the hospital in an ambulance.",
                    "tr": "Hastaneye ambulansla aceleyle yetiştirildi.",
                    "grammar_focus": "Passive Voice + Idiomatic Verb (rush)"
                }
            ]
        },
        "morphology_tree": {
            "root": "ambulare (Latin 'to walk')",
            "family_members": [
                { "word": "ambulance", "pos": "n", "level": "A2", "note": "yürüyen hastane -> ambulans" },
                { "word": "ambulator", "pos": "v", "level": "C2", "note": "gezinmek, yürümek (tıbbi)" },
                { "word": "ambulatory", "pos": "adj", "level": "C2", "note": "ayakta tedavi edilen, yürüyebilen" },
                { "word": "somnambulist", "pos": "n", "level": "C2", "prefix": "somn-", "note": "uyurgezer" },
                { "word": "pram", "pos": "n", "level": "B2", "note": "perambulator kısaltması (bebek arabası)" }
            ]
        },
        "collocations": {
            "modifiers_adverbs": [
                { "word": "air", "example": "air ambulance (helikopter ambulans)" },
                { "word": "private", "example": "private ambulance (özel ambulans)" }
            ],
            "verbs_preceding": [
                { "word": "call", "example": "call an ambulance (ambulans çağırmak)" },
                { "word": "drive", "example": "drive an ambulance (ambulans sürmek)" },
                { "word": "chase", "example": "chase ambulances (tazminat peşinde koşmak - mecazi)" }
            ]
        },
        "lexical_nuance": {
            "synonym_scale": {
                "concept": "Emergency Transport",
                "turkishConcept": "Acil Taşıtlar",
                "scale": [
                    {
                        "word": "ambulance",
                        "value": 5,
                        "turkish": "ambulans",
                        "note": "Standart acil durum aracı",
                        "strength": "Genel"
                    },
                    {
                        "word": "paramedic unit",
                        "value": 7,
                        "turkish": "ilk yardım birimi",
                        "note": "Daha teknik, personeli vurgular",
                        "strength": "Teknik"
                    },
                    {
                        "word": "medevac",
                        "value": 9,
                        "turkish": "tıbbi tahliye aracı",
                        "note": "Askeri veya helikopterle tahliye (Medical Evacuation)",
                        "strength": "Askeri/Kritik"
                    }
                ]
            },
            "antonyms": []
        },
        "pragmatics": {
            "idioms_and_phrases": [
                {
                    "phrase": "ambulance chaser",
                    "meaning_tr": "kazaları kovalayan çıkarcı avukat",
                    "register": "derogatory (aşağılayıcı)"
                },
                {
                    "phrase": "don't shoot the ambulance",
                    "meaning_tr": "haberciyi/yardım edeni suçlama (nadir varyasyon)",
                    "register": "idiomatic"
                }
            ],
            "sociolinguistics": {
                "topic": "Siren Etiquette",
                "note_en": "In most Western countries, failing to yield (pull over) to an ambulance with lights flashing is a serious traffic offense.",
                "note_tr": "Batı ülkelerinde sireni çalan ambulansa yol vermemek çok ciddi bir trafik suçudur."
            }
        },
        "pedagogy_engine": {
            "common_errors": [
                {
                    "error_id": "err_wrong_prep",
                    "incorrect": "She went to hospital with ambulance.",
                    "correction": "She went to hospital by ambulance (or in an ambulance).",
                    "explanation": "Taşıt araçlarında genel metod için 'by', içinde bulunma durumu için 'in' kullanılır. 'With' kullanılmaz."
                }
            ],
            "exam_prep": {
                "ielts_tag": "Health / Emergencies",
                "tip": "Acil durum senaryosu anlatılırken 'The ambulance arrived' yerine 'Professional medical assistance arrived promptly via ambulance' demek kelime çeşitliliğini gösterir.",
                "keywords": ["critical condition", "stabilize", "paramedics"]
            }
        },
        "word_journey": {
            "timeline": [
                { "era": "Latin", "word": "ambulare", "meaning": "to walk" },
                { "era": "French", "word": "hôpital ambulant", "meaning": "walking (mobile) hospital" },
                { "era": "Modern English", "word": "ambulance", "meaning": "vehicle for transporting sick" }
            ],
            "turkish_cognate_hint": {
                "word": "Ambulans / Pera",
                "connection_type": "Loanword",
                "story": "Ambulans kelimesi 'Ambul-' (yürümek) kökünden gelir. Napolyon zamanında savaşta yaralanan askerlere giden seyyar hastanelere 'Hôpital Ambulant' (Yürüyen Hastane) denirdi. Zamanla sadece sondaki 'Ambulant/Ambulance' kaldı. İstanbul'daki 'Pera' (karşı yaka, öte taraf) veya 'Perambulator' (bebek arabası) kelimeleri de bu kökten veya benzer hareket köklerinden gelir. Yani Ambulans aslında 'yürüyen/gezen klinik' demektir.",
                "example": "Somnambulist -> Som (Uyku) + Ambul (Yürü) = Uyurgezer."
            }
        },
        "stories": {
            "A1": {
                "tr": "Caddede yüksek bir ses var. 'Vi-vu, vi-vu!' Bu bir <strong>ambulans</strong>. Kırmızı ışıkları yanıp sönüyor. Arabalar duruyor. <strong>Ambulans</strong> hızlı gidiyor. İçinde hasta bir insan var. Doktorlar ona yardım edecek.",
                "en": "There is a loud noise on the street. 'Wee-woo, wee-woo!' It is an <strong>ambulance</strong>. Its red lights are flashing. Cars stop. The <strong>ambulance</strong> is going fast. There is a sick person inside. Doctors will help him."
            },
            "A2": {
                "tr": "Dün okulda Ali merdivenlerden düştü. Bacağı çok acıyordu. Öğretmenimiz '112'yi arayın!' dedi. Bir <strong>ambulans</strong> çağırdık. Beş dakika sonra geldiler. Sağlık görevlileri (paramedics) çok nazikti. Ali'yi <strong>ambulans</strong>a koyup hastaneye götürdüler.",
                "en": "Yesterday at school, Ali fell down the stairs. His leg hurt a lot. Our teacher said, 'Call 112!' We called an <strong>ambulance</strong>. They arrived after five minutes. The paramedics were very kind. They put Ali in the <strong>ambulance</strong> and took him to the hospital."
            },
            "B1": {
                "tr": "Trafik çok sıkışıktı ama arkadan bir siren sesi duyduk. Herkes sağa çekildi ve bir koridor (şerit) açtı. <strong>Ambulans</strong> bu güvenlik şeridinden hızla geçti. Bir hayat kurtarmak için saniyeler önemlidir. Sürücülerin <strong>ambulans</strong>a yol vermesi hayati bir kuraldır.",
                "en": "The traffic was very heavy but we heard a siren from behind. Everyone pulled over to the right and opened a corridor (lane). The <strong>ambulance</strong> passed quickly through this emergency lane. Seconds are important to save a life. It is a vital rule for drivers to yield to the <strong>ambulance</strong>."
            },
            "B2": {
                "tr": "Paramedikler sadece şoför değildir; onlar hareket halindeki bir acil servistir. <strong>Ambulans</strong>ın içinde, hastayı stabilize etmek için gelişmiş ekipmanlar bulunur. Kalp krizi geçiren bir hastaya hastaneye varmadan önce müdahale edebilirler. Modern tıpta <strong>ambulans</strong>, tedavinin başladığı yerdir, sadece bir taksi değildir.",
                "en": "Paramedics are not just drivers; they are an emergency room in motion. Inside the <strong>ambulance</strong>, there is advanced equipment to stabilize the patient. They can intervene with a patient having a heart attack before reaching the hospital. In modern medicine, the <strong>ambulance</strong> is where treatment begins, it is not just a taxi."
            },
            "C1": {
                "tr": "Acil tıpta 'Altın Saat' (Golden Hour) kavramı vardır. Travma sonrası ilk bir saat hayatta kalma şansı için kritiktir. Hava <strong>ambulans</strong>ları (helikopterler) bu yüzden çok önemlidir. Trafiğin olmadığı gökyüzünde, uzak bölgelerdeki hastaları dakikalar içinde travma merkezine ulaştırabilirler. Bu hızlı tahliye (medevac) yeteneği, ölüm oranlarını ciddi şekilde düşürür.",
                "en": "In emergency medicine, there is the concept of the 'Golden Hour'. The first hour after trauma is critical for survival chances. That is why air <strong>ambulances</strong> (helicopters) are so important. In the sky where there is no traffic, they can transport patients in remote areas to a trauma center within minutes. This rapid evacuation (medevac) capability significantly reduces mortality rates."
            },
            "C2": {
                "tr": "Afet yönetiminde, kaynakların tahsisi etik bir ikilem yaratır: Sınırlı sayıdaki <strong>ambulans</strong> kime gönderilecek? Triyaj (seçme/ayırma) sistemi bu noktada devreye girer. En ağır yaralılar değil, kurtarılma şansı en yüksek olanlar önceliklendirilebilir. Bu soğukkanlı rasyonellik, kaos anında duygusal tepkilerin önüne geçmelidir. Bir <strong>ambulans</strong>ın rotası sadece bir harita sorunu değil, aynı zamanda bir ahlak felsefesi sorunudur.",
                "en": "In disaster management, resource allocation creates an ethical dilemma: To whom will the limited number of <strong>ambulances</strong> be sent? The triage system comes into play at this point. Not the most severely injured, but those with the highest chance of survival might be prioritized. This cold-blooded rationality must override emotional reactions during chaos. The route of an <strong>ambulance</strong> is not just a map problem, but also a problem of moral philosophy."
            }
        }
    },
    {  // aquarium
        "id": "1008-aquarium", "word": "aquarium",
        "meta": {
            "version": "2.2.0",
            "dictionary_type": "learner_advanced",
            "cefr_level": "A2",
            "frequency_rank": 3200,
            "frequency_band": "Low Frequency",
            "part_of_speech": "noun"
        },
        "phonetics": {
            "ipa_us": "/əˈkwer.i.əm/",
            "ipa_uk": "/əˈkweə.ri.əm/",
            "audio_us": "/assets/audio/us/aquarium.mp3",
            "audio_uk": "/assets/audio/uk/aquarium.mp3",
            "syllabification": ["a", "quar", "i", "um"],
            "stress_data": {
                "pattern": "Amphibrach (Weak-Strong-Weak)",
                "primary_stress_index": 1
            }
        },
        "definitions": [
            {
                "sense_id": "def_1",
                "core_meaning_en": "a glass container for keeping fish and water animals",
                "core_meaning_tr": "akvaryum (ev tipi)",
                "context_tags": ["hobby", "home"],
                "example": {
                    "sentence": "I have a goldfish in my aquarium.",
                    "translation": "Akvaryumumda bir japon balığım var."
                }
            },
            {
                "sense_id": "def_2",
                "core_meaning_en": "a building where people go to see sea animals",
                "core_meaning_tr": "dev akvaryum binası / su canlıları müzesi",
                "context_tags": ["tourism", "education"],
                "example": {
                    "sentence": "We visited the Antalya Aquarium yesterday.",
                    "translation": "Dün Antalya Akvaryumu'nu ziyaret ettik."
                }
            }
        ],
        "grammar_profile": {
            "structures": [
                {
                    "pattern": "visit the aquarium",
                    "usage_level": "Core",
                    "notes_tr": "Müze/bina anlamında kullanıldığında genellikle 'the' alır."
                },
                {
                    "pattern": "setup an aquarium",
                    "usage_level": "Intermediate",
                    "notes_tr": "Akvaryum kurmak için 'set up' fiili kullanılır."
                }
            ],
            "tense_logic": {
                "why_use_it": "Latince kökenli kelime.",
                "critical_comparison": {
                    "context": "Plural: Aquariums vs Aquaria",
                    "rule": "İngilizcede her ikisi de doğrudur. 'Aquariums' günlük dilde daha yaygındır. 'Aquaria' ise daha bilimsel/teknik metinlerde geçer.",
                    "example_wrong": "The museum has two big aquaria. (Doğru ama çok resmi)",
                    "example_right": "The museum has two big aquariums. (Daha yaygın)"
                }
            }
        },
        "sentence_progression": {
            "description": "Kelimenin seviyelere göre kullanım karmaşıklığı",
            "levels": [
                {
                    "cefr": "A1",
                    "en": "The fish in the aquarium are orange.",
                    "tr": "Akvaryumdaki balıklar turuncudur.",
                    "grammar_focus": "Preposition Phrase (in the...)"
                },
                {
                    "cefr": "A2",
                    "en": "We saw a shark at the aquarium.",
                    "tr": "Akvaryumda (dev akvaryum binası) bir köpekbalığı gördük.",
                    "grammar_focus": "Past Simple"
                },
                {
                    "cefr": "B1",
                    "en": "Keeping an aquarium requires patience and regular cleaning.",
                    "tr": "Akvaryum beslemek (bakmak), sabır ve düzenli temizlik gerektirir.",
                    "grammar_focus": "Gerund Subject"
                },
                {
                    "cefr": "B2",
                    "en": "The marine biologist works at the city aquarium.",
                    "tr": "Deniz biyoloğu şehir akvaryumunda çalışıyor.",
                    "grammar_focus": "Professional Vocabulary"
                },
                {
                    "cefr": "C1",
                    "en": "Public aquariums play a vital role in the conservation of endangered species.",
                    "tr": "Halka açık akvaryumlar, nesli tükenmekte olan türlerin korunmasında hayati bir rol oynar.",
                    "grammar_focus": "Academic (conservation, endangered)"
                }
            ]
        },
        "morphology_tree": {
            "root": "Aqua (Water) + -arium (Place)",
            "family_members": [
                { "word": "aquarium", "pos": "n", "level": "A2", "note": "su yeri -> akvaryum" },
                { "word": "aquatic", "pos": "adj", "level": "B2", "note": "suda yaşayan, suyla ilgili" },
                { "word": "aquarius", "pos": "n", "level": "C1", "note": "kova burcu (su taşıyıcı)" },
                { "word": "terrarium", "pos": "n", "level": "C1", "note": "kara canlıları için cam kafes (terra: toprak)" },
                { "word": "planetarium", "pos": "n", "level": "B2", "note": "gökevi (gezegen yeri)" }
            ]
        },
        "collocations": {
            "modifiers_adverbs": [
                { "word": "saltwater", "example": "saltwater aquarium (tuzlu su akvaryumu)" },
                { "word": "freshwater", "example": "freshwater aquarium (tatlı su akvaryumu)" },
                { "word": "giant", "example": "giant aquarium (dev akvaryum)" }
            ],
            "verbs_preceding": [
                { "word": "maintain", "example": "maintain an aquarium (akvaryum bakımı yapmak)" },
                { "word": "stock", "example": "stock an aquarium (akvaryuma balık koymak)" },
                { "word": "visit", "example": "visit the aquarium (akvaryum gezmek)" }
            ]
        },
        "lexical_nuance": {
            "synonym_scale": {
                "concept": "Enclosures for Aquatic Life",
                "turkishConcept": "Su Canlıları Alanları",
                "scale": [
                    {
                        "word": "fish bowl",
                        "value": 2,
                        "turkish": "fanus",
                        "note": "Küçük, yuvarlak, tekniksiz",
                        "strength": "Basit"
                    },
                    {
                        "word": "fish tank",
                        "value": 5,
                        "turkish": "balık tankı",
                        "note": "Ev tipi dikdörtgen cam",
                        "strength": "Standart"
                    },
                    {
                        "word": "aquarium",
                        "value": 8,
                        "turkish": "akvaryum",
                        "note": "Hem evdeki tank hem de devasa tesis",
                        "strength": "Kapsamlı"
                    },
                    {
                        "word": "oceanarium",
                        "value": 10,
                        "turkish": "okyanus akvaryumu",
                        "note": "Açık denize bağlı veya devasa deniz parkı",
                        "strength": "Devasa"
                    }
                ]
            },
            "antonyms": []
        },
        "pragmatics": {
            "idioms_and_phrases": [
                {
                    "phrase": "living in a fishbowl",
                    "meaning_tr": "fanusta yaşamak (gizlisi saklısı olmamak, herkes tarafından izlenmek)",
                    "register": "idiomatic"
                }
            ],
            "sociolinguistics": {
                "topic": "Ethics of Zoos/Aquariums",
                "note_en": "Modern debate focuses on whether aquariums are prisons for animals or necessary arks for conservation and education.",
                "note_tr": "Günümüzde akvaryumların hayvan hapishaneleri mi yoksa koruma/eğitim amaçlı sığınaklar mı olduğu tartışılmaktadır."
            }
        },
        "pedagogy_engine": {
            "common_errors": [
                {
                    "error_id": "err_spelling_agua",
                    "incorrect": "aguarium",
                    "correction": "aquarium",
                    "explanation": "İspanyolcadaki 'agua' ile karıştırılıp 'g' ile yazılmamalıdır. Latince 'aqua' (q) köküdür."
                }
            ],
            "exam_prep": {
                "ielts_tag": "Environment",
                "tip": "Speaking sınavında hobilerinizden bahsederken 'aquascaping' (su altı peyzajı) terimini kullanmak çok etkileyici ve ileri seviye bir kelimedir.",
                "keywords": ["ecosystem", "marine life", "coral reef"]
            },
            "gamification": {
                "challenge_type": "analogy",
                "question": "Bird is to Cage as Fish is to _____",
                "answer": "Aquarium (or Tank)",
                "distractors": ["Pool", "Sea", "Net"]
            }
        },
        "word_journey": {
            "timeline": [
                { "era": "Latin", "word": "aquarium", "meaning": "watering place for cattle" },
                { "era": "19th Century", "word": "aquarium", "meaning": "vessel for aquatic plants/animals (vivarium derivative)" }
            ],
            "turkish_cognate_hint": {
                "word": "Akvaryum / Solaryum",
                "connection_type": "Suffix Pattern",
                "story": "İngilizcede ve Türkçede sonu '-arium' veya '-aryum' ile biten kelimeler hep 'bir şeyin yapıldığı YER' anlamına gelir. \n- Aquarium: Aqua (Su) + Arium (Yer) = Su yeri.\n- Solarium: Solar (Güneş) + Arium (Yer) = Güneşlenme yeri.\n- Terrarium: Terra (Toprak) + Arium (Yer) = Toprak yeri.\n- Planetarium: Planet (Gezegen) + Arium (Yer) = Gezegen evi.",
                "example": "Aqua -> Akvaryum."
            }
        },
        "stories": {
            "A1": {
                "tr": "Odamda küçük bir <strong>akvaryum</strong> var. İçinde üç balık var. İsimleri Mavi, Kırmızı ve Sarı. Onları izlemeyi seviyorum. Suda yüzüyorlar. Ben onlara her sabah yem veriyorum. <strong>Akvaryum</strong> benim için televizyondan daha güzel.",
                "en": "There is a small <strong>aquarium</strong> in my room. There are three fish inside. Their names are Blue, Red, and Yellow. I like watching them. They swim in the water. I give them food every morning. The <strong>aquarium</strong> is better than television for me."
            },
            "A2": {
                "tr": "Sınıf gezisinde büyük bir <strong>akvaryum</strong>a gittik. Dev bir tünel vardı. Başımızın üstünde köpekbalıkları yüzüyordu. Çok heyecan vericiydi. Rehber bize deniz kaplumbağalarını gösterdi. <strong>Akvaryum</strong>da flaşlı fotoğraf çekmek yasaktı çünkü balıklar korkabilir.",
                "en": "On a class trip, we went to a big <strong>aquarium</strong>. There was a giant tunnel. Sharks were swimming above our heads. It was very exciting. The guide showed us the sea turtles. Taking photos with flash was forbidden in the <strong>aquarium</strong> because fish can get scared."
            },
            "B1": {
                "tr": "Ağabeyim geçen hafta eve tuzlu su <strong>akvaryum</strong>u kurmaya karar verdi. Bu, normal bir akvaryumdan çok daha zor. Suyun tuz oranını ve sıcaklığını sürekli kontrol etmesi gerekiyor. Ayrıca özel ışıklar ve mercanlar (corals) satın aldı. <strong>Akvaryum</strong> hobisi (aquarium keeping) pahalı ama rahatlatıcı bir uğraş.",
                "en": "My brother decided to set up a saltwater <strong>aquarium</strong> at home last week. This is much harder than a normal aquarium. He needs to check the water salinity and temperature constantly. He also bought special lights and corals. <strong>Aquarium</strong> keeping is an expensive but relaxing hobby."
            },
            "B2": {
                "tr": "Bir <strong>akvaryum</strong> sadece su dolu bir cam kutu değildir; o kapalı bir ekosistemdir. Balıkların atıkları suyu kirletir, ancak yararlı bakteriler bu atığı temizler. Eğer bu denge bozulursa, balıklar ölür. Başarılı bir <strong>akvaryum</strong> sahibi olmak için biraz kimya, biraz biyoloji bilmek gerekir. Doğanın döngüsünü taklit etmek büyüleyicidir.",
                "en": "An <strong>aquarium</strong> is not just a glass box full of water; it is a closed ecosystem. Fish waste pollutes the water, but beneficial bacteria clean this waste. If this balance is disturbed, the fish die. To be a successful <strong>aquarium</strong> owner, one needs to know a little chemistry and biology. Mimicking nature's cycle is fascinating."
            },
            "C1": {
                "tr": "Modern şehir <strong>akvaryum</strong>ları artık sadece eğlence merkezi değil, aynı zamanda araştırma enstitüleridir. Birçok deniz canlısı, okyanus kirliliği ve iklim değişikliği nedeniyle tehdit altındadır. <strong>Akvaryum</strong>lar, bu türler için güvenli üreme programları yürütür. Eleştirmenler hayvanların hapsedilmesine karşı çıksa da, destekçiler bu tesislerin eğitim ve farkındalık yarattığını savunuyor.",
                "en": "Modern city <strong>aquariums</strong> are no longer just entertainment centers, but also research institutes. Many marine creatures are threatened by ocean pollution and climate change. <strong>Aquariums</strong> conduct safe breeding programs for these species. While critics oppose the confinement of animals, supporters argue that these facilities create education and awareness."
            },
            "C2": {
                "tr": "Filozoflar bazen insanlık durumunu bir <strong>akvaryum</strong>a benzetir. Görünmez cam duvarlarla (kültürel normlar, dil, algı sınırları) çevriliyizdir ve içinde yüzdüğümüz suyun farkında değilizdir. Platon'un mağarası gibi, <strong>akvaryum</strong>daki balık da dış dünyayı sadece camdaki yansımalardan ibaret sanır. Özgürlük, belki de o camı kırmak değil, suyun (içinde yaşadığımız gerçekliğin) doğasını anlamaktır.",
                "en": "Philosophers sometimes compare the human condition to an <strong>aquarium</strong>. We are surrounded by invisible glass walls (cultural norms, language, perceptual limits) and are unaware of the water we swim in. Like Plato's cave, the fish in the <strong>aquarium</strong> thinks the outside world consists only of reflections on the glass. Freedom is perhaps not breaking that glass, but understanding the nature of the water (the reality we live in)."
            }
        }
    },
    {  // arrive
        "id": "1009-arrive", "word": "arrive",
        "meta": {
            "version": "2.2.0",
            "dictionary_type": "learner_advanced",
            "cefr_level": "A1",
            "frequency_rank": 600,
            "frequency_band": "High Frequency",
            "part_of_speech": "verb"
        },
        "phonetics": {
            "ipa_us": "/əˈraɪv/",
            "ipa_uk": "/əˈraɪv/",
            "audio_us": "/assets/audio/us/arrive.mp3",
            "audio_uk": "/assets/audio/uk/arrive.mp3",
            "syllabification": ["ar", "rive"],
            "stress_data": {
                "pattern": "Iamb (Weak-Strong)",
                "primary_stress_index": 1
            }
        },
        "definitions": [
            {
                "sense_id": "def_1",
                "core_meaning_en": "to reach a place, especially at the end of a journey",
                "core_meaning_tr": "varmak, ulaşmak, gelmek",
                "context_tags": ["travel", "movement"],
                "example": {
                    "sentence": "The train arrived at the station on time.",
                    "translation": "Tren istasyona zamanında vardı."
                }
            },
            {
                "sense_id": "def_2",
                "core_meaning_en": "to happen or start to exist",
                "core_meaning_tr": "gelip çatmak (zaman vb.), ortaya çıkmak",
                "context_tags": ["time", "event"],
                "example": {
                    "sentence": "The moment of decision has arrived.",
                    "translation": "Karar anı gelip çattı."
                }
            }
        ],
        "grammar_profile": {
            "structures": [
                {
                    "pattern": "arrive at [Place/Point]",
                    "usage_level": "Core",
                    "notes_tr": "Küçük yerler veya belirli noktalar için 'at' kullanılır (arrive at the airport, arrive at school)."
                },
                {
                    "pattern": "arrive in [City/Country]",
                    "usage_level": "Core",
                    "notes_tr": "Büyük yerler, şehirler ve ülkeler için 'in' kullanılır (arrive in London, arrive in Turkey). ASLA 'arrive to' kullanılmaz."
                }
            ],
            "tense_logic": {
                "why_use_it": "Sonuç odaklı bir eylem fiili.",
                "critical_comparison": {
                    "context": "Arrive vs Reach vs Get to",
                    "rule": "'Arrive' edat (at/in) alır. 'Reach' edat almaz (reach the station). 'Get to' ise 'to' alır (get to the station).",
                    "example_wrong": "I arrived to London. (HATA - 'to' kullanılmaz)",
                    "example_right": "I arrived in London. / I got to London."
                }
            }
        },
        "sentence_progression": {
            "description": "Kelimenin seviyelere göre kullanım karmaşıklığı",
            "levels": [
                {
                    "cefr": "A1",
                    "en": "When do you arrive?",
                    "tr": "Ne zaman varırsın/gelirsin?",
                    "grammar_focus": "Present Simple (Schedule)"
                },
                {
                    "cefr": "A2",
                    "en": "We arrived home late last night.",
                    "tr": "Dün gece eve geç vardık.",
                    "grammar_focus": "Adverb (Home takes no preposition)"
                },
                {
                    "cefr": "B1",
                    "en": "The police arrived at the scene of the crime.",
                    "tr": "Polis olay yerine intikal etti (vardı).",
                    "grammar_focus": "Preposition Phase (at the scene)"
                },
                {
                    "cefr": "B2",
                    "en": "We finally arrived at a conclusion after hours of debate.",
                    "tr": "Saatler süren tartışmadan sonra nihayet bir sonuca vardık.",
                    "grammar_focus": "Metaphorical usage (arrive at a conclusion)"
                },
                {
                    "cefr": "C1",
                    "en": "With his new bestseller, the author has officially arrived.",
                    "tr": "Yeni çok satan kitabıyla yazar resmen 'oldum' dedi (başarıya ulaştı/tanındı).",
                    "grammar_focus": "idiomatic meaning (to achieve success)"
                }
            ]
        },
        "morphology_tree": {
            "root": "Ad (to) + Ripa (Shore) -> Arripare",
            "family_members": [
                { "word": "arrive", "pos": "v", "level": "A1", "note": "kıyıya çıkmak -> varmak" },
                { "word": "arrival", "pos": "n", "level": "B1", "suffix": "-al", "note": "varış, geliş" },
                { "word": "river", "pos": "n", "level": "A1", "note": "nehir (kıyısı olan su)" },
                { "word": "riparian", "pos": "adj", "level": "C2", "note": "kıyı ile ilgili, nehir kıyısında bulunan" }
            ]
        },
        "collocations": {
            "modifiers_adverbs": [
                { "word": "safe and sound", "example": "arrive safe and sound (sağ salim varmak)" },
                { "word": "early / late", "example": "arrive early (erken varmak)" },
                { "word": "unexpectedly", "example": "arrive unexpectedly (beklenmedik bir anda gelmek)" }
            ],
            "verbs_preceding": [
                { "word": "fail to", "example": "fail to arrive (varmamak/ulaşmamak)" },
                { "word": "wait to", "example": "wait for smt to arrive (bir şeyin gelmesini beklemek)" }
            ]
        },
        "lexical_nuance": {
            "synonym_scale": {
                "concept": "Movement to Destination",
                "turkishConcept": "Hedefe Ulaşma",
                "scale": [
                    {
                        "word": "come",
                        "value": 3,
                        "turkish": "gelmek",
                        "note": "Hareket konuşana doğru (Come here)",
                        "strength": "Basit"
                    },
                    {
                        "word": "get to",
                        "value": 5,
                        "turkish": "gitmek/varmak",
                        "note": "İnformel, süreç içerir (How do I get to...?)",
                        "strength": "Konuşma Dili"
                    },
                    {
                        "word": "arrive",
                        "value": 7,
                        "turkish": "varmak",
                        "note": "Anlık bir olay, sonuç odaklı (The plane arrived)",
                        "strength": "Standart"
                    },
                    {
                        "word": "reach",
                        "value": 8,
                        "turkish": "ulaşmak/erişmek",
                        "note": "Çaba içerir (Reach the summit)",
                        "strength": "Güçlü"
                    }
                ]
            },
            "antonyms": [
                {
                    "word": "depart",
                    "value": 1,
                    "turkish": "kalkmak/ayrılmak",
                    "note": "Leave/Depart"
                },
                {
                    "word": "leave",
                    "value": 1,
                    "turkish": "ayrılmak"
                }
            ]
        },
        "pragmatics": {
            "idioms_and_phrases": [
                {
                    "phrase": "Dead on arrival (DOA)",
                    "meaning_tr": "Hastaneye vardığında ölü / (Mecazi) Başından başarısız, ölü doğmuş fikir",
                    "register": "medical/slang"
                },
                {
                    "phrase": "To have arrived",
                    "meaning_tr": "Başarmak, statü sahibi olmak, 'yırtmak'",
                    "register": "idiomatic"
                }
            ],
            "sociolinguistics": {
                "topic": "Punctuality",
                "note_en": "In English-speaking cultures, 'arriving on time' usually means arriving 5 minutes early. Arriving late without notice is considered disrespectful.",
                "note_tr": "Dakiklik kültürü: 'Zamanında varmak' aslında 5 dakika erken gitmektir."
            }
        },
        "pedagogy_engine": {
            "common_errors": [
                {
                    "error_id": "err_arrive_to",
                    "incorrect": "We arrived to the hotel.",
                    "correction": "We arrived at the hotel.",
                    "explanation": "'Arrive' fiili yönelme (movement towards) değil nokta (point) bildirir, bu yüzden 'to' almaz. Küçük yerler için 'at', şehir/ülke için 'in' alır."
                }
            ],
            "exam_prep": {
                "ielts_tag": "Transportation",
                "tip": "Havaalanı duyurularında 'Arrivals' (Gelen Yolcu) ve 'Departures' (Giden Yolcu) tabelaları temel kelimelerdir.",
                "keywords": ["ETA (Estimated Time of Arrival)", "schedule", "delay"]
            },
            "gamification": {
                "challenge_type": "fill_in_blank",
                "question": "The plane arrived ____ New York ____ 5 PM.",
                "answer": "in / at",
                "explanation": "Şehirler için 'in', saatler için 'at'."
            }
        },
        "word_journey": {
            "timeline": [
                { "era": "Latin", "word": "ad (to) + ripa (shore)", "meaning": "to the shore" },
                { "era": "Old French", "word": "arriver", "meaning": "come to land" },
                { "era": "Middle English", "word": "arrive", "meaning": "reach a destination" }
            ],
            "turkish_cognate_hint": {
                "word": "River / Arrive",
                "connection_type": "Shared Root",
                "story": "İngilizcede 'River' (Nehir) kelimesi 'Ripa' (Kıyı) kökünden gelir. 'Arrive' kelimesi de (Ad-Ripa) 'Kıyıya çıkmak' demektir. Eskiden deniz yolculuğu ana ulaşım şekliydi, bir yere 'varmak' demek karaya ayak basmak demekti.",
                "example": "River (Nehir-Kıyı) -> Arrive (Kıyıya varmak)."
            }
        },
        "stories": {
            "A1": {
                "tr": "Okul otobüsü saat 8'de <strong>varıyor</strong>. Ben durakta bekliyorum. Otobüs geliyor ve kapılar açılıyor. Okula zamanında <strong>varıyoruz</strong>. Derse geç kalmayı sevmem.",
                "en": "The school bus <strong>arrives</strong> at 8 o'clock. I wait at the stop. The bus comes and the doors open. We <strong>arrive</strong> at school on time. I don't like being late for class."
            },
            "A2": {
                "tr": "Tatile gittik. Uçağımız İstanbul'a geç <strong>vardı</strong>. Havaalanından otele taksiyle gittik. Otele <strong>vardığımızda</strong> (arrived at the hotel) resepsiyon kapalıydı. Çok yorgunduk ama mutluyduk. Sonunda tatil başlamıştı.",
                "en": "We went on vacation. Our plane <strong>arrived</strong> in Istanbul late. We went to the hotel by taxi from the airport. When we <strong>arrived</strong> at the hotel, the reception was closed. We were very tired but happy. Finally, the vacation had started."
            },
            "B1": {
                "tr": "Arkadaşım dün gece bana bir mesaj attı: 'Eve sağ salim <strong>vardım</strong> (arrived safe and sound).' Yolda çok kar vardı, bu yüzden endişelenmiştim. 'Arrive' fiilini kullanırken dikkatli olmalısın. Eve <strong>vardım</strong> derken 'arrive home' denir, 'arrive at home' denmez. Çünkü 'home' burada bir zarftır.",
                "en": "My friend sent me a message last night: 'I <strong>arrived</strong> safe and sound.' There was a lot of snow on the road, so I was worried. You have to be careful when using the verb 'arrive'. When saying 'I arrived home', you don't say 'arrive at home'. Because 'home' is an adverb here."
            },
            "B2": {
                "tr": "Dedektifler olay yerine <strong>vardıklarında</strong>, kanıtlar çoktan yok olmuştu. Görünüşe göre suçlular polis <strong>varmadan</strong> hemen önce kaçmıştı. Şef, 'Yanlış bir sonuca <strong>varmak</strong> (arrive at a conclusion) istemiyorum ama bu içeriden birinin işi olabilir' dedi. Soruşturma yeni başlamıştı.",
                "en": "When the detectives <strong>arrived</strong> at the scene, the evidence had already disappeared. Appearenly, the criminals had escaped just before the police <strong>arrived</strong>. The chief said, 'I don't want to <strong>arrive</strong> at a wrong conclusion, but this might be an inside job.' The investigation had just begun."
            },
            "C1": {
                "tr": "Teknolojinin hayatımıza getirdiği en büyük illüzyon, 'anında <strong>varış</strong>' hissidir. E-postalar saniyeler içinde ulaşır, görüntülü aramalar mesafeleri yok eder. Ancak fiziksel olarak bir yere <strong>varmak</strong>, hala zaman ve çaba gerektirir. 'Varmak' kelimesinin kökündeki 'kıyıya çıkmak' metaforu bize şunu hatırlatır: Her <strong>varış</strong>, zorlu bir denizin aşılmasını gerektirir.",
                "en": "The greatest illusion technology brings to our lives is the sense of 'instant <strong>arrival</strong>'. Emails arrive in minutes, video calls annihilate distances. However, physically <strong>arriving</strong> somewhere still requires time and effort. The metaphor 'coming to shore' in the root of the word 'arrive' reminds us: Every <strong>arrival</strong> necessitates crossing a rough sea."
            },
            "C2": {
                "tr": "Mutluluk bir varış noktası (destination) mıdır, yoksa yolculuğun kendisi mi? Birçok insan, 'Şuraya <strong>vardığımda</strong> mutlu olacağım' diyerek hayatı erteler. Buna 'Varış Yanılgısı' (Arrival Fallacy) denir. Hedefe <strong>vardığınızda</strong> hissettiğiniz tatmin geçicidir. Asıl mesele, süreçten keyif alabilmektir. Çünkü nihai <strong>varış</strong> noktamız (ölüm) kaçınılmazdır; önemli olan oraya nasıl seyahat ettiğimizdir.",
                "en": "Is happiness a destination or the journey itself? Many people postpone life saying 'I will be happy when I <strong>arrive</strong> there.' This is called the 'Arrival Fallacy'. The satisfaction you feel when you <strong>arrive</strong> at the goal is temporary. The main point is to enjoy the process. Because our ultimate point of <strong>arrival</strong> (death) is inevitable; what matters is how we travel there."
            }
        }
    },
    {  // autumn
        "id": "1010-autumn", "word": "autumn",
        "meta": {
            "version": "2.2.0",
            "dictionary_type": "learner_advanced",
            "cefr_level": "A1",
            "frequency_rank": 1200,
            "frequency_band": "High Frequency",
            "part_of_speech": "noun"
        },
        "phonetics": {
            "ipa_us": "/ˈɔː.t̬əm/",
            "ipa_uk": "/ˈɔː.təm/",
            "audio_us": "/assets/audio/us/autumn.mp3",
            "audio_uk": "/assets/audio/uk/autumn.mp3",
            "syllabification": ["au", "tumn"],
            "stress_data": {
                "pattern": "Trochee (Strong-Weak)",
                "primary_stress_index": 0
            }
        },
        "definitions": [
            {
                "sense_id": "def_1",
                "core_meaning_en": "the season after summer and before winter",
                "core_meaning_tr": "sonbahar, güz",
                "context_tags": ["season", "time"],
                "example": {
                    "sentence": "Leaves turn brown in autumn.",
                    "translation": "Sonbaharda yapraklar kahverengiye döner."
                }
            },
            {
                "sense_id": "def_2",
                "core_meaning_en": "a period of maturity or incipient decline",
                "core_meaning_tr": "sonbahar (ömrün son dönemi/olgunluk)",
                "context_tags": ["figurative", "literary"],
                "example": {
                    "sentence": "She is in the autumn of her life.",
                    "translation": "Hayatının sonbaharını yaşıyor."
                }
            }
        ],
        "grammar_profile": {
            "structures": [
                {
                    "pattern": "in (the) autumn",
                    "usage_level": "Core",
                    "notes_tr": "Mevsimlerden önce 'in' kullanılır. 'The' opsiyoneldir (in autumn / in the autumn)."
                },
                {
                    "pattern": "autumnal (Adjective)",
                    "usage_level": "Advanced",
                    "notes_tr": "Sıfat hali: 'autumnal colors' (sonbahar renkleri)."
                }
            ],
            "tense_logic": {
                "why_use_it": "Zaman ve döngü bildirmek için.",
                "critical_comparison": {
                    "context": "Autumn vs Fall",
                    "rule": "'Autumn' İngiliz İngilizcesinde (UK) standarttır. 'Fall' Amerikan İngilizcesinde (US) standarttır. Ancak Amerikalılar da 'Autumn' kelimesini daha şiirsel/resmi bağlamda kullanır.",
                    "example_wrong": "I like the fall. (İngiltere'de biraz yabancı kaçabilir)",
                    "example_right": "I like autumn. (UK & US)"
                }
            }
        },
        "sentence_progression": {
            "description": "Kelimenin seviyelere göre kullanım karmaşıklığı",
            "levels": [
                {
                    "cefr": "A1",
                    "en": "I like autumn.",
                    "tr": "Sonbaharı severim.",
                    "grammar_focus": "Present Simple"
                },
                {
                    "cefr": "A2",
                    "en": "It rains a lot in autumn.",
                    "tr": "Sonbaharda çok yağmur yağar.",
                    "grammar_focus": "Impersonal 'It' + Adverb of Frequency"
                },
                {
                    "cefr": "B1",
                    "en": "Autumn is the best season for hiking.",
                    "tr": "Sonbahar, doğa yürüyüşü için en iyi mevsimdir.",
                    "grammar_focus": "Superlative (best)"
                },
                {
                    "cefr": "B2",
                    "en": "The autumnal equinox occurs in September.",
                    "tr": "Sonbahar ekinoksu Eylül ayında gerçekleşir.",
                    "grammar_focus": "Scientific Vocabulary (equinox)"
                },
                {
                    "cefr": "C1",
                    "en": "The forest was ablaze with autumnal colors.",
                    "tr": "Orman, sonbahar renkleriyle alev alevdi (kıp kırmızıydı).",
                    "grammar_focus": "Descriptive/Literary (ablaze)"
                }
            ]
        },
        "morphology_tree": {
            "root": "Autumnus (Latin)",
            "family_members": [
                { "word": "autumn", "pos": "n", "level": "A1", "note": "sonbahar" },
                { "word": "autumnal", "pos": "adj", "level": "C1", "note": "sonbahara ait, hazin" },
                { "word": "fall", "pos": "n", "level": "A1", "note": "sonbahar (US - yaprakların düşmesinden)" },
                { "word": "harvest", "pos": "n", "level": "B1", "note": "hasat (sonbahar aktivitesi)" }
            ]
        },
        "collocations": {
            "modifiers_adverbs": [
                { "word": "late / early", "example": "late autumn (sonbahar sonu)" },
                { "word": "golden", "example": "golden autumn (altın sonbahar - güneşli ve sarı)" },
                { "word": "crisp", "example": "crisp autumn morning (serin ve taze sonbahar sabahı)" }
            ],
            "verbs_preceding": [
                { "word": "arrive", "example": "autumn arrived (sonbahar geldi)" },
                { "word": "turn into", "example": "turn into autumn (sonbahara dönmek)" }
            ]
        },
        "lexical_nuance": {
            "synonym_scale": {
                "concept": "Third Season",
                "turkishConcept": "Üçüncü Mevsim",
                "scale": [
                    {
                        "word": "fall",
                        "value": 5,
                        "turkish": "sonbahar (US)",
                        "note": "Amerikan, daha gündelik ('Fall of the leaf' kısaltması)",
                        "strength": "Gündelik"
                    },
                    {
                        "word": "autumn",
                        "value": 7,
                        "turkish": "sonbahar (UK/US)",
                        "note": "İngiliz (standart), Amerikan (daha şık/resmi)",
                        "strength": "Standart/Şık"
                    },
                    {
                        "word": "harvest",
                        "value": 8,
                        "turkish": "hasat zamanı",
                        "note": "Eskiden mevsimin adı 'Harvest' idi (Old English)",
                        "strength": "Tarihi/Kırsal"
                    }
                ]
            },
            "antonyms": [
                {
                    "word": "spring",
                    "value": 1,
                    "turkish": "ilkbahar",
                    "note": "Doğanın uyanışı vs uykuya dalışı"
                }
            ]
        },
        "pragmatics": {
            "idioms_and_phrases": [
                {
                    "phrase": "autumn years",
                    "meaning_tr": "yaşlılık yılları, ömrün sonbaharı",
                    "register": "polite/literary"
                },
                {
                    "phrase": "Indian summer",
                    "meaning_tr": "pastırma yazı (sonbaharda aniden ısınan hava)",
                    "register": "idiomatic"
                }
            ],
            "sociolinguistics": {
                "topic": "Seasonal Affective Disorder (SAD)",
                "note_en": "In autumn, as days get shorter, some people experience low mood. This cultural/medical phenomenon is often linked to the 'autumn blues'.",
                "note_tr": "Sonbaharda günlerin kısalmasıyla gelen melankoli veya depresyon hali."
            }
        },
        "pedagogy_engine": {
            "common_errors": [
                {
                    "error_id": "err_capitalization",
                    "incorrect": "I love Autumn.",
                    "correction": "I love autumn.",
                    "explanation": "Mevsim isimleri İngilizcede (özel bir şiirsel kişileştirme yoksa) büyük harfle yazılmaz."
                },
                {
                    "error_id": "err_pronunciation_n",
                    "incorrect": "Pronouncing the 'n' at the end.",
                    "correction": "Silent 'n' (/ˈɔː.təm/)",
                    "explanation": "Kelimenin sonundaki 'n' harfi okunmaz (Silent N). Yanlış: 'O-tumn'. Doğru: 'O-tım'."
                }
            ],
            "exam_prep": {
                "ielts_tag": "Nature & Weather",
                "tip": "Essay yazarken 'In the fall' yerine 'During the autumnal months' demek kelime hazinenizi gösterir.",
                "keywords": ["foliage", "deciduous", "migration"]
            },
            "gamification": {
                "challenge_type": "odd_one_out",
                "question": "Which word is NOT a season?",
                "answer": "Easter",
                "distractors": ["Autumn", "Winter", "Spring"]
            }
        },
        "word_journey": {
            "timeline": [
                { "era": "Etruscan/Latin", "word": "Autumnus", "meaning": "drying up season?" },
                { "era": "Old French", "word": "autompne", "meaning": "autumn" },
                { "era": "16th Century", "word": "Fall", "meaning": "short for 'fall of the leaf' (became US standard)" }
            ],
            "turkish_cognate_hint": {
                "word": "Hasat? (Hayır) / Ot (Belki)",
                "connection_type": "False Friend / None",
                "story": "Autumn kelimesinin kökeni belirsizdir ama Türkçedeki 'Güz' kelimesi kadar melankoliktir. İngilizcedeki 'Fall' (Düşmek) kelimesini hatırlamak kolaydır: Yapraklar DÜŞÜYOR. Autumn içindeki 'n' harfinin okunmaması (Silent N), 'Hymn' (İlahi) veya 'Column' (Kolon) kelimelerindeki gibidir.",
                "example": "Column -> Autumn (Sessiz N kardeşliği)."
            }
        },
        "stories": {
            "A1": {
                "tr": "Bak, ağaçlar değişiyor. Yapraklar kırmızı ve sarı. Hava biraz soğuk. Rüzgar esiyor. Bu <strong>sonbahar</strong>. Ceketimi giyiyorum. Parkta yürüyoruz.",
                "en": "Look, the trees are changing. The leaves are red and yellow. The weather is a little cold. The wind is blowing. It is <strong>autumn</strong>. I put on my jacket. We are walking in the park."
            },
            "A2": {
                "tr": "<strong>Sonbahar</strong>da okullar açılır. Yaz tatili biter. Ben yeni defterler ve kalemler alırım. Eylül, Ekim ve Kasım <strong>sonbahar</strong> aylarıdır. Kuşlar sıcak ülkelere uçar. Biz evde sıcak çikolata içeriz.",
                "en": "Schools open in <strong>autumn</strong>. Summer vacation ends. I buy new notebooks and pencils. September, October, and November are the <strong>autumn</strong> months. Birds fly to warm countries. We drink hot chocolate at home."
            },
            "B1": {
                "tr": "Çiftçiler için <strong>sonbahar</strong> çok meşgul bir zamandır. Buna 'hasat zamanı' derler. Elmalar ve kabaklar toplanmaya hazırdır. Cadılar Bayramı (Halloween) <strong>sonbahar</strong>da kutlanır. İnsanlar evlerini turuncu balkabakları ile süslerler. Doğa uyumaya hazırlanır.",
                "en": "For farmers, <strong>autumn</strong> is a very busy time. They call it 'harvest time'. Apples and pumpkins are ready to be picked. Halloween is celebrated in <strong>autumn</strong>. People decorate their houses with orange pumpkins. Nature prepares to sleep."
            },
            "B2": {
                "tr": "İngiltere'de 'Winter is coming' (Kış geliyor) hissi <strong>sonbahar</strong>da başlar. Amerikalılar buna 'Fall' der çünkü yapraklar ağaçlardan düşer (fall). İki kelime de doğrudur. Bence <strong>sonbahar</strong> en romantik mevsimdir. Hava ne çok sıcak ne de çok soğuktur, tam kitap okuma havasıdır.",
                "en": "In England, the feeling that 'Winter is coming' starts in <strong>autumn</strong>. Americans call it 'Fall' because leaves fall from the trees. Both words are correct. I think <strong>autumn</strong> is the most romantic season. The weather is neither too hot nor too cold, it is perfect weather for reading books."
            },
            "C1": {
                "tr": "Bazen Kasım ayında hava aniden ısınır; güneş parlar ve sanki yaz geri gelmiş gibi hissedersiniz. Buna 'Pastırma Yazı' (Indian Summer) denir. Bu, kışın acı soğuğundan önceki son hediyedir. <strong>Sonbahar</strong>ın bu geçici sıcaklığı, doğanın bize sunduğu tatlı bir aldatmacadır.",
                "en": "Sometimes in November, the weather suddenly warms up; the sun shines and you feel as if summer has returned. This is called 'Indian Summer'. This is the last gift before the bitter cold of winter. This transient warmth of <strong>autumn</strong> is a sweet deception nature offers us."
            },
            "C2": {
                "tr": "Edebiyatta <strong>sonbahar</strong>, genellikle melankoli ve olgunluk metaforu olarak kullanılır. John Keats, ünlü şiirinde onu 'sisler ve meyve dolu bereket mevsimi' olarak tanımlar. Gençliğin baharı bitmiştir, ama kışın ölümü henüz gelmemiştir. Bu, hayatın 'altın çağı'dır; tecrübenin hasat edildiği, dingin bir kabul dönemidir.",
                "en": "In literature, <strong>autumn</strong> is often used as a metaphor for melancholy and maturity. John Keats, in his famous ode, defines it as the 'season of mists and mellow fruitfulness'. Due spring of youth is over, but the death of winter has not yet arrived. This is the 'golden age' of life; a period of serene acceptance where experience is harvested."
            }
        }
    }
];
