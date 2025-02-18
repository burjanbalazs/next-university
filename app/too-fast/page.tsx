import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <main className='root-container flex min-h-screen flex-col items-center justify-center'>
        <h1 className='font-bebas-neue text-5xl font-bold text-light-100'>Whoa, slow down there speedy!</h1>
        <p className='mt-3 max-w-xl text-center text-light-400'>The server got too many requests, try again shortly</p>
        <Link href="/">
          <Button className='mt-5'>Go back home</Button>
        </Link>
    </main>
  )
}
