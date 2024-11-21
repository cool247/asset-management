import { ZodSchema, ZodError } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

export const validate =
  (schema: ZodSchema) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      console.log("------======================", request.body)
      const validatedBody = schema.parse(request.body); // Validate body against the schema
      request.body = validatedBody; // Assign validated body back to request.body
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        console.error("Validation Error:", error.errors);
        return reply.status(400).send({
          error: "Validation Error",
          details: error.errors, // Send the array of validation issues to the client
        });
      }
      console.error("Unknown Validation Error:", error);
      return reply.status(500).send({
        error: "Internal Server Error",
        message: "Something went wrong during validation",
      });
    }
  };
