import { useState } from "react";

interface FileUploadProps {
  onUploadSuccess: () => void;
}

const FileUpload = ({ onUploadSuccess }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

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

  return (
    <div className="mb-6 p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Upload Document
      </h2>
      <div className="relative">
        <input
          type="file"
          accept=".pdf,.docx,.pptx"
          onChange={handleFileUpload}
          className="block w-full text-base text-gray-900 
            file:mr-4 file:py-2.5 file:px-6 
            file:rounded-full file:border-0 
            file:text-sm file:font-semibold 
            file:bg-blue-50 file:text-blue-700 
            hover:file:bg-blue-100 
            focus:outline-none focus:ring-2 focus:ring-blue-300
            transition duration-200 ease-in-out"
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">Supported formats: PDF, DOCX, PPTX</p>
      
      {uploading && (
        <p className="mt-3 text-sm text-blue-600 flex items-center">
          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Uploading...
        </p>
      )}
      {message && (
        <p
          className={`mt-3 text-sm font-medium ${
            message.startsWith("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default FileUpload;