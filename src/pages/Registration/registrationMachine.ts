// import { type AxiosError } from 'axios';
// import { assign, fromPromise, PromiseActorLogic, setup } from 'xstate';

// export type RegistrationEvent =
//   | { type: 'ERROR' }
//   | {
//       type: 'BEGIN_REGISTRATION';
//       payload: {
//         email: string;
//         password: string;
//         confirmPassword: string;
//         favoriteGames?: string[];
//       };
//     };

// type RegistrationContext = {
//   errorMessage: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   favoriteGames: string[];
// };

// // type RegistrationActors = {
// //   performRegistrationFlow: PromiseActorLogic<
// //     any,
// //     {
// //       email: string;
// //       password: string;
// //       favoriteGames: string[];
// //     }
// //   >;
// // };

// // type RegistrationInput = Pick<
// //   RegistrationContext,
// //   'email' | 'password' | 'favoriteGames'
// // >;

// export const registrationMachine = setup({
//   types: {} as {
//     events: RegistrationEvent;
//     context: RegistrationContext;
//     // input: RegistrationInput;
//   },
//   actors: {} as RegistrationActors,
// }).createMachine({
//   id: 'registrationMachine',
//   initial: 'initial',
//   context: {
//     errorMessage: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     favoriteGames: [],
//   },
//   states: {
//     initial: {
//       on: {
//         BEGIN_REGISTRATION: {
//           target: 'registerNewUser',
//           actions: assign({
//             email: ({ event }) => event.payload.email,
//             password: ({ event }) => event.payload.password,
//             confirmPassword: ({ event }) => event.payload.confirmPassword,
//             favoriteGames: ({ event }) => event.payload.favoriteGames || [],
//           }),
//         },
//       },
//     },
//     registerNewUser: {},
//     error: {},
//   },
// });
