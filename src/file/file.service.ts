import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoggerService } from 'src/logger/logger.service';
import { File } from './file.model';

@Injectable()
export class FileService {
  constructor(
    @InjectModel('File') private readonly fileModel: Model<File>,
    private loggerService: LoggerService,
  ) {}

  async reverseTextByFibonacci(file: Express.Multer.File) {
    try {
      this.loggerService.logger.log(
        'info',
        'Started reverseTextByFibonacci() function',
      );
      const text = file.buffer.toString();
      const newText = [];
      const separateLines = text.split(/\r?\n|\r|\n/g);
      separateLines.unshift('');
      //throw new Error('Deliberate mistake');
      for (let i = 1; i < separateLines.length; i++) {
        if (this.isFibonacci(i)) {
          newText.push(this.reverseString(separateLines[i]));
          continue;
        }
        newText.push(separateLines[i]);
      }
      const reversedText = newText.join('\r\n');
      const newFile = new this.fileModel({
        fileName: file.originalname,
        encoding: file.encoding,
        date: new Date(),
        reversedText: reversedText,
      });
      await newFile.save();
      this.loggerService.logger.log(
        'success',
        'The text was successfully reversed',
      );
      return reversedText;
    } catch (error) {
      this.loggerService.logger.log('error', error.message);
    }
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
