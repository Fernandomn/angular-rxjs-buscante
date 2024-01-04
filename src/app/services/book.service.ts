import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { GoogleBooksSearchResult, Volume } from '../../types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  search(searchValue: string): Observable<Volume[]> {
    if (!searchValue) {
      return of(null);
    }

    const params = new HttpParams().append('q', searchValue);

    return this.http.get<GoogleBooksSearchResult>(this.apiUrl, { params }).pipe(
      map((result: GoogleBooksSearchResult) => result.items),
      catchError((error) => {
        console.error('Erro na busca:', error);
        return of(null);
      })
    );
  }
}
