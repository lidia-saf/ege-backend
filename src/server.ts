import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from './utils';
import routes from './services';
import errorHandlers from './middleware/errorHandlers';
import middleware from './middleware';
import mediaUploadRoute from './services/mediauploader/routes';

process.on('uncaughtException', e => {
    console.log(e);
    process.exit(1);
});

process.on('unhandledRejection', e => {
    console.log(e);
    process.exit(1);
})

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
router.use('/api/media/v1/post', mediaUploadRoute);
applyMiddleware(errorHandlers, router)

const { PORT = 3001 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}...`));
