import { FastifyInstance } from "fastify";
import ContactsController from "../controllers/ContactsController";

export default function ContactsRoutes(fastify: FastifyInstance) {
  const controller = new ContactsController();
  fastify.post(
    "/contacts",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => controller.createContact(request, reply)
  );
  fastify.get(
    "/contacts",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => controller.getContacts(request, reply)
  );
  fastify.get(
    "/contacts/:letter",
    { preHandler: [fastify.authenticate] },
    async (request, reply) =>
      controller.getContactsByFirstLetter(request, reply)
  );
}
