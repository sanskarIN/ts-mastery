export function greet(name: string): string {
  const normalized = name.trim();
  return `Hello, ${normalized || 'TypeScript learner'}!`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(greet(process.argv[2] ?? 'reader'));
}
