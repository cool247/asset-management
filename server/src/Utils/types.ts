import {userRoleEnum} from '../Models/user.model'

export interface JwtPayload {
  id: number;
  bardCodeId: string;
  role: typeof userRoleEnum.enumValues[number];  
  exp: number; // Expiry time
  iat: number; // Issued at
}

