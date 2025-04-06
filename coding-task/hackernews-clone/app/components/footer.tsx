"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"

export default function Footer() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="w-full">
      <hr className="border-t border-[#ff6600] my-3" />
      <div className="text-center text-xs py-2">
        <p className="mb-3">
          Join us for{" "}
          <Link href="/" className="text-black underline">
            Y Combinator Startup School
          </Link>{" "}
          this June 16-17 in San Francisco!
        </p>
        <div className="flex flex-wrap justify-center gap-x-1 text-[#5a5a5a] mb-3">
          <Link href="/" className="hover:underline">
            Guidelines
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            FAQ
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            Lists
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            API
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            Security
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            Legal
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            Apply to YC
          </Link>
          <span>|</span>
          <Link href="/" className="hover:underline">
            Contact
          </Link>
        </div>
        <form onSubmit={handleSearch} className="inline-flex items-center">
          <label htmlFor="search" className="mr-1">
            Search:
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-[#c9c9c9] px-1 h-[21px] w-[150px]"
          />
        </form>
      </div>
    </div>
  )
}

