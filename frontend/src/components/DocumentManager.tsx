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
    <div className="mb-8 p-6 border border-gray-200 rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Document Manager
        </h2>
        <button
          onClick={handleReindexAll}
          disabled={reindexing}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
            disabled:bg-indigo-300 disabled:cursor-not-allowed
            transition duration-200 ease-in-out text-sm font-medium shadow-md hover:shadow-lg
            flex items-center"
        >
          {reindexing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Reindexing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Reindex All
            </>
          )}
        </button>
      </div>
      
      {message && (
        <div className={`mb-5 p-3 rounded-lg ${
          message.startsWith("Failed") 
            ? "bg-red-50 border border-red-200 text-red-700" 
            : "bg-green-50 border border-green-200 text-green-700"
        }`}>
          <p className="text-sm font-medium flex items-center">
            {message.startsWith("Failed") ? (
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
            {message}
          </p>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin h-8 w-8 border-3 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
            <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
              </svg>
              Files in Documents Folder
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-inner max-h-64 overflow-y-auto">
              {documents.folder_documents.length > 0 ? (
                <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                  {documents.folder_documents.map((doc, index) => (
                    <li key={index} className="py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-900 dark:text-gray-200 flex items-center">
                          {doc.indexed ? (
                            <span className="flex items-center">
                              <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2"></span>
                              <span className="font-medium">{doc.filename}</span>
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 inline-block mr-2"></span>
                              {doc.filename}
                            </span>
                          )}
                        </span>
                        <div className="flex items-center">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                            {Math.round(doc.size / 1024)} KB
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-6 flex flex-col items-center justify-center text-center">
                  <svg className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p className="text-sm text-gray-500 dark:text-gray-400">No documents found in folder</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;