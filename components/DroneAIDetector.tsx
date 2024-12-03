'use client'

import { useState } from 'react'
import axios from 'axios'
import UploadSection from './UploadSection'
import ResultViewer from './ResultViewer'
import OutputDetails from './OutputDetails'
import ActionButtons from './ActionButtons'

export default function DroneAIDetector() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [stats, setStats] = useState<any | null>(null)
  const [downloadLink, setDownloadLink] = useState<string | null>(null)

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile)
    setIsProcessing(true)

    const formData = new FormData()
    formData.append('file', uploadedFile)

    try {
      const response = await axios.post('http://127.0.0.1:5000/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Set the result and stats from the API response
      setResult(response.data.output_file) // URL or path of the processed image/video
      setStats(response.data.stats) // Stats (count of detected classes)
      setDownloadLink(response.data.download_link) // URL to download the processed file
    } catch (error) {
      console.error('Error uploading the file:', error)
      setResult(null)
      setStats(null)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setResult(null)
    setStats(null)
  }

  const handleDownload = async (downloadLink : string) => {
    try {
      const response = await fetch(`http://localhost:5000/${downloadLink}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ResultsZip"); // Remplacez par le nom souhaité
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erreur lors du téléchargement :", error);
      alert("Échec du téléchargement du fichier.");
    }
  };
  return (
    <div className="flex-grow">
      <div className="container mx-auto px-4 py-8 space-y-8 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-800">Drone AI Object Detector</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Upload your drone footage of outdoor scenes, and our AI will detect and track objects with high precision.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-blue-700 text-center">Input</h2>
            <UploadSection onFileUpload={handleFileUpload} file={file} />
            <ActionButtons onReset={handleReset} />
          </div>
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-blue-700 text-center">Output</h2>
            {file ? (
              <>
                <ResultViewer result={result} isProcessing={isProcessing} />
                <OutputDetails stats={stats} />
                <div className="flex justify-center">
                  <button
                    onClick={() => downloadLink && handleDownload(downloadLink)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out flex items-center"
                  >
                    Download Results
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
                Upload a file to see the results here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
