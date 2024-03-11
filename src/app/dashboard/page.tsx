"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Inria_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";

const inria = Inria_Sans({ subsets: ["latin"], weight: "700" });
export default function Dashboard() {
  const [guilds, updateGuilds] = useState<[]>();

  useEffect(() => {
    (async () => {
      try {
        updateGuilds([]);
        const { data } = await axios.get("/api/guilds");

        updateGuilds(data);
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <main className="flex min-h-screen bg-[#121212]">
      <Header buttonName="Sair" onClick={() => signOut()} />
      <div className="min-h-screen min-w-full pt-24">
        <div className="p-8 grid max-lg:flex-col gap-5 ">
          {guilds &&
            guilds.map((guild: any) => {
              return (
                <div
                  key={guild.id}
                  className="flex justify-between items-center px-8 w-full h-20 bg-[#1e1e1e] rounded-lg"
                >
                  <div className="flex gap-5 items-center">
                    <img
                      className="rounded-lg"
                      alt="discord"
                      width={50}
                      height={50}
                      src={
                        guild.iconUrl
                          ? guild.iconUrl
                          : "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
                      }
                    />
                    <h1 className={`${inria.className}`}>{guild.name}</h1>
                  </div>
                  <button
                    className={`min-w-[100px] ${inria.className} p-3 ${
                      guild.botPresent ? "bg-[#473A87]" : "bg-[red]"
                    } rounded-lg duration-500 hover:scale-[1.1]`}
                  >
                    {guild.botPresent ? "Configurar" : "Convidar"}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}
