import express, { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers";
import multer from 'multer';

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router: Router = express.Router();
router.post('/', createUser);
router.get('/', getUsers);
router.patch('/:id', upload.single('avatar'), updateUser);
router.delete('/:id', deleteUser);
export const userRouter: Router = router;