'use strict';

/**
 * Created by baohg on 02/06/2016.
 */

var assert = require("assert");
var chai = require("chai");
var expect = chai.expect;
var app = require('../app/Spread');

describe('Spread', function() {
  describe('spard()', function() {
    it('file1 and file2 equal', function () {
      expect(app.spard()).to.equal("files not are equal");
    });
  });
});