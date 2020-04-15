import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const { PORT } = process.env;
const server = express();

server.use(morgan('combined'));

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Phone History Store is running on port ${PORT}`);
});

export default server;
