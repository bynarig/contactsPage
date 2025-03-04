// server/src/interfaces/application-lifecycle.interface.ts
export interface IApplicationLifecycle {
  /**
   * Initialize the service during application startup
   */
  onStartup(): Promise<void>;

  /**
   * Clean up resources during application shutdown
   */
  onShutdown(): Promise<void>;
}