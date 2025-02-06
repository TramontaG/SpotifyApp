import express from 'express';
import LoginRouter from './Credentials';
import RedirectRouter from './Redirect';

const appRouter = express.Router();

appRouter.use('/login', LoginRouter);
appRouter.use('/redirect', RedirectRouter);

export default appRouter;
