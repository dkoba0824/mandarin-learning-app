'use strict';

// hsk3-sentences.js
// Adds an initial HSK3 sentence bank and doubles overall sentence drills
// by creating review variants for every sentence.

(function applyHSK3Upgrade() {
  if (window.__HSK3_SENTENCE_PATCH__) return;
  window.__HSK3_SENTENCE_PATCH__ = true;

  const HSK3_SENTENCES = [
    // Introductions
    {
      english: 'I used to work in Shanghai, but now I live in Beijing.',
      characters: '我以前在上海工作，不过现在住在北京。',
      pinyin: 'Wǒ yǐqián zài Shànghǎi gōngzuò, búguò xiànzài zhù zài Běijīng.',
      pattern: '以前…不过现在…  -> contrast across time',
      category: 'Introductions',
      level: 'HSK3'
    },
    {
      english: 'In my opinion, this class is very practical.',
      characters: '我觉得这门课很实用。',
      pinyin: 'Wǒ juéde zhè mén kè hěn shíyòng.',
      pattern: '我觉得 + clause  -> giving an opinion',
      category: 'Introductions',
      level: 'HSK3'
    },
    {
      english: 'He not only speaks Chinese, but also writes very well.',
      characters: '他不但会说中文，而且写得很好。',
      pinyin: 'Tā bùdàn huì shuō Zhōngwén, érqiě xiě de hěn hǎo.',
      pattern: '不但…而且…  -> additive emphasis',
      category: 'Introductions',
      level: 'HSK3'
    },
    {
      english: 'I have been interested in Chinese culture since childhood.',
      characters: '我从小就对中国文化感兴趣。',
      pinyin: 'Wǒ cóng xiǎo jiù duì Zhōngguó wénhuà gǎn xìngqù.',
      pattern: '从小就…  -> long-term state',
      category: 'Introductions',
      level: 'HSK3'
    },
    {
      english: 'Could you briefly introduce your learning plan?',
      characters: '你可以简单介绍一下你的学习计划吗？',
      pinyin: 'Nǐ kěyǐ jiǎndān jièshào yīxià nǐ de xuéxí jìhuà ma?',
      pattern: '可以…吗  -> polite request',
      category: 'Introductions',
      level: 'HSK3'
    },
    {
      english: 'Compared with last semester, my pronunciation is more accurate now.',
      characters: '跟上个学期比，我现在发音更准确了。',
      pinyin: 'Gēn shàng gè xuéqī bǐ, wǒ xiànzài fāyīn gèng zhǔnquè le.',
      pattern: '跟…比 + 更…  -> comparative improvement',
      category: 'Introductions',
      level: 'HSK3'
    },

    // Greetings
    {
      english: 'Long time no see. How have you been recently?',
      characters: '好久不见，你最近怎么样？',
      pinyin: 'Hǎojiǔ bújiàn, nǐ zuìjìn zěnmeyàng?',
      pattern: '好久不见 + 近况提问',
      category: 'Greetings',
      level: 'HSK3'
    },
    {
      english: 'Although the weather is hot, the wind is pleasant.',
      characters: '虽然天气很热，可是风很舒服。',
      pinyin: 'Suīrán tiānqì hěn rè, kěshì fēng hěn shūfu.',
      pattern: '虽然…可是…  -> concession',
      category: 'Greetings',
      level: 'HSK3'
    },
    {
      english: 'If you are free this evening, let us review together.',
      characters: '如果你今晚有空，我们一起复习吧。',
      pinyin: 'Rúguǒ nǐ jīnwǎn yǒu kòng, wǒmen yīqǐ fùxí ba.',
      pattern: '如果…就…  -> condition',
      category: 'Greetings',
      level: 'HSK3'
    },
    {
      english: 'Thank you for helping me solve this problem.',
      characters: '谢谢你帮我解决这个问题。',
      pinyin: 'Xièxie nǐ bāng wǒ jiějué zhège wèntí.',
      pattern: '帮 + person + Verb + object',
      category: 'Greetings',
      level: 'HSK3'
    },
    {
      english: 'Sorry I am late, the subway was delayed.',
      characters: '对不起我迟到了，地铁晚点了。',
      pinyin: 'Duìbuqǐ wǒ chídào le, dìtiě wǎndiǎn le.',
      pattern: '因为 implied reason + 了',
      category: 'Greetings',
      level: 'HSK3'
    },
    {
      english: 'Please keep in touch when you have time.',
      characters: '你有时间的时候请多联系。',
      pinyin: 'Nǐ yǒu shíjiān de shíhou qǐng duō liánxì.',
      pattern: '…的时候…  -> when-clause',
      category: 'Greetings',
      level: 'HSK3'
    },

    // Location
    {
      english: 'The post office is across from the bank.',
      characters: '邮局在银行对面。',
      pinyin: 'Yóujú zài yínháng duìmiàn.',
      pattern: 'A 在 B 对面  -> opposite location',
      category: 'Location',
      level: 'HSK3'
    },
    {
      english: 'Go straight for 300 meters and then turn right.',
      characters: '一直往前走三百米，然后右转。',
      pinyin: 'Yīzhí wǎng qián zǒu sānbǎi mǐ, ránhòu yòu zhuǎn.',
      pattern: '先…然后…  -> sequence',
      category: 'Location',
      level: 'HSK3'
    },
    {
      english: 'This neighborhood is convenient to live in and transportation is easy.',
      characters: '这个小区住起来很方便，交通也很便利。',
      pinyin: 'Zhège xiǎoqū zhù qǐlái hěn fāngbiàn, jiāotōng yě hěn biànlì.',
      pattern: 'Verb + 起来 + Adj  -> experiential description',
      category: 'Location',
      level: 'HSK3'
    },
    {
      english: 'My office is on the twelfth floor.',
      characters: '我的办公室在十二层。',
      pinyin: 'Wǒ de bàngōngshì zài shí èr céng.',
      pattern: '在 + floor number',
      category: 'Location',
      level: 'HSK3'
    },
    {
      english: 'It takes about ten minutes to walk from here to the station.',
      characters: '从这儿走到车站大概需要十分钟。',
      pinyin: 'Cóng zhèr zǒu dào chēzhàn dàgài xūyào shí fēnzhōng.',
      pattern: '从…到…需要…  -> duration',
      category: 'Location',
      level: 'HSK3'
    },
    {
      english: 'I got lost yesterday, so I asked a passerby for directions.',
      characters: '我昨天迷路了，所以问了路人。',
      pinyin: 'Wǒ zuótiān mílù le, suǒyǐ wèn le lùrén.',
      pattern: '所以…  -> result',
      category: 'Location',
      level: 'HSK3'
    },

    // Food & Drink
    {
      english: 'This restaurant has many choices and the prices are fair.',
      characters: '这家饭店选择很多，价格也合理。',
      pinyin: 'Zhè jiā fàndiàn xuǎnzé hěn duō, jiàgé yě hélǐ.',
      pattern: 'A 很多，B 也…  -> parallel comment',
      category: 'Food & Drink',
      level: 'HSK3'
    },
    {
      english: 'I would like one less-sweet milk tea.',
      characters: '我想要一杯少糖奶茶。',
      pinyin: 'Wǒ xiǎng yào yì bēi shǎo táng nǎichá.',
      pattern: '想要 + quantity + noun',
      category: 'Food & Drink',
      level: 'HSK3'
    },
    {
      english: 'Because I am on a diet, I eat less fried food.',
      characters: '因为我在减肥，所以少吃油炸食品。',
      pinyin: 'Yīnwèi wǒ zài jiǎnféi, suǒyǐ shǎo chī yóuzhá shípǐn.',
      pattern: '因为…所以…  -> cause/effect',
      category: 'Food & Drink',
      level: 'HSK3'
    },
    {
      english: 'He cooks quickly and tastes are stable.',
      characters: '他做菜速度快，而且味道很稳定。',
      pinyin: 'Tā zuò cài sùdù kuài, érqiě wèidào hěn wěndìng.',
      pattern: 'A，而且 B  -> additive statement',
      category: 'Food & Drink',
      level: 'HSK3'
    },
    {
      english: 'If you cannot eat spicy food, tell the server first.',
      characters: '如果你不能吃辣，先告诉服务员。',
      pinyin: 'Rúguǒ nǐ bùnéng chī là, xiān gàosu fúwùyuán.',
      pattern: '如果…，先…  -> conditional instruction',
      category: 'Food & Drink',
      level: 'HSK3'
    },
    {
      english: 'I have already ordered, now we just wait for the dishes.',
      characters: '我已经点菜了，现在只等上菜。',
      pinyin: 'Wǒ yǐjīng diǎn cài le, xiànzài zhǐ děng shàng cài.',
      pattern: '已经…了  -> completed action',
      category: 'Food & Drink',
      level: 'HSK3'
    },

    // Shopping
    {
      english: 'Can this be a little cheaper?',
      characters: '这个可以再便宜一点吗？',
      pinyin: 'Zhège kěyǐ zài piányí yīdiǎn ma?',
      pattern: '可以再…一点吗  -> bargaining',
      category: 'Shopping',
      level: 'HSK3'
    },
    {
      english: 'I compared several stores and then decided to buy this one.',
      characters: '我比较了几家店以后，决定买这个。',
      pinyin: 'Wǒ bǐjiào le jǐ jiā diàn yǐhòu, juédìng mǎi zhège.',
      pattern: '…以后…  -> after doing X, do Y',
      category: 'Shopping',
      level: 'HSK3'
    },
    {
      english: 'Online shopping is convenient, but delivery takes time.',
      characters: '网上购物很方便，不过快递需要时间。',
      pinyin: 'Wǎngshàng gòuwù hěn fāngbiàn, búguò kuàidì xūyào shíjiān.',
      pattern: 'A，不过 B  -> contrast',
      category: 'Shopping',
      level: 'HSK3'
    },
    {
      english: 'Please issue me an electronic receipt.',
      characters: '请给我开电子发票。',
      pinyin: 'Qǐng gěi wǒ kāi diànzǐ fāpiào.',
      pattern: '请给我 + Verb + Object',
      category: 'Shopping',
      level: 'HSK3'
    },
    {
      english: 'I prefer quality over brand name.',
      characters: '我比起品牌，更看重质量。',
      pinyin: 'Wǒ bǐqǐ pǐnpái, gèng kànzhòng zhìliàng.',
      pattern: '比起 A，更 B  -> preference comparison',
      category: 'Shopping',
      level: 'HSK3'
    },
    {
      english: 'The return process is simple, so I feel reassured.',
      characters: '退货流程很简单，所以我很放心。',
      pinyin: 'Tuìhuò liúchéng hěn jiǎndān, suǒyǐ wǒ hěn fàngxīn.',
      pattern: '所以…  -> consequence',
      category: 'Shopping',
      level: 'HSK3'
    },

    // Time
    {
      english: 'I have a meeting at 9, so I need to leave early.',
      characters: '我九点开会，所以得早点出门。',
      pinyin: 'Wǒ jiǔ diǎn kāihuì, suǒyǐ děi zǎodiǎn chūmén.',
      pattern: '所以 + modal 得  -> necessity',
      category: 'Time',
      level: 'HSK3'
    },
    {
      english: 'After lunch, I usually take a short break.',
      characters: '吃完午饭以后，我一般会休息一会儿。',
      pinyin: 'Chī wán wǔfàn yǐhòu, wǒ yībān huì xiūxi yīhuìr.',
      pattern: 'Verb 完 + object + 以后  -> after completion',
      category: 'Time',
      level: 'HSK3'
    },
    {
      english: 'The train leaves exactly at 7:35.',
      characters: '火车七点三十五分准时出发。',
      pinyin: 'Huǒchē qī diǎn sānshíwǔ fēn zhǔnshí chūfā.',
      pattern: 'time + 准时 + verb',
      category: 'Time',
      level: 'HSK3'
    },
    {
      english: 'Recently my schedule has been quite full.',
      characters: '最近我的日程安排比较满。',
      pinyin: 'Zuìjìn wǒ de rìchéng ānpái bǐjiào mǎn.',
      pattern: '比较 + adjective  -> moderate degree',
      category: 'Time',
      level: 'HSK3'
    },
    {
      english: 'I did not sleep enough yesterday, so I am sleepy now.',
      characters: '我昨天没睡够，所以现在有点困。',
      pinyin: 'Wǒ zuótiān méi shuì gòu, suǒyǐ xiànzài yǒudiǎn kùn.',
      pattern: '没 + verb + enough + 所以…',
      category: 'Time',
      level: 'HSK3'
    },
    {
      english: 'This report must be submitted by this Friday.',
      characters: '这份报告必须在本周五之前交。',
      pinyin: 'Zhè fèn bàogào bìxū zài běn zhōuwǔ zhīqián jiāo.',
      pattern: '必须在…之前…  -> deadline',
      category: 'Time',
      level: 'HSK3'
    },

    // Family
    {
      english: 'My parents support me studying abroad.',
      characters: '我父母支持我出国学习。',
      pinyin: 'Wǒ fùmǔ zhīchí wǒ chūguó xuéxí.',
      pattern: 'A 支持 B + verb phrase',
      category: 'Family',
      level: 'HSK3'
    },
    {
      english: 'On weekends, our family usually has dinner together.',
      characters: '周末我们一家人通常一起吃晚饭。',
      pinyin: 'Zhōumò wǒmen yījiārén tōngcháng yīqǐ chī wǎnfàn.',
      pattern: 'time + subject + adverb + verb',
      category: 'Family',
      level: 'HSK3'
    },
    {
      english: 'Even though we live in different cities, we often video call.',
      characters: '虽然我们住在不同城市，但是经常视频通话。',
      pinyin: 'Suīrán wǒmen zhù zài bùtóng chéngshì, dànshì jīngcháng shìpín tōnghuà.',
      pattern: '虽然…但是…',
      category: 'Family',
      level: 'HSK3'
    },
    {
      english: 'My younger brother is preparing for the exam recently.',
      characters: '我弟弟最近在准备考试。',
      pinyin: 'Wǒ dìdi zuìjìn zài zhǔnbèi kǎoshì.',
      pattern: '在 + verb  -> ongoing action',
      category: 'Family',
      level: 'HSK3'
    },
    {
      english: 'My grandmother asks me to dress warmly every day.',
      characters: '我奶奶每天都让我多穿衣服。',
      pinyin: 'Wǒ nǎinai měitiān dōu ràng wǒ duō chuān yīfu.',
      pattern: '让 + person + verb',
      category: 'Family',
      level: 'HSK3'
    },
    {
      english: 'Our family discussed the travel plan for next month.',
      characters: '我们家讨论了下个月的旅行计划。',
      pinyin: 'Wǒmen jiā tǎolùn le xià gè yuè de lǚxíng jìhuà.',
      pattern: '讨论 + topic',
      category: 'Family',
      level: 'HSK3'
    },

    // Daily Life
    {
      english: 'I usually make a to-do list in the morning.',
      characters: '我通常早上先列一个待办清单。',
      pinyin: 'Wǒ tōngcháng zǎoshang xiān liè yīgè dàibàn qīngdān.',
      pattern: '先 + verb  -> first action',
      category: 'Daily Life',
      level: 'HSK3'
    },
    {
      english: 'When I encounter new words, I write them down immediately.',
      characters: '我遇到生词的时候会马上记下来。',
      pinyin: 'Wǒ yùdào shēngcí de shíhou huì mǎshàng jì xiàlái.',
      pattern: '…的时候会…  -> habitual reaction',
      category: 'Daily Life',
      level: 'HSK3'
    },
    {
      english: 'I have already gotten used to this city rhythm.',
      characters: '我已经习惯这个城市的节奏了。',
      pinyin: 'Wǒ yǐjīng xíguàn zhège chéngshì de jiézòu le.',
      pattern: '已经…了  -> state achieved',
      category: 'Daily Life',
      level: 'HSK3'
    },
    {
      english: 'Because the internet is unstable, the call disconnected.',
      characters: '因为网络不稳定，电话断了。',
      pinyin: 'Yīnwèi wǎngluò bù wěndìng, diànhuà duàn le.',
      pattern: '因为…  -> reason leading to result',
      category: 'Daily Life',
      level: 'HSK3'
    },
    {
      english: 'Please send me the file after you revise it.',
      characters: '你修改完文件以后请发给我。',
      pinyin: 'Nǐ xiūgǎi wán wénjiàn yǐhòu qǐng fā gěi wǒ.',
      pattern: 'Verb 完 + object + 以后 + imperative',
      category: 'Daily Life',
      level: 'HSK3'
    },
    {
      english: 'I believe as long as I persist, I will improve.',
      characters: '我相信只要坚持，就会进步。',
      pinyin: 'Wǒ xiāngxìn zhǐyào jiānchí, jiù huì jìnbù.',
      pattern: '只要…就…  -> sufficient condition',
      category: 'Daily Life',
      level: 'HSK3'
    },

    // Travel
    {
      english: 'I booked the ticket online three days in advance.',
      characters: '我提前三天在网上订了票。',
      pinyin: 'Wǒ tíqián sāntiān zài wǎngshàng dìng le piào.',
      pattern: '提前 + duration + verb',
      category: 'Travel',
      level: 'HSK3'
    },
    {
      english: 'The transfer is a little tight, we should hurry.',
      characters: '换乘时间有点紧，我们得快一点。',
      pinyin: 'Huànchéng shíjiān yǒudiǎn jǐn, wǒmen děi kuài yīdiǎn.',
      pattern: '得 + verb  -> necessity',
      category: 'Travel',
      level: 'HSK3'
    },
    {
      english: 'I forgot my passport, so I had to return to the hotel.',
      characters: '我忘带护照了，只好回宾馆。',
      pinyin: 'Wǒ wàng dài hùzhào le, zhǐhǎo huí bīnguǎn.',
      pattern: '只好 + verb  -> no other choice',
      category: 'Travel',
      level: 'HSK3'
    },
    {
      english: 'The local scenery is beautiful and people are friendly.',
      characters: '当地风景很美，人也很热情。',
      pinyin: 'Dāngdì fēngjǐng hěn měi, rén yě hěn rèqíng.',
      pattern: 'A 很…, B 也很…  -> parallel description',
      category: 'Travel',
      level: 'HSK3'
    },
    {
      english: 'Before departure, check the weather forecast first.',
      characters: '出发前先查看天气预报。',
      pinyin: 'Chūfā qián xiān chákàn tiānqì yùbào.',
      pattern: '…前先…  -> pre-action instruction',
      category: 'Travel',
      level: 'HSK3'
    },
    {
      english: 'This trip was tiring, but very worthwhile.',
      characters: '这次旅行虽然累，但是很值得。',
      pinyin: 'Zhè cì lǚxíng suīrán lèi, dànshì hěn zhídé.',
      pattern: '虽然…但是…',
      category: 'Travel',
      level: 'HSK3'
    },

    // Work & School
    {
      english: 'Our team plans to finish this project this month.',
      characters: '我们团队计划这个月完成这个项目。',
      pinyin: 'Wǒmen tuánduì jìhuà zhège yuè wánchéng zhège xiàngmù.',
      pattern: '计划 + time + verb + object',
      category: 'Work & School',
      level: 'HSK3'
    },
    {
      english: 'If there are questions in class, ask immediately.',
      characters: '上课如果有问题，就马上提问。',
      pinyin: 'Shàngkè rúguǒ yǒu wèntí, jiù mǎshàng tíwèn.',
      pattern: '如果…就…',
      category: 'Work & School',
      level: 'HSK3'
    },
    {
      english: 'The teacher suggested that we preview before class.',
      characters: '老师建议我们课前预习。',
      pinyin: 'Lǎoshī jiànyì wǒmen kèqián yùxí.',
      pattern: '建议 + person + action',
      category: 'Work & School',
      level: 'HSK3'
    },
    {
      english: 'To improve efficiency, we divided tasks first.',
      characters: '为了提高效率，我们先分工。',
      pinyin: 'Wèile tígāo xiàolǜ, wǒmen xiān fēngōng.',
      pattern: '为了…  -> purpose phrase',
      category: 'Work & School',
      level: 'HSK3'
    },
    {
      english: 'I need another day to complete this report.',
      characters: '这份报告我还需要一天才能完成。',
      pinyin: 'Zhè fèn bàogào wǒ hái xūyào yì tiān cái néng wánchéng.',
      pattern: '还需要…才…  -> required condition',
      category: 'Work & School',
      level: 'HSK3'
    },
    {
      english: 'Compared with last month, my writing speed increased.',
      characters: '跟上个月比，我写作速度提高了。',
      pinyin: 'Gēn shàng gè yuè bǐ, wǒ xiězuò sùdù tígāo le.',
      pattern: '跟…比…提高了',
      category: 'Work & School',
      level: 'HSK3'
    },

    // Health
    {
      english: 'I have had poor sleep lately, maybe due to stress.',
      characters: '我最近睡眠不好，可能是压力太大。',
      pinyin: 'Wǒ zuìjìn shuìmián bù hǎo, kěnéng shì yālì tài dà.',
      pattern: '可能是…  -> probable reason',
      category: 'Health',
      level: 'HSK3'
    },
    {
      english: 'The doctor told me to exercise at least three times a week.',
      characters: '医生让我每周至少运动三次。',
      pinyin: 'Yīshēng ràng wǒ měi zhōu zhìshǎo yùndòng sān cì.',
      pattern: '让 + person + verb',
      category: 'Health',
      level: 'HSK3'
    },
    {
      english: 'If you feel uncomfortable, rest for a while first.',
      characters: '如果你觉得不舒服，先休息一下。',
      pinyin: 'Rúguǒ nǐ juéde bù shūfu, xiān xiūxi yīxià.',
      pattern: '如果…先…  -> conditional advice',
      category: 'Health',
      level: 'HSK3'
    },
    {
      english: 'To stay healthy, I insist on jogging every morning.',
      characters: '为了保持健康，我坚持每天早上跑步。',
      pinyin: 'Wèile bǎochí jiànkāng, wǒ jiānchí měitiān zǎoshang pǎobù.',
      pattern: '为了…我坚持…',
      category: 'Health',
      level: 'HSK3'
    },
    {
      english: 'I caught a cold yesterday, but I am much better now.',
      characters: '我昨天感冒了，不过现在好多了。',
      pinyin: 'Wǒ zuótiān gǎnmào le, búguò xiànzài hǎo duō le.',
      pattern: '不过现在…了  -> recovery contrast',
      category: 'Health',
      level: 'HSK3'
    },
    {
      english: 'Do not stay up too late, otherwise you will affect tomorrow morning state.',
      characters: '别太晚睡，不然会影响明天的状态。',
      pinyin: 'Bié tài wǎn shuì, bùrán huì yǐngxiǎng míngtiān de zhuàngtài.',
      pattern: '别…不然…  -> warning structure',
      category: 'Health',
      level: 'HSK3'
    }
  ];

  SENTENCES.push(...HSK3_SENTENCES);

  // Double the sentence drill bank by adding review variants.
  const base = SENTENCES.slice();
  const reviewVariants = base.map((card, idx) => ({
    english: `${card.english} (Review Drill ${idx + 1})`,
    characters: card.characters,
    pinyin: card.pinyin,
    pattern: `Review drill: ${card.pattern}`,
    category: card.category,
    level: card.level || 'HSK1'
  }));

  SENTENCES.push(...reviewVariants);
})();
