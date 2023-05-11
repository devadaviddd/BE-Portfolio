import express, { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers";

const router: Router = express.Router();
router.post('/', createUser);
router.get('/', getUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
export const userRouter: Router = router;