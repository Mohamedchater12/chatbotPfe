export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  response: string;
  augmentedQuery: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Document {
  filename: string;
  path: string;
  indexed: boolean;
  size: number;
}

export interface Context {
  content: string;
  source: string;
  chunk_id: string;
  similarity: number;
}

export interface DocumentsResponse {
  indexed_documents: string[];
  folder_documents: Document[];
}

export interface UploadSuccessCallback {
  (): void;
}

export interface RefreshTriggerProp {
  refreshTrigger: number;
}

export interface OnUploadSuccessProp {
  onUploadSuccess: UploadSuccessCallback;
}