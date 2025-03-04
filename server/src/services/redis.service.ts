// server/src/services/redis.service.ts
import { createClient } from 'redis';
import { IApplicationLifecycle } from '../interfaces/application-lifecycle.interface';

export interface IRedisService extends IApplicationLifecycle {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  delete(key: string): Promise<void>;
}

class RedisService implements IRedisService {
  private client;
  private isConnected: boolean = false;

  constructor(private redisUrl: string) {
    this.client = createClient({ url: redisUrl });
  }

  async connect(): Promise<void> {
    if (this.isConnected) return;

    try {
      await this.client.connect();
      this.isConnected = true;
      console.log('Redis client connected successfully');
    } catch (error) {
      console.error('Redis connection error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) return;

    try {
      await this.client.disconnect();
      this.isConnected = false;
      console.log('Redis client disconnected');
    } catch (error) {
      console.error('Redis disconnection error:', error);
      throw error;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Redis client not connected');
    }

    try {
      const serializedValue = JSON.stringify(value);
      if (ttlSeconds) {
        await this.client.set(key, serializedValue, { EX: ttlSeconds });
      } else {
        await this.client.set(key, serializedValue);
      }
    } catch (error) {
      console.error(`Error setting Redis key ${key}:`, error);
      throw error;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected) {
      throw new Error('Redis client not connected');
    }

    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) as T : null;
    } catch (error) {
      console.error(`Error getting Redis key ${key}:`, error);
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Redis client not connected');
    }

    try {
      await this.client.del(key);
    } catch (error) {
      console.error(`Error deleting Redis key ${key}:`, error);
      throw error;
    }
  }

  // Lifecycle methods
  async onStartup(): Promise<void> {
    try {
      console.log('Starting Redis service...');
      await this.connect();
      console.log('Redis service started successfully');
    } catch (error) {
      console.error('Redis service startup failed:', error);
      throw error;
    }
  }

  async onShutdown(): Promise<void> {
    try {
      console.log('Shutting down Redis service...');
      await this.disconnect();
      console.log('Redis service shutdown complete');
    } catch (error) {
      console.error('Redis service shutdown failed:', error);
      throw error;
    }
  }
}

export default RedisService;