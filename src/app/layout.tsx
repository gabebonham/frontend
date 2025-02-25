import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Blog",
  description: "A simple blog system built with Next.js and Supabase",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="mx-auto min-h-screen"> 
      <body className={inter.className}>
        <nav className="bg-pink-600 p-4">
          <div className="container mx-auto flex justify-between items-center max-w-7xl">
            <Link href="/" className="text-white text-2xl font-bold">
              Blog
            </Link>
            <div className="space-x-4">
              <Link href="/" className="text-white hover:text-pink-200">
                All Posts
              </Link>
              <Link href="/my-posts" className="text-white hover:text-pink-200">
                My Posts
              </Link>
              <Link href="/create-post" className="text-white hover:text-pink-200">
                Create Post
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto mt-8 px-4 ">{children}</main>
      </body>
    </html>
  )
}

