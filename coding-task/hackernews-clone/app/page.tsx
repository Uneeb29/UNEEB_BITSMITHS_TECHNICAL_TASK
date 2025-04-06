import { Suspense } from "react"
import { getTopStories } from "./lib/api"
import StoryItem from "./components/story-item"
import Pagination from "./components/pagination"

export const revalidate = 60

interface HomeProps {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const currentPage = Number(searchParams.page) || 1
  const storiesPerPage = 30
  const start = (currentPage - 1) * storiesPerPage
  const end = start + storiesPerPage

  const storyIds = await getTopStories()
  const paginatedIds = storyIds.slice(start, end)
  const totalPages = Math.ceil(storyIds.length / storiesPerPage)

  return (
    <table className="w-full border-0 cellpadding-0 cellspacing-0 bg-[#f6f6ef]">
      <tbody>
        <Suspense
          fallback={
            <tr>
              <td className="p-2">Loading stories...</td>
            </tr>
          }
        >
          {paginatedIds.map((id, index) => (
            <StoryItem key={id} id={id} rank={start + index + 1} />
          ))}
        </Suspense>
        <tr>
          <td colSpan={2}></td>
          <td className="pl-2 pt-2">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

