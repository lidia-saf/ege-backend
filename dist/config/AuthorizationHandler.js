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
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwk_to_pem_1 = __importDefault(require("jwk-to-pem"));
class AuthorizationHandler {
    loadJwk() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield axios_1.default(`https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_FpahK24B1/.well-known/jwks.json`);
            if (result.status === 200) {
                this.jwk = result.data;
            }
            ;
        });
    }
    verifyJwt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let parsedCookies = this.parseCookies(req, res);
            if (this.jwk !== null) {
                const pem = jwk_to_pem_1.default(this.jwk.keys[1]);
                jsonwebtoken_1.default.verify(parsedCookies.accessToken, pem, { algorithms: ['RS256'] }, (err, decodedToken) => {
                    if (err) {
                        res.status(500).end(JSON.stringify({ error: err }));
                        return false;
                    }
                    if (!decodedToken ||
                        !decodedToken['cognito:groups'] ||
                        decodedToken['cognito:groups'].indexOf('AdminGroup') === -1) {
                        res.status(500).end(JSON.stringify({ error: 'Access denied: no group' }));
                        return false;
                    }
                    return true;
                });
            }
        });
    }
    parseCookies(req, res) {
        if (!req.cookies.UserAuth || !req.cookies.hasOwnProperty('UserAuth')) {
            res.status(500).end(JSON.stringify({ error: 'Access denied: no cookies' }));
            return false;
        }
        return JSON.parse(req.cookies.UserAuth);
    }
}
const authorizationHandler = new AuthorizationHandler();
authorizationHandler.loadJwk();
exports.default = authorizationHandler;
//# sourceMappingURL=AuthorizationHandler.js.map