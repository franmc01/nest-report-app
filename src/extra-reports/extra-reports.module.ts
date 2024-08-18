import { Module } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { ExtraReportsController } from './extra-reports.controller';
import { PdfMakeModule } from '../pdf-make/pdf-make.module';

@Module({
  controllers: [ExtraReportsController],
  providers: [ExtraReportsService],
  imports: [PdfMakeModule],
})
export class ExtraReportsModule {}
