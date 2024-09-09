"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordLink() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleLogin = () => {
    const correctEmail = email === "martim@teste.com";

    if (!correctEmail || !validateEmail(email)) {
      setInvalidEmail(
        "E-mail inválido. Insira um endereço de e-mail no formato correto."
      );
    } else {
      setInvalidEmail("");
    }

    if (correctEmail) {
      setStep(2);
    }
  };

  const handleNext = () => {
    router.push("/recover-password");
  };

  const renderStep1 = () => (
    <div>
      <h2 className="text-2xl text-gray-700 font-bold">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="mr-2"
        >
          {"<"}
        </Link>
        Recuperar senha
      </h2>
      <p className="py-6">
        Para recuperar sua senha, digite o e-mail cadastrado.
      </p>

      <div>
        <Label>
          Email<b className="text-red-700">*</b>
        </Label>
        <Input
          placeholder="mail.exemple@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-2"
        />
        {invalidEmail && <p className="text-red-500 text-sm">{invalidEmail}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 className="text-2xl text-gray-700 font-bold">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setStep(1);
          }}
          className="mr-2"
        >
          {"<"}
        </Link>
        Recuperar senha
      </h2>
      <p className="py-6">
        Enviamos um link de recuperação para o seu e-mail cadastrado. Por favor,
        verifique sua caixa de entrada e a pasta de spam, se necessário.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen px-6 py-10 flex flex-col justify-between">
      {step === 1 ? renderStep1() : renderStep2()}
      <Button
        className="my-5 w-full"
        onClick={step === 1 ? handleLogin : handleNext}
      >
        {step === 1 ? "Enviar" : "Próximo"}
      </Button>
    </div>
  );
}
