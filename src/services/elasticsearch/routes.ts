import { Request, Response, NextFunction } from 'express';
import ESProvider from './ESProvider';

export default [
    {
        path: '/tests/v1/post',
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
        path: '/tests/v1/get',
        method: 'get',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                let result = await ESProvider.getAllDataFromES();
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(JSON.stringify(result));
            }
        ]
    }
    
];
