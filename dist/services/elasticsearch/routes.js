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
const ESProvider_1 = __importDefault(require("./ESProvider"));
const AuthorizationHandler_1 = __importDefault(require("../../config/AuthorizationHandler"));
exports.default = [
    {
        path: '/ping',
        method: 'get',
        handler: [
            (req, res, next) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end("Pong");
            }
        ]
    },
    {
        path: '/api/tests/v1/post',
        method: 'post',
        handler: [
            (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
                AuthorizationHandler_1.default.verifyJwt(req, res);
                let document = req.body;
                let result = yield ESProvider_1.default.postDocToES(document);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            })
        ]
    },
    {
        path: '/api/tests/v1/delete',
        method: 'delete',
        handler: [
            (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
                let document = req.body;
                let result = yield ESProvider_1.default.deleteDocFromES();
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            })
        ]
    },
    {
        path: '/api/tests/v1/get',
        method: 'get',
        handler: [
            (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
                let result = yield ESProvider_1.default.getAllDataFromES(req.query);
                console.log(`result from get: ${result}`);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            })
        ]
    },
    {
        path: '/api/tests/v1/get/tests/:id',
        method: 'get',
        handler: [
            (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
                let result = yield ESProvider_1.default.getQuestionsDataByTestId(req.params.id);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            })
        ]
    },
    {
        path: '/api/tests/v1/get/maxtest',
        method: 'get',
        handler: [
            (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
                let result = yield ESProvider_1.default.getMaxTestValue();
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            })
        ]
    }
];
//# sourceMappingURL=routes.js.map