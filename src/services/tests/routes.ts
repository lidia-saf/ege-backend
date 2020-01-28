import { Request, Response } from 'express';
import { getTestsByName } from './TestsController';

export default [
    {
        path: '/api/v1/tests',
        method: 'get',
        handler: [
            async ({ query }: Request, res: Response) => {
                const result = await getTestsByName(query.q);
                res.status(200).send(result);
            }
        ]
    }
];

