import { expect } from 'chai';
import { FailToBan } from '../../index';
import * as sinon from 'sinon';

describe('FailToBan tests', () => {
    describe('Without a cache defined in it', () => {
        const failToBan = new FailToBan();

        describe('filter method', () => {
            it('should reject filter method', async () => {
                const callbackRule = sinon.fake.returns(true);
                await expect(failToBan.filter('test', 120, 120, 5, callbackRule)).to.be.rejectedWith(Error);
            });
        });

        describe('reset method', () => {
            it('should reject reset method', async () => {
                await expect(failToBan.reset('test', 120)).to.be.rejectedWith(Error);
            });
        });
    });
});
