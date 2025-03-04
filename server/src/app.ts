// server/src/app.ts
import express from 'express';
import cors from 'cors';
import DependencyContainer from './services/di.service';
import { ICacheService } from './interfaces/cache.interface';
import router from '#/routes/router.ts';

const app = express();
const PORT = process.env.PORT || 8905;

app.use(express.json());
app.use(cors());
app.use(router);

async function startServer() {
  try {
    const di = DependencyContainer.getInstance();
    const cacheService = di.get<ICacheService>('redis');

    // Connect to Redis and initialize cache
    await cacheService.connect();
    await cacheService.initializeCache();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('GitHub repository cache initialized in Redis');
    });

    // Graceful shutdown handler
    const shutdown = async () => {
      console.log('Shutting down server...');
      await cacheService.disconnect();
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();