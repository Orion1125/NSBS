'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogout() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }, [router])

  return <div>Logging out...</div>
}

