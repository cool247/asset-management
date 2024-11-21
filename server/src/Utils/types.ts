export interface JwtPayload {
  id: number;
  role: string;  
  exp: number; // Expiry time
  iat: number; // Issued at
}

