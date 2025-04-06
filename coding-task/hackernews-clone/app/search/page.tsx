import Link from "next/link"
import { searchStories } from "../lib/api"
import SearchResult from "../components/search-result"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const results = query ? await searchStories(query) : []

  return (
    <div className="min-h-screen bg-[#f6f6ef]">
      <header className="bg-[#ff6600] px-2 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 bg-white w-8 h-8 flex items-center justify-center">
            <span className="text-[#ff6600] font-bold text-xl">H</span>
          </div>
          <div>
            <div className="font-bold text-sm">Search</div>
            <div className="text-sm">Hacker News</div>
          </div>
        </div>
        <div className="flex-1 mx-4">
          <form action="/search" method="get">
            <div className="relative flex items-center">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="something"
                className="w-full px-8 py-1 border border-[#ff6600] rounded"
              />

            </div>
          </form>
        </div>
      </header>

      <div className="p-4 mt-4">
        <div className="flex items-center justify-between mb-4 text-xs">
          <div className="flex items-center gap-2">
            <span>Search</span>
            <select className="border px-1 py-0.5">
              <option>Stories</option>
              <option>Comments</option>
            </select>
            <span>by</span>
            <select className="border px-1 py-0.5">
              <option>Popularity</option>
              <option>Date</option>
            </select>
            <span>for</span>
            <select className="border px-1 py-0.5">
              <option>All time</option>
              <option>Last 24h</option>
              <option>Past Week</option>
              <option>Past Month</option>
              <option>Past Year</option>
            </select>
          </div>
          <div>{results.length > 0 && <span>{results.length} results (0.004 seconds)</span>}</div>
        </div>

        {query ? (
          results.length > 0 ? (
            <div>
              {results.map((result) => (
                <SearchResult key={result.id} result={result} query={query} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">No results found for "{query}"</div>
          )
        ) : (
          <div className="text-center py-8">Enter a search term to find stories</div>
        )}
      </div>
    </div>
  )
}

