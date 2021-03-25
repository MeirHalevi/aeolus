import { assert } from 'chai';
import { AeolusCache } from '../../index'
const sinon = require("sinon");

describe('AeolusCache tests', () => {
  describe('Without a cache defined in it',() => {
    describe('count method', () => {
      it('should throw error on count method', () => {
        assert.throw(function() { AeolusCache.getInstance().count('test', 120) }, Error, /Uninitialize store cache/);
      });
    });
  
    describe('write method', () => {
      it('should throw error on count method', () => {
        assert.throw(function() { AeolusCache.getInstance().write('test', 1 , 120) }, Error, /Uninitialize store cache/);
      });
    });

    describe('write method', () => {
      it('should throw error on count method', () => {
        assert.throw(function() { AeolusCache.getInstance().read('test') }, Error, /Uninitialize store cache/);
      });
    });
  });
});