import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Chat from "./components/Chat";
import DocumentManager from "./components/DocumentManager";

const App = () => {
  // State to track indexed documents
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Callback function to trigger refresh when uploads happen
  const onUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-8 items-center w-full space-y-6">
      <h1 className="text-2xl font-bold text-gray-800"> Local RAG Chatbot</h1>
      
      <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <FileUpload onUploadSuccess={onUploadSuccess} />
          <DocumentManager refreshTrigger={refreshTrigger} />
        </div>
        
        <div className="lg:col-span-2">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default App;