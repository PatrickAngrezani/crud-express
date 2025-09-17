import Redis from "ioredis";
import { ICacheProvider } from "./ICacheProvider";

export class RedisCacheProvider implements ICacheProvider {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      retryStrategy: (times: number) => Math.min(times * 50, 2000),
    });

    this.client.on("connect", () => {
      console.log("redis connected");
    });

    this.client.on("error", (err: any) => {
      console.error("redis connection error", err);
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl = 60): Promise<void> {
    await this.client.set(key, JSON.stringify(value), "EX", ttl);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
