import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: '',
      clientSecret: '',
    })
  ],
  async session({ session }) {
    
  },
  async signIn({ profile }) {
    
  }
})

export { handler as GET, handler as POST}