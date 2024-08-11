import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';

import router from './router';
import { protectMiddleware } from './modules/auth';
import { createUser, signIn } from './handlers/user';

const app = express();
const port = process.env.NODE_DOCKER_PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, response) => {
  response.status(200);
  response.send('Hello World!');
});

app.use('/api', protectMiddleware, router);
app.post('/user', createUser);
app.post('/signin', signIn);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
