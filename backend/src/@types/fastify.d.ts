import "fastify";

declare module "fastify" {
  // Configurando o type FastifyInstance especificamente na parte de autenticação
  interface FastifyInstance {
    authenticate: any;
  }
}
