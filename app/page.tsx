import LandingPage from '../components/LandingPage'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col">
      <Navbar />
      <LandingPage />
    </main>
  )
}

