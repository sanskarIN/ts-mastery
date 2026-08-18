export type PolicyEffect = "allow" | "deny";

export interface PolicyRule<Context> {
  readonly id: string;
  readonly priority: number;
  readonly effect: PolicyEffect;
  matches(context: Context): boolean;
}

export interface PolicyDecision {
  readonly allowed: boolean;
  readonly matchedRule?: string;
  readonly effect: PolicyEffect;
}

export function decidePolicy<Context>(
  context: Context,
  rules: readonly PolicyRule<Context>[],
): PolicyDecision {
  const matching = rules
    .filter((rule) => rule.matches(context))
    .sort((a, b) => b.priority - a.priority || (a.effect === b.effect ? a.id.localeCompare(b.id) : a.effect === "deny" ? -1 : 1));

  const selected = matching[0];
  if (!selected) {
    return { allowed: false, effect: "deny" };
  }

  return {
    allowed: selected.effect === "allow",
    matchedRule: selected.id,
    effect: selected.effect,
  };
}
