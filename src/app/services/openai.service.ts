import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 

const environment = {
  azureOpenAiEndpoint: 'reviews-summarizer',
  azureOpenAiApiKey: '3b0fef1359824f6b976a24b8f9ae423b'
};

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private apiUrl = 'https://reviews-summarizer.openai.azure.com';
  private apiKey = environment.azureOpenAiApiKey;
  private apiVersion = '2024-05-01-preview';
  private deployment = 'summariser';

  constructor(private http: HttpClient) {}

  getCompletion(messages: any[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': `${this.apiKey}`
    });

    const body = {
      messages: messages,
      model: this.deployment
    };

    return this.http.post(`${this.apiUrl}/openai/deployments/${this.deployment}/chat/completions?api-version=${this.apiVersion}`, body, { headers });
  }
}