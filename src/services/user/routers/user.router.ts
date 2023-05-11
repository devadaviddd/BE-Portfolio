import express, { Router } from "express";
import { createUser, getUsers, updateUser } from "../controllers";

const router: Router = express.Router();
router.post('/', createUser);
router.get('/', getUsers);
router.put('/:id', updateUser)

export const userRouter: Router = router;