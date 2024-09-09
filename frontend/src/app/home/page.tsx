"use client";
import React from "react";
import Image from "next/image";
import vendas1 from "../../../public/images/vendas1.png";
import vendas2 from "../../../public/images/vendas2.png";
import logo from "../../../public/images/logo-desktop.png";

export default function Home() {
  return (
    <>
      <header className="h-24 w-full flex justify-center items-center border-b-2 border-orange-400 border-opacity-20">
        <Image
          alt="imagem logo empresa"
          loading="lazy"
          width={300}
          height={90}
          src={logo}
        />
      </header>
      <div className="bg-white flex justify-around items-center w-full flex-wrap gap-11 mt-6">
        <Image
          alt="imagem logo empresa"
          loading="lazy"
          width={300}
          height={300}
          src={vendas1}
          className="max-w-80 max-h-72 flex"
        />
        <Image
          alt="imagem logo empresa"
          loading="lazy"
          width={300}
          height={300}
          src={vendas2}
          className="max-w-80 max-h-72 flex"
        />
      </div>
    </>
  );
}
