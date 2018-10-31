import remark from 'remark';
import reactRenderer from 'remark-react';

export default function (content: string) {
  let parseContent = content
    .replace(/\n>[\s\S]*?\n\n/g,
      // tslint:disable-next-line:align
      v => v.replace(/\n[^\n](?!>)/g, v1 => v1.replace(/\n(?!>)/, '\n>')));

  if (parseContent[0] === '>') {
    const index = parseContent.indexOf('\n\n');
    if (index === -1) {
      parseContent = parseContent.replace(/\n[^\n](?!>)/g,
        // tslint:disable-next-line:align
        v1 => v1.replace(/\n(?!>)/, '\n>'));
    } else {
      const substr = parseContent.substr(0, index);
      parseContent = substr.replace(/\n[^\n](?!>)/g, v1 =>
        v1.replace(/\n(?!>)/, '\n>')) +
        parseContent.substr(index + 1, parseContent.length);
    }
  }
  parseContent = parseContent.replace(/发言：\*\*\n/g, '发言：**\n\n');

  return remark().use(reactRenderer).processSync(parseContent).contents
}
