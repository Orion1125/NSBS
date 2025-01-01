'use client'

import { useState, useEffect } from 'react'
import { User, Trash2 } from 'lucide-react'

interface Voter {
  id: string;
  username: string;
  email: string;
}

export default function AdminVoters() {
  const [voters, setVoters] = useState<Voter[]>([])
  const [newVoter, setNewVoter] = useState({ username: '', email: '', password: '' })

  useEffect(() => {
    const storedVoters = localStorage.getItem('voters')
    if (storedVoters) {
      setVoters(JSON.parse(storedVoters))
    }
  }, [])

  const handleAddVoter = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedVoters = [...voters, { ...newVoter, id: Date.now().toString() }]
    setVoters(updatedVoters)
    localStorage.setItem('voters', JSON.stringify(updatedVoters))
    setNewVoter({ username: '', email: '', password: '' })
  }

  const handleDeleteVoter = (id: string) => {
    const updatedVoters = voters.filter(voter => voter.id !== id)
    setVoters(updatedVoters)
    localStorage.setItem('voters', JSON.stringify(updatedVoters))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-green-800">Manage Voters</h1>
      
      <form onSubmit={handleAddVoter} className="mb-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Add New Voter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Username"
            value={newVoter.username}
            onChange={(e) => setNewVoter({ ...newVoter, username: e.target.value })}
            className="border rounded px-3 py-2 w-full"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newVoter.email}
            onChange={(e) => setNewVoter({ ...newVoter, email: e.target.value })}
            className="border rounded px-3 py-2 w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newVoter.password}
            onChange={(e) => setNewVoter({ ...newVoter, password: e.target.value })}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
          Add Voter
        </button>
      </form>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Voter List</h2>
        <ul className="space-y-4">
          {voters.map(voter => (
            <li key={voter.id} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center">
                <User className="text-green-600 mr-2" size={20} />
                <span>{voter.username} - {voter.email}</span>
              </div>
              <button
                onClick={() => handleDeleteVoter(voter.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

