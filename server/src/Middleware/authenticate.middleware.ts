import {  FastifyReply, FastifyRequest } from "fastify";
import { JwtPayload } from "../Utils/types";


export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const decoded = await request.jwtVerify<JwtPayload>();
    request.jwtPayload = decoded;
  } catch (error) {
    reply.status(401).send({ message: "Unauthorized" });
  }
};