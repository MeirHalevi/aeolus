import { assert } from 'chai';
import { FailToBan } from '../../index';
const sinon = require('sinon');

describe('FailToBan tests', () => {
    describe('Without a cache defined in it', () => {
        const failToBan = new FailToBan();

        describe('filter method', () => {
            it('should reject filter method', () => {
                const callbackRule = sinon.fake.returns(true);
                return failToBan.filter('test', 120, 120, 5, callbackRule).then(
                    () => Promise.reject(new Error('Expected method to reject.')),
                    err => assert.instanceOf(err, Error)
                );
            });

            describe('reset method', () => {
                it('should reject reset method', () => {
                    return failToBan.reset('test', 120).then(
                        () => Promise.reject(new Error('Expected method to reject.')),
                        err => assert.instanceOf(err, Error)
                    );
                });
            });
        });
    });
});
