import { Controller, Get, Param, Res } from '@nestjs/common';
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

  @Get('letter/:employeeId')
  async employmentLetterById(
    @Res() response: Response,
    @Param('employeeId') employeeId: string,
  ) {
    response.setHeader('Content-Type', 'application/pdf');
    const pdfDoc =
      await this.basicReportsService.employmentLetterById(+employeeId);
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries')
  async getCountriesReport(@Res() response: Response) {
    response.setHeader('Content-Type', 'application/pdf');
    const pdfDoc = await this.basicReportsService.getCountriesReport();
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
