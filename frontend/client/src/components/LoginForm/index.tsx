"use client"

import {signIn} from 'next-auth/react'
import React from 'react'
import { Button } from '@heroui/button'
import { useSearchParams } from 'next/navigation'
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: 5432
// })

class Acessar{
    async login(e:React.FormEvent<HTMLFormElement> ) {
      e.preventDefault()

      const formData = new FormData(e.currentTarget);
      const data = {
        email : formData.get('email'),
        password: formData.get('password')
      }
    
        signIn('credentials', {
          ...data,
          callbackUrl: "/dashboard"
        })
      }

  
    // async cadastrar(e:React.MouseEvent<HTMLButtonElement>) {
    //   e.preventDefault()
      
    //   const formData = new FormData();
    
    //   const data = {
    //     email : formData.get('email'),
    //     senha: formData.get('senha')
    //   }

    //   const senhaEncriptografada = this.encryptoPassword(data.senha)
    //   console.log('email', data.email)
    //   console.log('senha', senhaEncriptografada)

      // try {
      //   const result = await pool.query(
      //     'INSERT INTO matheus_Teste (email, password) VALUES ($1, $2)',[data.email, senhaEncriptografada]
      //   );
      //   console.log('Usuario cadastrado com sucesso', result.rowCount)
      // } catch (err) {
      //   console.error('Erro ao cadastrar usuário: ', err)
      // }
      // finally {
        
      // }
    // }

    // async encryptoPassword(password: any){
    //   const hash = crypto.createHash('sha256');
    //   hash.update(password);
    //   return hash.digest('hex');
    //  }
}
const LoginForm = () => {
  const acessar = new Acessar();
  const searchParams = useSearchParams();
  const error = searchParams.get('error')

  return (
    <form onSubmit={(e) => acessar.login(e)} className='border-1 border-solid border-black-400 rounded-md w-96  px-4 py-6 flex  flex-col gap-2' >
        <label htmlFor="">Email</label>
        <input type="email" name='email' className='border-solid border-1 border-gray-700 rounded-md py-2' />
        <label htmlFor="">Senha</label>
        <input type="password" name='password' className='border-solid border-1 border-gray-700 rounded-md py-2' />
        <div className='flex justify-around  mt-4'>
          <Button type='submit' className='bg-lime-500 rounded-md  h-10 w-32 cursor-pointer  hover:bg-white hover:border-solid hover:border-2  hover:border-lime-400'>Entrar</Button>
        </div>
        {error === "CredentialsSignIn" && <div className='text-red-400'>Credenciais inválidas</div>}
      </form>
  )
}

export default LoginForm