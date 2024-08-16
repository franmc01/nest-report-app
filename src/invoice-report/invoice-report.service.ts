import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PdfMakeService } from '../pdf-make/pdf-make.service';
import { orderByIdReportTemplate } from '../templates/order-by-id';

@Injectable()
export class InvoiceReportService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly pdfMakeService: PdfMakeService) {
    super();
  }
  async getOrderByIdReport(orderId: string) {
    console.log({ orderId });
    return this.pdfMakeService.createPdf(orderByIdReportTemplate());
  }
}
