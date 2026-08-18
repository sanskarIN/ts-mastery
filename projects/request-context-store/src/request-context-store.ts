import { AsyncLocalStorage } from "node:async_hooks";

export interface RequestContext {
  readonly correlationId: string;
  readonly requestId?: string;
}

export class RequestContextStore {
  private readonly storage = new AsyncLocalStorage<RequestContext>();

  run<T>(context: RequestContext, callback: () => T): T {
    if (!context.correlationId.trim()) {
      throw new Error("correlationId must not be empty");
    }
    return this.storage.run(context, callback);
  }

  current(): RequestContext {
    const context = this.storage.getStore();
    if (!context) {
      throw new Error("request context is not available");
    }
    return context;
  }

  optional(): RequestContext | undefined {
    return this.storage.getStore();
  }
}
