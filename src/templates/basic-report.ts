import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

export const geBasicReportTemplate = (options: BufferOptions = {}) => {
  const docDocumentation: TDocumentDefinitions = {
    content: ['Hello World'],
    ...options,
  };

  return docDocumentation;
};
