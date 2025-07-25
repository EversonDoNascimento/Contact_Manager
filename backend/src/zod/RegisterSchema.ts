import z from "zod";

const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default RegisterSchema;
