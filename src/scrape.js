import { JSDOM } from 'jsdom';
import query from './query';

const url = 'https://www.instagram.com/rexiecat/?hl=en';

const createDocument = htmlString => new JSDOM(htmlString);

const findScriptTag = (virtualDocument) => {
  const tags = Array.from(virtualDocument.window.document.querySelectorAll('script'));
  const searchString = 'profile_pic_url';

  const tagWithImages = tags.find((element) => {
    const elementAsString = element.innerHTML;

    return elementAsString.includes(searchString);
  });

  return tagWithImages;
};

const getValidJson = (textString) => {
  const validScriptTagContent = textString
    .replace('window._sharedData = ', '')
    .slice(0, -1);

  return JSON.parse(validScriptTagContent);
};

query(url)
  .then((content) => {
    const virtualDocument = createDocument(content);
    const scriptTag = findScriptTag(virtualDocument);

    if (scriptTag === undefined) {
      throw new Error();
    }

    const extractedJson = getValidJson(scriptTag.innerHTML);

    console.log(extractedJson);

    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
