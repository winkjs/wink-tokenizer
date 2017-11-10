var chai = require( 'chai' );
var mocha = require( 'mocha' );
var t = require( '../src/wink-tokenizer.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

// Validate stem test cases given by Dr Martin F Porter for Porter Stemmer Algoritm V2.
describe( 'basic test cycle', function () {
  var tokenizer = t();
  var tokenize = tokenizer.tokenize;
  var fp = tokenizer.getTokensFP;
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
    expect( tokenizer.defineConfig( { hashtag: false } ) ).to.equal( 10 );
    expect( tokenize( 'feeling good #fun' ) ).to.deep.equal( [ { token: 'feeling', tag: 'word' }, { token: 'good', tag: 'word' }, { token: 'fun', tag: 'word' } ] );
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
    expect( fp() ).to.equal( 'm:wwwwwwe;wwwwjwwtc' );
  } );

  it( 'should tokenize a complex sentence with empty config', function () {
    var output = [ { token: 'superman', tag: 'word' },
                   { token: 'hit', tag: 'word' },
                   { token: 'me', tag: 'word' },
                   { token: 'up', tag: 'word' },
                   { token: 'on', tag: 'word' },
                   { token: 'my', tag: 'word' },
                   { token: 'email', tag: 'word' },
                   { token: 'r2d2', tag: 'word' },
                   { token: 'gmail', tag: 'word' },
                   { token: 'com', tag: 'word' },
                   { token: 'we', tag: 'word' },
                   { token: 'will', tag: 'word' },
                   { token: 'plan', tag: 'word' },
                   { token: 'party', tag: 'word' },
                   { token: 'tom', tag: 'word' },
                   { token: 'at', tag: 'word' },
                   { token: '3pm', tag: 'word' } ];
    expect( tokenizer.defineConfig( {} ) ).to.equal( 0 );
    expect( tokenize( '@superman: hit me up on my email r2d2@gmail.com; & we will plan party🎉 tom at 3pm:)' ) ).to.deep.equal( output );
  } );
} );
