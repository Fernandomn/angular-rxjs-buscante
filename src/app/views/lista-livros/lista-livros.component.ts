import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
    });
  }

  private formatBooks(items: Volume[]): LivroVolumeInfo[] {
    return [...items.map((item) => new LivroVolumeInfo(item))];
  }
}
