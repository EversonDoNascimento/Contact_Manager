import { User } from "@prisma/client";
import prisma from "../libs/prisma";
import bcrypt from "bcrypt";
import { createJWT } from "../libs/jwt";
export default class AuthService {
  createToken(user: User) {
    return createJWT({ id: user.id });
  }
  async verifyUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return null;
    }
    return user;
  }
  async signIn({ email, password }: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }
  async register({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    email = email.toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return null;
    }
    const passwordCrypt = bcrypt.hashSync(password, 10);

    return await prisma.user.create({
      data: { email, password: passwordCrypt, name },
    });
  }
}
