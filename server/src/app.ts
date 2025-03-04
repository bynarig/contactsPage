// server/src/app.ts
import express from 'express';
import cors from 'cors';
import router from '#/routes/router.ts';
import ApplicationStartupService from './services/application-startup.service';

const app = express();
const PORT = process.env.PORT || 8905;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',  // More permissive for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use(router);

// Start server
async function startServer() {
  try {
    // Initialize application services
    const startupService = ApplicationStartupService.getInstance();
    await startupService.initialize();

    // Start Express server
    app.listen(process.env.PORT | 8905, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();