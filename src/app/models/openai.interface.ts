export interface OpenAIResponse {
  choices: { message: { content: string } }[];
}

export interface OpenAIRequest {
  messages: message[];
  model: string;
  max_tokens: number;
  temperature: number;
}

export interface message{
  content: string;
  role: string;
}