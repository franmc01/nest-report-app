import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { PdfMakeModule } from '../pdf-make/pdf-make.module';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService],
  imports: [PdfMakeModule],
})
export class BasicReportsModule {}
