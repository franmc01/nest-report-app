import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PdfMakeModule } from './pdf-make/pdf-make.module';
import { InvoiceReportModule } from './invoice-report/invoice-report.module';
import { ExtraReportsModule } from './extra-reports/extra-reports.module';

@Module({
  imports: [BasicReportsModule, PdfMakeModule, InvoiceReportModule, ExtraReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
