import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { message, OpenAIRequest, OpenAIResponse } from '../models/openai.interface';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private apiUrl = environment.azureOpenAiEndpoint;
  private apiKey = environment.azureOpenAiApiKey;
  private apiVersion = '2024-05-01-preview';
  private deployment = 'summariser';

  constructor(private http: HttpClient) {}

  getCompletion(messages: message[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': `${this.apiKey}`
    });

    const body: OpenAIRequest = {
      messages: messages,
      model: this.deployment,
      max_tokens: 100,
      temperature: 0.2,
    };

    return this.http.post<OpenAIResponse>(
      `${this.apiUrl}/openai/deployments/${this.deployment}/chat/completions?api-version=${this.apiVersion}`, 
      body, 
      { headers }
    )
  }
}