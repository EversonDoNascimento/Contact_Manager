import { FastifyReply, FastifyRequest } from "fastify";
import { LoginSchema } from "../zod/LoginSchema";
import RegisterSchema from "../zod/RegisterSchema";
import AuthService from "../services/AuthService";
import { createJWT } from "../libs/jwt";

export default class AuthController {
  service = new AuthService();
  async signIn(request: FastifyRequest, reply: FastifyReply) {
    const validationData = LoginSchema.safeParse(request.body);
    if (!validationData.success) {
      return reply.status(400).send(validationData.error.issues);
    }

    const user = await this.service.verifyUser(validationData.data);
    if (!user) {
      return reply.status(401).send({ message: "Invalid credentials" });
    }
    const token = this.service.createToken(user);
    const authenticated = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    return reply.status(200).send(authenticated);
  }
  async register(request: FastifyRequest, reply: FastifyReply) {
    const validationData = RegisterSchema.safeParse(request.body);
    if (!validationData.success) {
      return reply.status(400).send(validationData.error.issues);
    }
    const registered = await this.service.register(validationData.data);
    if (!registered) {
      return reply.status(400).send({ message: "Error registering user" });
    }
    const token = createJWT({ id: registered.id });
    return reply.status(201).send({
      token,
      user: {
        id: registered.id,
        name: registered.name,
        email: registered.email,
      },
    });
  }
}
