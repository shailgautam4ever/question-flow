import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    maxAge: 365 * 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, isNewUser }) {
      return token
    }
  },
  pages: {
    error: '/'
  },
}

export default NextAuth(nextAuthOptions)
