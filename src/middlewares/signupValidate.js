import Validators from '../validations/validators';
import UserService from '../services/user.service';
import statusCodes from '../helpers/statusCodes';
import customMessages from '../helpers/customMessages';
import ResponseHandlers from '../helpers/responseHandlers';

const { badRequest, conflict } = statusCodes;
const { phoneNumberAlreadyExists } = customMessages;
/**
 * @class
 * @classdesc it validate signup data
 */
export default class ValidateSignup extends Validators {
/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} next
 * @method
 * @description it allows to continue if the signup data are valid otherwise
 * it sends error response to user
 */
static validateSignupData = async (req, res, next) => {
  this.res = res;
  const userData = req.body;
  const { error } = this.validateUserData(userData);
  if (!error) {
    const existingUser = await UserService.getBy({ phoneNumber: userData.phoneNumber });
    if (!existingUser) {
      next();
    } else {
      new ResponseHandlers().errorResponse(this.res, conflict, phoneNumberAlreadyExists);
    }
  } else {
    this.displayValidationErrorMessage(error, this.res, badRequest);
  }
};
}
