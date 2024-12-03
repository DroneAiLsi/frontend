import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Cloud, Upload } from 'lucide-react'

interface UploadSectionProps {
  onFileUpload: (file: File) => void
  file: File | null
}

export default function UploadSection({ onFileUpload, file }: UploadSectionProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0])
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    multiple: false,
  })

  return (
    <div>
      {file ? (
        <div className="mt-4">
          {file.type.startsWith('video') ? (
            <video
              src={URL.createObjectURL(file)}
              className="w-full h-full object-cover"
              controls
            />
          ) : (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-md"
            />
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`p-8 border-2 border-dashed rounded-lg text-center transition-colors duration-300 ease-in-out cursor-pointer
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
          onDragEnter={() => setIsDragActive(true)}
          onDragLeave={() => setIsDragActive(false)}
        >
          <input {...getInputProps()} />
          <Cloud className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <p className="text-lg mb-2">Upload your drone footage (video/image)</p>
          <p className="text-sm text-gray-500 mb-4">Drag and drop or click to select</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out">
            <Upload className="inline-block mr-2 h-5 w-5" />
            Select File
          </button>
        </div>
      )}
    </div>
  )
}
