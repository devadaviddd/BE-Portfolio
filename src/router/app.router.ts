import { authRouter, userRouter } from "../services/user/routers";
import express, { Router } from 'express';

const router: Router = express.Router();
router.use('/users', userRouter);
router.use('/auth', authRouter)
export const applicationRouter: Router = router;
