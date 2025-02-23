// import { loginUser } from "@/actions/auth/loginUser";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { type Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
import { loginUser } from "@/actions/auth/loginUser";
const authOptions: AuthOptions = {
  session: {
    strategy: "jwt", //(1)
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Log In",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const payload = {
          email: String(credentials?.email),
          password: String(credentials?.password),
        };
        const d = await loginUser(payload);
        if (d.success) {
          // Any object returned will be saved in `user` property of the JWT
          return d.data;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // Add additional fields to the token
      if (user) {
        token.user_id = String(user?.id);
        token.email = user?.email ? String(user?.email) : "";
        token.photoUrl = user?.profile?.photoUrl
          ? String(user?.profile?.photoUrl)
          : "";
        token.name = user?.name ? String(user?.name) : "";
        token.isAdmin = Boolean(user?.isAdmin);
        token.isDeleted = Boolean(user?.isDeleted);
        token.token = String(user?.token);
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      // Add additional fields to the session object
      session.user.user_id = String(token?.user_id);
      session.user.email = String(token?.email);
      session.user.photoUrl = token?.photoUrl ? String(token?.photoUrl) : null;
      session.user.name = token?.name ? String(token?.name) : null;
      session.user.isAdmin = Boolean(token?.isAdmin);
      session.user.isDeleted = Boolean(token?.isDeleted);
      session.user.token = String(token.token);
      return session;
    },
  },
};

export default authOptions;
