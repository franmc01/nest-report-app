import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  basicPdf(@Res() response: Response) {
    response.setHeader('Content-Type', 'application/pdf');

    const pdfDoc = this.basicReportsService.basicPdf();
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('letter')
  employmentLetter(@Res() response: Response) {
    response.setHeader('Content-Type', 'application/pdf');
    const pdfDoc = this.basicReportsService.employmentLetter();
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
