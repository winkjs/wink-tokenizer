//     wink-tokenizer
//     Multilingual tokenizer that automatically tags each token with its type.
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-tokenizer”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

var contractions = Object.create( null );

// Tag - word.
var word = 'word';
// Verbs.
contractions[ 'can\'t' ] = [ { value: 'ca', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'CAN\'T' ] = [ { value: 'CA', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Can\'t' ] = [ { value: 'Ca', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'Couldn\'t' ] = [ { value: 'could', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'COULDN\'T' ] = [ { value: 'COULD', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Couldn\'t' ] = [ { value: 'Could', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'don\'t' ] = [ { value: 'do', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'DON\'T' ] = [ { value: 'DO', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Don\'t' ] = [ { value: 'Do', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'doesn\'t' ] = [ { value: 'does', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'DOESN\'T' ] = [ { value: 'DOES', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Doesn\'t' ] = [ { value: 'Does', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'didn\'t' ] = [ { value: 'did', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'DIDN\'T' ] = [ { value: 'DID', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Didn\'t' ] = [ { value: 'Did', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'hadn\'t' ] = [ { value: 'had', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'HADN\'T' ] = [ { value: 'HAD', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Hadn\'t' ] = [ { value: 'Had', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'mayn\'t' ] = [ { value: 'may', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'MAYN\'T' ] = [ { value: 'MAY', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Mayn\'t' ] = [ { value: 'May', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'mightn\'t' ] = [ { value: 'might', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'MIGHTN\'T' ] = [ { value: 'MIGHT', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Mightn\'t' ] = [ { value: 'Might', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'mustn\'t' ] = [ { value: 'must', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'MUSTN\'T' ] = [ { value: 'MUST', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Mustn\'t' ] = [ { value: 'Must', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'needn\'t' ] = [ { value: 'need', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'NEEDN\'T' ] = [ { value: 'NEED', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Needn\'t' ] = [ { value: 'Need', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'oughtn\'t' ] = [ { value: 'ought', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'OUGHTN\'T' ] = [ { value: 'OUGHT', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Oughtn\'t' ] = [ { value: 'Ought', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'shan\'t' ] = [ { value: 'sha', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'SHAN\'T' ] = [ { value: 'SHA', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Shan\'t' ] = [ { value: 'Sha', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'shouldn\'t' ] = [ { value: 'should', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'SHOULDN\'T' ] = [ { value: 'SHOULD', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Shouldn\'t' ] = [ { value: 'Should', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'won\'t' ] = [ { value: 'wo', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'WON\'T' ] = [ { value: 'WO', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Won\'t' ] = [ { value: 'Wo', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'wouldn\'t' ] = [ { value: 'would', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'WOULDN\'T' ] = [ { value: 'WOULD', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Wouldn\'t' ] = [ { value: 'Would', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'ain\'t' ] = [ { value: 'ai', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'AIN\'T' ] = [ { value: 'AI', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Ain\'t' ] = [ { value: 'Ai', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'aren\'t' ] = [ { value: 'are', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'AREN\'T' ] = [ { value: 'ARE', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Aren\'t' ] = [ { value: 'Are', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'isn\'t' ] = [ { value: 'is', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'ISN\'T' ] = [ { value: 'IS', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Isn\'t' ] = [ { value: 'Is', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'wasn\'t' ] = [ { value: 'was', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'WASN\'T' ] = [ { value: 'WAS', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Wasn\'t' ] = [ { value: 'Was', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'weren\'t' ] = [ { value: 'were', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'WEREN\'T' ] = [ { value: 'WERE', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Weren\'t' ] = [ { value: 'Were', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'haven\'t' ] = [ { value: 'have', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'HAVEN\'T' ] = [ { value: 'HAVE', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Haven\'t' ] = [ { value: 'Have', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'hasn\'t' ] = [ { value: 'has', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'HASN\'T' ] = [ { value: 'HAS', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Hasn\'t' ] = [ { value: 'Has', tag: word }, { value: 'n\'t', tag: word } ];

contractions[ 'daren\'t' ] = [ { value: 'dare', tag: word }, { value: 'n\'t', tag: word } ];
contractions[ 'DAREN\'T' ] = [ { value: 'DARE', tag: word }, { value: 'N\'T', tag: word } ];
contractions[ 'Daren\'t' ] = [ { value: 'Dare', tag: word }, { value: 'n\'t', tag: word } ];


// Pronouns like I, you, they, we, she, and he.
contractions[ 'i\'m' ] = [ { value: 'i', tag: word }, { value: '\'m', tag: word } ];
contractions[ 'I\'M' ] = [ { value: 'I', tag: word }, { value: '\'M', tag: word } ];
contractions[ 'I\'m' ] = [ { value: 'I', tag: word }, { value: '\'m', tag: word } ];

contractions[ 'i\'ve' ] = [ { value: 'i', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'I\'VE' ] = [ { value: 'I', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'I\'ve' ] = [ { value: 'I', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'i\'d' ] = [ { value: 'i', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'I\'D' ] = [ { value: 'I', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'I\'d' ] = [ { value: 'I', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'i\'ll' ] = [ { value: 'i', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'I\'LL' ] = [ { value: 'I', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'I\'ll' ] = [ { value: 'I', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'you\'ve' ] = [ { value: 'you', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'YOU\'VE' ] = [ { value: 'YOU', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'You\'ve' ] = [ { value: 'You', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'you\'d' ] = [ { value: 'you', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'YOU\'D' ] = [ { value: 'YOU', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'You\'d' ] = [ { value: 'You', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'you\'ll' ] = [ { value: 'you', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'YOU\'LL' ] = [ { value: 'YOU', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'You\'ll' ] = [ { value: 'You', tag: word }, { value: '\'ll', tag: word } ];

// they - 've, 'd, 'll, 're
contractions[ 'they\'ve' ] = [ { value: 'they', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'THEY\'VE' ] = [ { value: 'THEY', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'They\'ve' ] = [ { value: 'They', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'they\'d' ] = [ { value: 'they', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'THEY\'D' ] = [ { value: 'THEY', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'They\'d' ] = [ { value: 'They', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'they\'ll' ] = [ { value: 'they', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'THEY\'LL' ] = [ { value: 'THEY', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'They\'ll' ] = [ { value: 'They', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'they\'re' ] = [ { value: 'they', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'THEY\'RE' ] = [ { value: 'THEY', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'They\'re' ] = [ { value: 'They', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'we\'ve' ] = [ { value: 'we', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WE\'VE' ] = [ { value: 'WE', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'We\'ve' ] = [ { value: 'We', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'we\'d' ] = [ { value: 'we', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'WE\'D' ] = [ { value: 'WE', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'We\'d' ] = [ { value: 'We', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'we\'ll' ] = [ { value: 'we', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'WE\'LL' ] = [ { value: 'WE', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'We\'ll' ] = [ { value: 'We', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'we\'re' ] = [ { value: 'we', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'WE\'RE' ] = [ { value: 'WE', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'We\'re' ] = [ { value: 'We', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'she\'d' ] = [ { value: 'she', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'SHE\'D' ] = [ { value: 'SHE', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'She\'d' ] = [ { value: 'She', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'she\'ll' ] = [ { value: 'she', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'SHE\'LL' ] = [ { value: 'SHE', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'She\'ll' ] = [ { value: 'She', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'she\'s' ] = [ { value: 'she', tag: word }, { value: '\'s', tag: word } ];
contractions[ 'SHE\'S' ] = [ { value: 'SHE', tag: word }, { value: '\'S', tag: word } ];
contractions[ 'She\'s' ] = [ { value: 'She', tag: word }, { value: '\'s', tag: word } ];

contractions[ 'he\'d' ] = [ { value: 'he', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'HE\'D' ] = [ { value: 'HE', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'He\'d' ] = [ { value: 'He', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'he\'ll' ] = [ { value: 'he', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'HE\'LL' ] = [ { value: 'HE', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'He\'ll' ] = [ { value: 'He', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'he\'s' ] = [ { value: 'he', tag: word }, { value: '\'s', tag: word } ];
contractions[ 'HE\'S' ] = [ { value: 'HE', tag: word }, { value: '\'S', tag: word } ];
contractions[ 'He\'s' ] = [ { value: 'He', tag: word }, { value: '\'s', tag: word } ];

contractions[ 'it\'d' ] = [ { value: 'it', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'IT\'D' ] = [ { value: 'IT', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'It\'d' ] = [ { value: 'It', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'it\'ll' ] = [ { value: 'it', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'IT\'LL' ] = [ { value: 'IT', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'It\'ll' ] = [ { value: 'It', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'it\'s' ] = [ { value: 'it', tag: word }, { value: '\'s', tag: word } ];
contractions[ 'IT\'S' ] = [ { value: 'IT', tag: word }, { value: '\'S', tag: word } ];
contractions[ 'It\'s' ] = [ { value: 'It', tag: word }, { value: '\'s', tag: word } ];

// Wh Pronouns - what, who, when, where, why, how, there, that
contractions[ 'what\'ve' ] = [ { value: 'what', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WHAT\'VE' ] = [ { value: 'WHAT', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'What\'ve' ] = [ { value: 'What', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'what\'d' ] = [ { value: 'what', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'WHAT\'D' ] = [ { value: 'WHAT', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'What\'d' ] = [ { value: 'What', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'what\'ll' ] = [ { value: 'what', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'WHAT\'LL' ] = [ { value: 'WHAT', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'What\'ll' ] = [ { value: 'What', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'what\'re' ] = [ { value: 'what', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'WHAT\'RE' ] = [ { value: 'WHAT', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'What\'re' ] = [ { value: 'What', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'who\'ve' ] = [ { value: 'who', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WHO\'VE' ] = [ { value: 'WHO', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Who\'ve' ] = [ { value: 'Who', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'who\'d' ] = [ { value: 'who', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'WHO\'D' ] = [ { value: 'WHO', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'Who\'d' ] = [ { value: 'Who', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'who\'ll' ] = [ { value: 'who', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'WHO\'LL' ] = [ { value: 'WHO', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'Who\'ll' ] = [ { value: 'Who', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'who\'re' ] = [ { value: 'who', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'WHO\'RE' ] = [ { value: 'WHO', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'Who\'re' ] = [ { value: 'Who', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'when\'ve' ] = [ { value: 'when', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WHEN\'VE' ] = [ { value: 'WHEN', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'When\'ve' ] = [ { value: 'When', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'when\'d' ] = [ { value: 'when', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'WHEN\'D' ] = [ { value: 'WHEN', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'When\'d' ] = [ { value: 'When', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'when\'ll' ] = [ { value: 'when', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'WHEN\'LL' ] = [ { value: 'WHEN', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'When\'ll' ] = [ { value: 'When', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'when\'re' ] = [ { value: 'when', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'WHEN\'RE' ] = [ { value: 'WHEN', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'When\'re' ] = [ { value: 'When', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'where\'ve' ] = [ { value: 'where', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WHERE\'VE' ] = [ { value: 'WHERE', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Where\'ve' ] = [ { value: 'Where', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'where\'d' ] = [ { value: 'where', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'WHERE\'D' ] = [ { value: 'WHERE', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'Where\'d' ] = [ { value: 'Where', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'where\'ll' ] = [ { value: 'where', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'WHERE\'LL' ] = [ { value: 'WHERE', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'Where\'ll' ] = [ { value: 'Where', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'where\'re' ] = [ { value: 'where', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'WHERE\'RE' ] = [ { value: 'WHERE', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'Where\'re' ] = [ { value: 'Where', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'why\'ve' ] = [ { value: 'why', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WHY\'VE' ] = [ { value: 'WHY', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Why\'ve' ] = [ { value: 'Why', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'why\'d' ] = [ { value: 'why', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'WHY\'D' ] = [ { value: 'WHY', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'Why\'d' ] = [ { value: 'Why', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'why\'ll' ] = [ { value: 'why', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'WHY\'LL' ] = [ { value: 'WHY', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'Why\'ll' ] = [ { value: 'Why', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'why\'re' ] = [ { value: 'why', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'WHY\'RE' ] = [ { value: 'WHY', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'Why\'re' ] = [ { value: 'Why', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'how\'ve' ] = [ { value: 'how', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'HOW\'VE' ] = [ { value: 'HOW', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'How\'ve' ] = [ { value: 'How', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'how\'d' ] = [ { value: 'how', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'HOW\'D' ] = [ { value: 'HOW', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'How\'d' ] = [ { value: 'How', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'how\'ll' ] = [ { value: 'how', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'HOW\'LL' ] = [ { value: 'HOW', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'How\'ll' ] = [ { value: 'How', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'how\'re' ] = [ { value: 'how', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'HOW\'RE' ] = [ { value: 'HOW', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'How\'re' ] = [ { value: 'How', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'there\'ve' ] = [ { value: 'there', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'THERE\'VE' ] = [ { value: 'THERE', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'There\'ve' ] = [ { value: 'There', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'there\'d' ] = [ { value: 'there', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'THERE\'D' ] = [ { value: 'THERE', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'There\'d' ] = [ { value: 'There', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'there\'ll' ] = [ { value: 'there', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'THERE\'LL' ] = [ { value: 'THERE', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'There\'ll' ] = [ { value: 'There', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'there\'re' ] = [ { value: 'there', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'THERE\'RE' ] = [ { value: 'THERE', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'There\'re' ] = [ { value: 'There', tag: word }, { value: '\'re', tag: word } ];

contractions[ 'that\'ve' ] = [ { value: 'that', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'THAT\'VE' ] = [ { value: 'THAT', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'That\'ve' ] = [ { value: 'That', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'that\'d' ] = [ { value: 'that', tag: word }, { value: '\'d', tag: word } ];
contractions[ 'THAT\'D' ] = [ { value: 'THAT', tag: word }, { value: '\'D', tag: word } ];
contractions[ 'That\'d' ] = [ { value: 'That', tag: word }, { value: '\'d', tag: word } ];

contractions[ 'that\'ll' ] = [ { value: 'that', tag: word }, { value: '\'ll', tag: word } ];
contractions[ 'THAT\'LL' ] = [ { value: 'THAT', tag: word }, { value: '\'LL', tag: word } ];
contractions[ 'That\'ll' ] = [ { value: 'That', tag: word }, { value: '\'ll', tag: word } ];

contractions[ 'that\'re' ] = [ { value: 'that', tag: word }, { value: '\'re', tag: word } ];
contractions[ 'THAT\'RE' ] = [ { value: 'THAT', tag: word }, { value: '\'RE', tag: word } ];
contractions[ 'That\'re' ] = [ { value: 'That', tag: word }, { value: '\'re', tag: word } ];

// Let us!
contractions[ 'let\'s' ] = [ { value: 'let', tag: word }, { value: '\'s', tag: word } ];
contractions[ 'LET\'S' ] = [ { value: 'THAT', tag: word }, { value: '\'S', tag: word } ];
contractions[ 'Let\'s' ] = [ { value: 'Let', tag: word }, { value: '\'s', tag: word } ];

contractions[ 'could\'ve' ] = [ { value: 'could', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'COULD\'VE' ] = [ { value: 'COULD', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Could\'ve' ] = [ { value: 'Could', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'should\'ve' ] = [ { value: 'should', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'SHOULD\'VE' ] = [ { value: 'SHOULD', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Should\'ve' ] = [ { value: 'Should', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'would\'ve' ] = [ { value: 'would', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WOULD\'VE' ] = [ { value: 'WOULD', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Would\'ve' ] = [ { value: 'Would', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'i\'ll\'ve' ] = [ { value: 'i', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'I\'LL\'VE' ] = [ { value: 'I', tag: word }, { value: '\'LL', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'I\'ll\'ve' ] = [ { value: 'I', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'you\'ll\'ve' ] = [ { value: 'you', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'YOU\'LL\'VE' ] = [ { value: 'YOU', tag: word }, { value: '\'LL', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'You\'ll\'ve' ] = [ { value: 'You', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'they\'ll\'ve' ] = [ { value: 'they', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'THEY\'LL\'VE' ] = [ { value: 'THEY', tag: word }, { value: '\'LL', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'They\'ll\'ve' ] = [ { value: 'They', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'it\'ll\'ve' ] = [ { value: 'it', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'IT\'LL\'VE' ] = [ { value: 'IT', tag: word }, { value: '\'LL', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'It\'ll\'ve' ] = [ { value: 'It', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'he\'ll\'ve' ] = [ { value: 'he', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'HE\'LL\'VE' ] = [ { value: 'HE', tag: word }, { value: '\'LL', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'He\'ll\'ve' ] = [ { value: 'He', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'she\'ll\'ve' ] = [ { value: 'she', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'SHE\'LL\'VE' ] = [ { value: 'SHE', tag: word }, { value: '\'LL', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'She\'ll\'ve' ] = [ { value: 'She', tag: word }, { value: '\'ll', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'shouldn\'t\'ve' ] = [ { value: 'should', tag: word }, { value: 'n\'t', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'SHOULDN\'T\'VE' ] = [ { value: 'SHOULD', tag: word }, { value: 'N\'T', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Shouldn\'t\'ve' ] = [ { value: 'Should', tag: word }, { value: 'n\'t', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'couldn\'t\'ve' ] = [ { value: 'could', tag: word }, { value: 'n\'t', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'COULDN\'T\'VE' ] = [ { value: 'COULD', tag: word }, { value: 'N\'T', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Couldn\'t\'ve' ] = [ { value: 'Could', tag: word }, { value: 'n\'t', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'wouldn\'t\'ve' ] = [ { value: 'would', tag: word }, { value: 'n\'t', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'WOULDN\'T\'VE' ] = [ { value: 'WOULD', tag: word }, { value: 'N\'T', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'Wouldn\'t\'ve' ] = [ { value: 'Would', tag: word }, { value: 'n\'t', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'i\'d\'ve' ] = [ { value: 'i', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'I\'D\'VE' ] = [ { value: 'I', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'I\'d\'ve' ] = [ { value: 'I', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'you\'d\'ve' ] = [ { value: 'you', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'YOU\'D\'VE' ] = [ { value: 'YOU', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'You\'d\'ve' ] = [ { value: 'You', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'he\'d\'ve' ] = [ { value: 'he', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'HE\'D\'VE' ] = [ { value: 'HE', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'He\'d\'ve' ] = [ { value: 'He', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'she\'d\'ve' ] = [ { value: 'she', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'SHE\'D\'VE' ] = [ { value: 'SHE', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'She\'d\'ve' ] = [ { value: 'She', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'you\'d\'ve' ] = [ { value: 'you', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'YOU\'D\'VE' ] = [ { value: 'YOU', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'You\'d\'ve' ] = [ { value: 'You', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'they\'d\'ve' ] = [ { value: 'they', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'THEY\'D\'VE' ] = [ { value: 'THEY', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'They\'d\'ve' ] = [ { value: 'They', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'there\'d\'ve' ] = [ { value: 'there', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'THERE\'D\'VE' ] = [ { value: 'THERE', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'There\'d\'ve' ] = [ { value: 'There', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

contractions[ 'it\'d\'ve' ] = [ { value: 'it', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];
contractions[ 'IT\'D\'VE' ] = [ { value: 'IT', tag: word }, { value: '\'D', tag: word }, { value: '\'VE', tag: word } ];
contractions[ 'It\'d\'ve' ] = [ { value: 'It', tag: word }, { value: '\'d', tag: word }, { value: '\'ve', tag: word } ];

module.exports = contractions;
