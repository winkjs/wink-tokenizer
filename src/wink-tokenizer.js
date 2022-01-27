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

//
var emojiRegex = require( 'emoji-regex' );
var contractions = require( './eng-contractions.js' );
var rgxSpaces = /\s+/g;
// Ordinals only for Latin like 1st, 2nd or 12th or 33rd.
var rgxOrdinalL1 = /1\dth|[04-9]th|1st|2nd|3rd|[02-9]1st|[02-9]2nd|[02-9]3rd|[02-9][04-9]th|\d+\d[04-9]th|\d+\d1st|\d+\d2nd|\d+\d3rd/g;
// Apart from detecting pure integers or decimals, also detect numbers containing
// `. - / ,` so that dates, ip address, fractions and things like codes or part
// numbers are also detected as numbers only. These regex will therefore detected
// 8.8.8.8 or 12-12-1924 or 1,1,1,1.00 or 1/4 or 1/4/66/777 as numbers.
// Latin-1 Numbers.
var rgxNumberL1 = /\d+\/\d+|\d(?:[\.,-\/]?\d)*(?:\.\d+)?/g;
// Devanagari Numbers.
var rgxNumberDV = /[\u0966-\u096F]+\/[\u0966-\u096F]+|[\u0966-\u096F](?:[\.,-\/]?[\u0966-\u096F])*(?:\.[\u0966-\u096F]+)?/g;
var rgxMention = /@\w+/g;
// Latin-1 Hashtags.
// Include entire Latin-1 script and not just English alphas.
var rgxHashtagL1 = /#[a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF_][a-z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF_]*/gi;
// Devanagari Hashtags
var rgxHashtagDV = /#[\u0900-\u0963\u0970-\u097F_][\u0900-\u0963\u0970-\u097F\u0966-\u096F0-9_]*/gi;
// EMail is EN character set.
var rgxEmail = /[-!#$%&'*+\/=?^\w{|}~](?:\.?[-!#$%&'*+\/=?^\w`{|}~])*@[a-z0-9](?:-?\.?[a-z0-9])*(?:\.[a-z](?:-?[a-z0-9])*)+/gi;
// Bitcoin, Ruble, Indian Rupee, Other Rupee, Dollar, Pound, Yen, Euro, Wong.
var rgxCurrency = /[₿₽₹₨$£¥€₩]/g;
// These include both the punctuations: Latin-1 & Devanagari.
var rgxPunctuation = /[’'‘’`“”"\[\]\(\){}…,\.!;\?\-:\u0964\u0965]/g;
var rgxQuotedPhrase = /"[^"]*"/g;
// NOTE: URL will support only EN character set for now.
var rgxURL = /(?:https?:\/\/)(?:[\da-z\.-]+)\.(?:[a-z\.]{2,6})(?:[\/\w\.\-\?#=]*)*\/?/gi;
var rgxEmoji = emojiRegex();
var rgxEmoticon = /:-?[dps\*\/\[\]{}\(\)]|;-?[/(/)d]|<3/gi;
var rgxTime = /(?:\d|[01]\d|2[0-3]):?(?:[0-5][0-9])?\s?(?:[ap]\.?m\.?|hours|hrs)/gi;
// Inlcude [Latin-1 Supplement Unicode Block](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block))
var rgxWordL1 = /[a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF][a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF']*/gi;
// Define [Devanagari Unicode Block](https://unicode.org/charts/PDF/U0900.pdf)
var rgxWordDV = /[\u0900-\u094F\u0951-\u0963\u0970-\u097F]+/gi;
// Symbols go here; including Om.
var rgxSymbol = /[\u0950~@#%\^\+=\*\|\/<>&]/g;
// For detecting if the word is a potential contraction.
var rgxContraction = /'/;
// Singular & Plural possessive
var rgxPosSingular = /([a-z]+)('s)$/i;
var rgxPosPlural = /([a-z]+s)(')$/i;
// Regexes and their categories; used for tokenizing via match/split. The
// sequence is *critical* for correct tokenization.
var rgxsMaster = [
  { regex: rgxQuotedPhrase, category: 'quoted_phrase' },
  { regex: rgxURL, category: 'url' },
  { regex: rgxEmail, category: 'email' },
  { regex: rgxMention, category: 'mention' },
  { regex: rgxHashtagL1, category: 'hashtag' },
  { regex: rgxHashtagDV, category: 'hashtag' },
  { regex: rgxEmoji, category: 'emoji' },
  { regex: rgxEmoticon, category: 'emoticon' },
  { regex: rgxTime, category: 'time' },
  { regex: rgxOrdinalL1, category: 'ordinal' },
  { regex: rgxNumberL1, category: 'number' },
  { regex: rgxNumberDV, category: 'number' },
  { regex: rgxCurrency, category: 'currency' },
  { regex: rgxWordL1, category: 'word' },
  { regex: rgxWordDV, category: 'word' },
  { regex: rgxPunctuation, category: 'punctuation' },
  { regex: rgxSymbol, category: 'symbol' }
];

// Used to generate finger print from the tokens.
// NOTE: this variable is being reset in `defineConfig()`.
var fingerPrintCodes = {
  emoticon: 'c',
  email: 'e',
  emoji: 'j',
  hashtag: 'h',
  mention: 'm',
  number: 'n',
  ordinal: 'o',
  quoted_phrase: 'q', // eslint-disable-line camelcase
  currency: 'r',
  // symbol: 's',
  time: 't',
  url: 'u',
  word: 'w',
  alien: 'z'
};

// ### tokenizer
/**
 *
 * Creates an instance of {@link Tokenizer}.
 *
 * @return {Tokenizer} object conatining set of API methods for tokenizing a sentence
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

  /**
   * @classdesc Tokenizer class
   * @class Tokenizer
   * @hideconstructor
   */
  var methods = Object.create( null );

  // ### manageContraction
  /**
   *
   * Splits a contractions into words by first trying a lookup in strandard
   * `contractions`; if the lookup fails, it checks for possessive in `'s` or
   * `s'` forms and separates the possesive part from the word. Otherwise the
   * contraction is treated as a normal word and no splitting occurs.
   *
   * @param {string} word that could be a potential conraction.
   * @param {object[]} tokens where the outcome is pushed.
   * @return {object[]} updated tokens according to the `word.`
   * @private
  */
  var manageContraction = function ( word, tokens ) {
    var ct = contractions[ word ];
    var matches;
    if ( ct === undefined ) {
      // Try possesive of sigular & plural forms
      matches = word.match( rgxPosSingular );
      if ( matches ) {
        tokens.push( { value: matches[ 1 ], tag: 'word' } );
        tokens.push( { value: matches[ 2 ], tag: 'word' } );
      } else {
        matches = word.match( rgxPosPlural );
        if ( matches ) {
          tokens.push( { value: matches[ 1 ], tag: 'word' } );
          tokens.push( { value: matches[ 2 ], tag: 'word' } );
        } else tokens.push( { value: word, tag: 'word' } );
      }
    } else {
      // Manage via lookup; ensure cloning!
      tokens.push( Object.assign( {}, ct[ 0 ] ) );
      tokens.push( Object.assign( {}, ct[ 1 ] ) );
      if ( ct[ 2 ] ) tokens.push( Object.assign( {}, ct[ 2 ] ) );
    }
    return tokens;
  }; // manageContraction()

  // ### tokenizeTextUnit
  /**
   *
   * Attempts to tokenize the input `text` using the `rgxSplit`. The tokenization
   * is carried out by combining the regex matches and splits in the right sequence.
   * The matches are the *real tokens*, whereas splits are text units that are
   * tokenized in later rounds! The real tokens (i.e. matches) are pushed as
   * `object` and splits as `string`.
   *
   * @param {string} text unit that is to be tokenized.
   * @param {object} rgxSplit object containing the regex and it's category.
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
    var aword,
        i,
        imax,
        k = 0,
        t;

    // Combine tokens & matches in the following pattern [ b0 m0 b1 m1 ... ]
    matches = ( matches ) ? matches : [];
    for ( i = 0, imax = balance.length; i < imax; i += 1 ) {
      t = balance[ i ];
      t = t.trim();
      if ( t ) tokens.push( t );
      if ( k < matches.length ) {
        if ( tag === 'word' ) {
          // Tag type `word` token may have a contraction.
          aword = matches[ k ];
          if ( rgxContraction.test( aword ) ) {
            tokens = manageContraction( aword, tokens );
          } else {
            // Means there is no contraction.
            tokens.push( { value: aword, tag: tag } );
          }
        } else tokens.push( { value: matches[ k ], tag: tag } );
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
   * @param {string} text unit that is to be tokenized.
   * @param {object} regexes object containing the regex and it's category.
   * @return {undefined} nothing!
   * @private
  */
  var tokenizeTextRecursively = function ( text, regexes ) {
    var sentence = text.trim();
    var tokens = [];
    var i, imax;

    if ( !regexes.length ) {
      // No regex left, split on `spaces` and tag every token as **alien**.
      text.split( rgxSpaces ).forEach( function ( tkn ) {
        finalTokens.push( { value: tkn.trim(), tag: 'alien' } );
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
   * @method Tokenizer#defineConfig
   * @param {object} config It defines 0 or more properties from the list of
   * **14** properties. A true value for a property ensures tokenization
   * for that type of text; whereas false value will mean that the tokenization of that
   * type of text will not be attempted. It also **resets** the effect of any previous
   * call(s) to the [`addRegex()`](#addregex) API.
   *
   * *An empty config object is equivalent to splitting on spaces. Whatever tokens
   * are created like this are tagged as **alien** and **`z`** is the
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
   * @param {boolean} [config.number=true] any integer, decimal number, fractions such as **19**, **2.718**
   * or **1/4** and numerals containing "**`, - / .`**", for example 12-12-1924 (**`n`**)
   * @param {boolean} [config.ordinal=true] ordinals like **1st**, **2nd**, **3rd**, **4th** or **12th** or **91st** (**`o`**)
   * @param {boolean} [config.punctuation=true] common punctuation such as **`?`** or **`,`**
   * ( token becomes fingerprint )
   * @param {boolean} [config.quoted_phrase=false] any **"quoted text"** in the sentence. _Note: its default value is **false**._ (**`q`**)
   * @param {boolean} [config.symbol=true] for example **`~`** or **`+`** or **`&`** or **`%`** or **`/`** ( token becomes fingerprint )
   * @param {boolean} [config.time=true] common representation of time such as **4pm** or **16:00 hours** (**`t`**)
   * @param {boolean} [config.mention=true] **@mention**  as in github or twitter (**`m`**)
   * @param {boolean} [config.url=true] URL such as **https://github.com** (**`u`**)
   * @param {boolean} [config.word=true] word such as **faster** or **résumé** or **prévenir** (**`w`**)
   * @return {number} number of properties set to true from the list of above 13.
   * @example
   * // Do not tokenize & tag @mentions.
   * var myTokenizer.defineConfig( { mention: false } );
   * // -> 13
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
    // Count normalized length i.e. ignore multi-script entries.
    const uniqueCats = Object.create( null );
    rgxs.forEach( function ( rgx ) {
      uniqueCats[ rgx.category ] = true;
    } );
    // Reset the `fingerPrintCodes` variable.
    fingerPrintCodes = {
      emoticon: 'c',
      email: 'e',
      emoji: 'j',
      hashtag: 'h',
      mention: 'm',
      number: 'n',
      ordinal: 'o',
      quoted_phrase: 'q', // eslint-disable-line camelcase
      currency: 'r',
      // symbol: 's',
      time: 't',
      url: 'u',
      word: 'w',
      alien: 'z'
    };
    return ( ( Object.keys( uniqueCats ) ).length );
  }; // defineConfig()

  // ### tokenize
  /**
   *
   * Tokenizes the input `sentence` using the configuration specified via
   * [`defineConfig()`](#defineconfig).
   * Common contractions and possessive nouns are split into 2 separate tokens;
   * for example **I'll** splits as `'I'` and `'\'ll'` or **won't** splits as
   * `'wo'` and `'n\'t'`.
   *
   * @method Tokenizer#tokenize
   * @param {string} sentence the input sentence.
   * @return {object[]} of tokens; each one of them is an object with 2-keys viz.
   * `value` and its `tag` identifying the type of the token.
   * @example
   * var s = 'For detailed API docs, check out http://winkjs.org/wink-regression-tree/ URL!';
   * myTokenizer.tokenize( s );
   * // -> [ { value: 'For', tag: 'word' },
   * //      { value: 'detailed', tag: 'word' },
   * //      { value: 'API', tag: 'word' },
   * //      { value: 'docs', tag: 'word' },
   * //      { value: ',', tag: 'punctuation' },
   * //      { value: 'check', tag: 'word' },
   * //      { value: 'out', tag: 'word' },
   * //      { value: 'http://winkjs.org/wink-regression-tree/', tag: 'url' },
   * //      { value: 'URL', tag: 'word' },
   * //      { value: '!', tag: 'punctuation' } ]
  */
  var tokenize = function ( sentence ) {
    finalTokens = [];
    tokenizeTextRecursively( sentence, rgxs );
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
   * @method Tokenizer#getTokensFP
   * @return {string} finger print of tokens generated by the last call to `tokenize()`.
   * @example
   * // Generate finger print of sentence given in the previous example
   * // under tokenize().
   * myTokenizer.getTokensFP();
   * // -> 'wwww,wwuw!'
  */
  var getTokensFP = function () {
    var fp = [];
    finalTokens.forEach( function ( t ) {
      fp.push( ( fingerPrintCodes[ t.tag ] ) ? fingerPrintCodes[ t.tag ] : t.value );
    } );
    return fp.join( '' );
  }; // getFingerprint()

  // ### addTag
  var addTag = function (name, fingerprintCode) {
    if (fingerPrintCodes[name]) {
      throw new Error( 'Tag ' + name + ' already exists' );
    }

    fingerPrintCodes[name] = fingerprintCode;
  }; // addTag()

  // ### addRegex
  /**
   * Adds a regex for parsing a new type of token. This regex can either be mapped
   * to an existing tag or it allows creation of a new tag along with its finger print.
   * The uniqueness of the [finger prints](#defineconfig) have to ensured by the user.
   *
   * *The added regex(s) will supersede the internal parsing.*
   *
   * @method Tokenizer#addRegex
   * @param {RegExp} regex the new regular expression.
   * @param {string} tag tokens matching the `regex` will be assigned this tag.
   * @param {string} [fingerprintCode=undefined] required if adding a new
   * tag; ignored if using an existing tag.
   * @return {void} nothing!
   * @example
   * // Adding a regex for an existing tag
   * myTokenizer.addRegex( /\(oo\)/gi, 'emoticon' );
   * myTokenizer.tokenize( '(oo) Hi!' )
   * // -> [ { value: '(oo)', tag: 'emoticon' },
   * //      { value: 'Hi', tag: 'word' },
   * //      { value: '!', tag: 'punctuation' } ]
   *
   * // Adding a regex to parse a new token type
   * myTokenizer.addRegex( /hello/gi, 'greeting', 'g' );
   * myTokenizer.tokenize( 'hello, how are you?' );
   * // -> [ { value: 'hello', tag: 'greeting' },
   * //      { value: ',', tag: 'punctuation' },
   * //      { value: 'how', tag: 'word' },
   * //      { value: 'are', tag: 'word' },
   * //      { value: 'you', tag: 'word' },
   * //      { value: '?', tag: 'punctuation' } ]
   * // Notice how "hello" is now tagged as "greeting" and not as "word".
   *
   * // Using definConfig will reset the above!
   * myTokenizer.defineConfig( { word: true } );
   * myTokenizer.tokenize( 'hello, how are you?' );
   * // -> [ { value: 'hello', tag: 'word' },
   * //      { value: ',', tag: 'punctuation' },
   * //      { value: 'how', tag: 'word' },
   * //      { value: 'are', tag: 'word' },
   * //      { value: 'you', tag: 'word' },
   * //      { value: '?', tag: 'punctuation' } ]
  */

  var addRegex = function (regex, tag, fingerprintCode) {
    if (!fingerPrintCodes[tag] && !fingerprintCode) {
      throw new Error( 'Tag ' + tag + ' doesn\'t exist; Provide a \'fingerprintCode\' to add it as a tag.' );
    } else if (!fingerPrintCodes[tag]) {
      addTag(tag, fingerprintCode);
    }

    rgxs.unshift( { regex: regex, category: tag } );
  }; // addRegex()

  // Set quoted_phrase as false becuase mostly it is not required.
  defineConfig( { quoted_phrase: false } ); // eslint-disable-line camelcase
  methods.defineConfig = defineConfig;
  methods.tokenize = tokenize;
  methods.getTokensFP = getTokensFP;
  methods.addTag = addTag;
  methods.addRegex = addRegex;
  return methods;
};

module.exports = tokenizer;
