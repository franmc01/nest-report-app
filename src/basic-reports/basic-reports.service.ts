import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PdfMakeService } from '../pdf-make/pdf-make.service';
import { geBasicReportTemplate } from '../templates/basic-report';
import { employmentLetterTemplate } from '../templates/employment-report';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly pdfMakeService: PdfMakeService) {
    super();
  }

  basicPdf() {
    return this.pdfMakeService.createPdf(geBasicReportTemplate());
  }

  employmentLetter() {
    return this.pdfMakeService.createPdf(employmentLetterTemplate());
  }
}
