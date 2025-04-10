import { setup } from 'xstate';

export type AccountEvent =
  | { type: 'EDITING' }
  | { type: 'DONE_EDITING' }
  | { type: 'CANCEL_EDITING' };

export const accountMachine = setup({
  types: {} as {
    events: AccountEvent;
  },
}).createMachine({
  id: 'accountMachine',
  initial: 'notEditing',
  states: {
    notEditing: {
      on: {
        EDITING: {
          target: 'editing',
        },
      },
    },
    editing: {
      on: {
        DONE_EDITING: {
          target: 'notEditing',
        },
        CANCEL_EDITING: {
          target: 'notEditing',
        },
      },
    },
  },
});
