import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitText',
})
export class SplitTextPipe implements PipeTransform {
  transform(text: string): string[] {
    const parts: string[] = [];
    let startIdx = 0;
    let endIdx = text.indexOf('<col>');

    do {
      endIdx = text.indexOf('<col>', startIdx);
      endIdx = endIdx > -1 ? endIdx : text.length;
      parts.push(text.substring(startIdx, endIdx).trim());
      startIdx = endIdx + 5;
    } while (endIdx < text.length && startIdx < text.length);

    // for (var curr = 0; numPieces > 0; numPieces--) {
    //   const nextSpace = text.indexOf('<col>', curr);
    //   const splitEnd = nextSpace > -1 ? nextSpace : text.length;
    //   parts.push(text.substring(curr, splitEnd).trim());
    //   curr = splitEnd + 5;
    // }

    return parts;

    // split by space appox in center

    // const approxLength = text.length / numPieces;

    // for (var curr = 0; numPieces > 0; numPieces--) {
    //   const nextSpace = text.indexOf(' ', curr + approxLength);
    //   const splitEnd = nextSpace > 0 ? nextSpace : text.length;
    //   parts.push(text.substring(curr, splitEnd).trim());
    //   curr = splitEnd;
    // }

    // return parts;
  }
}
