import prisma from "../libs/prisma";

interface ContactType {
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
  userId: number;
}
export default class ContactsService {
  async createContact(contact: ContactType) {
    // Criando um novo contato
    const newContact = await prisma.contact.create({ data: contact });
    if (!newContact) {
      return null;
    }
    return newContact;
  }
  async getContacts(id: number) {
    // Buscando todos os contatos do user logado
    const contacts = await prisma.contact.findMany({ where: { userId: id } });
    return contacts;
  }
  async getContactsByFirstLetter(letter: string, userId: number) {
    // Buscando contatos com a primeira letra passada por parâmetro, e o id do user logado
    const contacts = await prisma.contact.findMany({
      where: { name: { startsWith: letter }, userId },
    });
    return contacts;
  }
}
