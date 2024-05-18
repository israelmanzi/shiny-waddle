import express from 'express';
const app = express();
import { connectDB } from './db/connect';
import { notFound } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/error-handler';
import authRoutes from './routes/auth';
import mainRoutes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static('public'))
  .use('/api/v1/auth', authRoutes)
  .use('/api/v1/', mainRoutes)
  .use(notFound)
  .use(errorHandlerMiddleware);

const start_server = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server started on port ::${port}`));
  } catch (err) {
    console.log(err);
  }
};

start_server();
