"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../../public/images/logo-mobile.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { BsKey } from "react-icons/bs";
import { toast } from "sonner";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [invalidPasswordConfirmation, setInvalidPasswordConfirmation] =
    useState("");

  useEffect(() => {
    localStorage.setItem("password", password);
  }, [password]);

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(value);
  };

  const handleResetPassword = () => {
    if (!validatePassword(password)) {
      setInvalidPassword(
        "Senha inválida. Verifique se a senha tem pelo menos 6 caracteres com letras maiúsculas, minúsculas, números e caracteres especiais."
      );
      return;
    } else {
      setInvalidPassword("");
    }

    if (password !== passwordConfirmation) {
      setInvalidPasswordConfirmation("As senhas não coincidem.");
      return;
    } else {
      setInvalidPasswordConfirmation("");
    }
    toast.success("Senha redefinida com sucesso!");
    router.push("/");
  };

  return (
    <>
      <Image
        alt="imagem logo empresa"
        loading="lazy"
        width={150}
        height={150}
        src={logo}
        className="pt-20 mx-auto"
      />
      <div className="flex justify-center max-w-max w-11/12 flex-col md:max-w-screen-sm mx-auto">
        <div className="bg-gray-300 w-full  flex-wrap my-12 p-5 rounded-xl flex-col gap-6">
          <h2 className="text-2xl text-center text-gray-700 font-bold">
            Redefinir senha
          </h2>
          <p className="text-gray-700 text-center mb-3">
            Redefina sua senha com no mínimo 6 caracteres
          </p>
          <div>
            <Label>
              Senha<b className=" text-red-700">*</b>
            </Label>
            <Input
              className="bg-white my-2"
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {invalidPassword && (
              <p className="text-red-500 text-sm mb-2">{invalidPassword}</p>
            )}
          </div>
          <div>
            <Label>
              Confirme sua senha<b className=" text-red-700">*</b>
            </Label>
            <Input
              className="bg-white my-2"
              placeholder="Confirme sua senha"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            {invalidPasswordConfirmation && (
              <p className="text-red-500 text-sm mb-2">
                {invalidPasswordConfirmation}
              </p>
            )}
          </div>
          <div className="text-gray-700 text-base font-bold mt-4">
            <p>Crie uma senha segura</p>
            <ul className="font-normal ml-4 mt-2 list-disc">
              <li>use letras maiúsculas e minúsculas, símbolos e números;</li>
              <li>não use informações pessoais como datas de aniversário;</li>
              <li>não use uma senha igual à anterior.</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center bg-white">
          <Button className="mb-5 w-full" onClick={handleResetPassword}>
            Redefinir senha
          </Button>
        </div>
      </div>
    </>
  );
}
