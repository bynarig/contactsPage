// server/src/services/application-startup.service.ts
import DependencyContainer from './di.service';
import { ICacheService } from '../interfaces/cache.interface';
import { IApplicationLifecycle } from '../interfaces/application-lifecycle.interface';

class ApplicationStartupService {
  private static instance: ApplicationStartupService;
  private di: DependencyContainer;
  private lifecycleServices: IApplicationLifecycle[] = [];

  private constructor() {
    this.di = DependencyContainer.getInstance();
    this.registerLifecycleServices();
  }

  static getInstance(): ApplicationStartupService {
    if (!ApplicationStartupService.instance) {
      ApplicationStartupService.instance = new ApplicationStartupService();
    }
    return ApplicationStartupService.instance;
  }

  private registerLifecycleServices(): void {
    // Add all services that implement IApplicationLifecycle
    const redisService = this.di.get<ICacheService>('redis');
    this.lifecycleServices.push(redisService);

    // Additional services can be added here in the future
  }

  async initialize(): Promise<void> {
    console.log('Initializing application...');

    try {
      // Initialize all lifecycle services
      for (const service of this.lifecycleServices) {
        await service.onStartup();
      }

      this.registerShutdownHandlers();
      console.log('Application initialization complete');
    } catch (error) {
      console.error('Application initialization failed:', error);
      throw error;
    }
  }

  private registerShutdownHandlers(): void {
    const shutdown = async () => {
      console.log('Application shutting down...');

      try {
        // Shutdown all lifecycle services in reverse order
        for (let i = this.lifecycleServices.length - 1; i >= 0; i--) {
          await this.lifecycleServices[i].onShutdown();
        }

        console.log('Application shutdown complete');
        process.exit(0);
      } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
      }
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  }
}

export default ApplicationStartupService;