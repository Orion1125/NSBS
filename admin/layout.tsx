'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, BarChart2, Eye, LogOut } from 'lucide-react'

export default function AdminLayout({
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
      const storedUser = localStorage.getItem('adminUser')
      setIsAuthenticated(!!storedUser)
      setIsLoading(false)

      if (!storedUser && pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    }
    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null
  }

  if (pathname === '/admin/login') {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Admin Panel</h2>
          <nav>
            <AdminNavLink href="/admin/dashboard" icon={<LayoutDashboard size={20} />}>Dashboard</AdminNavLink>
            <AdminNavLink href="/admin/voters" icon={<Users size={20} />}>Manage Voters</AdminNavLink>
            <AdminNavLink href="/admin/polls" icon={<BarChart2 size={20} />}>Manage Polls</AdminNavLink>
            <AdminNavLink href="/admin/results" icon={<Eye size={20} />}>Manage Results</AdminNavLink>
            <AdminNavLink href="/admin/logout" icon={<LogOut size={20} />}>Logout</AdminNavLink>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}

function AdminNavLink({ href, icon, children }: { href: string, icon: React.ReactNode, children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} className={`flex items-center py-2 px-4 rounded-md mb-2 transition-colors ${isActive ? 'bg-primary text-white' : 'text-text hover:bg-secondary hover:text-primary'}`}>
      {icon}
      <span className="ml-3">{children}</span>
    </Link>
  )
}

