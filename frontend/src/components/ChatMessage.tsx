import { ChatMessage as ChatMessageType, Context } from "../types";

interface Props {
  message: ChatMessageType;
  contexts?: Context[];
  showContexts?: boolean;
}

const ChatMessage = ({ message, contexts, showContexts = false }: Props) => {
  const isUser = message.role === "user";
  const hasContexts = contexts && contexts.length > 0;

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[85%] p-4 rounded-xl shadow-sm break-words
          ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200 text-gray-800"
          }
        `}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
      
      {!isUser && hasContexts && showContexts && (
        <div className="mt-2 bg-gray-100 rounded-lg p-2 max-w-[85%] text-xs border border-gray-200">
          <details>
            <summary className="font-medium text-gray-700 cursor-pointer">
              Sources ({contexts.length})
            </summary>
            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
              {contexts.map((context, idx) => (
                <div key={idx} className="p-2 bg-white rounded border border-gray-200">
                  <div className="font-medium">{context.source}</div>
                  <div className="text-gray-500 text-xs">
                    Relevance: {(Math.abs((1 - context.similarity)) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;