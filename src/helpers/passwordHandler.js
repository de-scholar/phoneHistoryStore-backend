import bcrypt from 'bcrypt';

/**
 *
 * @param {string} password
 * @returns {string} hashedPassword
 * @function
 * @description it returns hashedPassword after hashing the passed password as argument
 */
export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(14));

// /**
//  * @returns {boolean} true
//  */
export const verifyPassword = ' () => {};';
