import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  Chef,
  RandomUserApiResponse,
  RandomUser,
} from '../models/chefs.interface';

@Injectable({
  providedIn: 'root',
})
export class ChefsService {
  private apiUrl = 'https://randomuser.me/api/?results=51&seed=consistent-seed';

  constructor(private http: HttpClient) {}

  getAllChefs(): Observable<Chef[]> {
    return this.http
      .get<RandomUserApiResponse>(this.apiUrl)
      .pipe(map((response) => response.results.map(this.mapToChef)));
  }

  getChef(id: string): Observable<Chef> {
    return this.getAllChefs().pipe(
      map((chefs: Chef[]) => chefs.find((chef: Chef) => chef.id === id)!)
    );
  }

  private mapToChef(chef: RandomUser): Chef {
    return {
      id: chef.id.value,
      name: `${chef.name.first} ${chef.name.last}`,
      avatar: chef.picture.large,
      reviews: [],
    };
  }
}
