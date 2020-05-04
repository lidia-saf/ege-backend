import { Request, Response, NextFunction } from 'express';
import TestDescriptionProvider from './TestDescriptionProvider';
import authorizationHandler from '../../config/AuthorizationHandler';

export default [
    {
        path: '/api/testsdesc',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                if (!authorizationHandler.verifyJwt(req, res)) {
                    return;
                };
                let document = req.body;
                let result = await TestDescriptionProvider.postDocToES(document);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            }
        ]
    },
    {
        path: '/api/testsdesc/v1/get/tests',
        method: 'get',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                let result = await TestDescriptionProvider.getAllDataFromES();
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            }
        ]
    },
    {
        path: '/api/testsdesc/v1/get/test/:id',
        method: 'get',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                let result = await TestDescriptionProvider.getTestDescById(req.params.id);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            }
        ]
    },
    {
        path: '/api/testsdesc/v1/delete',
        method: 'delete',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                let document = req.body;
                let result = await TestDescriptionProvider.deleteDocFromES();
                res.setHeader('Content-Type','application/json');
                res.status(200).end(JSON.stringify(result));
            }
        ]
    },
];
