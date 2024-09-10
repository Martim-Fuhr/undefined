"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";

export default function ForgotPassword() {
  const { isMobile } = useBreakpoints();
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
        "E-mail inválido. Este endereço de e-mail não esta cadastrado no sistema, verifique e tente novamente."
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

  const renderStep1Content = () => (
    <>
      <p className="py-2">
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
    </>
  );

  const renderStep2Content = () => (
    <>
      <p className="py-6">
        Enviamos um link de recuperação para o seu e-mail cadastrado. Por favor,
        verifique sua caixa de entrada e a pasta de spam, se necessário.
      </p>
    </>
  );

  function renderModalOrRedirect() {
    if (!isMobile) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="text-blue-500 px-0">
              Esqueci minha senha
            </Button>
          </DialogTrigger>

          <DialogContent>
            <h2 className="text-2xl text-gray-700 font-bold">
              Recuperar senha
            </h2>
            {step === 1 ? renderStep1Content() : renderStep2Content()}
            <Button
              className="my-5 w-full"
              onClick={step === 1 ? handleLogin : handleNext}
            >
              {step === 1 ? "Enviar" : "Entendido"}
            </Button>
          </DialogContent>
        </Dialog>
      );
    } else {
      return (
        <Link
          href="/forgot-password"
          className={`${buttonVariants({ variant: "link" })} flex-wrap`}
        >
          Esqueci minha senha
        </Link>
      );
    }
  }
  return <>{renderModalOrRedirect()}</>;
}
