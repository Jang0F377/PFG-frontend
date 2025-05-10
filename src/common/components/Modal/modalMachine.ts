import { ActorLogic, assign, PromiseActorLogic, setup } from 'xstate';

export type ModalEvent =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'ADD_RECIPIENT'; payload: string }
  | { type: 'REMOVE_RECIPIENT'; payload: string }
  | { type: 'CREATE_SESH' };

type ModalContext = {
  isOpen: boolean;
  recipients: Array<string>;
  intent: 'createSesh' | 'friendRequest';
};

export type ModalInput = Pick<ModalContext, 'isOpen' | 'recipients' | 'intent'>;

export const modalMachine = setup({
  types: {} as {
    events: ModalEvent;
    context: ModalContext;
    input: ModalInput;
  },
}).createMachine({
  id: 'modalMachine',
  initial: 'opened',
  context: ({ input }) => ({
    isOpen: input.isOpen,
    recipients: input.recipients,
    intent: input.intent,
  }),
  states: {
    opened: {
      target: 'createSesh',
    },
    createSesh: {
      on: {
        ADD_RECIPIENT: {
          target: 'createSesh',
          actions: assign({
            recipients: ({ context, event }) => [
              ...context.recipients,
              event.payload,
            ],
          }),
        },
      },
    },
  },
});
