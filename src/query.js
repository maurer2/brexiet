import rp from 'request-promise-native';
import fs from 'fs-extra';

// import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// dotenv.config();

// const instagram = {
//  clientId: process.env.CLIENT_ID,
//  clientSecret: process.env.CLIENT_SECRET,
//  accessToken: process.env.ACCESS_TOKEN,
// };

// const url = 'https://api.instagram.com/v1/users/rexiecat/media/recent/?client_id=3bbd61a332384e66a46026c3dbbfaadc';

const queryMock = () => {
  const request = fs.readFile('./dump/dump.html');

  return request;
};

const queryServer = (url) => {
  const request = rp(url);

  return request
    .then(content => content)
    .catch((error) => {
      throw new Error('error', error);
    });
};

export default (process.env.NODE_ENV === 'dev') ? queryMock : queryServer;
