"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import Link from "next/link";

const DynamicImage = dynamic(
  () => import("../components/dynamic-image/dynamicImage"),
  { ssr: false }
);

const ForgotPassword = dynamic(() => import("@/components/forgot-password"), {
  ssr: false,
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const { isMobile } = useBreakpoints();

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleLogin = async () => {
    try {
      setInvalidEmail("");
      setInvalidPassword("");

      if (!validateEmail(email)) {
        setInvalidEmail(
          "E-mail inválido. Insira um endereço de e-mail no formato correto."
        );
        toast.error("E-mail incorreto.");
        return;
      }

      if (!validatePassword(password)) {
        setInvalidPassword(
          "A senha deve ter pelo menos 8 caracteres com letras maiúsculas, minúsculas, números e caracteres especiais."
        );
        toast.error("Senha incorreta.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5145/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Logado com sucesso!");
      router.push("/home");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 401) {
        toast.error("Credenciais inválidas.");
      } else {
        toast.error("Erro ao tentar fazer login. Tente novamente.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center flex-col md:flex-row-reverse w-full">
      <div className="md:bg-amber-100 md:w-1/2 md:min-h-screen md:justify-center md:items-center md:flex mb-10 md:mb-0">
        <DynamicImage />
      </div>
      <div className="flex flex-col gap-5 w-full md:w-1/2 px-5 sm:px-10 md:px-16">
        <div>
          <Label>
            Email<b className=" text-red-700">*</b>
          </Label>
          <Input
            placeholder="mail.exemple@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {invalidEmail && (
            <p className="text-red-500 text-sm">{invalidEmail}</p>
          )}
        </div>
        <div>
          <Label>
            Senha<b className=" text-red-700">*</b>
          </Label>
          <Input
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {invalidPassword && (
            <p className="text-red-500 text-sm">{invalidPassword}</p>
          )}
        </div>
        <ForgotPassword />
        <Link
          href="/register"
          className={`${buttonVariants({ variant: "link" })}`}
        >
          Registrar usuário
        </Link>
        <Button type="button" className="my-5 px-0" onClick={handleLogin}>
          Entrar
        </Button>
      </div>
    </div>
  );
}
