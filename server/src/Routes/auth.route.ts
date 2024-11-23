import { eq } from "drizzle-orm";
import { db } from "../Config/db";
import { users } from "../Models/user.model";
import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";

type loginRequest = {
  contactNumber: string;
  password: string;
};

export const authRoutes = async (app: FastifyInstance) => {
  app.post("/login", { onRequest: [] }, async (request, reply) => {
    const { contactNumber, password } = request.body as loginRequest;
console.log('login...')
    try {
      const [user] = await db.select().from(users).where(eq(users.contactNumber, contactNumber));

      if (!user) {
        return reply.status(401).send({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return reply.status(401).send({ message: "Invalid credentials" });
      }

      const token = app.jwt.sign({ id: user.id, role: user.role, barCodeId:user.barcodeId });

      reply.send({
        token,
        userDetails: {
          name: user.name,
          barcodeId: user.barcodeId,
          contactNumber: user.contactNumber,
          role: user.role,
        },
      });
    } catch (error) {
      reply.status(500).send({ message: "Error logging in", error });
    }
  });
};
