import Link from 'next/link'
import { Github } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="https://github.com/DroneAiLsi" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500 transition-colors duration-300">
          <Github className="h-6 w-6" />
        </Link>
        <Link href="/" className="text-2xl font-bold text-blue-800">
          DroneAI
        </Link>
      </div>
    </nav>
  )
}

