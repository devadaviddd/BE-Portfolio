import express, { Router } from 'express';
import { signin, signup } from '../controllers';

const router: Router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

export const authRouter: Router = router;