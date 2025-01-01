'use client'

import { useState, useEffect } from 'react'
import { Check, AlertCircle } from 'lucide-react'
import Image from 'next/image'

const colors = {
  background: '#F2E8DC',
  primary: '#8B9D83',
  secondary: '#D9D0C1',
  text: '#5E6572',
  accent: '#A67F78',
};

interface PollOption {
  text: string;
  image: string;
}

interface Poll {
  id: number;
  question: string;
  options: PollOption[];
}

export default function VoterPolls() {
  const [polls, setPolls] = useState<Poll[]>([])
  const [votes, setVotes] = useState<Record<number, number>>({})
  const [votedPolls, setVotedPolls] = useState<number[]>([])
  const [tempVotes, setTempVotes] = useState<Record<number, number>>({})

  useEffect(() => {
    const storedPolls = localStorage.getItem('polls')
    if (storedPolls) {
      setPolls(JSON.parse(storedPolls))
    }

    const storedVotes = localStorage.getItem('voterVotes')
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes))
    }

    const storedVotedPolls = localStorage.getItem('votedPolls')
    if (storedVotedPolls) {
      setVotedPolls(JSON.parse(storedVotedPolls))
    }
  }, [])

  const handleVoteSelection = (pollId: number, optionIndex: number) => {
    setTempVotes(prev => ({ ...prev, [pollId]: optionIndex }))
  }

  const handleSubmitVote = (pollId: number) => {
    if (tempVotes[pollId] !== undefined) {
      const updatedVotes = { ...votes, [pollId]: tempVotes[pollId] }
      setVotes(updatedVotes)
      localStorage.setItem('voterVotes', JSON.stringify(updatedVotes))

      const updatedVotedPolls = [...votedPolls, pollId]
      setVotedPolls(updatedVotedPolls)
      localStorage.setItem('votedPolls', JSON.stringify(updatedVotedPolls))

      // Clear the temporary vote for this poll
      setTempVotes(prev => {
        const newTempVotes = { ...prev }
        delete newTempVotes[pollId]
        return newTempVotes
      })
    }
  }

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-[${colors.background}] min-h-screen py-8`}>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#8B9D83]">Active Polls</h1>
      {polls.length === 0 ? (
        <div className={`bg-[${colors.background}] border-l-4 border-[${colors.primary}] p-4`}>
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-[#8B9D83]" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className={`text-sm text-[${colors.text}]`}>
                There are currently no active polls. Please check back later.
              </p>
            </div>
          </div>
        </div>
      ) : (
        polls.map(poll => (
          <div key={poll.id} className={`mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-md border border-[${colors.secondary}]`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 text-[${colors.text}]`}>{poll.question}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {poll.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleVoteSelection(poll.id, index)}
                  disabled={votedPolls.includes(poll.id)}
                  className={`text-left p-4 rounded-md transition-colors ${
                    votedPolls.includes(poll.id)
                      ? votes[poll.id] === index
                        ? `bg-[${colors.primary}] text-white`
                        : `bg-[${colors.secondary}] text-[${colors.text}]`
                      : tempVotes[poll.id] === index
                        ? `bg-[${colors.primary}] text-white`
                        : `bg-white hover:bg-[${colors.secondary}] text-[${colors.text}]`
                  } ${
                    votedPolls.includes(poll.id) ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {option.image && (
                      <div className="w-full h-32 sm:h-48 relative mb-2">
                        <Image
                          src={option.image}
                          alt={option.text}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                    )}
                    <span className="text-center text-sm sm:text-base">{option.text}</span>
                    {(votedPolls.includes(poll.id) && votes[poll.id] === index) || 
                     (!votedPolls.includes(poll.id) && tempVotes[poll.id] === index) ? (
                      <Check className="h-5 w-5 text-white mt-2" />
                    ) : null}
                  </div>
                </button>
              ))}
            </div>
            {!votedPolls.includes(poll.id) && (
              <button
                onClick={() => handleSubmitVote(poll.id)}
                disabled={tempVotes[poll.id] === undefined}
                className={`w-full py-2 px-4 rounded-md transition-colors ${
                  tempVotes[poll.id] !== undefined
                    ? `bg-[${colors.primary}] text-white hover:bg-[${colors.accent}]`
                    : `bg-[${colors.secondary}] text-[${colors.text}] cursor-not-allowed`
                }`}
              >
                Submit Vote
              </button>
            )}
            {votedPolls.includes(poll.id) && (
              <p className={`mt-4 text-xs sm:text-sm text-[${colors.text}]`}>
                Thank you for voting. You can't change your vote once submitted.
              </p>
            )}
          </div>
        ))
      )}
    </div>
  )
}

