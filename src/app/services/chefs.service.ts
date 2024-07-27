import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chef } from '../models/chefs.interface';

@Injectable({
  providedIn: 'root'
})

export class ChefsService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/users';

  constructor(private http: HttpClient) {}

  getAllChefs(): Observable<Chef[]> {
    return this.http.get<Chef[]>(this.apiUrl);
  }

  getChef(id: string): Observable<Chef> {
    return this.http.get<Chef>(`${this.apiUrl}/${id}`);
  }
}
