import Link from "next/link"
import type { Story } from "../lib/api"

interface SearchResultProps {
  result: Story
  query: string
}

export default function SearchResult({ result, query }: SearchResultProps) {
  // Function to highlight the query in the text
  const highlightQuery = (text: string) => {
    if (!text) return ""

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="mb-6">
      <div className="mb-1">
        {result.title.toLowerCase().includes(query.toLowerCase()) ? (
          <span>
            Is {highlightQuery(result.title)} bugging you? (
            <Link href={result.url || `https://news.ycombinator.com/item?id=${result.id}`} className="text-[#666666]">
              {result.url ? new URL(result.url).hostname : `news.ycombinator.com/item?id=${result.id}`}
            </Link>
            )
          </span>
        ) : (
          <Link href={result.url || `https://news.ycombinator.com/item?id=${result.id}`}>{result.title}</Link>
        )}
      </div>
      <div className="text-xs text-[#666666]">
        {result.score} points by {result.by} {formatTimeAgo(result.time)} | {result.descendants || 0} comments
      </div>
    </div>
  )
}

function formatTimeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000)
  const diff = now - timestamp

  if (diff < 3600) {
    const minutes = Math.floor(diff / 60)
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600)
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`
  } else if (diff < 2592000) {
    const days = Math.floor(diff / 86400)
    return `${days} day${days !== 1 ? "s" : ""} ago`
  } else if (diff < 31536000) {
    const months = Math.floor(diff / 2592000)
    return `${months} month${months !== 1 ? "s" : ""} ago`
  } else {
    const years = Math.floor(diff / 31536000)
    return `${years} year${years !== 1 ? "s" : ""} ago`
  }
}

