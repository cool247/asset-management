import { ZodError, ZodSchema } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

export const validate = (schema: ZodSchema) => async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    request.body = schema.parse(request.body);
  } catch (error) {
    if (error instanceof ZodError) {
      reply.status(400).send({
        error: "Validation Error",
        message: error.errors || error.message,
      });
    } else {
      reply.status(400).send({
        error: "Validation Error",
        message: "Unknown validation error",
      });
    }
  }
};
