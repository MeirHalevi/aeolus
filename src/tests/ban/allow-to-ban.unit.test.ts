import { expect } from 'chai';
import { AllowToBan } from '../../index';
import * as sinon from 'sinon';

describe('AllowToBan tests', () => {
    const allowToBan = new AllowToBan();

    describe('Without a cache defined in it', () => {
        describe('filter method', () => {
            it('should reject filter method', async () => {
                const callbackRule: () => boolean = sinon.fake.returns(true);
                await expect(allowToBan.filter('test', 120, 120, 5, callbackRule)).to.be.rejectedWith(Error);
            });
        });

        describe('reset method', () => {
            it('should reject reset method', async () => {
                await expect(allowToBan.reset('test', 120)).to.be.rejectedWith(Error);
            });
        });
    });

    describe('With a cache defined in it', () => {
        describe('filter method', () => {
            sinon.stub(allowToBan as any, 'isBanned').returns(Promise.resolve(false));

            it('should return false when not banned & callback is true', async () => {
                const callbackRule = sinon.fake.returns(true);
                sinon.stub(allowToBan as any, 'fail').returns(Promise.resolve(false));

                await expect(allowToBan.filter('test', 120, 120, 5, callbackRule)).to.eventually.be.false;
            });

            it('should return false when not banned & callback is false', async () => {
                const callbackRule = sinon.fake.returns(false);

                await expect(allowToBan.filter('test', 120, 120, 5, callbackRule)).to.eventually.be.false;
            });
        });
    });
});
