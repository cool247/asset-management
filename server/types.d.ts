// import { FastifyRequest } from "fastify";
import { JwtPayload } from "./src/Utils/types";


declare module "fastify" {
  interface FastifyRequest {
    jwtPayload:JwtPayload;  
  }
}

