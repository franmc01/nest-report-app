import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-report')
  async getHtmlReport(@Res() response: Response) {
    const pdf = await this.extraReportsService.getHtmlReport();
    response.setHeader('Content-Type', 'application/pdf');
    pdf.info.Title = 'HTML-Report';
    pdf.pipe(response);
    pdf.end();
  }

  @Get('html-report-2')
  async getHtmlReport2(@Res() response: Response) {
    const pdf = await this.extraReportsService.getHtmlReport2();
    response.setHeader('Content-Type', 'application/pdf');
    pdf.info.Title = 'HTML-Report';
    pdf.pipe(response);
    pdf.end();
  }

  @Get('html-report-3')
  async getHtmlReport3(@Res() response: Response) {
    const pdf = await this.extraReportsService.getHtmlReport3();
    response.setHeader('Content-Type', 'application/pdf');
    pdf.info.Title = 'HTML-Report';
    pdf.pipe(response);
    pdf.end();
  }
}
