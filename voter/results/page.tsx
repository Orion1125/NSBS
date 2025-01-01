'use client'

import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function VoterResults() {
  const [polls, setPolls] = useState<Poll[]>([])
  const [resultsVisible, setResultsVisible] = useState(false)

  useEffect(() => {
    const storedPolls = localStorage.getItem('polls')
    const storedVotes = localStorage.getItem('voterVotes')
    if (storedPolls) {
      const parsedPolls = JSON.parse(storedPolls)
      const votes = storedVotes ? JSON.parse(storedVotes) : {}
      const pollsWithResults = parsedPolls.map((poll: Poll) => ({
        ...poll,
        results: poll.options.map((_, index) => 
          Object.values(votes).filter(vote => vote === index).length
        )
      }))
      setPolls(pollsWithResults)
    }

    const storedVisibility = localStorage.getItem('resultsVisible')
    if (storedVisibility) {
      setResultsVisible(JSON.parse(storedVisibility))
    }
  }, [])

  if (!resultsVisible) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Results</h1>
        <p className="text-green-700">Results are not currently available.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-8 text-green-800">Poll Results</h1>
      {polls.map(poll => (
        <div key={poll.id} className="mb-12 p-6 border rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4 text-green-800">{poll.question}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-700">Votes Breakdown</h3>
              <ul className="space-y-2">
                {poll.options.map((option, index) => {
                  const totalVotes = poll.results.reduce((sum, count) => sum + count, 0)
                  const percentage = totalVotes > 0 ? (poll.results[index] / totalVotes) * 100 : 0
                  return (
                    <li key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{option.text}</span>
                      <span className="font-semibold text-green-600">
                        {poll.results[index]} votes ({percentage.toFixed(1)}%)
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-700">Percentage Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={poll.options.map((option, index) => ({
                      name: option.text,
                      value: poll.results[index]
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {poll.options.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

