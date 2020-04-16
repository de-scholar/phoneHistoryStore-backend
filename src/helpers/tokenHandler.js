import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import _ from 'lodash';

dotenv.config();

const { JWT_EXPIRES_IN_HRS, JWT_KEY } = process.env;

/**
 *
 * @param {object} dataToToken
 * @returns {string} token
 * @function
 * @description this function returns the token from data that is passed
 */
export const generateToken = (dataToToken) => {
  const dataToEncrypt = _.omit(dataToToken, 'password');
  const token = jwt.sign(dataToEncrypt, JWT_KEY, { expiresIn: JWT_EXPIRES_IN_HRS });
  return token;
};

// /**
//  * @param {string} token
//  * @return {string} token
//  * @function
//  */
export const verifyToken = ' (token) => jwt.verify(token, JWT_KEY)';
