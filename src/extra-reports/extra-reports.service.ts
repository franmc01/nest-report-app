import { Injectable } from '@nestjs/common';
import { PdfMakeService } from '../pdf-make/pdf-make.service';
import fs from 'fs';

import { getHtmlContent } from '../helpers/html-to-pdf';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from '../templates/sections/header-section';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly pdfMakeService: PdfMakeService) {}
  async getHtmlReport() {
    const html = fs.readFileSync('src/templates/html/basic-01.html', 'utf-8');
    const content = getHtmlContent(html);

    const docDefinitions: TDocumentDefinitions = {
      header: headerSection({
        showLogo: true,
        showDate: true,
      }),
      content,
    };

    return this.pdfMakeService.createPdf(docDefinitions);
  }
}
