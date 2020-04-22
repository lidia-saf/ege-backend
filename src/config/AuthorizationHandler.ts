import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

class AuthorizationHandler {
    private jwk: any;

    public async loadJwk() {
        let result = await axios(`https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_FpahK24B1/.well-known/jwks.json`)
        if (result.status === 200) {
            this.jwk = result.data;
        };
    }

    public async verifyJwt(req: Request, res: Response) {
        let parsedCookies = this.parseCookies(req, res);

        if (this.jwk !== null) {
            const pem = jwkToPem(this.jwk.keys[1]);
            jwt.verify(
                parsedCookies.accessToken,
                pem,
                { algorithms: ['RS256'] },
                (err: any, decodedToken:any) => {
                    if (err) {
                        res.status(500).end(JSON.stringify({error: err}))
                        return false;
                    }
                    if (!decodedToken ||
                        !decodedToken['cognito:groups'] ||
                        decodedToken['cognito:groups'].indexOf('AdminGroup') === -1) {
                        res.status(500).end(JSON.stringify({error: 'Access denied: no group'}));
                        return false;
                    }
                    return true;
                }
            );
        }
    }

    private parseCookies(req: Request, res: Response) {
        if (!req.cookies.UserAuth || !req.cookies.hasOwnProperty('UserAuth')) {
            res.status(500).end(JSON.stringify({error: 'Access denied: no cookies'}));
            return false;
        }
        return JSON.parse(req.cookies.UserAuth)
    }
}

const authorizationHandler = new AuthorizationHandler();
authorizationHandler.loadJwk();

export default authorizationHandler;
