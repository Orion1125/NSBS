'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const voterUser = localStorage.getItem('voterUser')
      setIsLoggedIn(!!voterUser)
    }

    checkLoginStatus()
    window.addEventListener('storage', checkLoginStatus)

    return () => {
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [])

  return (
    <nav className="bg-white shadow-md mb-8">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center space-x-8">
          <NavLink href="/" label="Home" />
          {isLoggedIn ? (
            <>
              <NavLink href="/voter/polls" label="Polls" />
              <NavLink href="/voter/results" label="Results" />
              <NavLink href="/voter/profile" label="Profile" />
            </>
          ) : (
            <>
              <NavLink href="/voter/login" label="Voter Login" />
              <NavLink href="/voter/results" label="Results" />
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li>
      <Link
        href={href}
        className={`inline-block py-4 px-2 border-b-2 ${
          isActive
            ? 'border-green-600 text-green-700'
            : 'border-transparent text-gray-600 hover:text-green-700'
        }`}
      >
        {label}
      </Link>
    </li>
  )
}

