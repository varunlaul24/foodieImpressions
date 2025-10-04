import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ContentItem, FoundryApiRequest, FoundryApiResponse, message, OutputItem } from '../models/openai.interface';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  private proxyUrl = '/api/ai/responses';

  constructor(private http: HttpClient) {}

  getCompletion(messages: message[]): Observable<string> {
    const body: FoundryApiRequest = { input: messages, model: 'gpt-5-mini', max_output_tokens: 500 };
    return this.http.post<any>(this.proxyUrl, body).pipe(map(res => this.parseResponseToText(res)));
  }

  private parseResponseToText(res: FoundryApiResponse): string {
    if (!res?.output || !Array.isArray(res.output)) return '';
    const messageOutputs = res.output.filter((o: OutputItem) => o.type === 'message');
    const texts = messageOutputs.map((msg: OutputItem) => {
      if (!Array.isArray(msg.content)) return '';
      return msg.content
        .filter((c: ContentItem) => c.type === 'output_text' && typeof c.text === 'string')
        .map((c: ContentItem) => c.text)
        .join('');
    });
    return texts.join('\n').trim();
  }
}
