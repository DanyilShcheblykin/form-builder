'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/forms')
  }, [])
  
  return (
    <></>
  )
}

export default HomePage