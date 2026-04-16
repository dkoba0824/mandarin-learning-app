'use strict';

/**
 * hsk1-vocab.js
 * Complete HSK 1 vocabulary list — 150 words.
 * Each entry: { word, pinyin, english, type }
 * type: noun | verb | adj | adv | pron | num | mw | conj | prep | particle | interj
 */
const HSK1_VOCAB = [
  // ── Pronouns
  { word: "我",    pinyin: "wǒ",        english: "I / me",                   type: "pron" },
  { word: "你",    pinyin: "nǐ",        english: "you (singular)",           type: "pron" },
  { word: "您",    pinyin: "nín",       english: "you (polite)",             type: "pron" },
  { word: "他",    pinyin: "tā",        english: "he / him",                 type: "pron" },
  { word: "她",    pinyin: "tā",        english: "she / her",                type: "pron" },
  { word: "它",    pinyin: "tā",        english: "it",                       type: "pron" },
  { word: "我们",  pinyin: "wǒmen",     english: "we / us",                  type: "pron" },
  { word: "你们",  pinyin: "nǐmen",     english: "you (plural)",             type: "pron" },
  { word: "他们",  pinyin: "tāmen",     english: "they / them",              type: "pron" },
  { word: "这",    pinyin: "zhè",       english: "this",                     type: "pron" },
  { word: "那",    pinyin: "nà",        english: "that",                     type: "pron" },
  { word: "哪",    pinyin: "nǎ",        english: "which",                    type: "pron" },
  { word: "谁",    pinyin: "shéi",      english: "who",                      type: "pron" },
  { word: "什么",  pinyin: "shénme",    english: "what",                     type: "pron" },
  { word: "哪儿",  pinyin: "nǎr",       english: "where",                    type: "pron" },

  // ── Numbers & Quantity
  { word: "零",    pinyin: "líng",      english: "zero",                     type: "num" },
  { word: "一",    pinyin: "yī",        english: "one",                      type: "num" },
  { word: "二",    pinyin: "èr",        english: "two",                      type: "num" },
  { word: "三",    pinyin: "sān",       english: "three",                    type: "num" },
  { word: "四",    pinyin: "sì",        english: "four",                     type: "num" },
  { word: "五",    pinyin: "wǔ",        english: "five",                     type: "num" },
  { word: "六",    pinyin: "liù",       english: "six",                      type: "num" },
  { word: "七",    pinyin: "qī",        english: "seven",                    type: "num" },
  { word: "八",    pinyin: "bā",        english: "eight",                    type: "num" },
  { word: "九",    pinyin: "jiǔ",       english: "nine",                     type: "num" },
  { word: "十",    pinyin: "shí",       english: "ten",                      type: "num" },
  { word: "百",    pinyin: "bǎi",       english: "hundred",                  type: "num" },
  { word: "千",    pinyin: "qiān",      english: "thousand",                 type: "num" },
  { word: "几",    pinyin: "jǐ",        english: "how many / a few",         type: "num" },
  { word: "多少",  pinyin: "duōshao",   english: "how many / how much",      type: "num" },

  // ── Measure Words
  { word: "个",    pinyin: "gè",        english: "(general measure word)",   type: "mw" },
  { word: "本",    pinyin: "běn",       english: "volume (books)",           type: "mw" },
  { word: "杯",    pinyin: "bēi",       english: "cup / glass",              type: "mw" },
  { word: "岁",    pinyin: "suì",       english: "year of age",              type: "mw" },

  // ── Common Nouns — People
  { word: "人",    pinyin: "rén",       english: "person / people",          type: "noun" },
  { word: "名字",  pinyin: "míngzi",    english: "name",                     type: "noun" },
  { word: "学生",  pinyin: "xuéshēng",  english: "student",                  type: "noun" },
  { word: "老师",  pinyin: "lǎoshī",    english: "teacher",                  type: "noun" },
  { word: "医生",  pinyin: "yīshēng",   english: "doctor",                   type: "noun" },
  { word: "朋友",  pinyin: "péngyǒu",   english: "friend",                   type: "noun" },
  { word: "同学",  pinyin: "tóngxué",   english: "classmate",                type: "noun" },
  { word: "爸爸",  pinyin: "bàba",      english: "dad",                      type: "noun" },
  { word: "妈妈",  pinyin: "māmā",      english: "mom",                      type: "noun" },
  { word: "儿子",  pinyin: "érzi",      english: "son",                      type: "noun" },
  { word: "女儿",  pinyin: "nǚér",      english: "daughter",                 type: "noun" },

  // ── Common Nouns — Place
  { word: "家",    pinyin: "jiā",       english: "home / family",            type: "noun" },
  { word: "学校",  pinyin: "xuéxiào",   english: "school",                   type: "noun" },
  { word: "医院",  pinyin: "yīyuàn",    english: "hospital",                 type: "noun" },
  { word: "饭店",  pinyin: "fàndiàn",   english: "restaurant / hotel",       type: "noun" },
  { word: "超市",  pinyin: "chāoshì",   english: "supermarket",              type: "noun" },
  { word: "商店",  pinyin: "shāngdiàn", english: "shop / store",             type: "noun" },
  { word: "中国",  pinyin: "Zhōngguó",  english: "China",                    type: "noun" },
  { word: "北京",  pinyin: "Běijīng",   english: "Beijing",                  type: "noun" },
  { word: "上海",  pinyin: "Shànghǎi",  english: "Shanghai",                 type: "noun" },

  // ── Common Nouns — Direction / Position
  { word: "前面",  pinyin: "qiánmian",  english: "front / ahead",            type: "noun" },
  { word: "后面",  pinyin: "hòumian",   english: "back / behind",            type: "noun" },
  { word: "上面",  pinyin: "shàngmian", english: "above / on top",           type: "noun" },
  { word: "下面",  pinyin: "xiàmian",   english: "below / under",            type: "noun" },
  { word: "里",    pinyin: "lǐ",        english: "inside",                   type: "noun" },

  // ── Common Nouns — Time
  { word: "年",    pinyin: "nián",      english: "year",                     type: "noun" },
  { word: "月",    pinyin: "yuè",       english: "month",                    type: "noun" },
  { word: "号",    pinyin: "hào",       english: "day (of month) / number",  type: "noun" },
  { word: "星期",  pinyin: "xīngqī",    english: "week / weekday",           type: "noun" },
  { word: "今天",  pinyin: "jīntiān",   english: "today",                    type: "noun" },
  { word: "明天",  pinyin: "míngtiān",  english: "tomorrow",                 type: "noun" },
  { word: "昨天",  pinyin: "zuótiān",   english: "yesterday",                type: "noun" },
  { word: "上午",  pinyin: "shàngwǔ",   english: "morning (AM)",             type: "noun" },
  { word: "下午",  pinyin: "xiàwǔ",     english: "afternoon",                type: "noun" },
  { word: "中午",  pinyin: "zhōngwǔ",   english: "noon / midday",            type: "noun" },
  { word: "时候",  pinyin: "shíhòu",    english: "time / moment (when)",     type: "noun" },
  { word: "现在",  pinyin: "xiànzài",   english: "now",                      type: "noun" },
  { word: "点",    pinyin: "diǎn",      english: "o'clock / point",          type: "noun" },

  // ── Common Nouns — Objects / Things
  { word: "东西",  pinyin: "dōngxi",    english: "thing(s)",                 type: "noun" },
  { word: "书",    pinyin: "shū",       english: "book",                     type: "noun" },
  { word: "字",    pinyin: "zì",        english: "character / word",         type: "noun" },
  { word: "钱",    pinyin: "qián",      english: "money",                    type: "noun" },
  { word: "桌子",  pinyin: "zhuōzi",    english: "table / desk",             type: "noun" },
  { word: "椅子",  pinyin: "yǐzi",      english: "chair",                    type: "noun" },
  { word: "衣服",  pinyin: "yīfu",      english: "clothes",                  type: "noun" },
  { word: "杯子",  pinyin: "bēizi",     english: "cup",                      type: "noun" },
  { word: "电视",  pinyin: "diànshì",   english: "television",               type: "noun" },
  { word: "电脑",  pinyin: "diànnǎo",   english: "computer",                 type: "noun" },
  { word: "电话",  pinyin: "diànhuà",   english: "telephone",                type: "noun" },

  // ── Common Nouns — Nature & Weather
  { word: "天气",  pinyin: "tiānqì",    english: "weather",                  type: "noun" },
  { word: "雨",    pinyin: "yǔ",        english: "rain",                     type: "noun" },

  // ── Common Nouns — Food & Drink
  { word: "水",    pinyin: "shuǐ",      english: "water",                    type: "noun" },
  { word: "茶",    pinyin: "chá",       english: "tea",                      type: "noun" },
  { word: "米饭",  pinyin: "mǐfàn",     english: "rice (cooked)",            type: "noun" },
  { word: "水果",  pinyin: "shuǐguǒ",   english: "fruit",                    type: "noun" },
  { word: "苹果",  pinyin: "píngguǒ",   english: "apple",                    type: "noun" },
  { word: "猫",    pinyin: "māo",       english: "cat",                      type: "noun" },
  { word: "狗",    pinyin: "gǒu",       english: "dog",                      type: "noun" },

  // ── Transport
  { word: "出租车", pinyin: "chūzūchē", english: "taxi",                     type: "noun" },

  // ── Language
  { word: "汉语",  pinyin: "Hànyǔ",     english: "Chinese (language)",       type: "noun" },

  // ── Verbs
  { word: "是",    pinyin: "shì",       english: "to be",                    type: "verb" },
  { word: "有",    pinyin: "yǒu",       english: "to have / there is",       type: "verb" },
  { word: "在",    pinyin: "zài",       english: "to be at / located at",    type: "verb" },
  { word: "喜欢",  pinyin: "xǐhuān",    english: "to like",                  type: "verb" },
  { word: "想",    pinyin: "xiǎng",     english: "to want / to think",       type: "verb" },
  { word: "要",    pinyin: "yào",       english: "to want / to need (will)", type: "verb" },
  { word: "会",    pinyin: "huì",       english: "can / to know how to",     type: "verb" },
  { word: "能",    pinyin: "néng",      english: "can / to be able to",      type: "verb" },
  { word: "叫",    pinyin: "jiào",      english: "to be called / to call",   type: "verb" },
  { word: "来",    pinyin: "lái",       english: "to come",                  type: "verb" },
  { word: "去",    pinyin: "qù",        english: "to go",                    type: "verb" },
  { word: "回",    pinyin: "huí",       english: "to return",                type: "verb" },
  { word: "说",    pinyin: "shuō",      english: "to speak / to say",        type: "verb" },
  { word: "听",    pinyin: "tīng",      english: "to listen",                type: "verb" },
  { word: "看",    pinyin: "kàn",       english: "to look / to read / to watch", type: "verb" },
  { word: "写",    pinyin: "xiě",       english: "to write",                 type: "verb" },
  { word: "读",    pinyin: "dú",        english: "to read (aloud)",          type: "verb" },
  { word: "学习",  pinyin: "xuéxí",     english: "to study / to learn",      type: "verb" },
  { word: "工作",  pinyin: "gōngzuò",   english: "to work / work (n.)",      type: "verb" },
  { word: "睡觉",  pinyin: "shuìjiào",  english: "to sleep",                 type: "verb" },
  { word: "认识",  pinyin: "rènshi",    english: "to know / to recognize",   type: "verb" },
  { word: "知道",  pinyin: "zhīdào",    english: "to know",                  type: "verb" },
  { word: "吃",    pinyin: "chī",       english: "to eat",                   type: "verb" },
  { word: "喝",    pinyin: "hē",        english: "to drink",                 type: "verb" },
  { word: "买",    pinyin: "mǎi",       english: "to buy",                   type: "verb" },
  { word: "坐",    pinyin: "zuò",       english: "to sit / to take (transport)", type: "verb" },
  { word: "住",    pinyin: "zhù",       english: "to live / to reside",      type: "verb" },
  { word: "爱",    pinyin: "ài",        english: "to love",                  type: "verb" },
  { word: "打电话", pinyin: "dǎ diànhuà", english: "to make a phone call",  type: "verb" },
  { word: "下雨",  pinyin: "xià yǔ",    english: "to rain",                  type: "verb" },

  // ── Adjectives
  { word: "好",    pinyin: "hǎo",       english: "good",                     type: "adj" },
  { word: "大",    pinyin: "dà",        english: "big",                      type: "adj" },
  { word: "小",    pinyin: "xiǎo",      english: "small",                    type: "adj" },
  { word: "多",    pinyin: "duō",       english: "many / much",              type: "adj" },
  { word: "少",    pinyin: "shǎo",      english: "few / little",             type: "adj" },
  { word: "高",    pinyin: "gāo",       english: "tall / high",              type: "adj" },
  { word: "冷",    pinyin: "lěng",      english: "cold",                     type: "adj" },
  { word: "热",    pinyin: "rè",        english: "hot",                      type: "adj" },
  { word: "漂亮",  pinyin: "piàoliang", english: "beautiful / pretty",       type: "adj" },
  { word: "高兴",  pinyin: "gāoxìng",   english: "happy",                    type: "adj" },

  // ── Adverbs
  { word: "不",    pinyin: "bù",        english: "not (negation)",           type: "adv" },
  { word: "没",    pinyin: "méi",       english: "not (have / past neg.)",   type: "adv" },
  { word: "很",    pinyin: "hěn",       english: "very",                     type: "adv" },
  { word: "太",    pinyin: "tài",       english: "too / excessively",        type: "adv" },
  { word: "都",    pinyin: "dōu",       english: "all / both",               type: "adv" },
  { word: "也",    pinyin: "yě",        english: "also / too",               type: "adv" },
  { word: "还",    pinyin: "hái",       english: "still / also",             type: "adv" },
  { word: "就",    pinyin: "jiù",       english: "then / right away / just", type: "adv" },
  { word: "再",    pinyin: "zài",       english: "again",                    type: "adv" },
  { word: "一点",  pinyin: "yīdiǎn",    english: "a little bit",             type: "adv" },
  { word: "一些",  pinyin: "yīxiē",     english: "some / a few",             type: "adv" },
  { word: "每",    pinyin: "měi",       english: "every / each",             type: "adv" },

  // ── Particles
  { word: "吗",    pinyin: "ma",        english: "(yes/no question marker)", type: "particle" },
  { word: "呢",    pinyin: "ne",        english: "(question / continuation mark)", type: "particle" },
  { word: "吧",    pinyin: "ba",        english: "(suggestion / assumption)", type: "particle" },
  { word: "了",    pinyin: "le",        english: "(completion / change of state)", type: "particle" },
  { word: "的",    pinyin: "de",        english: "(possession / modifier mark)", type: "particle" },
  { word: "地",    pinyin: "de",        english: "(adverbial marker)",       type: "particle" },
  { word: "得",    pinyin: "de",        english: "(degree/result complement)", type: "particle" },

  // ── Conjunctions / Prepositions
  { word: "和",    pinyin: "hé",        english: "and",                      type: "conj" },
  { word: "但是",  pinyin: "dànshì",    english: "but",                      type: "conj" },
  { word: "因为",  pinyin: "yīnwèi",    english: "because",                  type: "conj" },
  { word: "所以",  pinyin: "suǒyǐ",     english: "so / therefore",           type: "conj" },

  // ── Polite expressions / common phrases
  { word: "请",    pinyin: "qǐng",      english: "please / to invite",       type: "verb" },
  { word: "谢谢",  pinyin: "xièxiè",    english: "thank you",                type: "interj" },
  { word: "对不起", pinyin: "duìbuqǐ",  english: "sorry",                    type: "interj" },
  { word: "再见",  pinyin: "zàijiàn",   english: "goodbye",                  type: "interj" },
  { word: "你好",  pinyin: "nǐ hǎo",    english: "hello",                    type: "interj" },
  { word: "不客气", pinyin: "bù kèqi",  english: "you're welcome",           type: "interj" },
];
