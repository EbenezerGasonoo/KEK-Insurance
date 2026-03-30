import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const demoUsers = [
  { id: "u_admin", name: "KEK Admin", email: "admin@kek.demo", role: "admin" as const },
  { id: "u_client", name: "Demo Client", email: "client@kek.demo", role: "client" as const }
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;

        // Demo only: use fixed passwords.
        // - admin@kek.demo / admin123
        // - client@kek.demo / client123
        const user = demoUsers.find((u) => u.email?.toLowerCase() === String(username ?? "").toLowerCase());
        if (!user) return null;

        const expectedPassword = user.role === "admin" ? "admin123" : "client123";
        if (password !== expectedPassword) return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // NextAuth passes `user` here on sign-in.
        const userWithRole = user as unknown as { role?: "admin" | "client" };
        const role = userWithRole.role;
        (token as unknown as { role?: "admin" | "client" }).role = role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        const role = (token as unknown as { role?: "admin" | "client" }).role;
        (session.user as typeof session.user & { role?: "admin" | "client" }).role = role;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

