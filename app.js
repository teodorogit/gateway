import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import loadServices from './src/api/index.js';

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS
app.use(helmet()); // Add security headers
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information

loadServices(app);

app.use((_req, res) => {
  res.status(404).json({
    code: 404,
    status: "Error",
    message: "Sorry, this route doesn't exist :<.",
    data: null,
  });
});

export default app;