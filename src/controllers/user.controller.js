import _ from 'lodash';
import UserService from '../services/user.service';
import statusCodes from '../helpers/statusCodes';
import ResponseHandlers from '../helpers/responseHandlers';
import { generateToken } from '../helpers/tokenHandler';
import { hashPassword } from '../helpers/passwordHandler';
import customMessages from '../helpers/customMessages';

const { created, ok, internalServerError } = statusCodes;
const { somethingIsWrong } = customMessages;

/**
 * @description this class user controller will work with req, and response to interact with db
 */
export default class UserController extends ResponseHandlers {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.res = {};
  }

  /**
     * @param {object} req
     * @param {object} res
     * @returns {object} response to user
     */
  saveNewUser = async (req, res) => {
    this.res = res;
    req.body.password = hashPassword(req.body.password);
    const { dataValues } = await UserService.createNewUser(req.body);
    this.successResponse(this.res, created, null, generateToken(dataValues), null);
  }

  /**
     * @param {object} req
     * @param {object} res
     * @method
     * @returns {object} response to user
     * @description it sends an authentication token to user if they are authenticated
     */
  retrieveUser = async (req, res) => {
    this.res = res;
    const { gottenUser } = req;
    this.successResponse(this.res, ok, null, generateToken(gottenUser), null);
  }
}
