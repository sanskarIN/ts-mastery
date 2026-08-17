export type WorkflowState =
  | { readonly type: 'pending' }
  | { readonly type: 'running'; readonly startedAt: number }
  | { readonly type: 'succeeded'; readonly finishedAt: number }
  | { readonly type: 'failed'; readonly finishedAt: number; readonly reason: string };

export type WorkflowEvent =
  | { readonly type: 'start'; readonly at: number }
  | { readonly type: 'succeed'; readonly at: number }
  | { readonly type: 'fail'; readonly at: number; readonly reason: string };

export function transition(state: WorkflowState, event: WorkflowEvent): WorkflowState {
  switch (state.type) {
    case 'pending':
      if (event.type !== 'start') throw new Error('pending workflow can only start');
      return { type: 'running', startedAt: event.at };
    case 'running':
      if (event.type === 'succeed') return { type: 'succeeded', finishedAt: event.at };
      if (event.type === 'fail') return { type: 'failed', finishedAt: event.at, reason: event.reason };
      throw new Error('running workflow cannot start again');
    case 'succeeded':
    case 'failed':
      throw new Error('terminal workflow cannot transition');
  }
}
