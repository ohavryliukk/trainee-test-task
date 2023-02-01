import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res) {
    const reversedText = this.fileService.reverseTextByFibonacci(file.buffer);
    writeFileSync('./src/file/files/newFile.txt', reversedText);
    return res.download('./src/file/files/newFile.txt');
  }
}
