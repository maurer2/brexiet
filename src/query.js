import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const instagram = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
};


const url = 'https://api.instagram.com/v1/users/rexiecat/media/recent/?client_id=3bbd61a332384e66a46026c3dbbfaadc';

const getUserData = fetch(url);

getUserData.then((data) => {
  console.log(data);
});
