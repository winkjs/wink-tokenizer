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
} );
