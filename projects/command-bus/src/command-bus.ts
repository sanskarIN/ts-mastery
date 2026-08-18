export type CommandCatalog = Record<string, { input: unknown; output: unknown }>;

type AnyHandler = (input: unknown) => unknown | Promise<unknown>;

export class CommandBus<Catalog extends CommandCatalog> {
  private readonly handlers = new Map<keyof Catalog, AnyHandler>();

  register<Name extends keyof Catalog>(
    name: Name,
    handler: (
      input: Catalog[Name]["input"],
    ) => Catalog[Name]["output"] | Promise<Catalog[Name]["output"]>,
  ): () => void {
    if (this.handlers.has(name)) {
      throw new Error(`handler already registered for ${String(name)}`);
    }

    this.handlers.set(name, handler as unknown as AnyHandler);
    return () => {
      this.handlers.delete(name);
    };
  }

  async execute<Name extends keyof Catalog>(
    name: Name,
    input: Catalog[Name]["input"],
  ): Promise<Catalog[Name]["output"]> {
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(`no handler registered for ${String(name)}`);
    }

    return (await handler(input)) as Catalog[Name]["output"];
  }

  hasHandler<Name extends keyof Catalog>(name: Name): boolean {
    return this.handlers.has(name);
  }
}
