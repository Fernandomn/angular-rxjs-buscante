import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import {
  GoogleBooksSearchResult,
  Livro,
  Volume,
  VolumeInfo,
} from 'src/types/api-types';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: Livro[];
  searchField: string = '';
  subscription: Subscription;

  constructor(private bookService: BookService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  searchBooks(): void {
    this.subscription = this.bookService.search(this.searchField).subscribe({
      next: (result: Volume[]) => {
        this.listaLivros = this.formatBooks(result);
      },
      error: (error: HttpErrorResponse) => console.error(error),
      complete: () => console.log('Observable concluído'),
    });
  }

  private formatBooks(items: Volume[]): Livro[] {
    return [
      ...items.map((item) => ({
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
      })),
    ];
  }
}
