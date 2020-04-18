import { Router } from 'express';
import UserController from '../../controllers/user.controller';
import ValidateSignup from '../../middlewares/signupValidate';
import ValidateLogin from '../../middlewares/loginValidate';

const userRouter = Router();
const { validateSignupData } = new ValidateSignup();
const { checkLoginCredentials } = new ValidateLogin();
const { saveNewUser, retrieveUser } = new UserController();

userRouter.post('/', validateSignupData, saveNewUser);
userRouter.post('/login', checkLoginCredentials, retrieveUser);

export default userRouter;
