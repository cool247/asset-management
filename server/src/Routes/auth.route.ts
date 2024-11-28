import { eq } from "drizzle-orm";
import { db } from "../Config/db";
import { usersTable } from "../Models/user.model";
import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import { addToBlacklist } from "../Middleware/authenticate.middleware";

type loginRequest = {
  contactNumber: string;
  password: string;
};

export const authRoutes = async (app: FastifyInstance) => {
  app.post("/login", { onRequest: [] }, async (request, reply) => {
    const { contactNumber, password } = request.body as loginRequest;

    try {
      const [user] = await db.select().from(usersTable).where(eq(usersTable.contactNumber, contactNumber));

      if (!user) {
        return reply.status(401).send({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return reply.status(401).send({ message: "Invalid credentials" });
      }

      const token = app.jwt.sign({ id: user.id, role: user.role, barCodeId: user.barcodeId });

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

  app.post("/logout", async (request, reply) => {
    try {
      const token = request.headers.authorization?.split(" ")[1];
      if (!token) {
        return reply.status(400).send({ message: "Token is required for logout." });
      }

      addToBlacklist(token);

      reply.status(200).send({ message: "Logged out successfully." });
    } catch (error) {
      reply.status(500).send({ message: "Error during logout." });
    }
  });
};
