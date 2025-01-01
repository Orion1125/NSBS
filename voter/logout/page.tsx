'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VoterLogout() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('voterUser')
    router.push('/voter/login')
  }, [router])

  return <div>Logging out...</div>
}

