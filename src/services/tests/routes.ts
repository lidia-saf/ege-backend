import { Request, Response, NextFunction } from 'express';
import { getTests, getTest, postTest, putTest } from './TestsController';

export default [
    {
        path: '/api/v1/get/tests',
        method: 'get',
        handler: [
            async ({ query }: Request, res: Response, next: NextFunction) => {
                const result = await getTests(query.q);
                res.status(200).json(result);
            }
        ]
    },
    {
        path: '/api/v1/get/tests/:id',
        method: 'get',
        handler: [
            async ({ params }: Request, res: Response, next: NextFunction) => {
                const result = await getTest(params.id);
                res.status(200).json(result);
            }
        ]
    },
    {
        path: '/api/v1/post/tests',
        method: 'post',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                const result = await postTest(req.body);
                res.status(200).send(result);
            }
        ]
    },
    {
        path: '/api/v1/put/tests/:id',
        method: 'put',
        handler: [
            async (req: Request, res: Response, next: NextFunction) => {
                const result = await putTest(req.body, req.params.id);
                res.status(200).send(result);
            }
        ]
    }
];

