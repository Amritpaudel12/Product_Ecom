
import express,{Router} from 'express' 
import { getAllUsers, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/verify.middleware.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJwt,logoutUser);
router.route('/all').get(getAllUsers);


export default router;