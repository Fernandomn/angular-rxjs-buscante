import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { TYPEAHEAD_DELAY } from 'src/app/constants/constants';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info';
import { BookService } from 'src/app/services/book.service';
import { Volume } from 'src/types/interfaces';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnInit {
  searchField = new FormControl();
  foundBooks$: Observable<LivroVolumeInfo[]>;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.foundBooks$ = this.searchField.valueChanges.pipe(
      filter((typedValue: string) => typedValue.length >= 2),
      debounceTime(TYPEAHEAD_DELAY),
      distinctUntilChanged(),
      switchMap((typedValue: string) => this.bookService.search(typedValue)),
      map((result: Volume[]) => (result ? this.formatBooks(result) : null))
    );
  }

  private formatBooks(items: Volume[]): LivroVolumeInfo[] {
    return [...items.map((item) => new LivroVolumeInfo(item))];
  }
}
