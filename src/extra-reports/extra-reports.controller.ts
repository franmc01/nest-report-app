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
}
