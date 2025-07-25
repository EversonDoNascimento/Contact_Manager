import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: { id: number; iat: number; exp: number };
  }
}
