// HSK1 Sentence Deck
// Each entry: english, characters, pinyin, pattern (grammar note), category
// Expand later: add hsk2, hsk3 arrays or new entries here

const SENTENCES = [

  // ─── INTRODUCTIONS ───────────────────────────────────────────────────────
  {
    english: "I am a student.",
    characters: "我是学生。",
    pinyin: "Wǒ shì xuéshēng.",
    pattern: "Subject + 是 + Noun  →  identity/role",
    category: "Introductions"
  },
  {
    english: "Are you a student?",
    characters: "你是学生吗？",
    pinyin: "Nǐ shì xuéshēng ma?",
    pattern: "Statement + 吗？  →  yes/no question",
    category: "Introductions"
  },
  {
    english: "What is your name?",
    characters: "你叫什么名字？",
    pinyin: "Nǐ jiào shénme míngzi?",
    pattern: "你叫什么名字？  →  fixed \"What's your name?\" phrase",
    category: "Introductions"
  },
  {
    english: "My name is Wang Ming.",
    characters: "我叫王明。",
    pinyin: "Wǒ jiào Wáng Míng.",
    pattern: "我叫 + name  →  \"I am called…\"",
    category: "Introductions"
  },
  {
    english: "He is my teacher.",
    characters: "他是我的老师。",
    pinyin: "Tā shì wǒ de lǎoshī.",
    pattern: "Subject + 是 + Possessive + Noun",
    category: "Introductions"
  },
  {
    english: "I am not a doctor.",
    characters: "我不是医生。",
    pinyin: "Wǒ bú shì yīshēng.",
    pattern: "Subject + 不是 + Noun  →  negating identity",
    category: "Introductions"
  },
  {
    english: "Nice to meet you.",
    characters: "认识你很高兴。",
    pinyin: "Rènshi nǐ hěn gāoxìng.",
    pattern: "Verb-phrase + 很 + Adjective",
    category: "Introductions"
  },

  // ─── GREETINGS ────────────────────────────────────────────────────────────
  {
    english: "How are you?",
    characters: "你好吗？",
    pinyin: "Nǐ hǎo ma?",
    pattern: "Statement + 吗？  →  yes/no question",
    category: "Greetings"
  },
  {
    english: "I am very well, thank you.",
    characters: "我很好，谢谢。",
    pinyin: "Wǒ hěn hǎo, xièxiè.",
    pattern: "Subject + 很 + Adjective  →  degree adverb 很",
    category: "Greetings"
  },
  {
    english: "And you?",
    characters: "你呢？",
    pinyin: "Nǐ ne?",
    pattern: "Pronoun + 呢  →  returning a question",
    category: "Greetings"
  },
  {
    english: "Goodbye!",
    characters: "再见！",
    pinyin: "Zàijiàn!",
    pattern: "Fixed farewell expression",
    category: "Greetings"
  },
  {
    english: "The weather today is very nice.",
    characters: "今天天气很好。",
    pinyin: "Jīntiān tiānqì hěn hǎo.",
    pattern: "Time + Subject + 很 + Adjective  →  time moves to front",
    category: "Greetings"
  },
  {
    english: "Today is too cold.",
    characters: "今天太冷了。",
    pinyin: "Jīntiān tài lěng le.",
    pattern: "Subject + 太 + Adj + 了  →  \"excessively\"",
    category: "Greetings"
  },

  // ─── LOCATION ─────────────────────────────────────────────────────────────
  {
    english: "I am at home.",
    characters: "我在家。",
    pinyin: "Wǒ zài jiā.",
    pattern: "Subject + 在 + Location",
    category: "Location"
  },
  {
    english: "Where is the hospital?",
    characters: "医院在哪儿？",
    pinyin: "Yīyuàn zài nǎr?",
    pattern: "Subject + 在哪儿？  →  location question",
    category: "Location"
  },
  {
    english: "The hospital is ahead.",
    characters: "医院在前面。",
    pinyin: "Yīyuàn zài qiánmian.",
    pattern: "Subject + 在 + Location word (前面/后面/上面/下面)",
    category: "Location"
  },
  {
    english: "The school is behind.",
    characters: "学校在后面。",
    pinyin: "Xuéxiào zài hòumian.",
    pattern: "Subject + 在 + Location word",
    category: "Location"
  },
  {
    english: "The book is on the table.",
    characters: "书在桌子上。",
    pinyin: "Shū zài zhuōzi shàng.",
    pattern: "Subject + 在 + Place + 上/下/里  →  precise position",
    category: "Location"
  },
  {
    english: "Excuse me, where is the restaurant?",
    characters: "请问，饭店在哪儿？",
    pinyin: "Qǐngwèn, fàndiàn zài nǎr?",
    pattern: "请问 + location question  →  polite opener",
    category: "Location"
  },
  {
    english: "I take a taxi to school.",
    characters: "我坐出租车去学校。",
    pinyin: "Wǒ zuò chūzūchē qù xuéxiào.",
    pattern: "Subject + 坐 + Vehicle + 去 + Destination",
    category: "Location"
  },

  // ─── FOOD & DRINK ─────────────────────────────────────────────────────────
  {
    english: "I want to drink tea.",
    characters: "我想喝茶。",
    pinyin: "Wǒ xiǎng hē chá.",
    pattern: "Subject + 想 + Verb + Object  →  \"want to do\"",
    category: "Food & Drink"
  },
  {
    english: "I don't drink water.",
    characters: "我不喝水。",
    pinyin: "Wǒ bù hē shuǐ.",
    pattern: "Subject + 不 + Verb + Object  →  habitual negation",
    category: "Food & Drink"
  },
  {
    english: "She likes to eat apples.",
    characters: "她喜欢吃苹果。",
    pinyin: "Tā xǐhuān chī píngguǒ.",
    pattern: "Subject + 喜欢 + Verb + Object  →  \"likes to do\"",
    category: "Food & Drink"
  },
  {
    english: "I eat rice every day.",
    characters: "我每天吃米饭。",
    pinyin: "Wǒ měitiān chī mǐfàn.",
    pattern: "Subject + Time + Verb + Object  →  time before verb",
    category: "Food & Drink"
  },
  {
    english: "Let's go to the restaurant to eat.",
    characters: "我们去饭店吃饭吧。",
    pinyin: "Wǒmen qù fàndiàn chī fàn ba.",
    pattern: "Subject + 去 + Place + Verb + Object + 吧  →  suggestion",
    category: "Food & Drink"
  },
  {
    english: "This cup of tea is very hot.",
    characters: "这杯茶很热。",
    pinyin: "Zhè bēi chá hěn rè.",
    pattern: "Demonstrative + Measure Word + Noun + 很 + Adjective",
    category: "Food & Drink"
  },
  {
    english: "I want to eat some fruit.",
    characters: "我想吃一些水果。",
    pinyin: "Wǒ xiǎng chī yīxiē shuǐguǒ.",
    pattern: "Subject + 想 + Verb + 一些 + Object  →  \"some/a few\"",
    category: "Food & Drink"
  },

  // ─── SHOPPING ─────────────────────────────────────────────────────────────
  {
    english: "There are many things in the supermarket.",
    characters: "超市里有很多东西。",
    pinyin: "Chāoshì lǐ yǒu hěn duō dōngxi.",
    pattern: "Location + 里 + 有 + Object  →  existential sentence",
    category: "Shopping"
  },
  {
    english: "I want to buy water.",
    characters: "我要买水。",
    pinyin: "Wǒ yào mǎi shuǐ.",
    pattern: "Subject + 要 + Verb + Object  →  intention / \"going to\"",
    category: "Shopping"
  },
  {
    english: "How much does this piece of clothing cost?",
    characters: "这件衣服多少钱？",
    pinyin: "Zhè jiàn yīfu duōshao qián?",
    pattern: "Subject + 多少钱？  →  asking the price",
    category: "Shopping"
  },
  {
    english: "This clothing is very beautiful.",
    characters: "这件衣服很漂亮。",
    pinyin: "Zhè jiàn yīfu hěn piàoliang.",
    pattern: "Subject + 很 + Adjective",
    category: "Shopping"
  },
  {
    english: "I want to buy this book.",
    characters: "我想买这本书。",
    pinyin: "Wǒ xiǎng mǎi zhè běn shū.",
    pattern: "Subject + 想 + Verb + Demonstrative + Measure Word + Noun",
    category: "Shopping"
  },

  // ─── TIME ─────────────────────────────────────────────────────────────────
  {
    english: "What time is it now?",
    characters: "现在几点？",
    pinyin: "Xiànzài jǐ diǎn?",
    pattern: "现在 + 几点？  →  asking the time",
    category: "Time"
  },
  {
    english: "What date is today?",
    characters: "今天是几号？",
    pinyin: "Jīntiān shì jǐ hào?",
    pattern: "今天是几号？  →  asking the date",
    category: "Time"
  },
  {
    english: "Tomorrow I am going to school.",
    characters: "我明天去学校。",
    pinyin: "Wǒ míngtiān qù xuéxiào.",
    pattern: "Subject + Time + 去 + Place  →  time inside the sentence",
    category: "Time"
  },
  {
    english: "I went to the hospital yesterday.",
    characters: "我昨天去了医院。",
    pinyin: "Wǒ zuótiān qùle yīyuàn.",
    pattern: "Subject + Time + Verb + 了 + Object  →  completed action",
    category: "Time"
  },
  {
    english: "Now it is afternoon.",
    characters: "现在是下午。",
    pinyin: "Xiànzài shì xiàwǔ.",
    pattern: "现在 + 是 + Time of day",
    category: "Time"
  },
  {
    english: "I will come back this afternoon.",
    characters: "我下午回来。",
    pinyin: "Wǒ xiàwǔ huí lái.",
    pattern: "Subject + Time + Verb + Directional complement",
    category: "Time"
  },

  // ─── FAMILY ───────────────────────────────────────────────────────────────
  {
    english: "My mom is at home.",
    characters: "我妈妈在家。",
    pinyin: "Wǒ māmā zài jiā.",
    pattern: "Possessive + Subject + 在 + Location",
    category: "Family"
  },
  {
    english: "My son is a student.",
    characters: "我儿子是学生。",
    pinyin: "Wǒ érzi shì xuéshēng.",
    pattern: "Possessive + Subject + 是 + Noun",
    category: "Family"
  },
  {
    english: "My dad loves me.",
    characters: "我爸爸爱我。",
    pinyin: "Wǒ bàba ài wǒ.",
    pattern: "Subject + 爱 + Object  →  \"love\" as a verb",
    category: "Family"
  },
  {
    english: "I love my family.",
    characters: "我爱我的家。",
    pinyin: "Wǒ ài wǒ de jiā.",
    pattern: "Subject + 爱 + Possessive + Object",
    category: "Family"
  },

  // ─── DAILY LIFE ───────────────────────────────────────────────────────────
  {
    english: "What is this?",
    characters: "这是什么？",
    pinyin: "Zhè shì shénme?",
    pattern: "这/那 + 是 + 什么？  →  asking about things",
    category: "Daily Life"
  },
  {
    english: "That apple is very big.",
    characters: "那个苹果很大。",
    pinyin: "Nàgè píngguǒ hěn dà.",
    pattern: "那/这 + 个 + Noun + 很 + Adjective",
    category: "Daily Life"
  },
  {
    english: "Who is that person?",
    characters: "那个人是谁？",
    pinyin: "Nàgè rén shì shéi?",
    pattern: "Subject + 是 + 谁？  →  \"Who is…?\"",
    category: "Daily Life"
  },
  {
    english: "I don't know.",
    characters: "我不知道。",
    pinyin: "Wǒ bù zhīdào.",
    pattern: "Subject + 不 + Verb  →  negating a verb",
    category: "Daily Life"
  },
  {
    english: "I have a cat.",
    characters: "我有一只猫。",
    pinyin: "Wǒ yǒu yī zhī māo.",
    pattern: "Subject + 有 + Number + Measure Word + Noun",
    category: "Daily Life"
  },
  {
    english: "They are all my classmates.",
    characters: "他们都是我的同学。",
    pinyin: "Tāmen dōu shì wǒ de tóngxué.",
    pattern: "Subject + 都 + Verb  →  \"all/both\" for totality",
    category: "Daily Life"
  },
  {
    english: "I also like drinking tea.",
    characters: "我也喜欢喝茶。",
    pinyin: "Wǒ yě xǐhuān hē chá.",
    pattern: "Subject + 也 + Verb  →  \"also / too\"",
    category: "Daily Life"
  },
  {
    english: "He can speak Chinese.",
    characters: "他会说汉语。",
    pinyin: "Tā huì shuō Hànyǔ.",
    pattern: "Subject + 会 + Verb  →  learned ability",
    category: "Daily Life"
  },
  {
    english: "I like watching TV.",
    characters: "我喜欢看电视。",
    pinyin: "Wǒ xǐhuān kàn diànshì.",
    pattern: "Subject + 喜欢 + Verb + Object",
    category: "Daily Life"
  },
  {
    english: "I am studying Chinese.",
    characters: "我在学习汉语。",
    pinyin: "Wǒ zài xuéxí Hànyǔ.",
    pattern: "Subject + 在 + Verb  →  ongoing / in-progress action",
    category: "Daily Life"
  },

  // ─── INTRODUCTIONS (continued) ──────────────────────────────────────────
  {
    english: "She is my friend.",
    characters: "她是我的朋友。",
    pinyin: "Tā shì wǒ de péngyǒu.",
    pattern: "Subject + 是 + Possessive + Noun",
    category: "Introductions"
  },
  {
    english: "Are you Chinese?",
    characters: "你是中国人吗？",
    pinyin: "Nǐ shì Zhōngguó rén ma?",
    pattern: "Statement + 吗？  →  yes/no question",
    category: "Introductions"
  },
  {
    english: "We are classmates.",
    characters: "我们是同学。",
    pinyin: "Wǒmen shì tóngxué.",
    pattern: "Subject + 是 + Noun",
    category: "Introductions"
  },
  {
    english: "She is my daughter.",
    characters: "她是我的女儿。",
    pinyin: "Tā shì wǒ de nǚér.",
    pattern: "Possessive + Subject + 是 + Noun",
    category: "Introductions"
  },
  {
    english: "This is my friend Li Ming.",
    characters: "这是我的朋友李明。",
    pinyin: "Zhè shì wǒ de péngyǒu Lǐ Míng.",
    pattern: "这是 + Possessive + Noun + Name  →  introducing someone",
    category: "Introductions"
  },

  // ─── GREETINGS (continued) ────────────────────────────────────────────────
  {
    english: "It is raining today.",
    characters: "今天下雨了。",
    pinyin: "Jīntiān xià yǔ le.",
    pattern: "Time + Verb + 了  →  change of state: it has started raining",
    category: "Greetings"
  },
  {
    english: "It's too hot today!",
    characters: "今天太热了！",
    pinyin: "Jīntiān tài rè le!",
    pattern: "Subject + 太 + Adj + 了  →  \"excessively\"",
    category: "Greetings"
  },
  {
    english: "Sorry, I don't understand.",
    characters: "对不起，我不明白。",
    pinyin: "Duìbuqǐ, wǒ bù míngbái.",
    pattern: "对不起 + clause  →  apologizing then explaining  ★ HSK2: 明白",
    category: "Greetings"
  },
  {
    english: "You're welcome.",
    characters: "不客气。",
    pinyin: "Bù kèqi.",
    pattern: "Fixed polite response to 谢谢",
    category: "Greetings"
  },
  {
    english: "It doesn't matter.",
    characters: "没关系。",
    pinyin: "Méiguānxi.",
    pattern: "Fixed expression: \"Never mind / That's okay\"",
    category: "Greetings"
  },

  // ─── LOCATION (continued) ─────────────────────────────────────────────────
  {
    english: "I live in Beijing.",
    characters: "我住在北京。",
    pinyin: "Wǒ zhù zài Běijīng.",
    pattern: "Subject + 住在 + Place  →  permanent residence",
    category: "Location"
  },
  {
    english: "Where do you live?",
    characters: "你住在哪儿？",
    pinyin: "Nǐ zhù zài nǎr?",
    pattern: "Subject + 住在 + 哪儿？  →  asking where someone lives",
    category: "Location"
  },
  {
    english: "The cat is under the chair.",
    characters: "猫在椅子下面。",
    pinyin: "Māo zài yǐzi xiàmian.",
    pattern: "Subject + 在 + Place + 下面  →  below / under",
    category: "Location"
  },
  {
    english: "The store is not far.",
    characters: "商店不远。",
    pinyin: "Shāngdiàn bù yuǎn.",
    pattern: "Subject + 不 + Adjective  ★ HSK2: 远 (yuǎn = far)",
    category: "Location"
  },
  {
    english: "The school is very close.",
    characters: "学校很近。",
    pinyin: "Xuéxiào hěn jìn.",
    pattern: "Subject + 很 + Adjective  ★ HSK2: 近 (jìn = close)",
    category: "Location"
  },
  {
    english: "The dog is not at home.",
    characters: "狗不在家。",
    pinyin: "Gǒu bù zài jiā.",
    pattern: "Subject + 不在 + Location  →  negating presence",
    category: "Location"
  },
  {
    english: "How do I get to the hospital?",
    characters: "怎么去医院？",
    pinyin: "Zěnme qù yīyuàn?",
    pattern: "怎么 + 去 + Destination  →  \"How do I get to…?\"",
    category: "Location"
  },

  // ─── FOOD & DRINK (continued) ─────────────────────────────────────────────
  {
    english: "Do you want tea or coffee?",
    characters: "你想喝茶还是咖啡？",
    pinyin: "Nǐ xiǎng hē chá háishi kāfēi?",
    pattern: "A + 还是 + B  →  choice question (\"A or B?\")  ★ HSK2: 还是, 咖啡",
    category: "Food & Drink"
  },
  {
    english: "This dish is very delicious.",
    characters: "这道菜很好吃。",
    pinyin: "Zhè dào cài hěn hǎo chī.",
    pattern: "Demonstrative + 道 + 菜 + 很 + Adj  ★ HSK2: 菜 (cài = dish)",
    category: "Food & Drink"
  },
  {
    english: "I don't like this dish.",
    characters: "我不喜欢这道菜。",
    pinyin: "Wǒ bù xǐhuān zhè dào cài.",
    pattern: "Subject + 不喜欢 + Object  ★ HSK2: 菜 (cài)",
    category: "Food & Drink"
  },
  {
    english: "I am hungry.",
    characters: "我饿了。",
    pinyin: "Wǒ è le.",
    pattern: "Subject + Adj + 了  →  change of state  ★ HSK2: 饿 (è = hungry)",
    category: "Food & Drink"
  },
  {
    english: "I am thirsty.",
    characters: "我渴了。",
    pinyin: "Wǒ kě le.",
    pattern: "Subject + Adj + 了  →  change of state  ★ HSK2: 渴 (kě = thirsty)",
    category: "Food & Drink"
  },
  {
    english: "Mom is cooking.",
    characters: "妈妈在做饭。",
    pinyin: "Māmā zài zuò fàn.",
    pattern: "Subject + 在 + Verb  →  ongoing action",
    category: "Food & Drink"
  },
  {
    english: "I want a glass of water.",
    characters: "我要一杯水。",
    pinyin: "Wǒ yào yī bēi shuǐ.",
    pattern: "Subject + 要 + Number + Measure Word + Object",
    category: "Food & Drink"
  },
  {
    english: "I like to drink coffee.",
    characters: "我喜欢喝咖啡。",
    pinyin: "Wǒ xǐhuān hē kāfēi.",
    pattern: "Subject + 喜欢 + Verb + Object  ★ HSK2: 咖啡 (kāfēi = coffee)",
    category: "Food & Drink"
  },
  {
    english: "He eats a lot of fruit every day.",
    characters: "他每天吃很多水果。",
    pinyin: "Tā měitiān chī hěn duō shuǐguǒ.",
    pattern: "Subject + Time + Verb + 很多 + Object",
    category: "Food & Drink"
  },
  {
    english: "I want rice, not noodles.",
    characters: "我想吃米饭，不想吃面条。",
    pinyin: "Wǒ xiǎng chī mǐfàn, bù xiǎng chī miàntiáo.",
    pattern: "A + 不 + B  →  contrasting preference  ★ HSK2: 面条 (miàntiáo = noodles)",
    category: "Food & Drink"
  },
  {
    english: "The coffee is too hot.",
    characters: "咖啡太热了。",
    pinyin: "Kāfēi tài rè le.",
    pattern: "Subject + 太 + Adj + 了  ★ HSK2: 咖啡",
    category: "Food & Drink"
  },

  // ─── SHOPPING (continued) ─────────────────────────────────────────────────
  {
    english: "This is too expensive.",
    characters: "这太贵了。",
    pinyin: "Zhè tài guì le.",
    pattern: "Subject + 太 + Adj + 了  ★ HSK2: 贵 (guì = expensive)",
    category: "Shopping"
  },
  {
    english: "Is there anything cheaper?",
    characters: "有没有便宜一点的？",
    pinyin: "Yǒu méiyǒu piányí yīdiǎn de?",
    pattern: "有没有 + Adj + 一点的？  ★ HSK2: 便宜 (piányí = cheap)",
    category: "Shopping"
  },
  {
    english: "I have no money.",
    characters: "我没有钱。",
    pinyin: "Wǒ méiyǒu qián.",
    pattern: "Subject + 没有 + Object  →  not having something",
    category: "Shopping"
  },
  {
    english: "How many do you want?",
    characters: "你要几个？",
    pinyin: "Nǐ yào jǐ gè?",
    pattern: "Subject + 要 + 几 + Measure Word？  →  asking quantity",
    category: "Shopping"
  },
  {
    english: "I want to buy a new phone.",
    characters: "我想买一个新手机。",
    pinyin: "Wǒ xiǎng mǎi yīgè xīn shǒujī.",
    pattern: "Subject + 想 + 买 + Adj + Noun  ★ HSK2: 新 (new), 手机 (phone)",
    category: "Shopping"
  },
  {
    english: "Tea is cheaper than coffee.",
    characters: "茶比咖啡便宜。",
    pinyin: "Chá bǐ kāfēi piányí.",
    pattern: "A + 比 + B + Adj  →  comparison  ★ HSK2: 比 (bǐ), 便宜, 咖啡",
    category: "Shopping"
  },
  {
    english: "This computer is not cheap.",
    characters: "这台电脑不便宜。",
    pinyin: "Zhè tái diànnǎo bù piányí.",
    pattern: "Subject + 不 + Adjective  ★ HSK2: 便宜",
    category: "Shopping"
  },

  // ─── TIME (continued) ─────────────────────────────────────────────────────
  {
    english: "What day of the week is it today?",
    characters: "今天星期几？",
    pinyin: "Jīntiān xīngqī jǐ?",
    pattern: "今天 + 星期几？  →  asking the day of the week",
    category: "Time"
  },
  {
    english: "I am very busy this week.",
    characters: "这个星期我很忙。",
    pinyin: "Zhège xīngqī wǒ hěn máng.",
    pattern: "Time + Subject + 很 + Adj  ★ HSK2: 忙 (máng = busy)",
    category: "Time"
  },
  {
    english: "It's already noon.",
    characters: "已经中午了。",
    pinyin: "Yǐjīng zhōngwǔ le.",
    pattern: "已经 + Time + 了  →  \"It's already…\"  ★ HSK2: 已经 (yǐjīng = already)",
    category: "Time"
  },
  {
    english: "I get up at 7 every morning.",
    characters: "我每天早上七点起床。",
    pinyin: "Wǒ měitiān zǎoshang qī diǎn qǐchuáng.",
    pattern: "Subject + Time + 起床  ★ HSK2: 早上 (morning), 起床 (get up)",
    category: "Time"
  },
  {
    english: "She goes to work at 8 in the morning.",
    characters: "她早上八点上班。",
    pinyin: "Tā zǎoshang bā diǎn shàngbān.",
    pattern: "Subject + Time + 上班  ★ HSK2: 早上 (morning), 上班 (go to work)",
    category: "Time"
  },
  {
    english: "I go to bed late every night.",
    characters: "我每天晚上很晚睡觉。",
    pinyin: "Wǒ měitiān wǎnshang hěn wǎn shuìjiào.",
    pattern: "Subject + Time + Adj + Verb  ★ HSK2: 晚上 (wǎnshang = evening/night)",
    category: "Time"
  },
  {
    english: "I have class this morning.",
    characters: "我今天上午有课。",
    pinyin: "Wǒ jīntiān shàngwǔ yǒu kè.",
    pattern: "Subject + Time + 有 + Object  ★ HSK2: 课 (kè = class/lesson)",
    category: "Time"
  },
  {
    english: "Last year I studied in Beijing.",
    characters: "我去年在北京学习。",
    pinyin: "Wǒ qùnián zài Běijīng xuéxí.",
    pattern: "Subject + Time + 在 + Place + Verb  ★ HSK2: 去年 (last year)",
    category: "Time"
  },

  // ─── FAMILY (continued) ───────────────────────────────────────────────────
  {
    english: "My family has four people.",
    characters: "我家有四口人。",
    pinyin: "Wǒ jiā yǒu sì kǒu rén.",
    pattern: "Subject + 有 + Number + 口 + 人  →  口 = measure word for family members",
    category: "Family"
  },
  {
    english: "My daughter is very cute.",
    characters: "我女儿很可爱。",
    pinyin: "Wǒ nǚér hěn kě'ài.",
    pattern: "Subject + 很 + Adjective  ★ HSK2: 可爱 (kě'ài = cute)",
    category: "Family"
  },
  {
    english: "My older sister is a teacher.",
    characters: "我姐姐是老师。",
    pinyin: "Wǒ jiějie shì lǎoshī.",
    pattern: "Possessive + Subject + 是 + Noun  ★ HSK2: 姐姐 (older sister)",
    category: "Family"
  },
  {
    english: "My younger brother likes dogs.",
    characters: "我弟弟喜欢狗。",
    pinyin: "Wǒ dìdi xǐhuān gǒu.",
    pattern: "Possessive + Subject + 喜欢 + Object  ★ HSK2: 弟弟 (younger brother)",
    category: "Family"
  },
  {
    english: "I want to call my mom.",
    characters: "我想给妈妈打电话。",
    pinyin: "Wǒ xiǎng gěi māmā dǎ diànhuà.",
    pattern: "Subject + 想 + 给 + Person + 打电话  ★ HSK2: 给 (gěi = to/for)",
    category: "Family"
  },
  {
    english: "Her son is three years old.",
    characters: "她儿子三岁了。",
    pinyin: "Tā érzi sān suì le.",
    pattern: "Subject + Number + 岁 + 了  →  sharing age with change-of-state 了",
    category: "Family"
  },
  {
    english: "My friend's dad is a doctor.",
    characters: "我朋友的爸爸是医生。",
    pinyin: "Wǒ péngyǒu de bàba shì yīshēng.",
    pattern: "Possessive chain: A + 的 + B + 的 + C + 是 + Noun",
    category: "Family"
  },

  // ─── DAILY LIFE (continued) ───────────────────────────────────────────────
  {
    english: "I am tired.",
    characters: "我很累。",
    pinyin: "Wǒ hěn lèi.",
    pattern: "Subject + 很 + Adjective  ★ HSK2: 累 (lèi = tired)",
    category: "Daily Life"
  },
  {
    english: "He is very busy.",
    characters: "他很忙。",
    pinyin: "Tā hěn máng.",
    pattern: "Subject + 很 + Adjective  ★ HSK2: 忙 (máng = busy)",
    category: "Daily Life"
  },
  {
    english: "I don't have a dog.",
    characters: "我没有狗。",
    pinyin: "Wǒ méiyǒu gǒu.",
    pattern: "Subject + 没有 + Object  →  not having something",
    category: "Daily Life"
  },
  {
    english: "Can you speak Chinese?",
    characters: "你会说汉语吗？",
    pinyin: "Nǐ huì shuō Hànyǔ ma?",
    pattern: "Subject + 会 + Verb + Object + 吗？  →  ability + yes/no question",
    category: "Daily Life"
  },
  {
    english: "Please speak more slowly.",
    characters: "请说慢一点。",
    pinyin: "Qǐng shuō màn yīdiǎn.",
    pattern: "请 + Verb + Adj + 一点  →  polite request  ★ HSK2: 慢 (slow)",
    category: "Daily Life"
  },
  {
    english: "I am writing Chinese characters.",
    characters: "我在写汉字。",
    pinyin: "Wǒ zài xiě hànzì.",
    pattern: "Subject + 在 + Verb + Object  →  ongoing action",
    category: "Daily Life"
  },
  {
    english: "They are watching a movie.",
    characters: "他们在看电影。",
    pinyin: "Tāmen zài kàn diànyǐng.",
    pattern: "Subject + 在 + Verb + Object  →  ongoing action",
    category: "Daily Life"
  },
  {
    english: "I want to use the computer.",
    characters: "我想用电脑。",
    pinyin: "Wǒ xiǎng yòng diànnǎo.",
    pattern: "Subject + 想 + 用 + Object  ★ HSK2: 用 (yòng = to use)",
    category: "Daily Life"
  },
  {
    english: "Can I sit here?",
    characters: "我可以坐这儿吗？",
    pinyin: "Wǒ kěyǐ zuò zhèr ma?",
    pattern: "Subject + 可以 + Verb + Location + 吗？  ★ HSK2: 可以 (may/can)",
    category: "Daily Life"
  },
  {
    english: "We both like Chinese food.",
    characters: "我们都喜欢中国菜。",
    pinyin: "Wǒmen dōu xǐhuān Zhōngguó cài.",
    pattern: "Subject + 都 + 喜欢 + Object  ★ HSK2: 菜 (cài = food/dish)",
    category: "Daily Life"
  },
  {
    english: "Because it is raining, I don't want to go out.",
    characters: "因为下雨了，所以我不想出去。",
    pinyin: "Yīnwèi xià yǔ le, suǒyǐ wǒ bù xiǎng chūqù.",
    pattern: "因为…所以…  →  cause & effect  ★ HSK2: 因为, 所以, 出去",
    category: "Daily Life"
  },
  {
    english: "My older sister is taller than me.",
    characters: "我姐姐比我高。",
    pinyin: "Wǒ jiějie bǐ wǒ gāo.",
    pattern: "A + 比 + B + Adjective  →  A is more [adj] than B  ★ HSK2: 比, 姐姐",
    category: "Daily Life"
  },
  {
    english: "I have already done my homework.",
    characters: "我已经做完作业了。",
    pinyin: "Wǒ yǐjīng zuò wán zuòyè le.",
    pattern: "Subject + 已经 + Verb + 完 + Object + 了  ★ HSK2: 已经, 作业",
    category: "Daily Life"
  },

  // ─── TRAVEL ───────────────────────────────────────────────────────────────
  {
    english: "I want to fly to Beijing.",
    characters: "我想坐飞机去北京。",
    pinyin: "Wǒ xiǎng zuò fēijī qù Běijīng.",
    pattern: "Subject + 坐 + Vehicle + 去 + Destination  ★ HSK2: 飞机 (airplane)",
    category: "Travel"
  },
  {
    english: "The airplane is very fast.",
    characters: "飞机很快。",
    pinyin: "Fēijī hěn kuài.",
    pattern: "Subject + 很 + Adjective  ★ HSK2: 飞机 (airplane), 快 (fast)",
    category: "Travel"
  },
  {
    english: "The train is slower than the airplane.",
    characters: "火车比飞机慢。",
    pinyin: "Huǒchē bǐ fēijī màn.",
    pattern: "A + 比 + B + Adj  →  A is more [adj] than B  ★ HSK2: 比, 火车, 慢",
    category: "Travel"
  },
  {
    english: "I take the bus to school.",
    characters: "我坐公共汽车去学校。",
    pinyin: "Wǒ zuò gōnggòng qìchē qù xuéxiào.",
    pattern: "Subject + 坐 + Vehicle + 去 + Destination  ★ HSK2: 公共汽车 (bus)",
    category: "Travel"
  },
  {
    english: "Where are you going?",
    characters: "你去哪儿？",
    pinyin: "Nǐ qù nǎr?",
    pattern: "Subject + 去 + 哪儿？  →  destination question",
    category: "Travel"
  },
  {
    english: "I want to go to China.",
    characters: "我想去中国。",
    pinyin: "Wǒ xiǎng qù Zhōngguó.",
    pattern: "Subject + 想 + 去 + Country/Place",
    category: "Travel"
  },
  {
    english: "Do you want to travel to Beijing?",
    characters: "你想去北京旅游吗？",
    pinyin: "Nǐ xiǎng qù Běijīng lǚyóu ma?",
    pattern: "Subject + 想 + 去 + Place + 旅游 + 吗？  ★ HSK2: 旅游 (lǚyóu = travel)",
    category: "Travel"
  },
  {
    english: "Let's go together.",
    characters: "我们一起去吧。",
    pinyin: "Wǒmen yīqǐ qù ba.",
    pattern: "Subject + 一起 + Verb + 吧  →  suggestion  ★ HSK2: 一起 (yīqǐ = together)",
    category: "Travel"
  },
  {
    english: "How do you get to school?",
    characters: "你怎么去学校？",
    pinyin: "Nǐ zěnme qù xuéxiào?",
    pattern: "Subject + 怎么 + 去 + Place？  →  asking how to get somewhere",
    category: "Travel"
  },
  {
    english: "I have never been to Beijing.",
    characters: "我没去过北京。",
    pinyin: "Wǒ méi qù guò Běijīng.",
    pattern: "Subject + 没 + Verb + 过 + Object  →  never done something  ★ HSK2: 过",
    category: "Travel"
  },
  {
    english: "I went to China last year.",
    characters: "我去年去了中国。",
    pinyin: "Wǒ qùnián qùle Zhōngguó.",
    pattern: "Subject + Time + Verb + 了 + Object  ★ HSK2: 去年",
    category: "Travel"
  },

  // ─── WORK & SCHOOL ────────────────────────────────────────────────────────
  {
    english: "I go to work every day.",
    characters: "我每天去上班。",
    pinyin: "Wǒ měitiān qù shàngbān.",
    pattern: "Subject + Time + 去 + 上班  ★ HSK2: 上班 (shàngbān = go to work)",
    category: "Work & School"
  },
  {
    english: "My work is very busy.",
    characters: "我的工作很忙。",
    pinyin: "Wǒ de gōngzuò hěn máng.",
    pattern: "Subject + 很 + Adjective  ★ HSK2: 忙 (busy)",
    category: "Work & School"
  },
  {
    english: "I am looking for a job.",
    characters: "我在找工作。",
    pinyin: "Wǒ zài zhǎo gōngzuò.",
    pattern: "Subject + 在 + 找 + Object  ★ HSK2: 找 (zhǎo = to look for)",
    category: "Work & School"
  },
  {
    english: "Do you have homework?",
    characters: "你有作业吗？",
    pinyin: "Nǐ yǒu zuòyè ma?",
    pattern: "Subject + 有 + Object + 吗？  ★ HSK2: 作业 (zuòyè = homework)",
    category: "Work & School"
  },
  {
    english: "I don't understand this word.",
    characters: "我不明白这个字。",
    pinyin: "Wǒ bù míngbái zhège zì.",
    pattern: "Subject + 不 + Verb + Object  ★ HSK2: 明白 (míngbái = understand)",
    category: "Work & School"
  },
  {
    english: "The teacher is teaching us Chinese.",
    characters: "老师在教我们汉语。",
    pinyin: "Lǎoshī zài jiāo wǒmen Hànyǔ.",
    pattern: "Subject + 在 + 教 + Indirect Obj + Direct Obj  ★ HSK2: 教 (jiāo = teach)",
    category: "Work & School"
  },
  {
    english: "I study for two hours every day.",
    characters: "我每天学习两个小时。",
    pinyin: "Wǒ měitiān xuéxí liǎng gè xiǎoshí.",
    pattern: "Subject + Time + Verb + Duration  ★ HSK2: 两 (liǎng), 小时 (hour)",
    category: "Work & School"
  },
  {
    english: "I don't go to work today.",
    characters: "我今天不去上班。",
    pinyin: "Wǒ jīntiān bù qù shàngbān.",
    pattern: "Subject + Time + 不 + Verb  →  habitual negation",
    category: "Work & School"
  },
  {
    english: "The students are all studying very hard.",
    characters: "学生们都在认真学习。",
    pinyin: "Xuéshēngmen dōu zài rènzhēn xuéxí.",
    pattern: "Subject + 都 + 在 + Adv + Verb  ★ HSK2: 认真 (rènzhēn = seriously)",
    category: "Work & School"
  },
  {
    english: "Can you help me?",
    characters: "你可以帮我吗？",
    pinyin: "Nǐ kěyǐ bāng wǒ ma?",
    pattern: "Subject + 可以 + Verb + Object + 吗？  ★ HSK2: 可以 (can/may), 帮 (help)",
    category: "Work & School"
  },

  // ─── HEALTH ───────────────────────────────────────────────────────────────
  {
    english: "I feel unwell.",
    characters: "我不舒服。",
    pinyin: "Wǒ bù shūfu.",
    pattern: "Subject + 不 + Adjective  ★ HSK2: 舒服 (shūfu = comfortable/well)",
    category: "Health"
  },
  {
    english: "My health has not been good lately.",
    characters: "我最近身体不好。",
    pinyin: "Wǒ zuìjìn shēntǐ bù hǎo.",
    pattern: "Subject + Time + 身体 + 不好  ★ HSK2: 最近 (lately), 身体 (health)",
    category: "Health"
  },
  {
    english: "I want to go see a doctor.",
    characters: "我想去看医生。",
    pinyin: "Wǒ xiǎng qù kàn yīshēng.",
    pattern: "Subject + 想 + 去 + 看 + Person  →  chained verb phrase (serial verbs)",
    category: "Health"
  },
  {
    english: "He jogs every morning.",
    characters: "他每天早上跑步。",
    pinyin: "Tā měitiān zǎoshang pǎobù.",
    pattern: "Subject + Time + Verb  ★ HSK2: 早上 (morning), 跑步 (jog)",
    category: "Health"
  },
  {
    english: "She likes swimming.",
    characters: "她喜欢游泳。",
    pinyin: "Tā xǐhuān yóuyǒng.",
    pattern: "Subject + 喜欢 + Verb  ★ HSK2: 游泳 (yóuyǒng = swim)",
    category: "Health"
  },
  {
    english: "My head hurts.",
    characters: "我头疼。",
    pinyin: "Wǒ tóuténg.",
    pattern: "Subject + Body part + Verb/Adj  ★ HSK2: 头疼 (tóuténg = headache)",
    category: "Health"
  },
  {
    english: "Do you exercise every day?",
    characters: "你每天运动吗？",
    pinyin: "Nǐ měitiān yùndòng ma?",
    pattern: "Subject + Time + Verb + 吗？  ★ HSK2: 运动 (yùndòng = exercise)",
    category: "Health"
  },
  {
    english: "Exercise is good for your health.",
    characters: "运动对身体好。",
    pinyin: "Yùndòng duì shēntǐ hǎo.",
    pattern: "Subject + 对 + Noun + Adjective  ★ HSK2: 运动, 对 (for/to), 身体",
    category: "Health"
  },
  {
    english: "I sleep eight hours every night.",
    characters: "我每天晚上睡八个小时。",
    pinyin: "Wǒ měitiān wǎnshang shuì bā gè xiǎoshí.",
    pattern: "Subject + Time + Verb + Duration  ★ HSK2: 晚上, 小时 (hour)",
    category: "Health"
  },
  {
    english: "You should drink more water.",
    characters: "你应该多喝水。",
    pinyin: "Nǐ yīnggāi duō hē shuǐ.",
    pattern: "Subject + 应该 + Adv + Verb + Object  ★ HSK2: 应该 (yīnggāi = should)",
    category: "Health"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HSK 2  —  sentences tagged with level: "HSK2"
  // Covers the ~150 new words introduced at HSK2 (beyond the HSK1 base).
  // Patterns are called out in the note; 新词 marks key new vocabulary.
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── INTRODUCTIONS ────────────────────────────────────────────────────────
  {
    english: "Allow me to introduce my colleague to you.",
    characters: "我来介绍一下我的同事。",
    pinyin: "Wǒ lái jièshào yīxià wǒ de tóngshì.",
    pattern: "我来 + Verb + 一下  →  \"Let me briefly…\"  新词: 介绍 (introduce), 同事 (colleague)",
    category: "Introductions",
    level: "HSK2"
  },
  {
    english: "Hello Mr. Wang, very pleased to meet you.",
    characters: "您好，王先生，认识您很高兴。",
    pinyin: "Nín hǎo, Wáng xiānsheng, rènshi nín hěn gāoxìng.",
    pattern: "您 (formal you) vs 你 (casual)  新词: 您, 先生 (Mr./sir)",
    category: "Introductions",
    level: "HSK2"
  },
  {
    english: "My older brother is twenty-five years old this year.",
    characters: "我哥哥今年二十五岁了。",
    pinyin: "Wǒ gēgē jīnnián èrshíwǔ suì le.",
    pattern: "Subject + Time + Number + 岁 + 了  →  stating age with change-of-state 了  新词: 哥哥",
    category: "Introductions",
    level: "HSK2"
  },
  {
    english: "My younger sister is very interested in Chinese.",
    characters: "我妹妹对汉语很感兴趣。",
    pinyin: "Wǒ mèimei duì Hànyǔ hěn gǎn xìngqù.",
    pattern: "Subject + 对 + Topic + 感兴趣  →  \"to be interested in\"  新词: 妹妹, 兴趣",
    category: "Introductions",
    level: "HSK2"
  },
  {
    english: "She is a very famous teacher.",
    characters: "她是一位非常有名的老师。",
    pinyin: "Tā shì yī wèi fēicháng yǒumíng de lǎoshī.",
    pattern: "Subject + 是 + 一 + 位 + Adj + 的 + Noun  →  位 = polite measure word for people  新词: 位, 非常, 有名",
    category: "Introductions",
    level: "HSK2"
  },

  // ─── GREETINGS ────────────────────────────────────────────────────────────
  {
    english: "Have you been busy lately?",
    characters: "你最近忙吗？",
    pinyin: "Nǐ zuìjìn máng ma?",
    pattern: "Time + Adj + 吗？  →  yes/no question  新词: 最近 (recently), 忙 (busy)",
    category: "Greetings",
    level: "HSK2"
  },
  {
    english: "Although I'm very busy, I am still very happy.",
    characters: "虽然我很忙，但是我很高兴。",
    pinyin: "Suīrán wǒ hěn máng, dànshì wǒ hěn gāoxìng.",
    pattern: "虽然…但是…  →  \"although…(but)…\"  新词: 虽然, 但是",
    category: "Greetings",
    level: "HSK2"
  },
  {
    english: "If you have time, let's go out for dinner together.",
    characters: "如果你有时间，我们一起出去吃饭吧。",
    pinyin: "Rúguǒ nǐ yǒu shíjiān, wǒmen yīqǐ chūqù chī fàn ba.",
    pattern: "如果…(就/那)…  →  conditional  新词: 如果, 一起, 出去",
    category: "Greetings",
    level: "HSK2"
  },
  {
    english: "I'm sorry, could you please speak a bit more slowly?",
    characters: "对不起，请你说慢一点好吗？",
    pinyin: "Duìbuqǐ, qǐng nǐ shuō màn yīdiǎn hǎo ma?",
    pattern: "请 + Verb + Adj + 一点  →  polite request  新词: 慢 (slow)",
    category: "Greetings",
    level: "HSK2"
  },
  {
    english: "Happy birthday! I bought you a small gift.",
    characters: "生日快乐！我给你买了一个小礼物。",
    pinyin: "Shēngrì kuàilè! Wǒ gěi nǐ mǎile yīgè xiǎo lǐwù.",
    pattern: "给 + Person + Verb + Object  →  doing something for someone  新词: 生日, 给",
    category: "Greetings",
    level: "HSK2"
  },

  // ─── LOCATION ─────────────────────────────────────────────────────────────
  {
    english: "The subway station is very close to the school.",
    characters: "地铁站离学校很近。",
    pinyin: "Dìtiě zhàn lí xuéxiào hěn jìn.",
    pattern: "A + 离 + B + 很近/远  →  expressing distance between two places  新词: 地铁, 离",
    category: "Location",
    level: "HSK2"
  },
  {
    english: "The hotel is two kilometers from the airport.",
    characters: "宾馆离机场两公里。",
    pinyin: "Bīnguǎn lí jīchǎng liǎng gōnglǐ.",
    pattern: "A + 离 + B + Distance  新词: 宾馆, 机场, 两, 公里",
    category: "Location",
    level: "HSK2"
  },
  {
    english: "Go straight ahead and then turn left at the intersection.",
    characters: "一直往前走，然后在路口往左拐。",
    pinyin: "Yīzhí wǎng qián zǒu, ránhòu zài lùkǒu wǎng zuǒ guǎi.",
    pattern: "往 + Direction + Verb, 然后 + 往 + Direction  新词: 一直, 往, 然后, 左",
    category: "Location",
    level: "HSK2"
  },
  {
    english: "The supermarket is on the left, and the school is on the right.",
    characters: "超市在左边，学校在右边。",
    pinyin: "Chāoshì zài zuǒbiān, xuéxiào zài yòubiān.",
    pattern: "Subject + 在 + Direction + 边  新词: 左边 (left side), 右边 (right side)",
    category: "Location",
    level: "HSK2"
  },
  {
    english: "There is a convenience store next to the hotel.",
    characters: "宾馆旁边有一家便利店。",
    pinyin: "Bīnguǎn pángbiān yǒu yī jiā biànlìdiàn.",
    pattern: "Place + 旁边 + 有 + Object  →  existential sentence  新词: 旁边 (beside/next to)",
    category: "Location",
    level: "HSK2"
  },
  {
    english: "I take the subway to work every day because it is fast.",
    characters: "我每天坐地铁去上班，因为地铁很快。",
    pinyin: "Wǒ měitiān zuò dìtiě qù shàngbān, yīnwèi dìtiě hěn kuài.",
    pattern: "Clause, 因为 + Reason  新词: 地铁, 上班, 因为, 快",
    category: "Location",
    level: "HSK2"
  },

  // ─── FOOD & DRINK ─────────────────────────────────────────────────────────
  {
    english: "The waiter told me this dish is already sold out.",
    characters: "服务员告诉我这道菜已经卖完了。",
    pinyin: "Fúwùyuán gàosù wǒ zhè dào cài yǐjīng mài wán le.",
    pattern: "A + 告诉 + B + Clause  →  \"A tells B that…\"  新词: 服务员, 告诉, 卖, 已经",
    category: "Food & Drink",
    level: "HSK2"
  },
  {
    english: "I drink a glass of milk every morning before breakfast.",
    characters: "我每天早上吃早饭前喝一杯牛奶。",
    pinyin: "Wǒ měitiān zǎoshang chī zǎofàn qián hē yī bēi niúnǎi.",
    pattern: "Time + Verb + 前 + Verb  →  \"before doing X, do Y\"  新词: 早上, 牛奶",
    category: "Food & Drink",
    level: "HSK2"
  },
  {
    english: "If you don't like fish, you can order noodles instead.",
    characters: "如果你不喜欢鱼，可以点面条。",
    pinyin: "Rúguǒ nǐ bù xǐhuān yú, kěyǐ diǎn miàntiáo.",
    pattern: "如果…可以…  →  conditional + permission  新词: 如果, 鱼, 面条, 可以",
    category: "Food & Drink",
    level: "HSK2"
  },
  {
    english: "This fish is sweeter than that one.",
    characters: "这条鱼比那条鱼甜。",
    pinyin: "Zhè tiáo yú bǐ nà tiáo yú tián.",
    pattern: "A + 比 + B + Adjective  →  comparison  新词: 鱼, 比, 甜",
    category: "Food & Drink",
    level: "HSK2"
  },
  {
    english: "I want a bottle of beer and a plate of pork.",
    characters: "我要一瓶啤酒和一盘猪肉。",
    pinyin: "Wǒ yào yī píng píjiǔ hé yī pán zhūròu.",
    pattern: "Subject + 要 + Quantity + Object + 和 + Quantity + Object  新词: 啤酒, 猪肉",
    category: "Food & Drink",
    level: "HSK2"
  },
  {
    english: "This restaurant's dishes are made extremely well.",
    characters: "这家饭店的菜做得非常好。",
    pinyin: "Zhè jiā fàndiàn de cài zuò de fēicháng hǎo.",
    pattern: "Subject + Verb + 得 + Adverb + Adj  →  degree complement  新词: 非常",
    category: "Food & Drink",
    level: "HSK2"
  },
  {
    english: "I want to eat noodles today, not rice.",
    characters: "我今天想吃面条，不想吃米饭。",
    pinyin: "Wǒ jīntiān xiǎng chī miàntiáo, bù xiǎng chī mǐfàn.",
    pattern: "想 + A, 不想 + B  →  expressing preference by contrast  新词: 面条",
    category: "Food & Drink",
    level: "HSK2"
  },
  {
    english: "He has eaten Chinese food three times this week.",
    characters: "他这个星期吃了三次中国菜。",
    pinyin: "Tā zhège xīngqī chīle sān cì Zhōngguó cài.",
    pattern: "Subject + Verb + 了 + Number + 次 + Object  →  frequency  新词: 次 (time/occurrence)",
    category: "Food & Drink",
    level: "HSK2"
  },
  {
    english: "I think this cake is very sweet and very good.",
    characters: "我觉得这个蛋糕很甜，非常好吃。",
    pinyin: "Wǒ juéde zhège dàngāo hěn tián, fēicháng hǎo chī.",
    pattern: "我觉得 + Clause  →  \"I think / I feel…\"  新词: 觉得, 甜, 非常",
    category: "Food & Drink",
    level: "HSK2"
  },

  // ─── SHOPPING ─────────────────────────────────────────────────────────────
  {
    english: "These leather shoes are too expensive. Do you have cheaper ones?",
    characters: "这双皮鞋太贵了，有没有便宜一点的？",
    pinyin: "Zhè shuāng píxié tài guì le, yǒu méiyǒu piányí yīdiǎn de?",
    pattern: "太…了 + 有没有 + Adj + 一点的？  新词: 皮鞋, 贵, 便宜",
    category: "Shopping",
    level: "HSK2"
  },
  {
    english: "I need to buy a new backpack before school starts.",
    characters: "开学前我需要买一个新书包。",
    pinyin: "Kāixué qián wǒ xūyào mǎi yīgè xīn shūbāo.",
    pattern: "Time + 之前 + Subject + 需要 + Verb  新词: 需要, 新, 书包",
    category: "Shopping",
    level: "HSK2"
  },
  {
    english: "I want to exchange this hat for a smaller size.",
    characters: "我想把这顶帽子换成小一号的。",
    pinyin: "Wǒ xiǎng bǎ zhè dǐng màozi huàn chéng xiǎo yī hào de.",
    pattern: "把 + Object + Verb + 成 + Result  →  把-sentence with resultative  新词: 帽子, 换, 把",
    category: "Shopping",
    level: "HSK2"
  },
  {
    english: "How much is it altogether?",
    characters: "一共多少钱？",
    pinyin: "Yīgòng duōshao qián?",
    pattern: "一共 + 多少 + 钱？  →  asking the total price  新词: 一共 (altogether)",
    category: "Shopping",
    level: "HSK2"
  },
  {
    english: "I spent two hundred yuan buying this watch.",
    characters: "我花了两百元买这块手表。",
    pinyin: "Wǒ huāle liǎng bǎi yuán mǎi zhè kuài shǒubiǎo.",
    pattern: "花 + 了 + Amount + 买 + Object  →  spending money on something  新词: 花, 两, 元, 手表",
    category: "Shopping",
    level: "HSK2"
  },
  {
    english: "Tea is much cheaper than coffee.",
    characters: "茶比咖啡便宜多了。",
    pinyin: "Chá bǐ kāfēi piányí duō le.",
    pattern: "A + 比 + B + Adj + 多了  →  \"much more [adj] than B\"  新词: 比, 便宜",
    category: "Shopping",
    level: "HSK2"
  },
  {
    english: "I want to buy a new phone, so I need to save some money.",
    characters: "我想买新手机，所以需要存一些钱。",
    pinyin: "Wǒ xiǎng mǎi xīn shǒujī, suǒyǐ xūyào cún yīxiē qián.",
    pattern: "Cause + 所以 + Effect  新词: 所以, 手机, 需要, 新",
    category: "Shopping",
    level: "HSK2"
  },

  // ─── TIME ─────────────────────────────────────────────────────────────────
  {
    english: "My birthday is on the fifteenth of next month.",
    characters: "我的生日是下个月十五号。",
    pinyin: "Wǒ de shēngrì shì xià gè yuè shíwǔ hào.",
    pattern: "Subject + 是 + Time expression  新词: 生日, 月",
    category: "Time",
    level: "HSK2"
  },
  {
    english: "I get up at 7 every morning and then go jogging.",
    characters: "我每天早上七点起床，然后去跑步。",
    pinyin: "Wǒ měitiān zǎoshang qī diǎn qǐchuáng, ránhòu qù pǎobù.",
    pattern: "Time + Verb, 然后 + Verb  →  sequential actions  新词: 早上, 起床, 然后, 跑步",
    category: "Time",
    level: "HSK2"
  },
  {
    english: "The exam starts at 9 in the morning.",
    characters: "考试早上九点开始。",
    pinyin: "Kǎoshì zǎoshang jiǔ diǎn kāishǐ.",
    pattern: "Subject + Time + Verb  新词: 考试, 早上, 开始",
    category: "Time",
    level: "HSK2"
  },
  {
    english: "I play sports every weekend without exception.",
    characters: "我每个周末都去运动。",
    pinyin: "Wǒ měi gè zhōumò dōu qù yùndòng.",
    pattern: "每 + Time Word + 都 + Verb  →  emphasizing every instance  新词: 周末, 运动",
    category: "Time",
    level: "HSK2"
  },
  {
    english: "I usually get off work at 6 in the evening.",
    characters: "我一般晚上六点下班。",
    pinyin: "Wǒ yībān wǎnshang liù diǎn xiàbān.",
    pattern: "Subject + 一般 + Time + Verb  →  general/typical habit  新词: 一般, 晚上",
    category: "Time",
    level: "HSK2"
  },
  {
    english: "I started learning Chinese from last year.",
    characters: "我从去年开始学习汉语。",
    pinyin: "Wǒ cóng qùnián kāishǐ xuéxí Hànyǔ.",
    pattern: "从 + Time + 开始 + Verb  →  \"starting from…\"  新词: 从, 去年, 开始",
    category: "Time",
    level: "HSK2"
  },
  {
    english: "It's already noon — let's go eat.",
    characters: "已经中午了，我们去吃饭吧。",
    pinyin: "Yǐjīng zhōngwǔ le, wǒmen qù chī fàn ba.",
    pattern: "已经 + Time + 了  →  \"It's already…\"  新词: 已经",
    category: "Time",
    level: "HSK2"
  },
  {
    english: "I have already been living in Beijing for three years.",
    characters: "我在北京已经住了三年了。",
    pinyin: "Wǒ zài Běijīng yǐjīng zhùle sān nián le.",
    pattern: "已经 + Verb + 了 + Duration + 了  →  duration up to now  新词: 已经",
    category: "Time",
    level: "HSK2"
  },

  // ─── FAMILY ───────────────────────────────────────────────────────────────
  {
    english: "My grandma lives together with us.",
    characters: "我奶奶和我们住在一起。",
    pinyin: "Wǒ nǎinai hé wǒmen zhù zài yīqǐ.",
    pattern: "Subject + 和 + Person + 住在一起  新词: 奶奶, 一起",
    category: "Family",
    level: "HSK2"
  },
  {
    english: "My wife is a nurse.",
    characters: "我妻子是护士。",
    pinyin: "Wǒ qīzi shì hùshi.",
    pattern: "Possessive + Subject + 是 + Noun  新词: 妻子 (wife)",
    category: "Family",
    level: "HSK2"
  },
  {
    english: "My older brother gave me a birthday present.",
    characters: "我哥哥送给我一个生日礼物。",
    pinyin: "Wǒ gēgē sòng gěi wǒ yīgè shēngrì lǐwù.",
    pattern: "Subject + 送 + 给 + Person + Object  →  给 as ditransitive marker  新词: 哥哥, 送, 生日",
    category: "Family",
    level: "HSK2"
  },
  {
    english: "My uncle drives to work every day.",
    characters: "我叔叔每天开车去上班。",
    pinyin: "Wǒ shūshu měitiān kāichē qù shàngbān.",
    pattern: "Subject + Time + 开车 + 去 + Destination  新词: 叔叔, 上班",
    category: "Family",
    level: "HSK2"
  },
  {
    english: "My child likes playing basketball very much.",
    characters: "我孩子非常喜欢打篮球。",
    pinyin: "Wǒ háizi fēicháng xǐhuān dǎ lánqiú.",
    pattern: "Subject + 非常 + 喜欢 + Verb  新词: 孩子, 非常, 打篮球",
    category: "Family",
    level: "HSK2"
  },
  {
    english: "My younger sister's hair is getting longer and longer.",
    characters: "我妹妹的头发越来越长了。",
    pinyin: "Wǒ mèimei de tóufa yuèláiyuè cháng le.",
    pattern: "Subject + 越来越 + Adj + 了  →  \"getting more and more…\"  新词: 妹妹, 头发, 越来越",
    category: "Family",
    level: "HSK2"
  },
  {
    english: "Although my son is only five years old, he is already very smart.",
    characters: "我儿子虽然只有五岁，但是已经很聪明了。",
    pinyin: "Wǒ érzi suīrán zhǐ yǒu wǔ suì, dànshì yǐjīng hěn cōngmíng le.",
    pattern: "虽然…但是…  →  contrast  新词: 虽然, 但是, 已经",
    category: "Family",
    level: "HSK2"
  },

  // ─── DAILY LIFE ───────────────────────────────────────────────────────────
  {
    english: "Why don't you want to go?",
    characters: "你为什么不想去？",
    pinyin: "Nǐ wèishénme bù xiǎng qù?",
    pattern: "Subject + 为什么 + Verb/Adj?  →  \"Why…?\" question  新词: 为什么",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "I think this movie is extremely interesting.",
    characters: "我觉得这部电影非常有意思。",
    pinyin: "Wǒ juéde zhè bù diànyǐng fēicháng yǒu yìsi.",
    pattern: "我觉得 + Clause  →  expressing an opinion  新词: 觉得, 非常",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "Because it rains every day, we can't go outside to play.",
    characters: "因为每天下雨，所以我们不能出去玩。",
    pinyin: "Yīnwèi měitiān xià yǔ, suǒyǐ wǒmen bù néng chūqù wán.",
    pattern: "因为…所以…  →  cause & effect  新词: 因为, 所以, 出去, 玩",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "He suddenly stood up from his chair.",
    characters: "他突然从椅子上站了起来。",
    pinyin: "Tā tūrán cóng yǐzi shàng zhàn le qǐlái.",
    pattern: "突然 + 从 + Place + Verb + 起来  →  directional complement 起来  新词: 突然, 从",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "I will definitely finish reading this book this week.",
    characters: "我这个星期一定会看完这本书。",
    pinyin: "Wǒ zhège xīngqī yīdìng huì kàn wán zhè běn shū.",
    pattern: "Subject + 一定 + 会 + Verb + 完 + Object  新词: 一定 (definitely)",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "Is this answer correct or wrong?",
    characters: "这个答案是对还是错？",
    pinyin: "Zhège dá'àn shì duì háishi cuò?",
    pattern: "A + 还是 + B？  →  alternative/choice question  新词: 还是, 对 (correct), 错 (wrong)",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "He always wears a black hat.",
    characters: "他总是戴一顶黑色的帽子。",
    pinyin: "Tā zǒngshì dài yī dǐng hēisè de màozi.",
    pattern: "Subject + 总是 + Verb + Object  →  \"always\"  新词: 黑 (black), 帽子",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "My interest in Chinese is getting bigger and bigger.",
    characters: "我对汉语的兴趣越来越大了。",
    pinyin: "Wǒ duì Hànyǔ de xìngqù yuèláiyuè dà le.",
    pattern: "对 + Topic + 的 + Noun + 越来越 + Adj  新词: 兴趣, 越来越",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "I have already finished all of my homework.",
    characters: "我已经把作业都做完了。",
    pinyin: "Wǒ yǐjīng bǎ zuòyè dōu zuò wán le.",
    pattern: "已经 + 把 + Object + 都 + Verb + 完 + 了  →  把-sentence + completion  新词: 已经, 作业",
    category: "Daily Life",
    level: "HSK2"
  },

  // ─── TRAVEL ───────────────────────────────────────────────────────────────
  {
    english: "I took the subway from the hotel to the airport.",
    characters: "我从宾馆坐地铁去了机场。",
    pinyin: "Wǒ cóng bīnguǎn zuò dìtiě qùle jīchǎng.",
    pattern: "从 + Origin + 坐 + Vehicle + 去 + Destination  新词: 从, 宾馆, 地铁, 机场",
    category: "Travel",
    level: "HSK2"
  },
  {
    english: "Taking the train from Beijing to Shanghai takes about five hours.",
    characters: "从北京到上海坐火车要大概五个小时。",
    pinyin: "Cóng Běijīng dào Shànghǎi zuò huǒchē yào dàgài wǔ gè xiǎoshí.",
    pattern: "从 + Place + 到 + Place + 坐 + Vehicle + 要 + Duration  新词: 从, 火车",
    category: "Travel",
    level: "HSK2"
  },
  {
    english: "I have never been to Beijing before.",
    characters: "我以前从来没去过北京。",
    pinyin: "Wǒ yǐqián cónglái méi qù guò Běijīng.",
    pattern: "以前 + 从来没 + Verb + 过  →  have never done something  新词: 以前, 过",
    category: "Travel",
    level: "HSK2"
  },
  {
    english: "I want to travel somewhere this summer.",
    characters: "我这个夏天想去旅游。",
    pinyin: "Wǒ zhège xiàtiān xiǎng qù lǚyóu.",
    pattern: "Subject + Time + 想 + 去 + Verb  新词: 旅游 (travel)",
    category: "Travel",
    level: "HSK2"
  },
  {
    english: "If you travel to China, please tell me in advance.",
    characters: "如果你去中国旅游，请提前告诉我。",
    pinyin: "Rúguǒ nǐ qù Zhōngguó lǚyóu, qǐng tíqián gàosù wǒ.",
    pattern: "如果…请…  →  conditional polite request  新词: 如果, 旅游, 告诉",
    category: "Travel",
    level: "HSK2"
  },
  {
    english: "I usually ride my bike to work.",
    characters: "我一般骑自行车去上班。",
    pinyin: "Wǒ yībān qí zìxíngchē qù shàngbān.",
    pattern: "Subject + 一般 + 骑 + Vehicle + 去 + Destination  新词: 一般, 骑 (ride)",
    category: "Travel",
    level: "HSK2"
  },
  {
    english: "Beijing is about 1,200 kilometers from Shanghai.",
    characters: "北京离上海大概一千两百公里。",
    pinyin: "Běijīng lí Shànghǎi dàgài yīqiān liǎngbǎi gōnglǐ.",
    pattern: "A + 离 + B + Distance  新词: 离, 两, 公里 (kilometer)",
    category: "Travel",
    level: "HSK2"
  },
  {
    english: "We arrived at the airport an hour early.",
    characters: "我们提前一个小时到了机场。",
    pinyin: "Wǒmen tíqián yī gè xiǎoshí dàole jīchǎng.",
    pattern: "Subject + 提前 + Duration + Verb + Location  新词: 机场",
    category: "Travel",
    level: "HSK2"
  },

  // ─── WORK & SCHOOL ────────────────────────────────────────────────────────
  {
    english: "My colleague works extremely hard every day.",
    characters: "我的同事每天工作非常努力。",
    pinyin: "Wǒ de tóngshì měitiān gōngzuò fēicháng nǔlì.",
    pattern: "Subject + Time + Verb + 非常 + Adj  新词: 同事, 非常",
    category: "Work & School",
    level: "HSK2"
  },
  {
    english: "The classroom is on the third floor.",
    characters: "教室在三楼。",
    pinyin: "Jiàoshì zài sān lóu.",
    pattern: "Subject + 在 + Number + 楼  新词: 教室 (classroom), 楼 (floor/building)",
    category: "Work & School",
    level: "HSK2"
  },
  {
    english: "I need to prepare well for tomorrow's exam.",
    characters: "我需要好好准备明天的考试。",
    pinyin: "Wǒ xūyào hǎohǎo zhǔnbèi míngtiān de kǎoshì.",
    pattern: "Subject + 需要 + Adv + Verb + Object  新词: 需要, 准备 (prepare), 考试",
    category: "Work & School",
    level: "HSK2"
  },
  {
    english: "Can you help me answer this question?",
    characters: "你可以帮我回答这个问题吗？",
    pinyin: "Nǐ kěyǐ bāng wǒ huídá zhège wèntí ma?",
    pattern: "Subject + 可以 + 帮 + Person + Verb + Object  新词: 可以, 帮 (help), 回答 (answer)",
    category: "Work & School",
    level: "HSK2"
  },
  {
    english: "I study Chinese for two hours every day.",
    characters: "我每天学习汉语两个小时。",
    pinyin: "Wǒ měitiān xuéxí Hànyǔ liǎng gè xiǎoshí.",
    pattern: "Subject + Time + Verb + Object + Duration  新词: 两 (liǎng), 小时 (hour)",
    category: "Work & School",
    level: "HSK2"
  },
  {
    english: "Although this test is difficult, I will definitely be able to pass.",
    characters: "虽然这次考试很难，但是我一定能通过。",
    pinyin: "Suīrán zhè cì kǎoshì hěn nán, dànshì wǒ yīdìng néng tōngguò.",
    pattern: "虽然…但是…  →  contrast  新词: 虽然, 但是, 次 (occurrence), 考试, 一定",
    category: "Work & School",
    level: "HSK2"
  },
  {
    english: "Everyone needs to answer the teacher's questions.",
    characters: "大家都需要回答老师的问题。",
    pinyin: "Dàjiā dōu xūyào huídá lǎoshī de wèntí.",
    pattern: "大家 + 都 + Verb  →  universality  新词: 大家 (everyone), 需要, 回答",
    category: "Work & School",
    level: "HSK2"
  },
  {
    english: "I don't quite understand this word. Can you explain it to me?",
    characters: "我不太明白这个词，你能告诉我吗？",
    pinyin: "Wǒ bú tài míngbái zhège cí. Nǐ néng gàosù wǒ ma?",
    pattern: "不太 + Verb  →  \"not quite / not fully\"  新词: 明白 (understand), 告诉",
    category: "Work & School",
    level: "HSK2"
  },

  // ─── HEALTH ───────────────────────────────────────────────────────────────
  {
    english: "He suddenly got sick and had to go to the hospital.",
    characters: "他突然生病了，去了医院。",
    pinyin: "Tā tūrán shēngbìng le, qùle yīyuàn.",
    pattern: "突然 + Verb + 了  →  sudden change of state  新词: 突然, 生病",
    category: "Health",
    level: "HSK2"
  },
  {
    english: "If you feel unwell, you should rest at home.",
    characters: "如果你不舒服，应该在家休息。",
    pinyin: "Rúguǒ nǐ bù shūfu, yīnggāi zài jiā xiūxi.",
    pattern: "如果…应该…  →  conditional advice  新词: 如果, 舒服 (comfortable/well), 应该",
    category: "Health",
    level: "HSK2"
  },
  {
    english: "The doctor told me I need to rest for a week.",
    characters: "医生告诉我需要休息一个星期。",
    pinyin: "Yīshēng gàosù wǒ xūyào xiūxi yīgè xīngqī.",
    pattern: "A + 告诉 + B + Verb + Clause  新词: 告诉, 需要, 休息 (rest)",
    category: "Health",
    level: "HSK2"
  },
  {
    english: "I haven't been sleeping well lately.",
    characters: "我最近睡觉睡得不太好。",
    pinyin: "Wǒ zuìjìn shuìjiào shuì de bú tài hǎo.",
    pattern: "Verb + 得 + Adverb + Adj  →  degree complement  新词: 最近",
    category: "Health",
    level: "HSK2"
  },
  {
    english: "You should drink more water and exercise more.",
    characters: "你应该多喝水，多运动。",
    pinyin: "Nǐ yīnggāi duō hē shuǐ, duō yùndòng.",
    pattern: "应该 + 多 + Verb  →  advice: \"do more…\"  新词: 应该, 运动",
    category: "Health",
    level: "HSK2"
  },
  {
    english: "She loves swimming, so she swims every single day.",
    characters: "她喜欢游泳，所以每天都去游。",
    pinyin: "Tā xǐhuān yóuyǒng, suǒyǐ měitiān dōu qù yóu.",
    pattern: "Cause + 所以 + Effect  新词: 游泳 (swim), 所以",
    category: "Health",
    level: "HSK2"
  },
  {
    english: "Exercising every day is very beneficial for your health.",
    characters: "每天运动对身体很有好处。",
    pinyin: "Měitiān yùndòng duì shēntǐ hěn yǒu hǎochù.",
    pattern: "Subject + 对 + Noun + 有好处  →  对 = beneficial to  新词: 运动, 身体",
    category: "Health",
    level: "HSK2"
  },
  {
    english: "Wash your hands before eating, otherwise you might get sick.",
    characters: "吃饭前要洗手，不然会生病。",
    pinyin: "Chī fàn qián yào xǐ shǒu, bùrán huì shēngbìng.",
    pattern: "Time + 要 + Verb, 不然 + Consequence  新词: 洗 (wash), 生病",
    category: "Health",
    level: "HSK2"
  },
  {
    english: "My headache is so bad I can't focus on studying.",
    characters: "我头疼得没办法集中学习。",
    pinyin: "Wǒ tóuténg de méi bànfǎ jízhōng xuéxí.",
    pattern: "Verb/Adj + 得 + Clause  →  extent complement  新词: 头疼 (headache)",
    category: "Health",
    level: "HSK2"
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HSK1 – EXTRA SENTENCES
  // ══════════════════════════════════════════════════════════════════════════

  // ─── INTRODUCTIONS (extra) ───────────────────────────────────────────────
  {
    english: "She is my friend.",
    characters: "她是我的朋友。",
    pinyin: "Tā shì wǒ de péngyǒu.",
    pattern: "Subject + 是 + 我的 + Noun",
    category: "Introductions"
  },
  {
    english: "We are all Chinese.",
    characters: "我们都是中国人。",
    pinyin: "Wǒmen dōu shì Zhōngguórén.",
    pattern: "都 + 是  →  \"all are\"",
    category: "Introductions"
  },
  {
    english: "He is not my brother.",
    characters: "他不是我的哥哥。",
    pinyin: "Tā bú shì wǒ de gēgē.",
    pattern: "Subject + 不是 + Possessive + Noun",
    category: "Introductions"
  },
  {
    english: "Is she a teacher?",
    characters: "她是老师吗？",
    pinyin: "Tā shì lǎoshī ma?",
    pattern: "Statement + 吗  →  yes/no question",
    category: "Introductions"
  },
  {
    english: "I am from China.",
    characters: "我是中国人。",
    pinyin: "Wǒ shì Zhōngguórén.",
    pattern: "我是 + nationality  →  stating origin",
    category: "Introductions"
  },
  {
    english: "They are all students.",
    characters: "他们都是学生。",
    pinyin: "Tāmen dōu shì xuéshēng.",
    pattern: "都 + 是  →  \"all are\"",
    category: "Introductions"
  },

  // ─── GREETINGS (extra) ───────────────────────────────────────────────────
  {
    english: "Good morning!",
    characters: "早上好！",
    pinyin: "Zǎoshang hǎo!",
    pattern: "Time-of-day + 好  →  time-specific greeting",
    category: "Greetings"
  },
  {
    english: "Good evening!",
    characters: "晚上好！",
    pinyin: "Wǎnshang hǎo!",
    pattern: "Time-of-day + 好  →  time-specific greeting",
    category: "Greetings"
  },
  {
    english: "Sorry, I was late.",
    characters: "对不起，我来晚了。",
    pinyin: "Duìbuqǐ, wǒ lái wǎn le.",
    pattern: "对不起 + explanation  →  apologising",
    category: "Greetings"
  },
  {
    english: "It doesn't matter.",
    characters: "没关系。",
    pinyin: "Méi guānxi.",
    pattern: "没关系  →  fixed: \"it's OK / no problem\"",
    category: "Greetings"
  },
  {
    english: "I haven't seen you for a long time!",
    characters: "好久不见！",
    pinyin: "Hǎojiǔ bú jiàn!",
    pattern: "好久不见  →  fixed: \"long time no see\"",
    category: "Greetings"
  },
  {
    english: "See you tomorrow.",
    characters: "明天见。",
    pinyin: "Míngtiān jiàn.",
    pattern: "Time + 见  →  \"see you [time]\"",
    category: "Greetings"
  },

  // ─── LOCATION (extra) ────────────────────────────────────────────────────
  {
    english: "Where is the toilet?",
    characters: "厕所在哪里？",
    pinyin: "Cèsuǒ zài nǎlǐ?",
    pattern: "Noun + 在 + 哪里  →  asking location",
    category: "Location"
  },
  {
    english: "The supermarket is on the left.",
    characters: "超市在左边。",
    pinyin: "Chāoshì zài zuǒbiān.",
    pattern: "Noun + 在 + direction",
    category: "Location"
  },
  {
    english: "The bank is on the right.",
    characters: "银行在右边。",
    pinyin: "Yínháng zài yòubiān.",
    pattern: "Noun + 在 + direction",
    category: "Location"
  },
  {
    english: "My home is not far from here.",
    characters: "我家离这里不远。",
    pinyin: "Wǒ jiā lí zhèlǐ bù yuǎn.",
    pattern: "A + 离 + B + 不远  →  A is not far from B",
    category: "Location"
  },
  {
    english: "The cat is under the chair.",
    characters: "猫在椅子下面。",
    pinyin: "Māo zài yǐzi xiàmiàn.",
    pattern: "Noun + 在 + Object + 下面",
    category: "Location"
  },
  {
    english: "Is there a hotel near here?",
    characters: "这附近有没有酒店？",
    pinyin: "Zhè fùjìn yǒu méiyǒu jiǔdiàn?",
    pattern: "有没有 + Noun  →  affirmative-negative question",
    category: "Location"
  },

  // ─── FOOD & DRINK (extra) ────────────────────────────────────────────────
  {
    english: "I don't eat meat.",
    characters: "我不吃肉。",
    pinyin: "Wǒ bù chī ròu.",
    pattern: "Subject + 不 + Verb + Object",
    category: "Food & Drink"
  },
  {
    english: "Do you want rice or noodles?",
    characters: "你要米饭还是面条？",
    pinyin: "Nǐ yào mǐfàn háishi miàntiáo?",
    pattern: "A + 还是 + B  →  choice question",
    category: "Food & Drink"
  },
  {
    english: "This dish is a little spicy.",
    characters: "这道菜有点辣。",
    pinyin: "Zhè dào cài yǒudiǎn là.",
    pattern: "有点 + Adj  →  slightly (often negative nuance)",
    category: "Food & Drink"
  },
  {
    english: "I am full.",
    characters: "我吃饱了。",
    pinyin: "Wǒ chī bǎo le.",
    pattern: "Verb + 饱 + 了  →  resultative complement: ate till full",
    category: "Food & Drink"
  },
  {
    english: "Please give me a glass of water.",
    characters: "请给我一杯水。",
    pinyin: "Qǐng gěi wǒ yī bēi shuǐ.",
    pattern: "请 + 给 + Person + Quantity  →  polite request",
    category: "Food & Drink"
  },
  {
    english: "The food here is very delicious.",
    characters: "这里的食物很好吃。",
    pinyin: "Zhèlǐ de shíwù hěn hǎochī.",
    pattern: "Place + 的 + Noun + 很 + Adj",
    category: "Food & Drink"
  },

  // ─── SHOPPING (extra) ────────────────────────────────────────────────────
  {
    english: "Do you have a smaller size?",
    characters: "有没有小一点的？",
    pinyin: "Yǒu méiyǒu xiǎo yīdiǎn de?",
    pattern: "有没有 + Adj + 一点 + 的  →  asking for a variant",
    category: "Shopping"
  },
  {
    english: "I want to buy a gift.",
    characters: "我想买一份礼物。",
    pinyin: "Wǒ xiǎng mǎi yī fèn lǐwù.",
    pattern: "想 + Verb + Measure + Noun",
    category: "Shopping"
  },
  {
    english: "Can you make it cheaper?",
    characters: "可以便宜一点吗？",
    pinyin: "Kěyǐ piányí yīdiǎn ma?",
    pattern: "可以 + Adj + 一点 + 吗  →  asking for discount",
    category: "Shopping"
  },
  {
    english: "I'll take this one.",
    characters: "我要这个。",
    pinyin: "Wǒ yào zhège.",
    pattern: "我要 + this/that  →  making a selection",
    category: "Shopping"
  },
  {
    english: "How much does this cost in total?",
    characters: "这一共多少钱？",
    pinyin: "Zhè yīgòng duōshao qián?",
    pattern: "一共 + 多少钱  →  asking total price",
    category: "Shopping"
  },
  {
    english: "I don't want to buy anything today.",
    characters: "我今天不想买东西。",
    pinyin: "Wǒ jīntiān bù xiǎng mǎi dōngxi.",
    pattern: "今天 + 不想 + Verb  →  negated desire with time",
    category: "Shopping"
  },

  // ─── TIME (extra) ────────────────────────────────────────────────────────
  {
    english: "What day is today?",
    characters: "今天是星期几？",
    pinyin: "Jīntiān shì xīngqī jǐ?",
    pattern: "今天是星期几  →  asking the day of the week",
    category: "Time"
  },
  {
    english: "Today is Wednesday.",
    characters: "今天是星期三。",
    pinyin: "Jīntiān shì xīngqīsān.",
    pattern: "今天是 + day-of-week",
    category: "Time"
  },
  {
    english: "The exam is next Monday.",
    characters: "考试是下个星期一。",
    pinyin: "Kǎoshì shì xià ge xīngqīyī.",
    pattern: "Event + 是 + 下个 + day-of-week",
    category: "Time"
  },
  {
    english: "I get up at seven o'clock every day.",
    characters: "我每天七点起床。",
    pinyin: "Wǒ měitiān qī diǎn qǐchuáng.",
    pattern: "每天 + Time + Verb  →  habitual action",
    category: "Time"
  },
  {
    english: "The movie starts at half past eight.",
    characters: "电影八点半开始。",
    pinyin: "Diànyǐng bā diǎn bàn kāishǐ.",
    pattern: "Subject + Time + Verb  →  time before verb",
    category: "Time"
  },
  {
    english: "How many days are left until the holiday?",
    characters: "还有几天就放假了？",
    pinyin: "Hái yǒu jǐ tiān jiù fàngjià le?",
    pattern: "还有 + Num + 天 + 就 + Verb + 了  →  countdown",
    category: "Time"
  },

  // ─── FAMILY (extra) ──────────────────────────────────────────────────────
  {
    english: "My younger sister is twelve years old.",
    characters: "我妹妹十二岁。",
    pinyin: "Wǒ mèimei shí'èr suì.",
    pattern: "Subject + Number + 岁  →  stating age",
    category: "Family"
  },
  {
    english: "His father is a doctor.",
    characters: "他爸爸是医生。",
    pinyin: "Tā bàba shì yīshēng.",
    pattern: "Possessive + family member + 是 + profession",
    category: "Family"
  },
  {
    english: "Her mother is very beautiful.",
    characters: "她妈妈很漂亮。",
    pinyin: "Tā māma hěn piàoliang.",
    pattern: "Possessive + family member + 很 + Adj",
    category: "Family"
  },
  {
    english: "Do you have any siblings?",
    characters: "你有没有兄弟姐妹？",
    pinyin: "Nǐ yǒu méiyǒu xiōngdì jiěmèi?",
    pattern: "有没有 + Noun  →  yes-or-no question",
    category: "Family"
  },
  {
    english: "My older brother is studying in Beijing.",
    characters: "我哥哥在北京学习。",
    pinyin: "Wǒ gēgē zài Běijīng xuéxí.",
    pattern: "Subject + 在 + Place + Verb",
    category: "Family"
  },
  {
    english: "Our family has five people.",
    characters: "我家有五口人。",
    pinyin: "Wǒ jiā yǒu wǔ kǒu rén.",
    pattern: "家 + 有 + Number + 口 + 人  →  family size",
    category: "Family"
  },

  // ─── DAILY LIFE (extra) ──────────────────────────────────────────────────
  {
    english: "I go to work every morning.",
    characters: "我每天早上去上班。",
    pinyin: "Wǒ měitiān zǎoshang qù shàngbān.",
    pattern: "每天 + Time + 去 + Verb  →  daily routine",
    category: "Daily Life"
  },
  {
    english: "I usually listen to music in the evening.",
    characters: "我晚上一般听音乐。",
    pinyin: "Wǒ wǎnshang yībān tīng yīnyuè.",
    pattern: "Time + 一般 + Verb  →  habitual: \"usually\"",
    category: "Daily Life"
  },
  {
    english: "Can you speak more slowly?",
    characters: "你能说慢一点吗？",
    pinyin: "Nǐ néng shuō màn yīdiǎn ma?",
    pattern: "能 + Verb + Adj + 一点 + 吗  →  polite request",
    category: "Daily Life"
  },
  {
    english: "I don't understand. Please say it again.",
    characters: "我不明白。请再说一遍。",
    pinyin: "Wǒ bù míngbái. Qǐng zài shuō yī biàn.",
    pattern: "请 + 再 + Verb + 一遍  →  ask to repeat",
    category: "Daily Life"
  },
  {
    english: "Today I am very tired.",
    characters: "我今天很累。",
    pinyin: "Wǒ jīntiān hěn lèi.",
    pattern: "Subject + 今天 + 很 + Adj",
    category: "Daily Life"
  },
  {
    english: "I want to sleep.",
    characters: "我想睡觉。",
    pinyin: "Wǒ xiǎng shuìjiào.",
    pattern: "想 + Verb  →  expressing desire",
    category: "Daily Life"
  },

  // ─── TRAVEL (extra) ──────────────────────────────────────────────────────
  {
    english: "I want to go to Shanghai.",
    characters: "我想去上海。",
    pinyin: "Wǒ xiǎng qù Shànghǎi.",
    pattern: "想 + 去 + Place  →  expressing desire to travel",
    category: "Travel"
  },
  {
    english: "How long does it take to get there by train?",
    characters: "坐火车去那里要多长时间？",
    pinyin: "Zuò huǒchē qù nàlǐ yào duō cháng shíjiān?",
    pattern: "坐 + Vehicle + 去 + Place + 要 + 多长时间",
    category: "Travel"
  },
  {
    english: "I need to buy a ticket.",
    characters: "我需要买票。",
    pinyin: "Wǒ xūyào mǎi piào.",
    pattern: "需要 + Verb + Object  →  need to do",
    category: "Travel"
  },
  {
    english: "The flight departs at ten o'clock.",
    characters: "飞机十点出发。",
    pinyin: "Fēijī shí diǎn chūfā.",
    pattern: "Subject + Time + Verb  →  scheduled departure",
    category: "Travel"
  },
  {
    english: "This is my first time visiting Beijing.",
    characters: "这是我第一次来北京。",
    pinyin: "Zhè shì wǒ dì yī cì lái Běijīng.",
    pattern: "这是 + 我 + 第一次 + Verb + Place",
    category: "Travel"
  },
  {
    english: "I got lost.",
    characters: "我迷路了。",
    pinyin: "Wǒ mí lù le.",
    pattern: "Verb + 了  →  completed action: \"I have gotten lost\"",
    category: "Travel"
  },

  // ─── WORK & SCHOOL (extra) ────────────────────────────────────────────────
  {
    english: "Class starts at eight o'clock.",
    characters: "八点开始上课。",
    pinyin: "Bā diǎn kāishǐ shàngkè.",
    pattern: "Time + 开始 + Verb  →  using 开始 as start marker",
    category: "Work & School"
  },
  {
    english: "I have a lot of homework today.",
    characters: "我今天有很多作业。",
    pinyin: "Wǒ jīntiān yǒu hěn duō zuòyè.",
    pattern: "有 + 很多 + Noun  →  \"have a lot of\"",
    category: "Work & School"
  },
  {
    english: "I don't know how to write this character.",
    characters: "我不会写这个字。",
    pinyin: "Wǒ bú huì xiě zhège zì.",
    pattern: "不会 + Verb  →  inability / don't know how",
    category: "Work & School"
  },
  {
    english: "The teacher is explaining the lesson.",
    characters: "老师正在讲课。",
    pinyin: "Lǎoshī zhèngzài jiǎngkè.",
    pattern: "正在 + Verb  →  action in progress right now",
    category: "Work & School"
  },
  {
    english: "Working overtime today was very tiring.",
    characters: "今天加班很辛苦。",
    pinyin: "Jīntiān jiābān hěn xīnkǔ.",
    pattern: "Time + activity + 很 + Adj  →  evaluating experience",
    category: "Work & School"
  },
  {
    english: "I need to prepare for the meeting.",
    characters: "我需要准备开会。",
    pinyin: "Wǒ xūyào zhǔnbèi kāihuì.",
    pattern: "需要 + Verb + Verb  →  need to prepare to",
    category: "Work & School"
  },

  // ─── HEALTH (extra) ──────────────────────────────────────────────────────
  {
    english: "She caught a cold.",
    characters: "她感冒了。",
    pinyin: "Tā gǎnmào le.",
    pattern: "Verb + 了  →  completed state change: \"has caught a cold\"",
    category: "Health"
  },
  {
    english: "You should rest more.",
    characters: "你应该多休息。",
    pinyin: "Nǐ yīnggāi duō xiūxi.",
    pattern: "应该 + 多 + Verb  →  advice: \"should do more\"",
    category: "Health"
  },
  {
    english: "My stomach hurts.",
    characters: "我肚子疼。",
    pinyin: "Wǒ dùzi téng.",
    pattern: "Subject + body part + 疼  →  describing pain",
    category: "Health"
  },
  {
    english: "I need to see a doctor.",
    characters: "我需要去看医生。",
    pinyin: "Wǒ xūyào qù kàn yīshēng.",
    pattern: "需要 + 去 + Verb  →  need to go do",
    category: "Health"
  },
  {
    english: "Don't eat too much sweet food.",
    characters: "不要吃太多甜食。",
    pinyin: "Bú yào chī tài duō tiánshí.",
    pattern: "不要 + Verb + 太多 + Noun  →  prohibition",
    category: "Health"
  },
  {
    english: "How long have you been feeling unwell?",
    characters: "你不舒服多长时间了？",
    pinyin: "Nǐ bù shūfu duō cháng shíjiān le?",
    pattern: "Adj + 多长时间了  →  asking duration of a state",
    category: "Health"
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HSK2 – EXTRA SENTENCES
  // ══════════════════════════════════════════════════════════════════════════

  // ─── INTRODUCTIONS (HSK2 extra) ───────────────────────────────────────────
  {
    english: "Although she is young, she is very capable.",
    characters: "虽然她很年轻，但是能力很强。",
    pinyin: "Suīrán tā hěn niánqīng, dànshì nénglì hěn qiáng.",
    pattern: "虽然…但是…  →  concession: \"although…but…\"",
    category: "Introductions",
    level: "HSK2"
  },
  {
    english: "Because he works hard, his results are excellent.",
    characters: "因为他努力，所以成绩很好。",
    pinyin: "Yīnwèi tā nǔlì, suǒyǐ chéngjì hěn hǎo.",
    pattern: "因为…所以…  →  cause-and-effect",
    category: "Introductions",
    level: "HSK2"
  },
  {
    english: "She has been learning Chinese for two years.",
    characters: "她学中文学了两年了。",
    pinyin: "Tā xué Zhōngwén xué le liǎng nián le.",
    pattern: "Verb + 了 + Duration + 了  →  ongoing action with duration",
    category: "Introductions",
    level: "HSK2"
  },
  {
    english: "I think he is a very interesting person.",
    characters: "我觉得他是一个很有意思的人。",
    pinyin: "Wǒ juéde tā shì yīgè hěn yǒu yìsi de rén.",
    pattern: "觉得 + Clause  →  expressing opinion",
    category: "Introductions",
    level: "HSK2"
  },

  // ─── GREETINGS (HSK2 extra) ───────────────────────────────────────────────
  {
    english: "How has your work been lately?",
    characters: "你最近工作怎么样？",
    pinyin: "Nǐ zuìjìn gōngzuò zěnmeyàng?",
    pattern: "最近 + topic + 怎么样  →  asking about recent status",
    category: "Greetings",
    level: "HSK2"
  },
  {
    english: "Everything has been going well, thanks for asking.",
    characters: "一切都很好，谢谢你的关心。",
    pinyin: "Yīqiè dōu hěn hǎo, xièxiè nǐ de guānxīn.",
    pattern: "一切都 + Adj  →  \"everything is…\"",
    category: "Greetings",
    level: "HSK2"
  },
  {
    english: "I hope you had a good rest during the holiday.",
    characters: "希望你假期休息得不错。",
    pinyin: "Xīwàng nǐ jiàqī xiūxi de búcuò.",
    pattern: "希望 + Subject + Verb + 得 + Adj  →  expressing a wish",
    category: "Greetings",
    level: "HSK2"
  },

  // ─── LOCATION (HSK2 extra) ────────────────────────────────────────────────
  {
    english: "The company is about two kilometres from here.",
    characters: "公司离这里大概两公里。",
    pinyin: "Gōngsī lí zhèlǐ dàgài liǎng gōnglǐ.",
    pattern: "A + 离 + B + 大概 + Distance",
    category: "Location",
    level: "HSK2"
  },
  {
    english: "Turn left at the traffic lights and you will see it.",
    characters: "在红绿灯那里向左转就看到了。",
    pinyin: "Zài hónglǜdēng nàlǐ xiàng zuǒ zhuǎn jiù kàndào le.",
    pattern: "在 + Landmark + 向 + Direction + 转 + 就 + Result",
    category: "Location",
    level: "HSK2"
  },
  {
    english: "I have already moved to a new place.",
    characters: "我已经搬到新地方了。",
    pinyin: "Wǒ yǐjīng bān dào xīn dìfāng le.",
    pattern: "已经 + Verb + 到 + Place + 了  →  completed relocation",
    category: "Location",
    level: "HSK2"
  },
  {
    english: "Please go straight and then turn right.",
    characters: "请一直走，然后向右转。",
    pinyin: "Qǐng yīzhí zǒu, ránhòu xiàng yòu zhuǎn.",
    pattern: "一直 + Verb, 然后 + Verb  →  sequential directions",
    category: "Location",
    level: "HSK2"
  },

  // ─── FOOD & DRINK (HSK2 extra) ────────────────────────────────────────────
  {
    english: "I prefer eating hot food.",
    characters: "我比较喜欢吃热的东西。",
    pinyin: "Wǒ bǐjiào xǐhuān chī rè de dōngxi.",
    pattern: "比较 + Verb  →  comparatively, relatively",
    category: "Food & Drink",
    level: "HSK2"
  },
  {
    english: "This restaurant's service is better than last time.",
    characters: "这家餐厅的服务比上次好多了。",
    pinyin: "Zhè jiā cāntīng de fúwù bǐ shàng cì hǎo duō le.",
    pattern: "A + 比 + B + Adj + 多了  →  A is much better than B",
    category: "Food & Drink",
    level: "HSK2"
  },
  {
    english: "If you are hungry, I can make noodles for you.",
    characters: "如果你饿了，我可以给你做面条。",
    pinyin: "Rúguǒ nǐ è le, wǒ kěyǐ gěi nǐ zuò miàntiáo.",
    pattern: "如果…，…可以…  →  conditional offer",
    category: "Food & Drink",
    level: "HSK2"
  },
  {
    english: "I have already eaten; I am not hungry.",
    characters: "我已经吃了，不饿。",
    pinyin: "Wǒ yǐjīng chī le, bù è.",
    pattern: "已经 + Verb + 了  →  already done",
    category: "Food & Drink",
    level: "HSK2"
  },

  // ─── SHOPPING (HSK2 extra) ────────────────────────────────────────────────
  {
    english: "I only have a hundred yuan on me.",
    characters: "我身上只有一百块钱。",
    pinyin: "Wǒ shēn shang zhǐ yǒu yī bǎi kuài qián.",
    pattern: "只有 + Amount  →  only have",
    category: "Shopping",
    level: "HSK2"
  },
  {
    english: "This style is more popular than that one.",
    characters: "这款比那款更受欢迎。",
    pinyin: "Zhè kuǎn bǐ nà kuǎn gèng shòu huānyíng.",
    pattern: "A + 比 + B + 更 + Adj  →  A is even more…than B",
    category: "Shopping",
    level: "HSK2"
  },
  {
    english: "I'll come back and buy it later.",
    characters: "我过一会儿再来买。",
    pinyin: "Wǒ guò yīhuìr zài lái mǎi.",
    pattern: "过一会儿 + 再 + Verb  →  will do later",
    category: "Shopping",
    level: "HSK2"
  },
  {
    english: "Can I pay by mobile phone?",
    characters: "可以用手机支付吗？",
    pinyin: "Kěyǐ yòng shǒujī zhīfù ma?",
    pattern: "可以 + 用 + Tool + Verb + 吗  →  asking permission",
    category: "Shopping",
    level: "HSK2"
  },

  // ─── TIME (HSK2 extra) ────────────────────────────────────────────────────
  {
    english: "The meeting has been going on for two hours.",
    characters: "会议已经开了两个小时了。",
    pinyin: "Huìyì yǐjīng kāi le liǎng gè xiǎoshí le.",
    pattern: "已经 + Verb + 了 + Duration + 了  →  ongoing with duration",
    category: "Time",
    level: "HSK2"
  },
  {
    english: "He arrives earlier than me every day.",
    characters: "他每天都比我来得早。",
    pinyin: "Tā měitiān dōu bǐ wǒ lái de zǎo.",
    pattern: "A + 比 + B + Verb + 得 + Adj  →  comparative manner complement",
    category: "Time",
    level: "HSK2"
  },
  {
    english: "I will finish this work before five o'clock.",
    characters: "我会在五点前完成这项工作。",
    pinyin: "Wǒ huì zài wǔ diǎn qián wánchéng zhè xiàng gōngzuò.",
    pattern: "在 + Time + 前 + Verb  →  deadline",
    category: "Time",
    level: "HSK2"
  },
  {
    english: "It has only been three days since he left.",
    characters: "他离开才三天。",
    pinyin: "Tā líkāi cái sān tiān.",
    pattern: "Verb + 才 + Duration  →  only this much time since",
    category: "Time",
    level: "HSK2"
  },

  // ─── FAMILY (HSK2 extra) ──────────────────────────────────────────────────
  {
    english: "My parents both like travelling.",
    characters: "我父母都喜欢旅游。",
    pinyin: "Wǒ fùmǔ dōu xǐhuān lǚyóu.",
    pattern: "Subject + 都 + Verb  →  both/all do",
    category: "Family",
    level: "HSK2"
  },
  {
    english: "My younger sister is getting married next year.",
    characters: "我妹妹明年要结婚了。",
    pinyin: "Wǒ mèimei míngnián yào jiéhūn le.",
    pattern: "要 + Verb + 了  →  about to do something",
    category: "Family",
    level: "HSK2"
  },
  {
    english: "Their relationship is very good.",
    characters: "他们的关系很好。",
    pinyin: "Tāmen de guānxi hěn hǎo.",
    pattern: "Possessive + Noun + 很 + Adj",
    category: "Family",
    level: "HSK2"
  },
  {
    english: "My grandfather retired last year.",
    characters: "我爷爷去年退休了。",
    pinyin: "Wǒ yéye qùnián tuìxiū le.",
    pattern: "Time + Verb + 了  →  completed action in the past",
    category: "Family",
    level: "HSK2"
  },

  // ─── DAILY LIFE (HSK2 extra) ──────────────────────────────────────────────
  {
    english: "I have already sent the email.",
    characters: "我已经把邮件发出去了。",
    pinyin: "Wǒ yǐjīng bǎ yóujiàn fā chūqù le.",
    pattern: "把 + Object + Verb + 出去 + 了  →  disposal structure",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "He seems upset about something.",
    characters: "他好像有什么不高兴的事。",
    pinyin: "Tā hǎoxiàng yǒu shénme bù gāoxìng de shì.",
    pattern: "好像 + Clause  →  it seems…",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "I forgot to bring my wallet.",
    characters: "我忘了带钱包。",
    pinyin: "Wǒ wàng le dài qiánbāo.",
    pattern: "忘了 + Verb  →  forgot to do",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "This problem is not as difficult as I thought.",
    characters: "这道题没有我想的那么难。",
    pinyin: "Zhè dào tí méiyǒu wǒ xiǎng de nàme nán.",
    pattern: "A + 没有 + B + 那么 + Adj  →  A is not as…as B",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "He has been waiting here for over an hour.",
    characters: "他在这里等了一个多小时了。",
    pinyin: "Tā zài zhèlǐ děng le yī gè duō xiǎoshí le.",
    pattern: "Verb + 了 + Duration + 了  →  ongoing past action",
    category: "Daily Life",
    level: "HSK2"
  },
  {
    english: "Please clean up your room.",
    characters: "请把你的房间收拾好。",
    pinyin: "Qǐng bǎ nǐ de fángjiān shōushi hǎo.",
    pattern: "请 + 把 + Object + Verb + 好  →  polite 把-disposal",
    category: "Daily Life",
    level: "HSK2"
  },

  // ─── TRAVEL (HSK2 extra) ──────────────────────────────────────────────────
  {
    english: "I have already booked the hotel.",
    characters: "我已经订好酒店了。",
    pinyin: "Wǒ yǐjīng dìng hǎo jiǔdiàn le.",
    pattern: "已经 + Verb + 好 + 了  →  finished preparing",
    category: "Travel",
    level: "HSK2"
  },
  {
    english: "Although it rained, we still had a great time.",
    characters: "虽然下雨了，但是我们玩得很开心。",
    pinyin: "Suīrán xià yǔ le, dànshì wǒmen wán de hěn kāixīn.",
    pattern: "虽然…但是…  →  concession",
    category: "Travel",
    level: "HSK2"
  },
  {
    english: "I prefer travelling by myself.",
    characters: "我更喜欢一个人旅行。",
    pinyin: "Wǒ gèng xǐhuān yīgè rén lǚxíng.",
    pattern: "更 + Verb  →  prefer even more",
    category: "Travel",
    level: "HSK2"
  },
  {
    english: "This is the most beautiful place I have ever been to.",
    characters: "这是我去过最漂亮的地方。",
    pinyin: "Zhè shì wǒ qù guò zuì piàoliang de dìfāng.",
    pattern: "去过 + 最 + Adj + 的 + Noun  →  superlative with experience",
    category: "Travel",
    level: "HSK2"
  },

  // ─── WORK & SCHOOL (HSK2 extra) ───────────────────────────────────────────
  {
    english: "I have to hand in the report tomorrow.",
    characters: "我明天要交报告了。",
    pinyin: "Wǒ míngtiān yào jiāo bàogào le.",
    pattern: "要 + Verb + 了  →  imminent obligation",
    category: "Work & School",
    level: "HSK2"
  },
  {
    english: "He explained this concept very clearly.",
    characters: "他把这个概念解释得很清楚。",
    pinyin: "Tā bǎ zhège gàiniàn jiěshì de hěn qīngchǔ.",
    pattern: "把 + Object + Verb + 得 + Adj  →  degree complement with 把",
    category: "Work & School",
    level: "HSK2"
  },
  {
    english: "If you don't understand, raise your hand and ask.",
    characters: "如果不懂，就举手提问。",
    pinyin: "Rúguǒ bù dǒng, jiù jǔ shǒu tí wèn.",
    pattern: "如果 + 不 + Adj, 就 + Action  →  conditional instruction",
    category: "Work & School",
    level: "HSK2"
  },
  {
    english: "Her Chinese has improved a lot compared to before.",
    characters: "她的中文比以前进步了很多。",
    pinyin: "Tā de Zhōngwén bǐ yǐqián jìnbù le hěn duō.",
    pattern: "比 + 以前 + Verb + 了 + 很多  →  improvement over past",
    category: "Work & School",
    level: "HSK2"
  },

  // ─── HEALTH (HSK2 extra) ──────────────────────────────────────────────────
  {
    english: "He recovered very quickly.",
    characters: "他恢复得很快。",
    pinyin: "Tā huīfù de hěn kuài.",
    pattern: "Verb + 得 + Adv  →  manner/degree complement",
    category: "Health",
    level: "HSK2"
  },
  {
    english: "The doctor told me not to eat spicy food.",
    characters: "医生让我不要吃辣的东西。",
    pinyin: "Yīshēng ràng wǒ bú yào chī là de dōngxi.",
    pattern: "让 + Person + 不要 + Verb  →  instructing someone not to",
    category: "Health",
    level: "HSK2"
  },
  {
    english: "Sleeping early and waking up early is good for your health.",
    characters: "早睡早起对身体有好处。",
    pinyin: "Zǎo shuì zǎo qǐ duì shēntǐ yǒu hǎochù.",
    pattern: "早 + V1 + 早 + V2 + 对…有好处  →  healthy habit",
    category: "Health",
    level: "HSK2"
  },
  {
    english: "His fever has gone down.",
    characters: "他的发烧退了。",
    pinyin: "Tā de fāshāo tuì le.",
    pattern: "Noun + Verb + 了  →  state has changed",
    category: "Health",
    level: "HSK2"
  }
];
