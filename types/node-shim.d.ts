declare class Buffer extends Uint8Array {
  static from(data: string | ArrayBuffer | ArrayLike<number>, encoding?: string): Buffer;
  static concat(list: Buffer[]): Buffer;
  toString(encoding?: string): string;
}

declare module 'crypto' {
  export function randomUUID(): string;
}

declare module 'http' {
  import { EventEmitter } from 'events';

  interface IncomingMessage extends EventEmitter {
    method?: string;
    url?: string;
    headers: Record<string, string | string[] | undefined>;
    [Symbol.asyncIterator](): AsyncIterableIterator<string | Buffer>;
  }

  interface ServerResponse extends EventEmitter {
    writeHead(statusCode: number, headers?: Record<string, string>): this;
    end(data?: string | Buffer): void;
  }

  type RequestListener = (req: IncomingMessage, res: ServerResponse) => void;

  class Server extends EventEmitter {
    listen(port: number, callback?: () => void): this;
    close(callback?: () => void): this;
    address(): { port: number } | string | null;
  }

  function createServer(listener: RequestListener): Server;

  export { IncomingMessage, ServerResponse, Server, RequestListener, createServer };
}

declare module 'url' {
  export class URL {
    constructor(input: string, base?: string);
    readonly href: string;
    readonly protocol: string;
    readonly pathname: string;
    readonly search: string;
    readonly searchParams: URLSearchParams;
  }
  export class URLSearchParams implements Iterable<[string, string]> {
    constructor(init?: Record<string, string> | string);
    entries(): IterableIterator<[string, string]>;
    [Symbol.iterator](): IterableIterator<[string, string]>;
    get(name: string): string | null;
    set(name: string, value: string): void;
  }
}

declare module 'node:test' {
  export interface TestContext {
    after(fn: () => void | Promise<void>): void;
  }
  export type TestFn = (context: TestContext) => void | Promise<void>;
  export default function test(name: string, fn: TestFn): Promise<void>;
}

declare module 'node:assert/strict' {
  export function equal(actual: unknown, expected: unknown, message?: string): void;
  export function ok(value: unknown, message?: string): void;
  export function match(actual: string, expected: RegExp, message?: string): void;
}

declare module 'node:net' {
  export interface AddressInfo {
    address: string;
    family: string;
    port: number;
  }
}

declare module 'events' {
  class EventEmitter {
    on(event: string | symbol, listener: (...args: unknown[]) => void): this;
    emit(event: string | symbol, ...args: unknown[]): boolean;
  }
  export { EventEmitter };
}

declare function fetch(
  input: string,
  init?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  }
): Promise<{
  status: number;
  json<T = unknown>(): Promise<T>;
  text(): Promise<string>;
}>;

declare const process: {
  env: Record<string, string | undefined>;
};
