import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Formato de e-mail inválido").min(1, "O e-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;
