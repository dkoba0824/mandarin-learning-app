'use strict';

// listening-data.js
// Short dialogue clips for listening comprehension practice.

const LISTENING_DIALOGUES = [
  {
    id: 'hsk1_food_1',
    level: 'HSK1',
    title: 'Ordering Tea',
    turns: [
      { speaker: 'A', zh: '你想喝什么？', py: 'Nǐ xiǎng hē shénme?', en: 'What do you want to drink?' },
      { speaker: 'B', zh: '我想喝茶。', py: 'Wǒ xiǎng hē chá.', en: 'I want to drink tea.' },
      { speaker: 'A', zh: '热的还是冷的？', py: 'Rè de háishi lěng de?', en: 'Hot or cold?' },
      { speaker: 'B', zh: '热的，谢谢。', py: 'Rè de, xièxie.', en: 'Hot, thanks.' }
    ],
    question: 'What does B want to drink, and is it hot or cold?',
    expectedAnswer: 'B wants tea, and B wants it hot.',
    keywords: ['tea', 'hot', 'cha', 're', '热']
  },
  {
    id: 'hsk1_location_1',
    level: 'HSK1',
    title: 'Where Is the School?',
    turns: [
      { speaker: 'A', zh: '请问，学校在哪儿？', py: 'Qǐngwèn, xuéxiào zài nǎr?', en: 'Excuse me, where is the school?' },
      { speaker: 'B', zh: '学校在前面。', py: 'Xuéxiào zài qiánmian.', en: 'The school is ahead.' },
      { speaker: 'A', zh: '远吗？', py: 'Yuǎn ma?', en: 'Is it far?' },
      { speaker: 'B', zh: '不远，走五分钟。', py: 'Bù yuǎn, zǒu wǔ fēnzhōng.', en: 'Not far, five minutes on foot.' }
    ],
    question: 'Where is the school and how long does it take to walk there?',
    expectedAnswer: 'The school is ahead and it takes about five minutes to walk.',
    keywords: ['ahead', 'front', 'five', 'minutes', '前面', '五分钟']
  },
  {
    id: 'hsk1_time_1',
    level: 'HSK1',
    title: 'Meeting Time',
    turns: [
      { speaker: 'A', zh: '你几点去学校？', py: 'Nǐ jǐ diǎn qù xuéxiào?', en: 'What time do you go to school?' },
      { speaker: 'B', zh: '我八点去学校。', py: 'Wǒ bā diǎn qù xuéxiào.', en: 'I go to school at eight.' },
      { speaker: 'A', zh: '我们九点见，好吗？', py: 'Wǒmen jiǔ diǎn jiàn, hǎo ma?', en: 'Shall we meet at nine?' },
      { speaker: 'B', zh: '好，九点见。', py: 'Hǎo, jiǔ diǎn jiàn.', en: 'Okay, see you at nine.' }
    ],
    question: 'What time does B go to school, and what time will they meet?',
    expectedAnswer: 'B goes to school at 8:00 and they will meet at 9:00.',
    keywords: ['8', 'eight', '9', 'nine', '八点', '九点']
  },
  {
    id: 'hsk2_travel_1',
    level: 'HSK2',
    title: 'Bus or Subway',
    turns: [
      { speaker: 'A', zh: '你今天怎么去公司？', py: 'Nǐ jīntiān zěnme qù gōngsī?', en: 'How are you going to the company today?' },
      { speaker: 'B', zh: '我坐地铁，因为比较快。', py: 'Wǒ zuò dìtiě, yīnwèi bǐjiào kuài.', en: 'I am taking the subway because it is faster.' },
      { speaker: 'A', zh: '公共汽车呢？', py: 'Gōnggòng qìchē ne?', en: 'What about the bus?' },
      { speaker: 'B', zh: '早上太堵车了。', py: 'Zǎoshang tài dǔchē le.', en: 'It is too jammed in the morning.' }
    ],
    question: 'Why does B choose the subway instead of the bus?',
    expectedAnswer: 'B chooses the subway because it is faster and the morning traffic is heavy.',
    keywords: ['faster', 'traffic', 'jam', 'subway', '快', '堵车', '地铁']
  },
  {
    id: 'hsk2_work_1',
    level: 'HSK2',
    title: 'Homework Plan',
    turns: [
      { speaker: 'A', zh: '你今天有作业吗？', py: 'Nǐ jīntiān yǒu zuòyè ma?', en: 'Do you have homework today?' },
      { speaker: 'B', zh: '有，我要写两篇作文。', py: 'Yǒu, wǒ yào xiě liǎng piān zuòwén.', en: 'Yes, I need to write two essays.' },
      { speaker: 'A', zh: '你今晚能完成吗？', py: 'Nǐ jīnwǎn néng wánchéng ma?', en: 'Can you finish tonight?' },
      { speaker: 'B', zh: '应该可以，我先写一篇。', py: 'Yīnggāi kěyǐ, wǒ xiān xiě yī piān.', en: 'I should be able to, I will write one first.' }
    ],
    question: 'How much homework does B have, and what is B plan for tonight?',
    expectedAnswer: 'B has two essays and plans to start by writing one tonight.',
    keywords: ['two', 'essays', 'one first', '两篇', '一篇', '先']
  },
  {
    id: 'hsk2_health_1',
    level: 'HSK2',
    title: 'Feeling Sick',
    turns: [
      { speaker: 'A', zh: '你看起来不太舒服。', py: 'Nǐ kàn qǐlái bú tài shūfu.', en: 'You do not look very well.' },
      { speaker: 'B', zh: '我昨天晚上没睡好。', py: 'Wǒ zuótiān wǎnshang méi shuì hǎo.', en: 'I did not sleep well last night.' },
      { speaker: 'A', zh: '要不要去看医生？', py: 'Yào bú yào qù kàn yīshēng?', en: 'Do you want to see a doctor?' },
      { speaker: 'B', zh: '先休息一下吧。', py: 'Xiān xiūxi yīxià ba.', en: 'I will rest first.' }
    ],
    question: 'Why is B not feeling well, and what does B decide to do first?',
    expectedAnswer: 'B feels unwell because of poor sleep and decides to rest first.',
    keywords: ['sleep', 'did not sleep well', 'rest', '没睡好', '休息']
  },
  {
    id: 'hsk3_school_1',
    level: 'HSK3',
    title: 'Project Deadline',
    turns: [
      { speaker: 'A', zh: '这个项目你们什么时候交？', py: 'Zhège xiàngmù nǐmen shénme shíhou jiāo?', en: 'When will you submit this project?' },
      { speaker: 'B', zh: '我们打算周五之前交。', py: 'Wǒmen dǎsuàn zhōuwǔ zhīqián jiāo.', en: 'We plan to submit before Friday.' },
      { speaker: 'A', zh: '现在进度怎么样？', py: 'Xiànzài jìndù zěnmeyàng?', en: 'How is the progress now?' },
      { speaker: 'B', zh: '还差最后一部分，今晚会完成。', py: 'Hái chà zuìhòu yī bùfen, jīnwǎn huì wánchéng.', en: 'Only the final part is left; we will finish tonight.' }
    ],
    question: 'When will they submit the project, and what work remains?',
    expectedAnswer: 'They will submit before Friday, and only the final part remains.',
    keywords: ['before Friday', 'final part', 'tonight', '周五之前', '最后一部分']
  },
  {
    id: 'hsk3_travel_1',
    level: 'HSK3',
    title: 'Missed Train',
    turns: [
      { speaker: 'A', zh: '你怎么这么晚才到？', py: 'Nǐ zěnme zhème wǎn cái dào?', en: 'Why did you arrive so late?' },
      { speaker: 'B', zh: '我出门太晚，没赶上地铁。', py: 'Wǒ chūmén tài wǎn, méi gǎnshàng dìtiě.', en: 'I left too late and missed the subway.' },
      { speaker: 'A', zh: '后来你怎么来的？', py: 'Hòulái nǐ zěnme lái de?', en: 'How did you come after that?' },
      { speaker: 'B', zh: '我只好打车过来。', py: 'Wǒ zhǐhǎo dǎchē guòlái.', en: 'I had to take a taxi.' }
    ],
    question: 'Why was B late, and how did B finally arrive?',
    expectedAnswer: 'B left late, missed the subway, and took a taxi.',
    keywords: ['left late', 'missed subway', 'taxi', '没赶上地铁', '打车']
  },
  {
    id: 'hsk3_life_1',
    level: 'HSK3',
    title: 'Study Routine',
    turns: [
      { speaker: 'A', zh: '你最近怎么练习听力？', py: 'Nǐ zuìjìn zěnme liànxí tīnglì?', en: 'How have you been practicing listening lately?' },
      { speaker: 'B', zh: '我每天听二十分钟对话。', py: 'Wǒ měitiān tīng èrshí fēnzhōng duìhuà.', en: 'I listen to dialogues for 20 minutes every day.' },
      { speaker: 'A', zh: '效果怎么样？', py: 'Xiàoguǒ zěnmeyàng?', en: 'How is the result?' },
      { speaker: 'B', zh: '刚开始很难，现在容易多了。', py: 'Gāng kāishǐ hěn nán, xiànzài róngyì duō le.', en: 'At first it was hard, now it is much easier.' }
    ],
    question: 'What is B listening routine, and how has it changed over time?',
    expectedAnswer: 'B listens to dialogues 20 minutes daily, and it became easier over time.',
    keywords: ['20 minutes', 'every day', 'easier', '二十分钟', '每天', '容易']
  }
];
