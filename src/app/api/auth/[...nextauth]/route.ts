import prismaClient from "@/prisma";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: ["identify", "email", "guilds"].join(" "),
        },
      },
      token: "https://discord.com/api/oauth2/token",
      userinfo: "https://discord.com/api/users/@me",
      profile(profile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }
        return {
          image: profile.image_url,
          ...profile,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      return {
        ...token,
        ...account,
        ...profile,
        ...user,
      };
    },
    async session({ session, token }) {
      const userExists = await prismaClient.user.findFirst({
        where: {
          user_id: token?.id as string,
        },
      });

      if (!userExists) {
        await prismaClient.user.create({
          data: {
            user_id: token?.id as string,
            premium: 0,
            role: 0,
          },
        });
      }
      return {
        ...session,
      };
    },
  },
  pages: {
    signIn: "/",
  },
});
export { handler as GET, handler as POST };
