import { RefreshCw } from 'lucide-react'

interface ActionButtonsProps {
  onReset: () => void
}

export default function ActionButtons({ onReset }: ActionButtonsProps) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onReset}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300 ease-in-out flex items-center"
      >
        <RefreshCw className="h-5 w-5 mr-2" />
        Reset
      </button>
    </div>
  )
}

