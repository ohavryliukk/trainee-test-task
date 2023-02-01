import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  reverseTextByFibonacci(file: Buffer) {
    const text = file.toString();
    const newText = [];
    const separateLines = text.split(/\r?\n|\r|\n/g);
    separateLines.unshift('');
    for (let i = 1; i < separateLines.length; i++) {
      if (this.isFibonacci(i)) {
        newText.push(this.reverseString(separateLines[i]));
        continue;
      }
      newText.push(separateLines[i]);
    }
    return newText.join('\r\n');
  }

  private reverseString(str: string) {
    let newString = '';
    for (let i = str.length - 1; i >= 0; i--) {
      newString += str[i];
    }
    return newString;
  }

  private isFibonacci(n: number) {
    return (
      this.isPerfectSquare(5 * n * n + 4) || this.isPerfectSquare(5 * n * n - 4)
    );
  }

  private isPerfectSquare(x: number) {
    if (Number.isInteger(Math.sqrt(x))) {
      return true;
    } else {
      return false;
    }
  }
}
