'use client'

import React from 'react';
import ButtonFilled from '@/components/ui/button/button-filled';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter()
  return (
    <main>
      <ButtonFilled onClick={() => router.push('/forms')}>  Forms</ButtonFilled>
      <ButtonFilled onClick={() => router.push('/forms')}>  Create Form </ButtonFilled>
    </main>
  )
}

export default HomePage