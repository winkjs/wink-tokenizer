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

  it( 'should tokenize a sentence with pmultiple contractions', function () {
    var output = [ { value: 'I', tag: 'word' },
                   { value: '\'ll', tag: 'word' },
                   { value: 'eat', tag: 'word' },
                   { value: 'John', tag: 'word' },
                   { value: '\'s', tag: 'word' },
                   { value: 'food', tag: 'word' },
                   { value: 'today', tag: 'word' } ];
    expect( t().tokenize( 'I\'ll eat John\'s food today' ) ).to.deep.equal( output );
  } );
} );
