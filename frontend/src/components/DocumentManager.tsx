import { useState, useEffect } from "react";
import { Document } from "../types";
interface DocumentManagerProps {
  refreshTrigger: number;
}

interface DocumentsResponse {
  indexed_documents: string[];
  folder_documents: Document[];
}

const DocumentManager = ({ refreshTrigger }: DocumentManagerProps) => {
  const [documents, setDocuments] = useState<DocumentsResponse>({ 
    indexed_documents: [], 
    folder_documents: [] 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  const [message, setMessage] = useState("");

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5001/api/list-documents");
      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error loading documents:", error);
      setMessage("Failed to load documents. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReindexAll = async () => {
    setReindexing(true);
    setMessage("");
    try {
      const response = await fetch("http://127.0.0.1:5001/api/reindex-all", {
        method: "POST",
      });
      
      if (!response.ok) {
        throw new Error("Failed to reindex documents");
      }
      
      const data = await response.json();
      setMessage(`Successfully reindexed ${data.files_processed} documents`);
      
      // Refresh the document list
      loadDocuments();
    } catch (error) {
      console.error("Error reindexing:", error);
      setMessage("Failed to reindex documents. Please try again.");
    } finally {
      setReindexing(false);
    }
  };

  // Load documents when component mounts or refreshTrigger changes
  useEffect(() => {
    loadDocuments();
  }, [refreshTrigger]);

  return (
    <div className="mb-6 p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Document Manager</h2>
        <button
          onClick={handleReindexAll}
          disabled={reindexing}
          className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
            disabled:bg-indigo-300 disabled:cursor-not-allowed
            transition duration-200 ease-in-out text-sm"
        >
          {reindexing ? "Reindexing..." : "Reindex All"}
        </button>
      </div>
      
      {message && (
        <p className={`mb-4 text-sm font-medium ${
          message.startsWith("Failed") ? "text-red-600" : "text-green-600"
        }`}>
          {message}
        </p>
      )}
      
      {isLoading ? (
        <div className="flex justify-center my-4">
          <div className="animate-spin h-6 w-6 border-2 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">Files in Documents Folder</h3>
            <div className="max-h-60 overflow-y-auto">
              {documents.folder_documents.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {documents.folder_documents.map((doc, index) => (
                    <li key={index} className="py-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-900 flex items-center">
                          {doc.indexed && (
                            <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2"></span>
                          )}
                          {doc.filename}
                        </span>
                        <span className="text-xs text-gray-500">
                          {Math.round(doc.size / 1024)} KB
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No documents found in folder</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;