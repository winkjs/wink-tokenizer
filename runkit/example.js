/* eslint-disable no-console */
// Load tokenizer.
var tokenizer = require( 'wink-tokenizer' );
// Create it's instance.
var myTokenizer = tokenizer();
// Tokenize a tweet.
var s = '@superman: hit me up on my email r2d2@gmail.com, 2 of us plan party🎉 tom at 3pm:) #fun';
console.log( myTokenizer.tokenize( s ) );
console.log();
// Tokenize a sentence containing Hindi and English.
s = 'द्रविड़ ने टेस्ट में ३६ शतक जमाए, उनमें 21 विदेशी playground पर हैं।';
console.log( myTokenizer.tokenize( s ) );
