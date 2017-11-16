//     wink-tokenizer
//     Versatile tokenizer that automatically tags each token with its type.
//
//     Copyright (C) 2017  GRAYPE Systems Private Limited
//
//     This file is part of “wink-sentiment”.
//
//     “wink-sentiment” is free software: you can redistribute
//     it and/or modify it under the terms of the GNU Affero
//     General Public License as published by the Free
//     Software Foundation, version 3 of the License.
//
//     “wink-sentiment” is distributed in the hope that it will
//     be useful, but WITHOUT ANY WARRANTY; without even
//     the implied warranty of MERCHANTABILITY or FITNESS
//     FOR A PARTICULAR PURPOSE.  See the GNU Affero General
//     Public License for more details.
//
//     You should have received a copy of the GNU Affero
//     General Public License along with “wink-sentiment”.
//     If not, see <http://www.gnu.org/licenses/>.

//
var rgxSpaces = /\s+/g;
var rgxNumber = /\d*\.\d+|\d+/g;
var rgxMention = /\@\w+/g;
var rgxHashtag = /\#[a-z][a-z0-9]*/g;
var rgxEmail = /[-!#$%&'*+\/=?^\w{|}~](?:\.?[-!#$%&'*+\/=?^\w`{|}~])*@[a-z0-9](?:-?\.?[a-z0-9])*(?:\.[a-z](?:-?[a-z0-9])*)+/gi;
var rgxCurrency = /[\$\£\¥\€]/g;
var rgxPunctuation = /[\’\'\‘\’\`\“\”\"\[\]\(\)\{\}\…\,\.\!\;\?\/\-\:]/g;
var rgxQuotedPhrase = /\"[^\"]*\"/g;
var rgxURL = /(?:https?:\/\/)(?:[\da-z\.-]+)\.(?:[a-z\.]{2,6})(?:[\/\w\.\-\?#=]*)*\/?/gi;
var rgxEmoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u26FF]|[\u2700-\u27BF]/g;
var rgxEmoticon = /:-?[dps\*\/\[\]\{\}\(\)]|;-?[/(/)d]|<3/gi;
var rgxTime = /(?:\d|[01]\d|2[0-3]):?(?:[0-5][0-9])?\s?(?:[ap]m|hours|hrs)\b/gi;
var rgxWord = /[a-z]+\'[a-z]{1,2}|[a-z]+s\'|[a-z]+/gi;
// Special regex to handle not elisions at sentence level itself.
var rgxNotElision = /([a-z])(n\'t)\b/gi;
// Regexes and their categories; used for tokenizing via match/split. The
// sequence is *critical* for correct tokenization.
var rgxsMaster = [
  { regex: rgxQuotedPhrase, category: 'quoted_phrase' },
  { regex: rgxURL, category: 'url' },
  { regex: rgxEmail, category: 'email' },
  { regex: rgxMention, category: 'mention' },
  { regex: rgxHashtag, category: 'hashtag' },
  { regex: rgxEmoji, category: 'emoji' },
  { regex: rgxEmoticon, category: 'emoticon' },
  { regex: rgxTime, category: 'time' },
  { regex: rgxNumber, category: 'number' },
  { regex: rgxCurrency, category: 'currency' },
  { regex: rgxWord, category: 'word' },
  { regex: rgxPunctuation, category: 'punctuation' }
];
// Used to generate finger print from the tokens.
var fingerPrintCodes = {
  emoticon: 'c',
  email: 'e',
  emoji: 'j',
  hashtag: 'h',
  mention: 'm',
  number: 'n',
  quoted_phrase: 'q', // eslint-disable-line camelcase
  currency: 'r',
  time: 't',
  url: 'u',
  word: 'w',
  unknown: 'z'
};

// ### tokenizer
/**
 *
 * Creates an instance of **`wink-tokenizer`**.
 *
 * @return {methods} object conatining set of API methods for tokenizing a sentence
 * and defining configuration, plugin etc.
 * @example
 * // Load wink tokenizer.
 * var tokenizer = require( 'wink-tokenizer' );
 * // Create your instance of wink tokenizer.
 * var myTokenizer = tokenizer();
*/
var tokenizer = function () {
  // Default configuration: most comprehensive tokenization. Make deep copy!
  var rgxs = rgxsMaster.slice( 0 );
  // The result of last call to `tokenize()` is retained here.
  var finalTokens = [];
  // Returned!
  var methods = Object.create( null );

  // ### tokenizeTextUnit
  /**
   *
   * Attempts to tokenize the input `text` using the `rgxSplit`. The tokenization
   * is carried out by combining the regex matches and splits in the right sequence.
   * The matches are the *real tokens*, whereas splits are text units that are
   * tokenized in later rounds! The real tokens (i.e. matches) are pushed as
   * `object` and splits as `string`.
   *
   * @param {string} text — unit that is to be tokenized.
   * @param {object} rgxSplit — object containing the regex and it's category.
   * @return {array} of tokens.
   * @private
  */
  var tokenizeTextUnit = function ( text, rgxSplit ) {
    // Regex matches go here; note each match is a token and has the same tag
    // as of regex's category.
    var matches = text.match( rgxSplit.regex );
    // Balance is "what needs to be tokenized".
    var balance = text.split( rgxSplit.regex );
    // The result, in form of combination of tokens & matches, is captured here.
    var tokens = [];
    // The tag;
    var tag = rgxSplit.category;
    // Helper variables.
    var i,
        imax,
        k = 0,
        t, words;

    // Combine tokens & matches in the following pattern [ b0 m0 b1 m1 ... ]
    matches = ( matches ) ? matches : [];
    for ( i = 0, imax = balance.length; i < imax; i += 1 ) {
      t = balance[ i ];
      t = t.trim();
      if ( t ) tokens.push( t );
      if ( k < matches.length ) {
        if ( tag === 'word' ) {
          // Tag type `word` token may have a contraction.
          words = matches[ k ].split( '\'' );
          if ( words.length === 1 ) {
            // Means there is no contraction.
            tokens.push( { token: matches[ k ], tag: tag } );
          } else {
            // Manage contraction! Split it in to 2 tokens.
            tokens.push( { token: words[ 0 ], tag: tag } );
            tokens.push( { token: '\'' + words[ 1 ], tag: tag } );
          }
        } else tokens.push( { token: matches[ k ], tag: tag } );
      }
      k += 1;
    }

    return ( tokens );
  }; // tokenizeTextUnit()

  // ### tokenizeTextRecursively
  /**
   *
   * Tokenizes the input text recursively using the array of `regexes` and then
   * the `tokenizeTextUnit()` function. If (or whenever) the `regexes` becomes
   * empty, it simply splits the text on non-word characters instead of using
   * the `tokenizeTextUnit()` function.
   *
   * @param {string} text — unit that is to be tokenized.
   * @param {object} regexes — object containing the regex and it's category.
   * @return {undefined} nothing!
   * @private
  */
  var tokenizeTextRecursively = function ( text, regexes ) {
    var sentence = text.trim();
    var tokens = [];
    var i, imax;

    if ( !regexes.length ) {
      // No regex left, split on `spaces` and tag every token as **unknown**.
      text.split( rgxSpaces ).forEach( function ( tkn ) {
        finalTokens.push( { token: tkn.trim(), tag: 'unknown' } );
      } );
      return;
    }

    var rgx = regexes[ 0 ];
    tokens = tokenizeTextUnit( sentence, rgx );

    for ( i = 0, imax = tokens.length; i < imax; i += 1 ) {
      if ( typeof tokens[ i ] === 'string' ) {
        // Strings become candidates for further tokenization.
        tokenizeTextRecursively( tokens[ i ], regexes.slice( 1 ) );
      } else {
        finalTokens.push( tokens[ i ] );
      }
    }
  }; // tokenizeTextRecursively()

  // ### defineConfig
  /**
   *
   * Defines the configuration in terms of the types of token that will be
   * extracted by [`tokenize()`](#tokenize) method. Note by default, all types
   * of tokens will be detected and tagged automatically.
   *
   * @param {object} config — It defines 0 or more properties from the list of
   * **12** properties. A true value for a property ensures tokenization
   * for that type of text; whereas false value will mean that the tokenization of that
   * type of text will not be attempted.
   *
   * *An empty config object is equivalent to splitting on spaces. Whatever tokens
   * are created like this are tagged as **unknown** and **`z`** is the
   * [finger print](#gettokensfp) code of this token type.*
   *
   * The table below gives the name of each property and it's description including
   * examples. The character with in paranthesis is the [finger print](#gettokensfp) code for the
   * token of that type.
   * @param {boolean} [config.currency=true] such as **$** or **£** symbols (**`r`**)
   * @param {boolean} [config.email=true] for example **john@acme.com** or **superman1@gmail.com** (**`e`**)
   * @param {boolean} [config.emoji=true] any standard unicode emojis e.g. 😊 or 😂 or 🎉 (**`j`**)
   * @param {boolean} [config.emoticon=true] common emoticons such as **`:-)`** or **`:D`** (**`c`**)
   * @param {boolean} [config.hashtag=true] hash tags such as **`#happy`** or **`#followme`** (**`h`**)
   * @param {boolean} [config.number=true] any integer or decimal number such as **19** or **2.718** (**`n`**)
   * @param {boolean} [config.punctuation=true] common punctuation such as **`?`** or **`,`**
   * ( token becomes fingerprint )
   * @param {boolean} [config.quoted_phrase=true] any **"quoted text"** in the sentence. (**`q`**)
   * @param {boolean} [config.time=true] common representation of time such as **4pm** or **16:00 hours** (**`t`**)
   * @param {boolean} [config.mention=true] **@mention**  as in github or twitter (**`m`**)
   * @param {boolean} [config.url=true] URL such as **https://github.com** (**`u`**)
   * @param {boolean} [config.word=true] word such as **faster** or **dog's** or **cats'** (**`w`**)
   * @return {number} number of properties set to true from the list of above 12.
   * @example
   * // Do not tokenize & tag @mentions.
   * var myTokenizer.defineConfig( { mention: false } );
   * // -> 11
   * // Only tokenize words as defined above.
   * var myTokenizer.defineConfig( {} );
   * // -> 0
  */
  var defineConfig = function ( config ) {
    if ( typeof config === 'object' && Object.keys( config ).length ) {
      rgxs = rgxsMaster.filter( function ( rgx ) {
        // Config for the Category of `rgx`.
        var cc = config[ rgx.category ];
        // Means `undefined` & `null` values are taken as true; otherwise
        // standard **truthy** and **falsy** interpretation applies!!
        return ( cc === undefined || cc === null || !!cc );
      } );
    } else rgxs = [];
    return rgxs.length;
  }; // defineConfig()

  // ### tokenize
  /**
   *
   * Tokenizes the input `sentence` using the configuration specified via
   * [`defineConfig()`](#defineconfig). All the negation contractions, if any,
   * are expanded before tokenization; for example **wasn't** will expand to **was not**.
   * Other contractions and possessive nouns are split into 2 separate tokens;
   * for example **I'll** will be split as `'I'` and `'\'ll'`.
   *
   * @param {string} sentence — the input sentence.
   * @return {object[]} of tokens; each one of them is an object with 2-keys viz.
   * `token` and its `tag` identifying the type of the token.
   * @example
   * var s = '@superman: hit me up on my email r2d2@gmail.com; & we will plan party🎉 tom at 3pm:)';
   * myTokenizer.tokenize( s );
   * // -> [ { token: '@superman', tag: 'mention' },
   * //      { token: ':', tag: 'punctuation' },
   * //      { token: 'hit', tag: 'word' },
   * //      { token: 'me', tag: 'word' },
   * //      { token: 'up', tag: 'word' },
   * //      { token: 'on', tag: 'word' },
   * //      { token: 'my', tag: 'word' },
   * //      { token: 'email', tag: 'word' },
   * //      { token: 'r2d2@gmail.com', tag: 'email' },
   * //      { token: ';', tag: 'punctuation' },
   * //      { token: '&', tag: 'unknown' },
   * //      { token: 'we', tag: 'word' },
   * //      { token: 'will', tag: 'word' },
   * //      { token: 'plan', tag: 'word' },
   * //      { token: 'party', tag: 'word' },
   * //      { token: '🎉', tag: 'emoji' },
   * //      { token: 'tom', tag: 'word' },
   * //      { token: 'at', tag: 'word' },
   * //      { token: '3pm', tag: 'time' },
   * //      { token: ':)', tag: 'emoticon' } ]
  */
  var tokenize = function ( sentence ) {
    finalTokens = [];
    // Preprocess: trim -> remove extra spaces -> expant **n't** contractions (if any).
    tokenizeTextRecursively( sentence.trim().replace( rgxSpaces, ' ' ).replace( rgxNotElision, '$1 not' ), rgxs );
    return finalTokens;
  }; // tokenize()

  // ### getTokensFP
  /**
   *
   * Returns the finger print of the tokens generated by the last call to
   * [`tokenize()`](#tokenize). A finger print is a string created by sequentially
   * joining the unique code of each token's type. Refer to table given under
   * [`defineConfig()`](#defineconfig) for values of these codes.
   *
   * A finger print is extremely useful in spotting patterns present in the sentence
   * using `regexes`, which is otherwise a complex and time consuming task.
   *
   * @return {string} finger print of tokens generated by the last call to `tokenize()`.
   * @example
   * // Generate finger print of sentence given in the previous example
   * // under tokenize().
   * myTokenizer.getTokensFP();
   * // -> 'm:wwwwwwe;zwwwwjwwtc'
  */
  var getTokensFP = function () {
    var fp = [];
    finalTokens.forEach( function ( t ) {
      fp.push( ( fingerPrintCodes[ t.tag ] ) ? fingerPrintCodes[ t.tag ] : t.token );
    } );
    return fp.join( '' );
  }; // getFingerprint()

  methods.defineConfig = defineConfig;
  methods.tokenize = tokenize;
  methods.getTokensFP = getTokensFP;
  return methods;
};

module.exports = tokenizer;
