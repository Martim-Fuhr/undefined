"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import ForgotPassword from "@/components/forgot-password";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const DynamicImage = dynamic(
  () => import("../components/dynamic-image/dynamicImage"),
  { ssr: false }
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("!Teste123");
  const { isMobile } = useBreakpoints();

  useEffect(() => {
    const savedPassword = localStorage.getItem("password") || "!Teste123";
    setStoredPassword(savedPassword);
  }, []);

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // const handleLogin = () => {
  //   const correctEmail = email === "martim@teste.com";
  //   const correctPassword = password === storedPassword;

  //   if (!correctEmail || !validateEmail(email)) {
  //     setInvalidEmail(
  //       "E-mail inválido. Insira um endereço de e-mail no formato correto."
  //     );
  //     toast.error("E-mail incorreto.");
  //   } else {
  //     setInvalidEmail("");
  //   }

  //   if (!correctPassword || !validatePassword(password)) {
  //     setInvalidPassword(
  //       "Senha inválida ou incorreta. Verifique se a senha tem pelo menos 8 caracteres com letras maiúsculas, minúsculas, números e caracteres especiais, e tente novamente."
  //     );
  //     toast.error("Senha incorreta.");
  //   } else {
  //     setInvalidPassword("");
  //   }

  //   if (correctEmail && correctPassword) {
  //     toast.success("Logado com sucesso!");
  //     router.push("/home");
  //   }
  // };

  const handleLogin = async () => {
    try {
      setInvalidEmail("");
      setInvalidPassword("");

      // Validar email
      if (!validateEmail(email)) {
        setInvalidEmail(
          "E-mail inválido. Insira um endereço de e-mail no formato correto."
        );
        toast.error("E-mail incorreto.");
        return;
      }

      // Validar senha
      if (!validatePassword(password)) {
        setInvalidPassword(
          "A senha deve ter pelo menos 8 caracteres com letras maiúsculas, minúsculas, números e caracteres especiais."
        );
        toast.error("Senha incorreta.");
        return;
      }

      // Fazer a requisição POST para login
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

      const { token } = response.data;
      localStorage.setItem("token", token);

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
      <form
        className="flex flex-col gap-5 w-full md:w-1/2 px-10 md:px-16"
        onSubmit={(e: { preventDefault: () => any }) => e.preventDefault()}
      >
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
        <Button type="button" className="my-5" onClick={handleLogin}>
          Entrar
        </Button>
      </form>
    </div>
  );
}
