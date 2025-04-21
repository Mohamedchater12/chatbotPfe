import { useState } from "react";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";

interface FileUploadProps {
  onUploadSuccess: () => void;
}

const FileUpload = ({ onUploadSuccess }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check for valid file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ];

    if (!validTypes.includes(file.type)) {
      setMessage("Please upload a valid PDF, DOCX, or PPTX file");
      return;
    }

    setUploading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5001/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error from the backend
        throw new Error(data.error || "Upload failed");
      }

      // Success
      setMessage(`${file.name} processed with ${data.chunks} chunks stored`);
      
      // Notify parent component about successful upload
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error: any) {
      // Log and display the error
      console.error("Error uploading file:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Create a DOM event to pass to handleFileUpload
      const fileInputEl = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInputEl) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(e.dataTransfer.files[0]);
        fileInputEl.files = dataTransfer.files;
        
        // Create a synthetic event
        const event = {
          target: fileInputEl
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        
        handleFileUpload(event);
      }
    }
  };

  const getStatusIcon = () => {
    if (uploading) {
      return null;
    } else if (message && message.includes("Error")) {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    } else if (message && !message.includes("Error")) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    return null;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`relative border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        } transition-all duration-200 ease-in-out`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Upload className="w-8 h-8 text-blue-500" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">Upload Document</h3>
            <p className="text-sm text-gray-500">
              Drag & drop your file here, or click to browse
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: PDF, DOCX, PPTX
            </p>
          </div>
          
          <label className="cursor-pointer px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors">
            Browse Files
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.docx,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"
            />
          </label>
        </div>

        {uploading && (
          <div className="mt-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
            <p className="mt-2 text-sm text-blue-500 font-medium">Uploading...</p>
          </div>
        )}
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded-md flex items-center space-x-2 ${
          message.includes("Error") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
        }`}>
          {getStatusIcon()}
          <span className="text-sm">{message}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;