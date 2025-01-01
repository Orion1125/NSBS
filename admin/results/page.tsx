'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

interface PollOption {
  text: string;
  image: string;
}

interface Poll {
  id: number;
  question: string;
  options: PollOption[];
  results: number[];
}

export default function AdminResults() {
  const [polls, setPolls] = useState<Poll[]>([])
  const [resultsVisible, setResultsVisible] = useState(false)

  useEffect(() => {
    const storedPolls = localStorage.getItem('polls')
    if (storedPolls) {
      const parsedPolls = JSON.parse(storedPolls)
      const pollsWithResults = parsedPolls.map((poll: Poll) => ({
        ...poll,
        results: poll.options.map(() => Math.floor(Math.random() * 100))
      }))
      setPolls(pollsWithResults)
    }

    const storedVisibility = localStorage.getItem('resultsVisible')
    if (storedVisibility) {
      setResultsVisible(JSON.parse(storedVisibility))
    }
  }, [])

  const toggleResultsVisibility = () => {
    const newVisibility = !resultsVisible
    setResultsVisible(newVisibility)
    localStorage.setItem('resultsVisible', JSON.stringify(newVisibility))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-green-800">Manage Results</h1>
      
      <div className="mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-green-700">Results Visibility</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <button
            onClick={toggleResultsVisibility}
            className={`flex items-center px-4 py-2 rounded ${
              resultsVisible ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } text-white transition duration-300 mb-2 sm:mb-0 sm:mr-4`}
          >
            {resultsVisible ? (
              <>
                <EyeOff className="mr-2" size={20} />
                Hide Results
              </>
            ) : (
              <>
                <Eye className="mr-2" size={20} />
                Show Results
              </>
            )}
          </button>
          <span className="text-sm sm:text-base text-gray-600">
            Results are currently <strong>{resultsVisible ? 'visible' : 'hidden'}</strong> to voters
          </span>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-green-700">Poll Results</h2>
        {polls.map(poll => (
          <div key={poll.id} className="mb-6 p-4 border rounded">
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-green-800">{poll.question}</h3>
            <ul className="space-y-4">
              {poll.options.map((option, index) => (
                <li key={index} className="flex flex-col sm:flex-row items-start sm:items-center">
                  <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                    {option.image && (
                      <div className="w-16 h-16 relative">
                        <Image
                          src={option.image}
                          alt={option.text}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  <span className="w-full sm:w-1/4 text-sm sm:text-base text-gray-700 mb-2 sm:mb-0">{option.text}</span>
                  <div className="w-full sm:w-1/2 h-4 bg-green-100 rounded mb-2 sm:mb-0">
                    <div
                      className="h-full bg-green-500 rounded"
                      style={{ width: `${(poll.results[index] / Math.max(...poll.results)) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">{poll.results[index]} votes</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

