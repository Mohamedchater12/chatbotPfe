import { useState } from "react";
import { ChatMessage as ChatMessageType, Context } from "../types";
import ChatMessage from "./ChatMessage";

interface MessageWithContext extends ChatMessageType {
  contexts?: Context[];
}

const Chat = () => {
  const [messages, setMessages] = useState<MessageWithContext[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showContexts, setShowContexts] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: MessageWithContext = {
      role: "user",
      content: input,
    };

    // Get message history for context (last 10 messages)
    const messageHistory = messages
      .slice(-10)
      .map(msg => ({ role: msg.role, content: msg.content }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setShowContexts(false);

    try {
      const response = await fetch("http://127.0.0.1:5001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify({ 
          query: userMessage.content,
          history: JSON.stringify(messageHistory)
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: MessageWithContext = {
        role: "assistant",
        content: data.response,
        contexts: data.contexts && data.contexts.length > 0 ? data.contexts : []
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // If we have contexts, automatically show them
      if (data.contexts && data.contexts.length > 0) {
        setShowContexts(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleContexts = () => {
    setShowContexts(!showContexts);
  };

  return (
    <div className="container mx-auto flex flex-col">
      <div className="flex flex-col h-[600px] border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Chat with Your Documents
          </h2>
          
          <button 
            onClick={toggleContexts}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showContexts ? "Hide Sources" : "Show Sources"}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message} 
              contexts={message.contexts}
              showContexts={showContexts} 
            />
          ))}
          
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-gray-200 bg-white"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your documents..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg
                bg-white text-gray-900 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                disabled:bg-gray-100"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                disabled:bg-blue-300 disabled:cursor-not-allowed
                transition duration-200 ease-in-out
                font-medium shadow-sm whitespace-nowrap"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;