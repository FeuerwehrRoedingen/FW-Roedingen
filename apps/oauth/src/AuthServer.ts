import OAUTHServer, { Options } from 'express-oauth-server'

import { 
  generateAccessToken,
  generateAuthorizationCode,
  generateRefreshToken,
  getAccessToken,
  getAuthorizationCode,
  getClient,
  getRefreshToken,
  getUser,
  getUserFromClient,
  saveAuthorizationCode,
  saveToken,
  validateScope,
  verifyScope
} from './Callback'

const options: Options = {
  model: {
    generateAccessToken,
    generateAuthorizationCode,
    generateRefreshToken,
    getAccessToken,
    getAuthorizationCode,
    getClient,
    getRefreshToken,
    getUser,
    getUserFromClient,
    saveAuthorizationCode,
    saveToken,
    validateScope,
    verifyScope
  }
};

export const initAuthServer = () => new OAUTHServer(options);
