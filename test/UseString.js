/**
 * Created by baohg on 5/29/16.
 */
var assert = require("assert");
var chai = require("chai");
var expect = chai.expect;

require("../String/StringExtend.js");

describe('String', function() {
    describe('reverse()', function() {
        it('reverse string love', function () {
            expect("love".reverse()).to.equal("evol");
        });
    });

    describe('reverse()', function(){
        it('reverse string 123', function(){
            expect("123".reverse()).to.equal("321");
        });
    });

    describe('camelcase()', function(){
        it('camelize string "all men are created equal"', function(){
            expect("all men are created equal".camelcase()).to.equal("All Men Are Created Equal");
        });
    });
});