const router = Router();
import { Router } from 'express';
import {loginUser} from "../controller/users.js"

router.post("/login", loginUser);

export default router;