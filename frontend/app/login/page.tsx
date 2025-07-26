"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ValidationList from "@/components/ShowInputValidations";
import { LoginData, loginSchema } from "@/zod/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginData) => {
    console.log("Formulário enviado com:", data);
    // Aqui você pode chamar sua API de login
  };
  return (
    <main className="flex justify-between flex-1">
      <div className="mt-10 ml-14">
        <Image
          src="/assets/logo.svg"
          alt="logo"
          width={150}
          height={150}
        ></Image>
      </div>
      <div className="bg-primary w-[35rem] h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 justify-center items-center h-full w-full"
        >
          <div className="flex justify-start w-full px-16">
            <h1 className="text-3xl font-bold mb-8">Acessar conta</h1>
          </div>
          <div className="w-full px-16">
            <Input
              id="email"
              type="email"
              label="Email"
              {...register("email")}
            ></Input>
          </div>

          <div className="w-full px-16">
            <Input
              id="password"
              type="password"
              label="Senha"
              {...register("password")}
            ></Input>
          </div>
          <div className="w-full px-16 flex justify-end">
            <Button text="Acessar Conta"></Button>
          </div>
          <div className="w-full px-16 flex mt-11 flex-col gap-2">
            {errors.email && (
              <ValidationList textError={errors.email.message as string} />
            )}
            {errors.password && (
              <ValidationList textError={errors.password.message as string} />
            )}
          </div>
          <p className="text-white text-center mt-4">
            Não tem uma conta?{" "}
            <Link href="/register" className="underline text-accent">
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
