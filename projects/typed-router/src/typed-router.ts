export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RouteRequest<Body = unknown> {
  readonly method: HttpMethod;
  readonly path: string;
  readonly body: Body;
}

export interface RouteResponse<Body = unknown> {
  readonly status: number;
  readonly body: Body;
}

export type RouteHandler<Context, Body = unknown> = (
  request: RouteRequest<Body>,
  context: Context,
) => Promise<RouteResponse> | RouteResponse;

export class TypedRouter<Context> {
  private readonly routes = new Map<string, RouteHandler<Context>>();

  register<Body = unknown>(
    method: HttpMethod,
    path: string,
    handler: RouteHandler<Context, Body>,
  ): void {
    const key = this.key(method, path);
    if (this.routes.has(key)) {
      throw new Error(`route already registered: ${method} ${path}`);
    }
    this.routes.set(key, handler as RouteHandler<Context>);
  }

  async dispatch(
    request: RouteRequest,
    context: Context,
  ): Promise<RouteResponse> {
    const handler = this.routes.get(this.key(request.method, request.path));
    if (!handler) {
      return { status: 404, body: { error: "NOT_FOUND" } };
    }
    return handler(request, context);
  }

  get size(): number {
    return this.routes.size;
  }

  private key(method: HttpMethod, path: string): string {
    if (!path.startsWith("/")) {
      throw new Error("route paths must start with /");
    }
    return `${method} ${path}`;
  }
}
