'use client'

import { useState, useEffect } from 'react'
import { User, Mail } from 'lucide-react'

interface VoterProfile {
  username: string;
  email: string;
}

export default function VoterProfile() {
  const [profile, setProfile] = useState<VoterProfile | null>(null)

  useEffect(() => {
    const voterUser = localStorage.getItem('voterUser')
    if (voterUser) {
      const { username, email } = JSON.parse(voterUser)
      setProfile({ username, email })
    }
  }, [])

  if (!profile) {
    return <div className="flex justify-center items-center h-64">Loading profile...</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-green-800 text-center">Voter Profile</h1>
      <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
        <div className="mb-6 flex items-center">
          <User className="text-green-600 mr-4" size={24} />
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <p className="text-gray-900 text-lg">{profile.username}</p>
          </div>
        </div>
        <div className="mb-6 flex items-center">
          <Mail className="text-green-600 mr-4" size={24} />
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <p className="text-gray-900 text-lg">{profile.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

