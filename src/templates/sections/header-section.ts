import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from '../../helpers/date-formatter';

interface HeaderSectionOptions {
  showLogo?: boolean;
  showDate?: boolean;
  title?: string;
  subtitle?: string;
}

const logo: Content = {
  image: 'src/templates/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const headerSection = ({
  showDate = true,
  showLogo = true,
  title = '',
  subtitle = '',
}: HeaderSectionOptions): Content => {
  const headerLogo: Content = showLogo ? logo : null;
  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            alignment: 'center',
            margin: [0, 15, 0, 0],
            bold: true,
            fontSize: 22,
          },
          {
            text: subtitle,
            alignment: 'center',
            margin: [0, 12, 0, 0],
            bold: true,
            fontSize: 14,
          },
        ],
      }
    : null;
  const headerDate: Content = showDate
    ? {
        text: `${DateFormatter.getDDMMMMYYYY(new Date())}`,
        alignment: 'right',
        margin: [0, 20, 20, 0],
        width: 120,
        fontSize: 10,
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
