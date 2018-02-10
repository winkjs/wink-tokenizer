//     wink-tokenizer
//     Multilingual tokenizer that automatically tags each token with its type.
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
var chai = require( 'chai' );
var mocha = require( 'mocha' );
var t = require( '../src/wink-tokenizer.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

// NOTE: Sequence of test cases is important.
describe( 'basic test cycle', function () {
  var tokenizer = t();
  var tokenize = tokenizer.tokenize;
  var fp = tokenizer.getTokensFP;

  it( 'should tokenize a very complex sentence', function () {
    var output = [ { value: '@superman', tag: 'mention' },
                   { value: ':', tag: 'punctuation' },
                   { value: 'hit', tag: 'word' },
                   { value: 'me', tag: 'word' },
                   { value: 'up', tag: 'word' },
                   { value: 'on', tag: 'word' },
                   { value: 'my', tag: 'word' },
                   { value: 'email', tag: 'word' },
                   { value: 'r2d2@gmail.com', tag: 'email' },
                   { value: ';', tag: 'punctuation' },
                   { value: '&', tag: 'unknown' },
                   { value: 'we', tag: 'word' },
                   { value: 'will', tag: 'word' },
                   { value: 'plan', tag: 'word' },
                   { value: 'party', tag: 'word' },
                   { value: '🎉', tag: 'emoji' },
                   { value: '🎉', tag: 'emoji' },
                   { value: '🎉', tag: 'emoji' },
                   { value: '🎉', tag: 'emoji' },
                   { value: '<3', tag: 'emoticon' },
                   { value: '4pm', tag: 'time' },
                   { value: ':D', tag: 'emoticon' },
                   { value: '🎉', tag: 'emoji' },
                   { value: 'tom', tag: 'word' },
                   { value: 'at', tag: 'word' },
                   { value: '3pm', tag: 'time' },
                   { value: ':)', tag: 'emoticon' },
                   { value: ':)', tag: 'emoticon' },
                   { value: '#fun', tag: 'hashtag' } ];
    expect( tokenize( '@superman: hit me up on my email r2d2@gmail.com; & we will plan party🎉🎉🎉 🎉  <34pm:D    🎉 tom at 3pm:):) #fun' ) ).to.deep.equal( output );
  } );

  it( 'should gnerate the finger print correctly', function () {
    expect( fp() ).to.equal( 'm:wwwwwwe;zwwwwjjjjctcjwwtcch' );
  } );

  it( 'should return an empty array with blank sentence', function () {
    expect( tokenize( '' ) ).to.deep.equal( [] );
    expect( tokenize( '  ' ) ).to.deep.equal( [] );
  } );

  it( 'should tokenize a simple sentence', function () {
    expect( tokenize( 'feeling good #fun' ) ).to.deep.equal( [ { value: 'feeling', tag: 'word' }, { value: 'good', tag: 'word' }, { value: '#fun', tag: 'hashtag' } ] );
  } );

  it( 'should gnerate the finger print correctly', function () {
    expect( fp() ).to.equal( 'wwh' );
  } );

  it( 'should tokenize a simple sentence with hashtag off', function () {
    expect( tokenizer.defineConfig( { hashtag: false } ) ).to.equal( 11 );
    expect( tokenize( 'feeling good #fun' ) ).to.deep.equal( [ { value: 'feeling', tag: 'word' }, { value: 'good', tag: 'word' }, { value: '#', tag: 'unknown' }, { value: 'fun', tag: 'word' } ] );
  } );

  it( 'should tokenize a complex sentence with full config', function () {
    var output = [ { value: '@superman', tag: 'mention' },
                   { value: ':', tag: 'punctuation' },
                   { value: 'hit', tag: 'word' },
                   { value: 'me', tag: 'word' },
                   { value: 'up', tag: 'word' },
                   { value: 'on', tag: 'word' },
                   { value: 'my', tag: 'word' },
                   { value: 'email', tag: 'word' },
                   { value: 'r2d2@gmail.com', tag: 'email' },
                   { value: ';', tag: 'punctuation' },
                   { value: '&', tag: 'unknown' },
                   { value: 'we', tag: 'word' },
                   { value: 'will', tag: 'word' },
                   { value: 'plan', tag: 'word' },
                   { value: 'party', tag: 'word' },
                   { value: '🎉', tag: 'emoji' },
                   { value: 'tom', tag: 'word' },
                   { value: 'at', tag: 'word' },
                   { value: '3pm', tag: 'time' },
                   { value: ':)', tag: 'emoticon' } ];
    expect( tokenize( '@superman: hit me up on my email r2d2@gmail.com; & we will plan party🎉 tom at 3pm:)' ) ).to.deep.equal( output );
  } );

  it( 'should gnerate the finger print correctly for complex sentence', function () {
    expect( fp() ).to.equal( 'm:wwwwwwe;zwwwwjwwtc' );
  } );

  it( 'should tokenize a complex sentence with empty config', function () {
    var output = [ { value: '@superman:', tag: 'unknown' },
                   { value: 'hit', tag: 'unknown' },
                   { value: 'me', tag: 'unknown' },
                   { value: 'up', tag: 'unknown' },
                   { value: 'on', tag: 'unknown' },
                   { value: 'my', tag: 'unknown' },
                   { value: 'email', tag: 'unknown' },
                   { value: 'r2d2@gmail.com;', tag: 'unknown' },
                   { value: '&', tag: 'unknown' },
                   { value: 'we', tag: 'unknown' },
                   { value: 'will', tag: 'unknown' },
                   { value: 'plan', tag: 'unknown' },
                   { value: 'party🎉', tag: 'unknown' },
                   { value: 'tom', tag: 'unknown' },
                   { value: 'at', tag: 'unknown' },
                   { value: '3pm:)', tag: 'unknown' } ];
    expect( tokenizer.defineConfig( {} ) ).to.equal( 0 );
    expect( tokenize( '@superman: hit me up on my email r2d2@gmail.com;  & we will plan party🎉 tom at 3pm:)' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a complex sentence with possessive & aposrtophy stuff', function () {
    var output = [ { value: 'She', tag: 'word' },
                   { value: 'was', tag: 'word' },
                   { value: 'not', tag: 'word' },
                   { value: 'at', tag: 'word' },
                   { value: 'home', tag: 'word' },
                   { value: 'and', tag: 'word' },
                   { value: 'wild', tag: 'word' },
                   { value: 'cats', tag: 'word' },
                   { value: '\'', tag: 'word' },
                   { value: 'ate', tag: 'word' },
                   { value: 'her', tag: 'word' },
                   { value: 'dog', tag: 'word' },
                   { value: '\'s', tag: 'word' },
                   { value: 'food', tag: 'word' } ];
    expect( t().tokenize( 'She wasn\'t at home and wild cats\' ate her dog\'s food' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a sentence with multiple contractions', function () {
    var output = [ { value: 'I', tag: 'word' },
                   { value: '\'ll', tag: 'word' },
                   { value: 'eat', tag: 'word' },
                   { value: 'John', tag: 'word' },
                   { value: '\'s', tag: 'word' },
                   { value: 'food', tag: 'word' },
                   { value: 'today', tag: 'word' } ];
    expect( t().tokenize( 'I\'ll eat John\'s food today' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a sentence with words with diacritical marks', function () {
    var output = [ { value: 'Zoë', tag: 'word' },
                   { value: 'submitted', tag: 'word' },
                   { value: 'her', tag: 'word' },
                   { value: 'résumé', tag: 'word' },
                   { value: '🎉', tag: 'emoji' },
                   { value: 'in', tag: 'word' },
                   { value: 'Nestlé', tag: 'word' },
                   { value: ':-)', tag: 'emoticon' } ];
    expect( t().tokenize( 'Zoë submitted her résumé🎉 in Nestlé:-)' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a sentence in french', function () {
    var output = [ { value: 'Petit', tag: 'word' },
                   { value: 'a', tag: 'word' },
                   { value: 'petit', tag: 'word' },
                   { value: ',', tag: 'punctuation' },
                   { value: 'l', tag: 'word' },
                   { value: '’', tag: 'punctuation' },
                   { value: 'oiseau', tag: 'word' },
                   { value: 'fait', tag: 'word' },
                   { value: 'son', tag: 'word' },
                   { value: 'nid', tag: 'word' } ];
    expect( t().tokenize( 'Petit a petit, l’oiseau fait son nid' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize another sentence in french', function () {
    var output = [ { value: 'Mieux', tag: 'word' },
                   { value: 'vaut', tag: 'word' },
                   { value: 'prévenir', tag: 'word' },
                   { value: 'que', tag: 'word' },
                   { value: 'guérir', tag: 'word' },
                   { value: ':)', tag: 'emoticon' } ];
    expect( t().tokenize( 'Mieux vaut prévenir que guérir:)' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a sentence in german', function () {
    var output = [ { value: 'Übung', tag: 'word' },
                   { value: 'macht', tag: 'word' },
                   { value: 'den', tag: 'word' },
                   { value: 'Meister', tag: 'word' },
                   { value: '.', tag: 'punctuation' } ];
    expect( t().tokenize( 'Übung macht den Meister.' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a sentence in spanish', function () {
    var output = [ { value: 'Donde', tag: 'word' },
                   { value: 'hay', tag: 'word' },
                   { value: 'gana', tag: 'word' },
                   { value: ',', tag: 'punctuation' },
                   { value: 'hay', tag: 'word' },
                   { value: 'maña', tag: 'word' },
                   { value: '.', tag: 'punctuation' } ];
    expect( t().tokenize( 'Donde hay gana, hay maña.' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a sentence in icelandic', function () {
    var output = [ { value: 'Vinr', tag: 'word' },
                   { value: 'er', tag: 'word' },
                   { value: 'sás', tag: 'word' },
                   { value: 'vörnuð', tag: 'word' },
                   { value: 'býðr', tag: 'word' },
                   { value: '.', tag: 'punctuation' } ];
    expect( t().tokenize( 'Vinr er sás vörnuð býðr.' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a currency symbols', function () {
    var output = [ { value: 'I', tag: 'word' },
                   { value: 'have', tag: 'word' },
                   { value: '$', tag: 'currency' },
                   { value: '200.0', tag: 'number' },
                   { value: '₿', tag: 'currency' },
                   { value: '2.0', tag: 'number' },
                   { value: '₽', tag: 'currency' },
                   { value: '100', tag: 'number' },
                   { value: '₹', tag: 'currency' },
                   { value: '200', tag: 'number' },
                   { value: '₨', tag: 'currency' },
                   { value: '300', tag: 'number' },
                   { value: '$', tag: 'currency' },
                   { value: '10000.00', tag: 'number' },
                   { value: '£', tag: 'currency' },
                   { value: '2', tag: 'number' },
                   { value: '¥', tag: 'currency' },
                   { value: '0.5', tag: 'number' },
                   { value: '€', tag: 'currency' },
                   { value: '1.2', tag: 'number' },
                   { value: '₩', tag: 'currency' },
                   { value: '1', tag: 'number' },
                   { value: ':-)', tag: 'emoticon' } ];
    expect( t().tokenize( 'I have$200.0 ₿2.0 ₽100₹200₨300 $10000.00 £2 ¥0.5 €1.2₩1:-)' ) ).to.deep.equal( output );
  } );
} );
