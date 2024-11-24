import { ZodSchema, ZodError } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

export const validate = (schema: ZodSchema) => async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    console.log("==========zod error ===========", request.body);
    const validatedBody = schema.parse(request.body);
    request.body = validatedBody;
  } catch (error) {
    if (error instanceof ZodError) {
      const details = error.errors.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      console.error("Validation Error:", details);
      return reply.status(400).send({
        message: "Validation Error",
        details,
      });
    }
    return reply.status(500).send({
      message: "Something went wrong during validation",
    });
  }
};
