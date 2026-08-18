export interface DagTask<Result> {
  id: string;
  dependsOn?: readonly string[];
  run: (completed: ReadonlyMap<string, Result>) => Promise<Result> | Result;
}

export async function runDag<Result>(
  tasks: readonly DagTask<Result>[],
): Promise<Map<string, Result>> {
  const byId = new Map<string, DagTask<Result>>();

  for (const task of tasks) {
    const id = task.id.trim();
    if (!id) {
      throw new Error("task id must not be empty");
    }
    if (byId.has(id)) {
      throw new Error(`duplicate task id: ${id}`);
    }
    byId.set(id, { ...task, id });
  }

  for (const task of byId.values()) {
    for (const dependency of task.dependsOn ?? []) {
      if (!byId.has(dependency)) {
        throw new Error(`task ${task.id} depends on missing task ${dependency}`);
      }
    }
  }

  const completed = new Map<string, Result>();
  const remaining = new Set(byId.keys());

  while (remaining.size > 0) {
    const ready = [...remaining]
      .map((id) => byId.get(id))
      .filter((task): task is DagTask<Result> => task !== undefined)
      .filter((task) => (task.dependsOn ?? []).every((dependency) => completed.has(dependency)));

    if (ready.length === 0) {
      throw new Error("dependency cycle detected");
    }

    const snapshot = new Map(completed);
    const batch = await Promise.all(
      ready.map(async (task) => [task.id, await task.run(snapshot)] as const),
    );

    for (const [id, result] of batch) {
      completed.set(id, result);
      remaining.delete(id);
    }
  }

  return completed;
}
