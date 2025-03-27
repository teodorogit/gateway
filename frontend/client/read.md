Passo 4: Criar a Tela de Login
Crie uma página de login em pages/login.js:
import { signIn } from 'next-auth/react';
import { Button, Input } from '@hero-ui/react';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <Input
        type="email"
        placeholder="Email"
        className="mb-4"
      />
      <Input
        type="password"
        placeholder="Password"
        className="mb-4"
      />
      <Button onClick={() => signIn('github')}>Login com GitHub</Button>
      <Button onClick={() => signIn('google')}>Login com Google</Button>
    </div>
  );
}
Passo 5: Configurar OAuth Apps
Para GitHub:

Vá para GitHub Developer Settings.
Crie um novo OAuth App e configure a URL de callback como http://localhost:3000/api/auth/callback/github.
Para Google:

Vá para Google Cloud Console.
Crie um novo projeto e configure as credenciais OAuth 2.0 com a URL de callback como http://localhost:3000/api/auth/callback/google.
Passo 6: Proteger Rotas
Para proteger rotas, você pode usar o getSession do NextAuth.js. Aqui está um exemplo de como proteger uma página:
import { getSession } from 'next-auth/react';

export default function Dashboard({ session }) {
  if (!session) {
    return <p>Acesso negado. Faça login para continuar.</p>;
  }

  return <p>Bem-vindo ao Dashboard, {session.user.name}!</p>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}