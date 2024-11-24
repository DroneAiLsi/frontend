'use client'

import { useState } from 'react'
import Image from 'next/image'
import DroneAIDetector from './DroneAIDetector'

export default function LandingPage() {
  const [startDetection, setStartDetection] = useState(false)

  return (
    <div className="flex-grow">
      {!startDetection ? (
        <div className="container mx-auto px-4 py-12 flex-grow">
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold text-blue-800">Drone AI Object Detector</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI technology for detecting and tracking objects in outdoor scenes captured by drones. 
              Upload your footage and get instant analysis with high accuracy.
            </p>
            <button 
              onClick={() => setStartDetection(true)}
              className="px-8 py-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out text-lg font-semibold shadow-lg"
            >
              Start Detection
            </button>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="relative w-full h-64">
                <Image 
                  src="/photo1.gif" 
                  alt="Drone capturing video" 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-lg shadow-md"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-700">Drone Video Analysis</h3>
              <p className="text-gray-600">Process high-quality drone footage for real-time object detection</p>
            </div>
            <div className="text-center space-y-4">
              <div className="relative w-full h-64">
                <Image 
                  src="/capture.png" 
                  alt="Object tracking visualization" 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-lg shadow-md"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-700">Advanced Tracking</h3>
              <p className="text-gray-600">Track multiple objects across frames with high precision</p>
            </div>
            <div className="text-center space-y-4">
              <div className="relative w-full h-64">
                <Image 
                  src="/statsjpg.jpg" 
                  alt="AI-powered analytics" 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-lg shadow-md"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-700">Intelligent Analytics</h3>
              <p className="text-gray-600">Get detailed insights and statistics on detected objects</p>
            </div>
          </div>
        </div>
      ) : (
        <DroneAIDetector />
      )}
    </div>
  )
}

