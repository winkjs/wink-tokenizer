//     wink-tokenizer
//     Multilingual tokenizer that automatically tags each token with its type.
//
//     Copyright (C) 2017-18  GRAYPE Systems Private Limited
//
//     This file is part of “wink-tokenizer”.
//
//     “wink-tokenizer” is free software: you can redistribute
//     it and/or modify it under the terms of the GNU Affero
//     General Public License as published by the Free
//     Software Foundation, version 3 of the License.
//
//     “wink-tokenizer” is distributed in the hope that it will
//     be useful, but WITHOUT ANY WARRANTY; without even
//     the implied warranty of MERCHANTABILITY or FITNESS
//     FOR A PARTICULAR PURPOSE.  See the GNU Affero General
//     Public License for more details.
//
//     You should have received a copy of the GNU Affero
//     General Public License along with “wink-tokenizer”.
//     If not, see <http://www.gnu.org/licenses/>.

//
var chai = require( 'chai' );
var mocha = require( 'mocha' );
var c = require( '../src/eng-contractions.js' );

var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

describe( 'english contractions', function () {
  it( 'should should be complete & accessible', function () {
    expect( ( Object.keys( c ) ).length ).to.equal( 239 );
  } );
} );
