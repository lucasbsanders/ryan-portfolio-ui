import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitText'
})
export class SplitTextPipe implements PipeTransform {

  transform(text: string, numPieces: number): string[] {
    if (numPieces <= 1) return [text];
    const parts: string[] = [];
    const approxLength = text.length / numPieces;

    for (var curr = 0; numPieces > 0; numPieces--) {
      const nextSpace = text.indexOf(' ', curr + approxLength);
      const splitEnd = nextSpace > 0 ? nextSpace : text.length;
      parts.push(text.substring(curr, splitEnd));
      curr = splitEnd;
    }

    return parts;
  }

}
