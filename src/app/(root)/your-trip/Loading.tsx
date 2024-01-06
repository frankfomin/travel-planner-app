import React from 'react'

export default function Loading() {
  return (
    <div className='flex flex-col sm:gap-4 gap-2 justify-center items-center h-screen'>
        <h3 className=' font-semibold text-4xl text-center'>Preparing your trip</h3>
        <p className='text-center text-muted-foreground'>Ai is not always perfect but will help you hit the ground running</p>
    </div>
  )
}
