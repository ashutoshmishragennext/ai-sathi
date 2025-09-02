import { LoginSchema } from "@/validaton-schema";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { findUserByEmail } from "./actions/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const validation = LoginSchema.safeParse(credentials);
        if (!validation.success) {
          return null;
        }

        const { email, password } = validation.data;
        const user = await findUserByEmail(email);
        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        return passwordMatch ? user : null;
      },
    }),
  ],
} satisfies NextAuthConfig;
// import { LoginSchema } from "@/validaton-schema";
// import bcrypt from "bcryptjs";
// import type { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { findUserByEmail } from "./actions/user";

// export default {
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const validation = LoginSchema.safeParse(credentials);
//         if (!validation.success) {
//           return null;
//         }

//         const { email, password } = validation.data;
//         const user = await findUserByEmail(email);
//         if (!user || !user.password) {
//           return null;
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         return passwordMatch ? user : null;
//       },
//     }),
//   ],
// } satisfies NextAuthConfig;
