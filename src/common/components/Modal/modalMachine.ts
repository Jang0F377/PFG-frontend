import { assign, setup } from 'xstate';

export type ModalEvent =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'ADD_RECIPIENT'; payload: string }
  | { type: 'REMOVE_RECIPIENT'; payload: string }
  | { type: 'CREATE_SESH' }
  | { type: 'FRIEND_REQUEST' }
  | { type: 'CREATING_SESH' }
  | { type: 'CREATE_SUCCESS' }
  | { type: 'CREATE_ERROR'; error: string };

export const modalMachine = setup({
  types: {} as {
    events: ModalEvent;
  },
}).createMachine({
  id: 'modalMachine',
  initial: 'opened',
  states: {
    opened: {
      on: {
        CREATE_SESH: {
          target: 'createSesh',
        },
        FRIEND_REQUEST: {
          target: 'friendRequest',
        },
      },
    },
    createSesh: {
      on: {
        CREATING_SESH: {
          target: 'creatingSesh',
        },
      },
    },
    creatingSesh: {
      on: {
        CREATE_SUCCESS: {
          target: 'createSuccess',
        },
        CREATE_ERROR: {
          target: 'createError',
        },
      },
    },
    createSuccess: {},
    createError: {},
    friendRequest: {},
  },
});
