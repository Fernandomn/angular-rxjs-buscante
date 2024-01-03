import { Component } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { GoogleBooksSearchResult } from 'src/types/api-types';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  listaLivros: [];
  searchField: string = '';

  constructor(private bookService: BookService) {}

  searchBooks(): void {
    this.bookService
      .search(this.searchField)
      .subscribe((result: GoogleBooksSearchResult) => console.log(result));
  }
}
