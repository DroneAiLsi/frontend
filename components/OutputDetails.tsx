import { FaWalking, FaBicycle, FaCar, FaBus, FaMotorcycle, FaTruck, FaUsers } from 'react-icons/fa'

interface OutputDetailsProps {
  stats: Array<{ class: string, count: number }> | null
}

export default function OutputDetails({ stats }: OutputDetailsProps) {
  // Mappage des classes vers des icônes
  const classIcons: Record<string, JSX.Element> = {
    pedestrian: <FaWalking className="text-blue-500 w-6 h-6" />,
    people: <FaUsers className="text-green-500 w-6 h-6" />,
    bicycle: <FaBicycle className="text-yellow-500 w-6 h-6" />,
    car: <FaCar className="text-red-500 w-6 h-6" />,
    van: <FaTruck className="text-gray-500 w-6 h-6" />,
    truck: <FaTruck className="text-orange-500 w-6 h-6" />,
    tricycle: <FaBicycle className="text-purple-500 w-6 h-6" />,
    "awning-tricycle": <FaBicycle className="text-teal-500 w-6 h-6" />,
    bus: <FaBus className="text-indigo-500 w-6 h-6" />,
    motor: <FaMotorcycle className="text-pink-500 w-6 h-6" />,
  }

  return (
    <div className="bg-gray-100 rounded-lg p-8">
      <h3 className="text-xl font-semibold text-blue-700">Detected Objects</h3>
      <ul className="space-y-4 mt-4">
        {stats ? (
          stats.map((stat, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {classIcons[stat.class] || <span className="text-gray-500">?</span>}
                <span>{stat.class}</span>
              </div>
              <span className="font-medium">{stat.count}</span>
            </li>
          ))
        ) : (
          <p>No objects detected yet.</p>
        )}
      </ul>
    </div>
  )
}
