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
    var output = [ { token: '@superman', tag: 'mention' },
                   { token: ':', tag: 'punctuation' },
                   { token: 'hit', tag: 'word' },
                   { token: 'me', tag: 'word' },
                   { token: 'up', tag: 'word' },
                   { token: 'on', tag: 'word' },
                   { token: 'my', tag: 'word' },
                   { token: 'email', tag: 'word' },
                   { token: 'r2d2@gmail.com', tag: 'email' },
                   { token: ';', tag: 'punctuation' },
                   { token: '&', tag: 'unknown' },
                   { token: 'we', tag: 'word' },
                   { token: 'will', tag: 'word' },
                   { token: 'plan', tag: 'word' },
                   { token: 'party', tag: 'word' },
                   { token: '🎉', tag: 'emoji' },
                   { token: '🎉', tag: 'emoji' },
                   { token: '🎉', tag: 'emoji' },
                   { token: '🎉', tag: 'emoji' },
                   { token: '<3', tag: 'emoticon' },
                   { token: '4pm', tag: 'time' },
                   { token: ':D', tag: 'emoticon' },
                   { token: '🎉', tag: 'emoji' },
                   { token: 'tom', tag: 'word' },
                   { token: 'at', tag: 'word' },
                   { token: '3pm', tag: 'time' },
                   { token: ':)', tag: 'emoticon' },
                   { token: ':)', tag: 'emoticon' },
                   { token: '#fun', tag: 'hashtag' } ];
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
    expect( tokenize( 'feeling good #fun' ) ).to.deep.equal( [ { token: 'feeling', tag: 'word' }, { token: 'good', tag: 'word' }, { token: '#fun', tag: 'hashtag' } ] );
  } );

  it( 'should gnerate the finger print correctly', function () {
    expect( fp() ).to.equal( 'wwh' );
  } );

  it( 'should tokenize a simple sentence with hashtag off', function () {
    expect( tokenizer.defineConfig( { hashtag: false } ) ).to.equal( 11 );
    expect( tokenize( 'feeling good #fun' ) ).to.deep.equal( [ { token: 'feeling', tag: 'word' }, { token: 'good', tag: 'word' }, { token: '#', tag: 'unknown' }, { token: 'fun', tag: 'word' } ] );
  } );

  it( 'should tokenize a complex sentence with full config', function () {
    var output = [ { token: '@superman', tag: 'mention' },
                   { token: ':', tag: 'punctuation' },
                   { token: 'hit', tag: 'word' },
                   { token: 'me', tag: 'word' },
                   { token: 'up', tag: 'word' },
                   { token: 'on', tag: 'word' },
                   { token: 'my', tag: 'word' },
                   { token: 'email', tag: 'word' },
                   { token: 'r2d2@gmail.com', tag: 'email' },
                   { token: ';', tag: 'punctuation' },
                   { token: '&', tag: 'unknown' },
                   { token: 'we', tag: 'word' },
                   { token: 'will', tag: 'word' },
                   { token: 'plan', tag: 'word' },
                   { token: 'party', tag: 'word' },
                   { token: '🎉', tag: 'emoji' },
                   { token: 'tom', tag: 'word' },
                   { token: 'at', tag: 'word' },
                   { token: '3pm', tag: 'time' },
                   { token: ':)', tag: 'emoticon' } ];
    expect( tokenize( '@superman: hit me up on my email r2d2@gmail.com; & we will plan party🎉 tom at 3pm:)' ) ).to.deep.equal( output );
  } );

  it( 'should gnerate the finger print correctly for complex sentence', function () {
    expect( fp() ).to.equal( 'm:wwwwwwe;zwwwwjwwtc' );
  } );

  it( 'should tokenize a complex sentence with empty config', function () {
    var output = [ { token: '@superman:', tag: 'unknown' },
                   { token: 'hit', tag: 'unknown' },
                   { token: 'me', tag: 'unknown' },
                   { token: 'up', tag: 'unknown' },
                   { token: 'on', tag: 'unknown' },
                   { token: 'my', tag: 'unknown' },
                   { token: 'email', tag: 'unknown' },
                   { token: 'r2d2@gmail.com;', tag: 'unknown' },
                   { token: '&', tag: 'unknown' },
                   { token: 'we', tag: 'unknown' },
                   { token: 'will', tag: 'unknown' },
                   { token: 'plan', tag: 'unknown' },
                   { token: 'party🎉', tag: 'unknown' },
                   { token: 'tom', tag: 'unknown' },
                   { token: 'at', tag: 'unknown' },
                   { token: '3pm:)', tag: 'unknown' } ];
    expect( tokenizer.defineConfig( {} ) ).to.equal( 0 );
    expect( tokenize( '@superman: hit me up on my email r2d2@gmail.com;  & we will plan party🎉 tom at 3pm:)' ) ).to.deep.equal( output );
  } );

  it( 'should tokenize a complex sentence with possessive & aposrtophy stuff', function () {
    var output = [ { token: 'She', tag: 'word' },
                   { token: 'wasn\'t', tag: 'word' },
                   { token: 'at', tag: 'word' },
                   { token: 'home', tag: 'word' },
                   { token: 'and', tag: 'word' },
                   { token: 'wild', tag: 'word' },
                   { token: 'cats\'', tag: 'word' },
                   { token: 'ate', tag: 'word' },
                   { token: 'her', tag: 'word' },
                   { token: 'dog\'s', tag: 'word' },
                   { token: 'food', tag: 'word' } ];
    expect( t().tokenize( 'She wasn\'t at home and wild cats\' ate her dog\'s food' ) ).to.deep.equal( output );
  } );
} );
