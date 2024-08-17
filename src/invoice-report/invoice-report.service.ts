import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PdfMakeService } from '../pdf-make/pdf-make.service';
import { orderByIdReportTemplate } from '../templates/order-by-id';
import { basicSvgTemplate } from '../templates/basic-svg-template';

@Injectable()
export class InvoiceReportService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly pdfMakeService: PdfMakeService) {
    super();
  }
  async getOrderByIdReport(orderId: number) {
    const order: any = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException();
    }
    return this.pdfMakeService.createPdf(
      orderByIdReportTemplate({ data: order }),
    );
  }

  async getSvgChart() {
    const pdf = await basicSvgTemplate();
    return this.pdfMakeService.createPdf(pdf);
  }
}
