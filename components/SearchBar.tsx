"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchTerm)
  }

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search organizations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>
    </form>
  )
}

