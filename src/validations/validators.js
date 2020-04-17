import Joi from '@hapi/joi';
import statusCodes from '../helpers/statusCodes';
import ResponseHandlers from '../helpers/responseHandlers';
import customMessages from '../helpers/customMessages';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
const NAMES_REGEX = /^[A-Za-z]+$/;
const {
  namesErrorMessage,
  passwordErrorMessage,
  emailErrorMessage,
  phoneNumberErrorMessage,
  ageErrorMessage,
} = customMessages;

/**
 *@classdesc contains all of validations, means some data needs to have specific format
 *otherwise we show error
 */
class Validators {
  /**
    * @param {object} fieldDataType data type for the field
    * @param {object} errorMessage error message to display
    * @returns {object} validationErrorMessage
    * @description it returns an object of validation error messages
    */
  static createValidationErrorMessage = (fieldDataType, errorMessage) => ({
    [`${fieldDataType}.base`]: errorMessage,
    [`${fieldDataType}.pattern.base`]: errorMessage,
    [`${fieldDataType}.empty`]: errorMessage,
    [`${fieldDataType}.min`]: errorMessage,
    [`${fieldDataType}.max`]: errorMessage,
    [`${fieldDataType}.format`]: errorMessage,
    [`${fieldDataType}.less`]: errorMessage,
    [`${fieldDataType}.greater`]: errorMessage,
    'any.required': errorMessage,
    'any.only': errorMessage,
  })

    /**
     * @param {object} error
     * @param {object} res
     * @param {integer} statusCode
     * @returns {object} next
     * @description it displays validation error message if there are any
     */
    static displayValidationErrorMessage = (error, res, statusCode) => {
      this.res = res;
      if (error) {
        const { details } = error;
        const messages = details.map((err) => err.message.replace(/['"]/g, '')).join(', ');
        new ResponseHandlers().errorResponse(this.res, statusCode, messages);
      }
    }

  /**
   * @param {object} regex
   * @param {object} message
   * @returns {object} string
   * @method
   * @description it returns the cleared string to validate
   */
  static clearToValidate = (regex, message) => Joi.string().regex(regex).trim().required()
    .messages(this.createValidationErrorMessage('string', message))

  /**
   * @param {object} userData
   * @returns {object} errorMessage
   * @description it takes userData and validate them, and after it returns the error messages
   * if something is wrong
   */
  static validateUserData = (userData) => {
    const schema = Joi.object({
      firstName: this.clearToValidate(NAMES_REGEX, namesErrorMessage),
      lastName: this.clearToValidate(NAMES_REGEX, namesErrorMessage),
      password: this.clearToValidate(PASSWORD_REGEX, passwordErrorMessage),
      email: this.clearToValidate(EMAIL_REGEX, emailErrorMessage),
      phoneNumber: Joi.string().required().messages(this.createValidationErrorMessage('string', phoneNumberErrorMessage)),
      age: Joi.number().required().messages(this.createValidationErrorMessage('string', ageErrorMessage)),
    });
    return schema.validate(userData, { abortEarly: false, allowUnknown: true });
  }
}

export default Validators;
