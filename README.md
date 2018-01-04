# wink-tokenizer

Versatile tokenizer that automatically tags each token with its type

### [![Build Status](https://api.travis-ci.org/winkjs/wink-tokenizer.svg?branch=master)](https://travis-ci.org/winkjs/wink-tokenizer) [![Coverage Status](https://coveralls.io/repos/github/winkjs/wink-tokenizer/badge.svg?branch=master)](https://coveralls.io/github/winkjs/wink-tokenizer?branch=master) [![devDependencies Status](https://david-dm.org/winkjs/wink-tokenizer/dev-status.svg)](https://david-dm.org/winkjs/wink-tokenizer?type=dev)

[<img align="right" src="https://decisively.github.io/wink-logos/logo-title.png" width="100px" >](http://winkjs.org/)

Tokenize sentences and also automatically tag each token as either word, email, twitter handle, or more using **`wink-tokenizer`**. It is a part of [wink](http://winkjs.org/) — a growing family of high quality packages for Statistical Analysis, Natural Language Processing and Machine Learning in NodeJS.

### Installation

Use [npm](https://www.npmjs.com/package/wink-tokenizer) to install:

    npm install wink-tokenizer --save

### Example
```javascript
// Load tokenizer.
var tokenizer = require( 'wink-tokenizer' );
// Create it's instance.
var myTokenizer = tokenizer();
// Just tokenize the sentence...
var s = '@superman: hit me up on my email r2d2@gmail.com, 2 of us plan party🎉 tom at 3pm:) #fun';
myTokenizer.tokenize( s );
// -> [ { value: '@superman', tag: 'mention' },
//      { value: ':', tag: 'punctuation' },
//      { value: 'hit', tag: 'word' },
//      { value: 'me', tag: 'word' },
//      { value: 'up', tag: 'word' },
//      { value: 'on', tag: 'word' },
//      { value: 'my', tag: 'word' },
//      { value: 'email', tag: 'word' },
//      { value: 'r2d2@gmail.com', tag: 'email' },
//      { value: ',', tag: 'punctuation' },
//      { value: '2', tag: 'number' },
//      { value: 'of', tag: 'word' },
//      { value: 'us', tag: 'word' },
//      { value: 'plan', tag: 'word' },
//      { value: 'party', tag: 'word' },
//      { value: '🎉', tag: 'emoji' },
//      { value: 'tom', tag: 'word' },
//      { value: 'at', tag: 'word' },
//      { value: '3pm', tag: 'time' },
//      { value: ':)', tag: 'emoticon' },
//      { value: '#fun', tag: 'hashtag' } ]
```

### Documentation
Check out the [tokenizer API documentation](http://winkjs.org/wink-tokenizer/) to learn more.

### Need Help?

If you spot a bug and the same has not yet been reported, raise a new [issue](https://github.com/winkjs/wink-tokenizer/issues) or consider fixing it and sending a pull request.

### Copyright & License

**wink-tokenizer** is copyright 2017-18 [GRAYPE Systems Private Limited](http://graype.in/).

It is licensed under the under the terms of the GNU Affero General Public License as published by the Free
Software Foundation, version 3 of the License.
