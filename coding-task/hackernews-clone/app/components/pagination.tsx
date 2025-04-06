"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname()

  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  return (
    <div className="story-meta">
      {nextPage ? (
        <Link href={`${pathname}?page=${nextPage}`} className="text-[#ff6600]">
          More
        </Link>
      ) : (
        <span className="text-gray-400">More</span>
      )}
    </div>
  )
}

