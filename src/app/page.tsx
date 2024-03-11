"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Inria_Sans } from "next/font/google";
import Header from "@/components/Header";

const inria = Inria_Sans({ subsets: ["latin"], weight: "700" });
export default function HomePage() {
  const router = useRouter();

  function navigate(ref: string) {
    router.push(ref);
  }

  return (
    <main className="flex min-h-screen bg-[#121212]">
      <Header buttonName="Entrar" onClick={() => signIn("discord")} />
      <div className="flex gap-10 flex-col min-h-screen min-w-full justify-center items-center text-center">
        <div>
          <h1
            className={`${inria.className} sm:text-[70px] text-[60px] font-bold mb-4`}
          >
            <span>
              Exemplo
              <p className="text-[#473A87]">Discord oAuth2</p>
            </span>
          </h1>
        </div>
        <div className="flex gap-7">
          <button
            onClick={() => navigate("https://github.com/enzowxl")}
            className={`${inria.className} bg-[#473A87] p-3 px-7 rounded-lg duration-500 hover:scale-[1.1]`}
          >
            Criador
          </button>
          <button
            onClick={() => navigate("https://discord.com/invite/P6ZNM2Pff8")}
            className={`${inria.className} bg-[#473A87] p-3 px-7 rounded-lg duration-500 hover:scale-[1.1]`}
          >
            Suporte
          </button>
        </div>
      </div>
    </main>
  );
}
