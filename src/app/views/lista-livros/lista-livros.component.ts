import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  EMPTY,
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { listAnimationTrigger } from 'src/app/animations/animations';
import { TYPEAHEAD_DELAY } from 'src/app/constants/constants';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info';
import { BookService } from 'src/app/services/book.service';
import { GoogleBooksSearchResult, Volume } from 'src/types/interfaces';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
  animations:[listAnimationTrigger]
})
export class ListaLivrosComponent implements OnInit {
  searchField = new FormControl();
  errorMessage = '';
  foundBooks$: Observable<LivroVolumeInfo[]>;
  totalItems: number;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.foundBooks$ = this.searchField.valueChanges.pipe(
      filter((typedValue: string) => typedValue.length >= 2),
      debounceTime(TYPEAHEAD_DELAY),
      distinctUntilChanged(),
      switchMap((typedValue: string) => this.bookService.search(typedValue)),
      tap(
        (result: GoogleBooksSearchResult) =>
          (this.totalItems = result.totalItems)
      ),
      map((result: GoogleBooksSearchResult) => result.items ?? []),
      map((result: Volume[]) => this.formatBooks(result)),
      catchError((error) => {
        console.error('erro:', error);
        // this.errorMessage = 'Ops, ocorreu um erro. Recarregue a aplicação';
        // return EMPTY;
        return throwError(
          () =>
            new Error(
              (this.errorMessage =
                'Ops, ocorreu um erro. Recarregue a aplicação')
            )
        );
      })
    );
  }

  private formatBooks(items: Volume[]): LivroVolumeInfo[] {
    return [...items.map((item) => new LivroVolumeInfo(item))];
  }
}
