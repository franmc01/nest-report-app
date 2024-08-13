import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const geBasicReportTemplate = (
  options: Omit<TDocumentDefinitions, 'content'> = {},
) => {
  const docDocumentation: TDocumentDefinitions = {
    content: ['Hello World'],
    ...options,
  };

  return docDocumentation;
};
