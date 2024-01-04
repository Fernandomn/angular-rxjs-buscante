import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Subscription, map, switchMap, takeUntil } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info';
import { BookService } from 'src/app/services/book.service';
import { Volume } from 'src/types/interfaces';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: LivroVolumeInfo[];
  searchField = new FormControl();
  subscription: Subscription;

  onDestroy$ = new Subject<boolean>();
  foundBooks$ = this.searchField.valueChanges.pipe(
    takeUntil(this.onDestroy$),
    switchMap((typedValue: string) => this.bookService.search(typedValue)),
    map((result: Volume[]) => {
      console.log('requisiçoes ao servidor');
      this.listaLivros = this.formatBooks(result);
    })
  );

  constructor(private bookService: BookService) {
    this.onDestroy$.next(false);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  // searchBooks(): void {
  //   this.subscription = this.bookService.search(this.searchField).subscribe({
  //     next: (result: Volume[]) => {
  //       console.log('requisiçoes ao servidor');
  //       this.listaLivros = this.formatBooks(result);
  //     },
  //     error: (error: HttpErrorResponse) => console.error(error),
  //   });
  // }

  private formatBooks(items: Volume[]): LivroVolumeInfo[] {
    return [...items.map((item) => new LivroVolumeInfo(item))];
  }
}
