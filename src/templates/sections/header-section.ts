import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from '../../helpers/date-formatter';

interface HeaderSectionOptions {
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: 'src/templates/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const headerSection = ({
  showDate = false,
  showLogo = false,
}: HeaderSectionOptions): Content => {
  return {
    columns: [
      showLogo ? logo : null,
      showDate
        ? {
            text: `${DateFormatter.getDDMMMMYYYY(new Date())}`,
            alignment: 'right',
            margin: [0, 20, 20, 0],
          }
        : null,
    ],
  };
};
