"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationResult = void 0;
var OperationResult;
(function (OperationResult) {
    OperationResult[OperationResult["ALLOWED"] = 1] = "ALLOWED";
    OperationResult[OperationResult["BLOCKED"] = 2] = "BLOCKED";
    OperationResult[OperationResult["THROTTLED"] = 3] = "THROTTLED";
    OperationResult[OperationResult["REGULAR"] = 4] = "REGULAR";
})(OperationResult = exports.OperationResult || (exports.OperationResult = {}));
