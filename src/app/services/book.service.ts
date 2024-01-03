import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleBooksSearchResult } from '../../types/api-types';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  search(value: string): Observable<GoogleBooksSearchResult> {
    const params = new HttpParams().append('q', value);

    return this.http.get<GoogleBooksSearchResult>(this.apiUrl, { params });
  }
}
