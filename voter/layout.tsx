'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, User, BarChart2, PieChart, LogOut } from 'lucide-react'

export default function VoterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('voterUser')
      setIsAuthenticated(!!storedUser)
      setIsLoading(false)

      if (!storedUser && !pathname?.startsWith('/voter/login') && pathname !== '/voter/results') {
        router.push('/voter/login')
      }
    }
    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!isAuthenticated && pathname !== '/voter/login' && pathname !== '/voter/results') {
    return null
  }

  if (pathname === '/voter/login' || pathname === '/voter/results') {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <nav className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold mb-6 text-primary">Voter Panel</h2>
        <ul className="space-y-2">
          <VoterNavLink href="/voter/profile" icon={<User size={20} />}>My Profile</VoterNavLink>
          <VoterNavLink href="/voter/polls" icon={<BarChart2 size={20} />}>View Polls</VoterNavLink>
          <VoterNavLink href="/voter/results" icon={<PieChart size={20} />}>View Results</VoterNavLink>
          <VoterNavLink href="/voter/logout" icon={<LogOut size={20} />}>Logout</VoterNavLink>
        </ul>
      </nav>
      <div className="flex-1 p-8 overflow-auto">
        {children}
      </div>
    </div>
  )
}

function VoterNavLink({ href, icon, children }: { href: string, icon: React.ReactNode, children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center py-2 px-4 rounded-md transition-colors ${
          isActive ? 'bg-primary text-white' : 'text-text hover:bg-secondary hover:text-primary'
        }`}
      >
        {icon}
        <span className="ml-3">{children}</span>
      </Link>
    </li>
  )
}

