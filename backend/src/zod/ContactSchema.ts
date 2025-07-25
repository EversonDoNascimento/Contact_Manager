import z from "zod";

export const ContactSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(10, { message: "Phone must be at least 10 characters" }),
  photoUrl: z.string().optional(),
});

export const ContactByFirstLetterSchema = z.object({
  letter: z.string().min(1, { message: "Letter must be at least 1 character" }),
});
