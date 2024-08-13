import { StyleDictionary } from 'pdfmake/interfaces';

export const employmentLetterStyles: StyleDictionary = {
  header: {
    fontSize: 24,
    bold: true,
    alignment: 'center',
    marginBottom: 16,
    marginTop: 40,
  },
  paragraph: {
    marginBottom: 32,
    alignment: 'justify',
  },
  signature: {
    bold: true,
    marginTop: 32,
  },
  footer: {
    fontSize: 10,
    alignment: 'center',
    italics: true,
  },
};
