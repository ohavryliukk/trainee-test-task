import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import { LoggerService } from 'src/logger/logger.service';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(
    private fileService: FileService,
    private loggerService: LoggerService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res) {
    this.loggerService.logger.log('REST_operation', 'Called POST method');
    const reversedText = await this.fileService.reverseTextByFibonacci(file);
    writeFileSync('./src/file/files/newFile.txt', reversedText);
    return res.download('./src/file/files/newFile.txt');
  }
}
