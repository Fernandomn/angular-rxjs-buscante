import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleBooksSearchResult } from '../../types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  search(searchValue: string): Observable<GoogleBooksSearchResult> {
    const params = new HttpParams().append('q', searchValue);

    return this.http.get<GoogleBooksSearchResult>(this.apiUrl, { params });
  }
}
