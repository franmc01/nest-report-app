import { Content, ContextPageSize } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content => {
  return {
    text: `Page ${currentPage.toString()} of  ${pageCount}`,
    alignment: 'right',
    margin: 16,
    style: {
      fontSize: 10,
      bold: true,
    },
  };
};
