import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {Credentials} from './types';
import {authenticateUser, refreshAccessToken} from './authService';
import {API, sessionMaxAge} from '../../../../../services/CONSTANTS';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {},

      authorize: async (credentials) => {
        console.log('Logging in the user');
        const data = await authenticateUser(credentials as Credentials);

        if (data?.success) {
          console.log('Logged in', data);
          return data;
        } else {
          console.log('Failed to login', data);
          console.log('env', process.env);
          throw new Error(JSON.stringify(data));
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: parseInt(process.env.SESSION_MAX_AGE ?? '') || sessionMaxAge,
  },
  callbacks: {
    async jwt({token, user, account, profile}) {
      if (account && user) {
        return {...token, ...user};
      }

      if (Date.now() < (token as any).expires_on) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({session, token}) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: API.AUTH.VERIFY,
  },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
