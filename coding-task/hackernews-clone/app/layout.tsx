import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import Footer from "./components/footer"

export const metadata: Metadata = {
  title: "Hacker News Clone",
  description: "A simplified clone of HackerNews",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#f6f6ef]">
        <div className="max-w-[85%] md:max-w-[800px] mx-auto">
          <table className="w-full border-0 bg-[#ff6600]">
            <tbody>
              <tr>
                <td className="py-1 pl-2">
                  <table className="border-0 p-0 h-[10px]">
                    <tbody>
                      <tr>
                        <td className="pr-1">
                          <Link href="/">
                            <span className="border border-white w-[18px] h-[18px] inline-flex items-center justify-center bg-[#ff6600]">
                              <b className="text-white">Y</b>
                            </span>
                          </Link>
                        </td>
                        <td className="h-[10px] whitespace-nowrap">
                          <span className="inline-block py-[1px]">
                            <Link href="/" className="header-link">
                              Hacker News
                            </Link>
                            <Link href="/" className="header-link">
                              new
                            </Link>
                            <span>|</span>
                            <Link href="/" className="header-link">
                              past
                            </Link>
                            <span>|</span>
                            <Link href="/" className="header-link">
                              comments
                            </Link>
                            <span>|</span>
                            <Link href="/" className="header-link">
                              ask
                            </Link>
                            <span>|</span>
                            <Link href="/" className="header-link">
                              show
                            </Link>
                            <span>|</span>
                            <Link href="/" className="header-link">
                              jobs
                            </Link>
                            <span>|</span>
                            <Link href="/" className="header-link">
                              submit
                            </Link>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="text-right pr-2">
                  <span className="text-xs">
                    <Link href="/" className="text-black">
                      login
                    </Link>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full border-0 bg-[#f6f6ef] px-2 py-2">
            <tbody>
              <tr>
                <td>{children}</td>
              </tr>
            </tbody>
          </table>
          <Footer />
        </div>
      </body>
    </html>
  )
}

