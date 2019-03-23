import rp from 'request-promise-native';
import { JSDOM } from 'jsdom';

const query = (url) => {
  const request = rp(url);

  return request
    .then(content => content)
    .catch((error) => {
      throw new Error('error', error);
    });
};

const createDocument = (htmlString) => {
  const document = new JSDOM(htmlString);

  return document;
};

const findScriptTag = (virtualDocument) => {
  const tags = Array.from(virtualDocument.window.document.querySelectorAll('script'));
  const searchString = 'profile_pic_url';

  const tagWithImages = tags.find((element) => {
    const elementAsString = element.innerHTML;

    return elementAsString.includes(searchString);
  });

  return tagWithImages;
};

query('https://www.instagram.com/rexiecat/?hl=en')
  .then((content) => {
    const virtualDocument = createDocument(content);
    const scriptTag = findScriptTag(virtualDocument);

    const scriptTagContent = scriptTag.innerHTML;

    // remove invalid semicolon and leading string
    let validScriptTagContent = scriptTagContent.replace('window._sharedData = ', '');
    validScriptTagContent = validScriptTagContent.slice(0, -1);

    const parsedScritpTag = JSON.parse(validScriptTagContent);

    console.log(parsedScritpTag);

    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
