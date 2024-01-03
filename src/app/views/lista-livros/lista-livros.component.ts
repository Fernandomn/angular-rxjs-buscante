import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { GoogleBooksSearchResult, Volume } from 'src/types/api-types';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: Volume[];
  searchField: string = '';
  subscription: Subscription;

  constructor(private bookService: BookService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  searchBooks(): void {
    this.subscription = this.bookService.search(this.searchField).subscribe({
      next: (result: GoogleBooksSearchResult) => {
        this.listaLivros = [...result.items];
      },
      error: (error: HttpErrorResponse) => console.error(error),
      complete: () => console.log('Observable concluído'),
    });
  }
}
