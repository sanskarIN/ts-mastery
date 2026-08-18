export interface SagaStep<Context> {
  readonly name: string;
  execute(context: Context): Promise<void> | void;
  compensate(context: Context): Promise<void> | void;
}

export type SagaResult =
  | { readonly ok: true; readonly completed: readonly string[] }
  | {
      readonly ok: false;
      readonly completed: readonly string[];
      readonly failedStep: string;
      readonly error: unknown;
      readonly compensationErrors: readonly { step: string; error: unknown }[];
    };

export async function runSaga<Context>(
  context: Context,
  steps: readonly SagaStep<Context>[],
): Promise<SagaResult> {
  const completed: SagaStep<Context>[] = [];

  for (const step of steps) {
    if (!step.name.trim()) {
      throw new Error("saga step names must not be empty");
    }
    try {
      await step.execute(context);
      completed.push(step);
    } catch (error) {
      const compensationErrors: Array<{ step: string; error: unknown }> = [];
      for (const completedStep of [...completed].reverse()) {
        try {
          await completedStep.compensate(context);
        } catch (compensationError) {
          compensationErrors.push({ step: completedStep.name, error: compensationError });
        }
      }

      return {
        ok: false,
        completed: completed.map((item) => item.name),
        failedStep: step.name,
        error,
        compensationErrors,
      };
    }
  }

  return { ok: true, completed: completed.map((item) => item.name) };
}
