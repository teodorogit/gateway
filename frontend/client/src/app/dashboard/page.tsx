"use client"
import React from 'react'
import Card  from '@/components/Card/apiCards'
import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton';

const urls = [
  {
    "route": "/admin",
    "endpoint": "https://github.com",
  },
  {
    "route": "/client",
    "endpoint": "https://github.comg",
  },
  {
    "route": "/test",
    "endpoint": "https://github.com",
  },

]

export default async function Page() {

  const session = await getServerSession()

  if(!session){
    redirect("/")
  }
  return (
    <div className=' px-[5%]'>
      <Navbar/>
      <div>
        <h1>DashBoard Gateway.</h1>
        <LogoutButton/>
      </div>
    <p>Olá! {session?.user?.name}, confira as apis diponíveis e detalhes de utilização</p>

    <main className='flex flex-col gap-5 mt-8'>
      {urls.map((api) => <Card api={api.route} endpoint={api.endpoint}/>
     
        )
      }

    </main>
      </div>
  )
}

