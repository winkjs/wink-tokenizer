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
var rgxTwitter = /\@\w+/g;
var rgxEmail = /[-!#$%&'*+\/=?^\w{|}~](?:\.?[-!#$%&'*+\/=?^\w`{|}~])*@[a-z0-9](?:-?\.?[a-z0-9])*(?:\.[a-z](?:-?[a-z0-9])*)+/gi;
var rgxCurrency = /[\$\£\¥\€]/g;
var rgxPunctuation = /[\’\'\‘\’\`\“\”\"\[\]\(\)\{\}\…\,\.\!\;\?\/\-\:]/g;
var rgxQuotedPhrase = /\"[^\"]*\"/g;
var rgxURL = /(?:https?:\/\/)(?:[\da-z\.-]+)\.(?:[a-z\.]{2,6})(?:[\/\w\.\-\?#=]*)*\/?/gi;
var rgxEmoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u26FF]|[\u2700-\u27BF]/g;
var rgxEmoticon = /:-?[dps\*\/\[\]\{\}\(\)]|;-?[/(/)d]|<3/gi;
var rgxTime = /(?:\d|[01]\d|2[0-3]):?(?:[0-5][0-9])?\s?(?:[ap]m|hours|hrs)\b/gi;
// Regexes and their categories; used for tokenizing via match/split. The
// sequence is *critical* for correct tokenization.
var rgxs = [
  { regex: rgxQuotedPhrase, category: 'quoted_phrase' },
  { regex: rgxURL, category: 'url' },
  { regex: rgxEmail, category: 'email' },
  { regex: rgxTwitter, category: 'twitter' },
  { regex: rgxEmoji, category: 'emoji' },
  { regex: rgxEmoticon, category: 'emoticon' },
  { regex: rgxTime, category: 'time' },
  { regex: rgxNumber, category: 'number' },
  { regex: rgxCurrency, category: 'currency' },
  { regex: rgxPunctuation, category: 'punctuation' }
];
// Used to generate finger print from the tokens.
var fingerPrintCodes = {
  twitter: 'b',
  emoticon: 'c',
  email: 'e',
  emoji: 'j',
  weekday: 'k',
  month: 'm',
  number: 'n',
  quoted_phrase: 'q', // eslint-disable-line camelcase
  currency: 'r',
  time: 't',
  url: 'u',
  word: 'w',
};
// Simple in-tokeizer lookup.
var weekday = 'weekday';
var month = 'month';
var lookup = Object.create( null );
// Setu weekdays.
lookup.mon = weekday;
lookup.monday = weekday;
lookup.tue = weekday;
lookup.tuesday = weekday;
lookup.wed = weekday;
lookup.wednesday = weekday;
lookup.thu = weekday;
lookup.thursday = weekday;
lookup.fri = weekday;
lookup.friday = weekday;
lookup.sat = weekday;
lookup.saturday = weekday;
lookup.sun = weekday;
lookup.sunday = weekday;
// Setup months;
lookup.jan = month;
lookup.january = month;
lookup.feb = month;
lookup.february = month;
lookup.mar = month;
lookup.march = month;
lookup.apr = month;
lookup.april = month;
lookup.may = month;
lookup.jun = month;
lookup.june = month;
lookup.jul = month;
lookup.july = month;
lookup.aug = month;
lookup.august = month;
lookup.sep = month;
lookup.september = month;
lookup.oct = month;
lookup.october = month;
lookup.nov = month;
lookup.november = month;
lookup.dec = month;
lookup.december = month;

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

  var finalTokens = [];
  var tagPlugins = Object.create( null );
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
    // Helper variables.
    var i,
        imax,
        k = 0,
        t;

    // Combine tokens & matches in the following pattern [ b0 m0 b1 m1 ... ]
    matches = ( matches ) ? matches : [];
    for ( i = 0, imax = balance.length; i < imax; i += 1 ) {
      t = balance[ i ];
      t = t.trim();
      if ( t ) tokens.push( t );
      if ( k < matches.length ) tokens.push( { token: matches[ k ], tag: rgxSplit.category } );
      k += 1;
    }

    return ( tokens );
  }; // tokenizeTextUnit()


var tokenizeTextRecursively = function ( text, regexes ) {
  var sentence = text.trim();
  var tokens = [];
  var i, imax;
  if ( !regexes.length ) {
    if ( sentence ) {
      sentence.split( /\W/ ).forEach( function ( t ) {
        var tag;
        if ( t ) {
          tag = lookup[ t.toLowerCase() ];
          finalTokens.push( { token: t, tag: ( tag ) ? tag : 'word' } );
        }
      } );
    }
    return;
  }

  var rgx = regexes[ 0 ];
  tokens = tokenizeTextUnit( sentence, rgx );

  for ( i = 0, imax = tokens.length; i < imax; i += 1 ) {
    if ( typeof tokens[ i ] === 'string' ) {
      tokenizeTextRecursively( tokens[ i ], regexes.slice( 1 ) );
    } else {
      finalTokens.push( tokens[ i ] );
    }
  }
};

  var defineConfig = function ( config ) {
    if ( Object.keys( config ).length ) {
      rgxs = rgxs.filter( function ( rgx ) {
        // Config for the Category of `rgx`.
        var cc = config[ rgx.category ];
        // Means `undefined` & `null` values are taken as true; otherwise
        // standard **truthy** and **falsy** interpretation applies!!
        return ( cc === undefined || cc === null || !!cc );
      } );
    } else rgxs = [];
  }; // defineConfig()

  var definePlugin = function ( tag, functions ) {
    if ( tagPlugins[ tag ] === undefined ) {
      throw Error( ':(' );
    }
    tagPlugins[ tag ] = functions;
  }; // addPlugin

  var tokenize = function ( sentence ) {
    finalTokens = [];
    tokenizeTextRecursively( sentence.trim().replace( rgxSpaces, ' ' ), rgxs );
    return finalTokens;
  }; // tokenize()

  var getFingerprint = function () {
    var fp = [];
    finalTokens.forEach( function ( t ) {
      fp.push( ( fingerPrintCodes[ t.tag ] ) ? fingerPrintCodes[ t.tag ] : t.token );
    } );
    return fp.join( '' );
  }; // getFingerprint()

  rgxs.forEach( function ( rgx ) {
    tagPlugins[ rgx.category ] = false;
  } );
  methods.defineConfig = defineConfig;
  methods.definePlugin = definePlugin;
  methods.tokenize = tokenize;
  methods.getFingerprint = getFingerprint;
  return methods;
};

module.exports = tokenizer;

// var t = tokenizer();
//
// var pt = t.tokenize;

// console.time( 'perf' );
// console.log( pt( '1abc@pappu.org<3 I,    😂😂     sanjaya😂 saxena:), sent <3 an $2.5 emails meet at 5:00pm:) to @prtksxna on his id -prtk.Sxna@gmail.com.') );
// console.timeEnd( 'perf' );
// console.time( 'perf' );
// console.log( pt( 'Fix the following 2 issues "fix me", "fix yourself" on http://github.com/winkjs/wink-sentiment/issues:) and then party 🎉' ) );
// console.timeEnd( 'perf' );
// console.time( 'perf' );
// console.log( pt( 'Fix the following 1st January 1992 issue "fix yourself" on 2-mon-ey-13 http://github.com/winkjs/wink-sentiment/issues:) and then party 🎉' ) );
// console.timeEnd( 'perf' );
// console.log( t.getFingerprint() );

// pt( 'I ate 3 mangos and 4.2bananas3');
// pt( 'I ate bananas2.')
// pt( '' );
