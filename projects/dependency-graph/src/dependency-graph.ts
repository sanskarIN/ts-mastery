export class DependencyCycleError extends Error {
  constructor(readonly cycle: readonly string[]) {
    super(`Dependency cycle detected: ${cycle.join(' -> ')}`);
    this.name = 'DependencyCycleError';
  }
}

export class DependencyGraph {
  private readonly edges = new Map<string, Set<string>>();

  addNode(node: string): void {
    if (!node.trim()) throw new Error('node name must not be empty');
    if (!this.edges.has(node)) this.edges.set(node, new Set());
  }

  addDependency(node: string, dependsOn: string): void {
    this.addNode(node);
    this.addNode(dependsOn);
    this.edges.get(node)?.add(dependsOn);
  }

  dependenciesOf(node: string): readonly string[] {
    return [...(this.edges.get(node) ?? [])].sort();
  }

  topologicalOrder(): readonly string[] {
    const permanent = new Set<string>();
    const temporary = new Set<string>();
    const stack: string[] = [];
    const output: string[] = [];

    const visit = (node: string): void => {
      if (permanent.has(node)) return;
      if (temporary.has(node)) {
        const start = stack.indexOf(node);
        throw new DependencyCycleError([...stack.slice(start), node]);
      }

      temporary.add(node);
      stack.push(node);
      for (const dependency of this.dependenciesOf(node)) visit(dependency);
      stack.pop();
      temporary.delete(node);
      permanent.add(node);
      output.push(node);
    };

    for (const node of [...this.edges.keys()].sort()) visit(node);
    return output;
  }
}
