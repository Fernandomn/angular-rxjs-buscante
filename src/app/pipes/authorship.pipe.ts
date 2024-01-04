import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authorship',
})
export class AuthorshipPipe implements PipeTransform {
  transform(authors: string[], ...args: unknown[]): string {
    if (authors) {
      return `${authors[0]}${
        authors.length > 1 ? ', +' + (authors.length - 1) : ''
      }`;
    }
    return '';
  }
}
