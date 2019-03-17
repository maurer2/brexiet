import Instagram from 'node-instagram';
import dotenv from 'dotenv';

dotenv.config();

const instagram = new Instagram({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
});

const getUserData = instagram.get('users/rexiecat');

getUserData.then((data) => {
  console.log(data);
});
