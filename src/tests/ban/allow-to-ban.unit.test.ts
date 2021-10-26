import { expect } from 'chai';
import { AllowToBan } from '../../index';
import * as sinon from 'sinon';

describe('AllowToBan tests', () => {
    describe('Without a cache defined in it', () => {
        const allowToBan = new AllowToBan();

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
});
