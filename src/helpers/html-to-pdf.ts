import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

interface ContentReplacer {
  [key: string]: string;
}

export const getHtmlContent = (
  html: string,
  replacers: ContentReplacer = {},
) => {
  const { window } = new JSDOM();

  Object.entries(replacers).forEach(([key, value]) => {
    const keyTarget = `{{${key}}}`;
    const keyTarget2 = `{{ ${key} }}`;

    html = html.replaceAll(keyTarget, value).replaceAll(keyTarget2, value);
  });

  return htmlToPdfmake(html, {
    window,
  });
};
