import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PdfMakeService } from '../pdf-make/pdf-make.service';
import { geBasicReportTemplate } from '../templates/basic-report';
import { employmentLetterTemplateNormal } from '../templates/employment-report-normal';
import { employmentLetterTemplateById } from '../templates/employment-report-by-id';
import { getCountriesReportTemplate } from '../templates/countries-report';

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
    return this.pdfMakeService.createPdf(employmentLetterTemplateNormal());
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException();
    }

    return this.pdfMakeService.createPdf(
      employmentLetterTemplateById({
        employerName: 'Francisco Marin',
        employerPosition: 'Gerente de RRHH',
        employeeName: employee.name,
        employeePosition: employee.position,
        employeeStartDate: employee.start_date,
        employeeHours: employee.hours_per_day,
        employeeWorkSchedule: employee.work_schedule,
        employerCompany: 'Tucan Code Corp.',
      }),
    );
  }

  async getCountriesReport() {
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null,
        },
      },
    });
    return this.pdfMakeService.createPdf(
      getCountriesReportTemplate({
        countries,
      }),
    );
  }
}
