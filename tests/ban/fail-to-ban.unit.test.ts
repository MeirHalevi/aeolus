import { expect } from 'chai';
import { FailToBan } from '../../src/ban';
import * as sinon from 'sinon';

describe('FailToBan tests', () => {
    const failToBan = new FailToBan();

    describe('Without a cache defined in it', () => {
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

    describe('With a cache defined in it', () => {
        describe('filter method', () => {
            sinon.stub(failToBan as any, 'isBanned').returns(Promise.resolve(false));

            it('should return true when not banned & callback is true', async () => {
                const callbackRule = sinon.fake.returns(true);
                sinon.stub(failToBan as any, 'fail').returns(Promise.resolve(true));

                await expect(failToBan.filter('test', 120, 120, 5, callbackRule)).to.eventually.be.true;
            });

            it('should return false when not banned & callback is false', async () => {
                const callbackRule = sinon.fake.returns(false);

                await expect(failToBan.filter('test', 120, 120, 5, callbackRule)).to.eventually.be.false;
            });
        });
    });
});
