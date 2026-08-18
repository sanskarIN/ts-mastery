export type Next = () => Promise<void>;
export type Middleware<Context> = (context: Context, next: Next) => Promise<void> | void;

export function composeMiddleware<Context>(
  middleware: readonly Middleware<Context>[],
): (context: Context) => Promise<void> {
  return async (context: Context) => {
    let lastIndex = -1;

    const dispatch = async (index: number): Promise<void> => {
      if (index <= lastIndex) {
        throw new Error("next() called multiple times");
      }
      lastIndex = index;

      const current = middleware[index];
      if (!current) {
        return;
      }

      await current(context, () => dispatch(index + 1));
    };

    await dispatch(0);
  };
}
