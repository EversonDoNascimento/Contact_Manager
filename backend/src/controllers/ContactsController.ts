import { FastifyReply, FastifyRequest } from "fastify";
import ContactsService from "../services/ContactsService";
import {
  ContactByFirstLetterSchema,
  ContactSchema,
} from "../zod/ContactSchema";

export default class ContactsController {
  service = new ContactsService();
  async createContact(request: FastifyRequest, reply: FastifyReply) {
    // Validando os dados enviados
    const validationData = ContactSchema.safeParse(request.body);
    if (!validationData.success) {
      return reply.status(400).send(validationData.error.issues);
    }
    // Criando um novo contato já pegando o id do user logado
    const newContact = await this.service.createContact({
      ...validationData.data,
      userId: request.user.id,
    });
    if (!newContact) {
      return reply.status(400).send({ message: "Error creating contact" });
    }
    return reply.status(201).send(newContact);
  }
  async getContacts(request: FastifyRequest, reply: FastifyReply) {
    const contacts = await this.service.getContacts(request.user.id);
    if (!contacts) {
      return reply.status(400).send({ message: "Error getting contacts" });
    }
    return reply.status(200).send(contacts);
  }
  async getContactsByFirstLetter(request: FastifyRequest, reply: FastifyReply) {
    // Validando os dados enviados
    const validationData = ContactByFirstLetterSchema.safeParse(request.params);
    if (!validationData.success) {
      return reply.status(400).send(validationData.error.issues);
    }
    // Utilizando o service para buscar os contatos
    // Passando como parametro a primeira letra e o id do user logado
    const contacts = await this.service.getContactsByFirstLetter(
      validationData.data.letter,
      request.user.id
    );
    if (!contacts) {
      return reply.status(400).send({ message: "Error getting contacts" });
    }
    return reply.status(200).send(contacts);
  }
}
