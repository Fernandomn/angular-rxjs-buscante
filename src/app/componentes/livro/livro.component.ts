import { Component, Input } from '@angular/core';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css'],
})
export class LivroComponent {
  @Input() livro: LivroVolumeInfo;
  modalAberto: boolean;

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
