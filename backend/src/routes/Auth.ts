import { FastifyInstance } from "fastify";
import AuthController from "../controllers/AuthController";

export default function AuthRoutes(fastify: FastifyInstance) {
  const controller = new AuthController();
  fastify.post("/auth", async (request, reply) =>
    controller.signIn(request, reply)
  );
  fastify.post("/register", async (request, reply) =>
    controller.register(request, reply)
  );
  fastify.get(
    "/me",
    {
      preHandler: [fastify.authenticate],
    },
    async (request, reply) => reply.send("ok")
  );
}
