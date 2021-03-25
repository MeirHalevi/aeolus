import { assert } from 'chai';
import { AllowToBan } from '../../index'
const sinon = require("sinon");

describe('AllowToBan tests', () => {
  describe('Without a cache defined in it',() => {

    let allowToBan = new AllowToBan()

    describe('filter method', () => {
      it('should reject filter method', () => {
        const callbackRule = sinon.fake.returns(true);
        return allowToBan.filter('test', 120, 120, 5, callbackRule).then(
          () => Promise.reject(new Error('Expected method to reject.')),
          err => assert.instanceOf(err, Error)
        );
      });
    });

    describe('reset method', () => {
      it('should reject reset method', () => {
        return allowToBan.reset('test', 120).then(
          () => Promise.reject(new Error('Expected method to reject.')),
          err => assert.instanceOf(err, Error)
        );
      });
    });
  });
});