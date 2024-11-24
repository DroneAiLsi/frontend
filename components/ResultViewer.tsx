import { useState } from 'react';
import Image from 'next/image';
import { Play, Pause, ZoomIn } from 'lucide-react';

interface ResultViewerProps {
  result: string | null; // URL of the processed result (image/video)
  isProcessing: boolean;
}

export default function ResultViewer({ result, isProcessing }: ResultViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
      {/* Processing Indicator */}
      {isProcessing ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : result ? (
        <>
          {/* Display Result */}
          {result.endsWith('.mp4') || result.endsWith('.webm') ? (
            // Processed video result
            <video
              src={result}
              className="w-full h-full object-cover"
              controls
              autoPlay={isPlaying}
              loop
            />
          ) : (
            // Processed image result
            <Image
              src={result}
              alt="Processed result"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          )}

          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {result.endsWith('.mp4') ? (
              <button
                onClick={togglePlay}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
            ) : (
              <button
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out"
              >
                <ZoomIn className="h-6 w-6" />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          No result available
        </div>
      )}
    </div>
  );
}
