import { Module } from '@nestjs/common';
import { PdfMakeService } from './pdf-make.service';

@Module({
  providers: [PdfMakeService],
  exports: [PdfMakeService],
})
export class PdfMakeModule {}
