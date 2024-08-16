import { Controller, Get, Param, Res } from '@nestjs/common';
import { InvoiceReportService } from './invoice-report.service';
import { Response } from 'express';

@Controller('invoice-report')
export class InvoiceReportController {
  constructor(private readonly invoiceReportService: InvoiceReportService) {}

  @Get('/:orderId')
  async getOrderReport(
    @Res() response: Response,
    @Param('orderId') orderId: string,
  ) {
    const pdfDoc = await this.invoiceReportService.getOrderByIdReport(orderId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Order-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
