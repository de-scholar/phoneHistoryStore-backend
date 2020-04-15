import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import apiRouter from './routes/index';

dotenv.config();

const { PORT } = process.env;
const server = express();

server.use(morgan('combined'));
server.use(apiRouter);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Phone History Store is running on port ${PORT}`);
});

export default server;
