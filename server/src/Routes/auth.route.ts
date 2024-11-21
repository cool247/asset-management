import { eq } from "drizzle-orm";
import { db } from "../Config/db";
import { users } from "../Models/user.model";
import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
type loginRequest = {
  barcodeId: string;
  password: string;
};

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/login", async (request, reply) => {
    const { barcodeId, password } = request.body as loginRequest;

    try {
      const [user] = await db.select().from(users).where(eq(users.barcodeId, barcodeId));

      if (!user) {
        return reply.status(401).send({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return reply.status(401).send({ message: "Invalid credentials" });
      }

      const token = app.jwt.sign({ id: user.id, role: user.role });

      reply.send({ token });
    } catch (error) {
      reply.status(500).send({ message: "Error logging in", error });
    }
  });
};
