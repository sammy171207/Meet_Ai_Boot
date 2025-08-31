
'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react'

const Home = () => {
  const [name,setName]=useState<string>("");
  const [email,setEmail]=useState<string>('');
  const [password,setPassword]=useState<string>('');
 

  const handleSubmit=async(e:React.FormEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    console.log(name,email,password);
    await authClient.signUp.email({name,email,password},{
      onSuccess: (data) => {
        console.log(data)
        alert('success')
      },
      onError: (error) => {
        console.log(error)
      }
    })
    alert('success')
  }

  return (
    <div className='text-3xl font-bold underline'>
      <Input type='text' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}/>
      <Input type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <Input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <Button  onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default Home