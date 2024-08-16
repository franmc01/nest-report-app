import { Module } from '@nestjs/common';
import { InvoiceReportController } from './invoice-report.controller';
import { InvoiceReportService } from './invoice-report.service';
import { PdfMakeModule } from '../pdf-make/pdf-make.module';

@Module({
  controllers: [InvoiceReportController],
  providers: [InvoiceReportService],
  imports: [PdfMakeModule],
})
export class InvoiceReportModule {}
