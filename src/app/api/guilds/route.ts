import axios from "axios";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const token = await getToken({ req: request });
    const { access_token } = (await getToken({ req: request })) as {
      access_token: string;
    };

    if (token) {
      const res = await axios.get(`https://discord.com/api/users/@me/guilds`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const guildsFilter = res.data.filter(({ permissions }: any) => {
        return (parseInt(permissions) & 0x8) === 0x8;
      });

      const guildsWithBotInfo = await Promise.all(
        guildsFilter.map(async (guild: any) => {
          try {
            await axios.get(
              `https://discord.com/api/guilds/${guild.id}/members/${process.env.NEXT_PUBLIC_CLIENT_ID}`,
              {
                headers: {
                  Authorization: `Bot ${process.env.NEXT_PUBLIC_BOT_TOKEN}`,
                },
              }
            );
            guild.botPresent = true;
          } catch (error) {
            guild.botPresent = false;
          }

          if (guild.icon) {
            guild.iconUrl = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
          }

          return guild;
        })
      );

      return Response.json(guildsWithBotInfo);
    } else {
      return new Response("Não autorizado", {
        status: 400,
      });
    }
  } catch (err: any) {
    console.log(err);
    return new Response("Ocorreu algum erro, tente novamente mais tarde", {
      status: 400,
    });
  }
}
