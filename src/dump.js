import rp from 'request-promise-native';
import fs from 'fs-extra';

const query = (url) => {
  const request = rp(url);

  return request
    .then(content => content)
    .catch((error) => {
      throw new Error('error', error);
    });
};

const dump = content => new Promise((resolve, reject) => {
  const newFile = fs.createWriteStream(`${__dirname}/../dump/dump.html`);

  newFile.on('error', () => {
    reject();
  });

  newFile.on('finish', () => {
    resolve('done');
  });

  newFile.write(content, 'utf8');
  newFile.end();
});

query('https://www.instagram.com/rexiecat/?hl=en')
  .then((content) => {
    dump(content)
      .then(() => {
        console.error('Finished');

        process.exit(0);
      })
      .catch(() => {
        process.exit(1);
      });
  })
  .catch(() => {
    process.exit(1);
  });
