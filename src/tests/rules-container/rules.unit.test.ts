import { expect } from 'chai';
import { Operation, RulesContainer, OperationResult } from '../../index';
import * as sinon from 'sinon';

describe('Rules container tests', () => {
    let mockRequest: Request;

    describe('Block rules', () => {
        it('should return blocked when blocked rule was defined', () => {
            const rulesContainer = new RulesContainer<Request>();
            const callbackRule = sinon.fake.returns(true);
            rulesContainer.addBlockRule(callbackRule, 'block');
            const operation = new Operation<Request>(rulesContainer);

            expect(operation.run(mockRequest)).to.eventually.equal(OperationResult.BLOCKED);
        });
    });

    describe('Allow rules', () => {
        it('should return allawed when allowed rule was defined', () => {
            const rulesContainer = new RulesContainer<Request>();
            const callbackRule = sinon.fake.returns(true);
            rulesContainer.addAllowRules(callbackRule, 'allow');
            const operation = new Operation<Request>(rulesContainer);
            expect(operation.run(mockRequest)).to.eventually.equal(OperationResult.ALLOWED);
        });
        it('should return allwoed when blocked rule & allow rule were defined', () => {
            const rulesContainer = new RulesContainer<Request>();
            const callbackRule = sinon.fake.returns(true);
            rulesContainer.addBlockRule(callbackRule, 'allow');
            rulesContainer.addAllowRules(callbackRule, 'allow');
            const operation = new Operation<Request>(rulesContainer);
            expect(operation.run(mockRequest)).to.eventually.equal(OperationResult.ALLOWED);
        });
    });

    describe('Regular', () => {
        it('should return reqular when the rules did not apply', () => {
            const rulesContainer = new RulesContainer<Request>();
            const callbackRule = sinon.fake.returns(false);
            rulesContainer.addBlockRule(callbackRule, 'allow');
            rulesContainer.addAllowRules(callbackRule, 'allow');
            const operation = new Operation<Request>(rulesContainer);
            expect(operation.run(mockRequest)).to.eventually.equal(OperationResult.REGULAR);
        });
        it('should return reqular when the rulesContainer have no rules defined in it', () => {
            const rulesContainer = new RulesContainer<Request>();
            const operation = new Operation<Request>(rulesContainer);
            expect(operation.run(mockRequest)).to.eventually.equal(OperationResult.REGULAR);
        });
    });
});
