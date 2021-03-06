"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestDescriptionProvider_1 = __importDefault(require("./TestDescriptionProvider"));
const AuthorizationHandler_1 = __importDefault(require("../../config/AuthorizationHandler"));
exports.default = [
    {
        path: '/api/testsdesc',
        method: 'post',
        handler: [
            (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
                if (!AuthorizationHandler_1.default.verifyJwt(req, res)) {
                    return;
                }
                ;
                let document = req.body;
                let result = yield TestDescriptionProvider_1.default.postDocToES(document);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            })
        ]
    },
    {
        path: '/api/testsdesc/v1/get/tests',
        method: 'get',
        handler: [
            (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
                let result = yield TestDescriptionProvider_1.default.getAllDataFromES();
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            })
        ]
    },
    {
        path: '/api/testsdesc/v1/get/test/:id',
        method: 'get',
        handler: [
            (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
                let result = yield TestDescriptionProvider_1.default.getTestDescById(req.params.id);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            })
        ]
    },
    {
        path: '/api/testsdesc/v1/delete',
        method: 'delete',
        handler: [
            (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
                let document = req.body;
                let result = yield TestDescriptionProvider_1.default.deleteDocFromES();
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            })
        ]
    },
];
//# sourceMappingURL=routes.js.map