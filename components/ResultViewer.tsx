import { useState, useRef } from 'react';
import Image from 'next/image';
import { Play, Pause, ZoomIn } from 'lucide-react';

interface ResultViewerProps {
  result: string | null; // URL of the processed result (image/video)
  isProcessing: boolean;
}

export default function ResultViewer({ result, isProcessing }: ResultViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showZoom, setShowZoom] = useState(false); // State for zoom modal
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleZoom = () => setShowZoom(!showZoom);

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
              ref={videoRef}
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
              <>
                <button
                  onClick={togglePlay}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                <button
                  onClick={toggleZoom}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                >
                  <ZoomIn className="h-6 w-6" />
                </button>
              </>
            ) : (
              <button
                onClick={toggleZoom}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out"
              >
                <ZoomIn className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Zoom Modal */}
          {showZoom && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="relative">
                {result.endsWith('.mp4') || result.endsWith('.webm') ? (
                  // Zoomed video modal
                  <div className="relative w-[90vw] max-w-4xl h-auto">
                    <video
                      src={result}
                      className="w-full h-full object-contain rounded-lg"
                      ref={videoRef}
                      autoPlay={isPlaying}
                      loop
                    />
                    <button
                      onClick={togglePlay}
                      className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </button>
                  </div>
                ) : (
                  // Zoomed image modal
                  <Image
                    src={result!}
                    alt="Zoomed result"
                    width={1600}
                    height={1400}
                    objectFit="contain"
                  />
                )}
                <button
                  onClick={toggleZoom}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          No result available
        </div>
      )}
    </div>
  );
}
