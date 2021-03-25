import { expect } from 'chai';
import { Operation, RulesContainer, OperationResult } from '../../index';
const sinon = require('sinon');

describe('Rules container tests', () => {

  let mockRequest: Request;

  describe('Block rules', () => {
    it('should return blocked when blocked rule was defined', () => {
      const rulesContainer = new RulesContainer<Request>();
      const callbackRule = sinon.fake.returns(true);
      rulesContainer.addBlockRule(callbackRule, 'approve');
      const operation = new Operation<Request>(rulesContainer);
      expect(operation.run(mockRequest)).to.equal(OperationResult.Blocked);
    });
  });

  describe('Allow rules', () => {
    it('should return allawed when allowed rule was defined', () => {
      const rulesContainer = new RulesContainer<Request>();
      const callbackRule = sinon.fake.returns(true);
      rulesContainer.addApproveRule(callbackRule, 'approve');
      const operation = new Operation<Request>(rulesContainer);
      expect(operation.run(mockRequest)).to.equal(OperationResult.Allowed);
    });
    it('should return allwoed when blocked rule & approve rule were defined', () => {
      const rulesContainer = new RulesContainer<Request>();
      const callbackRule = sinon.fake.returns(true);
      rulesContainer.addBlockRule(callbackRule, 'approve');
      rulesContainer.addApproveRule(callbackRule, 'approve');
      const operation = new Operation<Request>(rulesContainer);
      expect(operation.run(mockRequest)).to.equal(OperationResult.Allowed);
    });
  });

  describe('Regular', () => {
    it('should return reqular when the rules did not apply', () => {
      const rulesContainer = new RulesContainer<Request>();
      const callbackRule = sinon.fake.returns(false);
      rulesContainer.addBlockRule(callbackRule, 'approve');
      rulesContainer.addApproveRule(callbackRule, 'approve');
      const operation = new Operation<Request>(rulesContainer);
      expect(operation.run(mockRequest)).to.equal(OperationResult.Regular);
    });
    it('should return reqular when the rulesContainer have no rules defined in it', () => {
      const rulesContainer = new RulesContainer<Request>();
      const operation = new Operation<Request>(rulesContainer);
      expect(operation.run(mockRequest)).to.equal(OperationResult.Regular);
    });
  });
});
