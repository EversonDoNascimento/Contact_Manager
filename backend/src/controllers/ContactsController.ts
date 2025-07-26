import { FastifyReply, FastifyRequest } from "fastify";
import ContactsService from "../services/ContactsService";
import {
  ContactByFirstLetterSchema,
  ContactSchema,
} from "../zod/ContactSchema";
import { saveImage } from "../utils/saveImage";

export default class ContactsController {
  service = new ContactsService();
  async createContact(request: FastifyRequest, reply: FastifyReply) {
    // Pega todas as partes do multipart/form-data
    const parts = await request.parts();
    const fields: Record<string, string> = {};
    let file: any;

    for await (const part of parts) {
      if (part.type === "file") {
        file = part;
      } else {
        fields[part.fieldname] = part.value as string;
      }
    }

    // Validação com Zod
    const validationData = ContactSchema.safeParse(fields);
    if (!validationData.success) {
      return reply.status(400).send(validationData.error.issues);
    }

    // Verifica se o arquivo foi enviado
    if (!file) {
      return reply.status(400).send({ message: "A imagem é obrigatória." });
    }

    // Salva imagem no disco
    const filePath = await saveImage(file);

    // Cria contato no banco
    const newContact = await this.service.createContact({
      ...validationData.data,
      userId: request.user.id,
      photoUrl: filePath,
    });

    if (!newContact) {
      return reply.status(400).send({ message: "Erro ao criar contato." });
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
