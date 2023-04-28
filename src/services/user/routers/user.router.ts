import express, { Router } from "express";
import { createUser } from "../controllers";

const router: Router = express.Router();
router.post('/', createUser);

export const userRouter: Router = router;