'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, Trash2, ImageIcon } from 'lucide-react'

interface PollOption {
  text: string;
  image: string;
}

interface Poll {
  id: number;
  question: string;
  options: PollOption[];
}

export default function AdminPolls() {
  const [polls, setPolls] = useState<Poll[]>([])
  const [newPoll, setNewPoll] = useState<Poll>({ id: 0, question: '', options: [{ text: '', image: '' }] })

  useEffect(() => {
    const storedPolls = localStorage.getItem('polls')
    if (storedPolls) {
      setPolls(JSON.parse(storedPolls))
    }
  }, [])

  const handleAddOption = () => {
    setNewPoll(prev => ({ ...prev, options: [...prev.options, { text: '', image: '' }] }))
  }

  const handleOptionChange = (index: number, field: 'text' | 'image', value: string) => {
    const updatedOptions = [...newPoll.options]
    updatedOptions[index] = { ...updatedOptions[index], [field]: value }
    setNewPoll(prev => ({ ...prev, options: updatedOptions }))
  }

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      handleOptionChange(index, 'image', reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPoll.options.length === 0) {
      alert("Please add at least one option to the poll.")
      return
    }
    const updatedPolls = [...polls, { ...newPoll, id: Date.now() }]
    setPolls(updatedPolls)
    localStorage.setItem('polls', JSON.stringify(updatedPolls))
    setNewPoll({ id: 0, question: '', options: [{ text: '', image: '' }] })
  }

  const handleDeletePoll = (id: number) => {
    const updatedPolls = polls.filter(poll => poll.id !== id)
    setPolls(updatedPolls)
    localStorage.setItem('polls', JSON.stringify(updatedPolls))
  }

  const handleRemoveOption = (index: number) => {
    setNewPoll(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-green-800">Manage Polls</h1>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-green-700">Create New Poll</h2>
        <div className="mb-4">
          <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
          <input
            type="text"
            id="question"
            value={newPoll.question}
            onChange={(e) => setNewPoll(prev => ({ ...prev, question: e.target.value }))}
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
            required
          />
        </div>
        {newPoll.options.map((option, index) => (
          <div key={index} className="mb-4 relative">
            <label htmlFor={`option-${index}`} className="block text-sm font-medium text-gray-700">Option {index + 1}</label>
            <div className="flex items-center">
              <input
                type="text"
                id={`option-${index}`}
                value={option.text}
                onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <label htmlFor={`image-${index}`} className="block text-sm font-medium text-gray-700 mt-2">Image</label>
            <input
              type="file"
              id={`image-${index}`}
              accept="image/*"
              onChange={(e) => e.target.files && handleImageUpload(index, e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-green-50 file:text-green-700
                hover:file:bg-green-100"
            />
            {option.image && (
              <img src={option.image} alt={`Option ${index + 1}`} className="mt-2 w-32 h-32 object-cover rounded-md" />
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddOption}
          className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <PlusCircle className="mr-2" size={16} />
          Add Option
        </button>
        <button
          type="submit"
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Create Poll
        </button>
      </form>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-green-700">Existing Polls</h2>
        {polls.map(poll => (
          <div key={poll.id} className="mb-6 p-4 border rounded">
            <div className="flex justify-between items-start">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-green-800">{poll.question}</h3>
              <button
                  onClick={() => handleDeletePoll(poll.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
            </div>
            <ul className="list-disc pl-5 mt-2">
              {poll.options.map((option, index) => (
                <li key={index} className="text-sm sm:text-base text-gray-700 flex items-center mb-2">
                  <span>{option.text}</span>
                  {option.image && (
                    <ImageIcon size={16} className="ml-2 text-green-600" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

