export interface OpenAIResponse {
  choices: { message: { content: string } }[];
}

export interface OpenAIRequest {
  messages: any[];
  model: string;
  max_tokens: number;
  temperature: number;
}
