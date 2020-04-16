import { Request, Response, NextFunction } from 'express';
import ESProvider from './ESProvider';

export default [
    {
        path: '/ping',
        method: 'get',
        handler: [
            (req: Request, res: Response, next: NextFunction) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end("Pong");
            }
        ]
    },
    {
        path: '/api/tests/v1/post',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                let document = req.body;
                let result = await ESProvider.postDocToES(document);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            }
        ]
    },
    {
        path: '/api/tests/v1/get',
        method: 'get',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                let result = await ESProvider.getAllDataFromES(req.query);
                console.log(`result from get: ${result}`);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            }
        ]
    },
    {
        path: '/api/tests/v1/get/tests/:id',
        method: 'get',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                let result = await ESProvider.getQuestionsDataByTestId(req.params.id);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            }
        ]
    },
    {
        path: '/api/tests/v1/get/maxtest',
        method: 'get',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                let result = await ESProvider.getMaxTestValue();
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            }
        ]
    }
];
