import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import AuthRoutes from "./routes/Auth";
import jwt from "@fastify/jwt";
const server = Fastify();

// configurando o servidor

// adicionando o plugin jwt do proprio fastify
server.register(jwt, {
  secret: process.env.JWT_SECRET!,
});

// adicionando o middleware de autenticação
server.decorate(
  "authenticate",
  async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  }
);

server.register(AuthRoutes);

// iniciando o servidor
server.listen(
  // o host 0.0.0.0 faz com que o servidor seja acessivel de qualquer ip
  { port: parseInt(process.env.SERVER_PORT || "3000"), host: "0.0.0.0" },
  (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    server.log.info(`Server listening at ${address}`);
  }
);

export default server;
