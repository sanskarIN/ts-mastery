import { createSnapshot, percentage } from './domain.js';

const parts = process.argv.slice(2).map(Number);
const snapshot = createSnapshot(parts);
console.log(`Completed: ${snapshot.completed.length}/${snapshot.totalParts}`);
console.log(`Progress: ${percentage(snapshot)}%`);
