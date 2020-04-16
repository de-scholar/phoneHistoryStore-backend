import { Router } from 'express';
import UserController from '../../controllers/user.controller';
import ValidateSignup from '../../middlewares/signupValidate';

const { validateSignupData } = ValidateSignup;

const userRouter = Router();
const { saveNewUser } = new UserController();

userRouter.post('/', validateSignupData, saveNewUser);

export default userRouter;
