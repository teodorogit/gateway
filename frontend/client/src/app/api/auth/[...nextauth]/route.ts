import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';



const handler = NextAuth({
 pages: {
  signIn: "/"

 },


  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "tecnologia@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if(!credentials) {
          return null;
        }
        if (credentials.email === "tecnologia@gmail.com" && credentials.password == '123') {
          return {
            id:'1',
            name:'Matheus',
            email:"tecnologia@gmail.com"
            
          }
        } else {
          return null
        }
        }
    })
  ]
});

export {handler as GET, handler as POST };

