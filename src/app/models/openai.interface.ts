export interface FoundryApiRequest {
  input: message[];
  model: string;
  max_output_tokens: number;
}

export interface message {
  content: string;
  role: string;
}

export interface FoundryApiResponse {
  id: string;
  status: string;
  model: string;
  output: OutputItem[];
  usage?: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
}

export interface OutputItem {
  id: string;
  type: string;
  role?: string;
  content: ContentItem[];
}

export interface ContentItem {
  type: string;
  text: string;
}