import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { GoogleBooksSearchResult, Volume } from '../../types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  search(value: string): Observable<Volume[]> {
    const params = new HttpParams().append('q', value);

    return this.http
      .get<GoogleBooksSearchResult>(this.apiUrl, { params })
      .pipe(map((result: GoogleBooksSearchResult) => result.items));
  }
}
