export interface SimpleRedis {
  get(key: string): Promise<string | undefined | null>;
  set(key: string, value: string, options?: { expiration?: Date }): Promise<unknown>;
}
