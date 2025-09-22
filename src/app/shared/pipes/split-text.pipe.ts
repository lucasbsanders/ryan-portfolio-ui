import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitText',
})
export class SplitTextPipe implements PipeTransform {
  transform(text: string | undefined): string[] {
    if (!text) return [''];
    const parts: string[] = [];
    let startIdx = 0;
    let endIdx = text.indexOf('<col>');

    do {
      endIdx = text.indexOf('<col>', startIdx);
      endIdx = endIdx > -1 ? endIdx : text.length;
      parts.push(text.substring(startIdx, endIdx).trim());
      startIdx = endIdx + 5;
    } while (endIdx < text.length && startIdx < text.length);

    return parts;
  }
}
