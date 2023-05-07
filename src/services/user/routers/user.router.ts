import express, { Router } from "express";
import { createUser, getUsers } from "../controllers";

const router: Router = express.Router();
router.post('/', createUser);
router.get('/', getUsers);

export const userRouter: Router = router;