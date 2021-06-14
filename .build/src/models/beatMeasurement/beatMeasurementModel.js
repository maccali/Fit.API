"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeatMeasurementModel = exports.BeatMeasurementModelIndexes = void 0;
const dynamoose_1 = __importDefault(require("dynamoose"));
var BeatMeasurementModelIndexes;
(function (BeatMeasurementModelIndexes) {
    BeatMeasurementModelIndexes["userId"] = "UserIdIndex";
})(BeatMeasurementModelIndexes = exports.BeatMeasurementModelIndexes || (exports.BeatMeasurementModelIndexes = {}));
const schema = {
    id: {
        type: String,
        required: true,
        hashKey: true,
        index: [
            {
                global: true,
                name: BeatMeasurementModelIndexes.userId,
                rangeKey: 'userId'
            }
        ]
    },
    userId: {
        type: String,
        required: true
    },
    measurements: {
        type: Array,
        required: true
    }
};
exports.BeatMeasurementModel = dynamoose_1.default.model('BeatMeasurement', new dynamoose_1.default.Schema(schema, { timestamps: true }), {
    throughput: 'ON_DEMAND'
});
//# sourceMappingURL=beatMeasurementModel.js.map