import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Navigation from './components/Navigation'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NSBS Elections',
  description: 'Nigerian Society of Biochemistry Students Elections',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-green-50`}>
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-start gap-4">
              <Image
                src="/nsbs-logo.png"
                alt="NSBS Logo"
                width={80}
                height={80}
                priority
                className="object-contain"
              />
              <h1 className="text-2xl font-bold text-green-800 tracking-wide uppercase">
                Nigerian Society of Biochemistry Students (NSBS) Elections
              </h1>
            </div>
          </div>
        </header>
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-white shadow-md mt-8">
          <div className="container mx-auto px-4 py-6 text-center">
            <Link href="/admin/login" className="text-green-600 hover:text-green-800 underline">
              Admin Login
            </Link>
          </div>
        </footer>
      </body>
    </html>
  )
}

