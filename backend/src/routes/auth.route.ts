import { Router } from 'express'
import {signUp, logIn, logOut, healthy } from '../controllers/auth.controller'

const router = Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/logout', logOut);

router.get('/ping', healthy);

export default router;
