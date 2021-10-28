import * as chai from 'chai';
import { AeolusCache } from '../../src/index';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

const assert = chai.assert;
const expect = chai.expect;

describe('AeolusCache tests', () => {
    describe('Without a cache defined in it', () => {
        describe('count method', () => {
            it('should throw error on count method', () => {
                assert.throw(function() {
                    AeolusCache.getInstance().count('test', 120);
                }, Error, /Uninitialize store cache/);
            });
        });
        describe('write method', () => {
            it('should throw error on write method', async () => {
                await expect(AeolusCache.getInstance().write('test', '1', 120)).to.be.rejectedWith(Error, /Uninitialize store cache/);
            });
        });
        describe('read method', () => {
            it('should throw error on read method', async () => {
                await expect(AeolusCache.getInstance().read('test')).to.be.rejectedWith(Error, /Uninitialize store cache/);
            });
        });
    });
});
