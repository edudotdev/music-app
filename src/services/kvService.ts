import { redis } from '@/lib/redis';

export const kvService = {
  async set<T>(key: string, value: T, expireInSeconds?: number): Promise<void> {
    try {
      if (expireInSeconds) {
        await redis.set(key, value, { ex: expireInSeconds });
      } else {
        await redis.set(key, value);
      }
    } catch (error) {
      console.error(`[Redis Service Error] Failed to set key "${key}":`, error);
      throw new Error('Database write operation failed');
    }
  },

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get<T>(key);
      return data;
    } catch (error) {
      console.error(`[Redis Service Error] Failed to get key "${key}":`, error);
      throw new Error('Database read operation failed');
    }
  },

  async delete(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      console.error(`[Redis Service Error] Failed to delete key "${key}":`, error);
      throw new Error('Database delete operation failed');
    }
  },
};