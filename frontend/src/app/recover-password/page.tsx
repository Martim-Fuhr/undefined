"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo-desktop.png";
import { toast } from "sonner";

export default function RecoverPassword() {
  const [isLinkExpired, setIsLinkExpired] = useState(false);
  const [mockedToken, setMockedToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("mockedToken");
    const storedTokenTime = localStorage.getItem("mockedLink");

    if (storedTokenTime) {
      const tokenTime = new Date(parseInt(storedTokenTime));
      const now = new Date();
      const dayDiff = (now.getTime() - tokenTime.getTime()) / 1000 / 60 / 60;

      if (dayDiff >= 24) {
        setIsLinkExpired(true);
        localStorage.removeItem("mockedToken");
      } else {
        setMockedToken(storedToken);
      }
    }

    if (!storedToken || !storedTokenTime) {
      const newToken = generateMockedToken();
      setMockedToken(newToken);
      localStorage.setItem("mockedToken", newToken);
      localStorage.setItem("mockedLink", new Date().getTime().toString());
    }
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLinkExpired) {
      e.preventDefault();
      toast.warning("O link expirou. Por favor, solicite um novo link.");
    }
  };

  const generateMockedToken = () => {
    return Math.random().toString(36).substr(2, 96);
  };

  return (
    <>
      <header className="bg-gray-400 h-24 w-full flex justify-center items-center border-b-1 border-zinc-400 border-opacity-20">
        <Image
          alt="imagem logo empresa"
          loading="lazy"
          width={300}
          height={90}
          src={logo}
        />
      </header>
      <div className="bg-white flex justify-center max-w-max w-4/5 flex-wrap mx-auto my-12 p-5 border-2 border-black border-opacity-90 rounded-xl flex-col gap-6">
        <p className="font-medium">Olá,</p>
        <p className="font-medium my-2">
          Crie uma senha de acesso clicando no link abaixo.
        </p>
        <Link
          href="/reset-password"
          className="font-medium text-blue-500"
          onClick={handleLinkClick}
        >
          {mockedToken ? `${mockedToken}/reset-password/` : "Link expirado..."}
        </Link>
        <p className="text-red-500 font-medium">O link expira em 24h</p>
      </div>
    </>
  );
}
