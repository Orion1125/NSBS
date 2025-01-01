import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-8 text-green-800">Welcome to NSBS Elections</h2>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl">
        Exercise your right to vote and shape the future of the Nigerian Society of Biochemistry Students.
      </p>
      <div className="space-y-4">
        <Link 
          href="/voter/login" 
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 shadow-lg"
        >
          Voter Login
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <Link 
          href="/voter/results" 
          className="block text-green-600 hover:text-green-800 font-semibold"
        >
          View Results
        </Link>
      </div>
    </div>
  )
}

