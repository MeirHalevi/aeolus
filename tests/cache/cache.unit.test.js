"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const index_1 = require("../../index");
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
chai.use(chai_as_promised_1.default);
const assert = chai.assert;
const expect = chai.expect;
describe('AeolusCache tests', () => {
    describe('Without a cache defined in it', () => {
        describe('count method', () => {
            it('should throw error on count method', () => {
                assert.throw(function () {
                    index_1.AeolusCache.getInstance().count('test', 120);
                }, Error, /Uninitialize store cache/);
            });
        });
        describe('write method', () => {
            it('should throw error on write method', async () => {
                await expect(index_1.AeolusCache.getInstance().write('test', '1', 120)).to.be.rejectedWith(Error, /Uninitialize store cache/);
            });
        });
        describe('read method', () => {
            it('should throw error on read method', async () => {
                await expect(index_1.AeolusCache.getInstance().read('test')).to.be.rejectedWith(Error, /Uninitialize store cache/);
            });
        });
    });
});
