/**
 * Centralized mapping from backend error codes to user-friendly messages.
 * Keep keys aligned with server error identifiers.
 */
export const ERROR_MESSAGES = {
  'friend_request.already_exists':
    'You have already sent a friend request to this user.',
  'friend_request.already_accepted':
    'You have already accepted a friend request from this user.',
  'friend_request.already_declined':
    'You have already declined a friend request from this user.',
  internal_server_error: 'Something went wrong. Please try again.',
} as const;

export type KnownErrorCode = keyof typeof ERROR_MESSAGES;

/**
 * Resolves any error string (code or message) to a display message.
 * If the string matches a known code, returns the mapped message; otherwise echoes input.
 */
export function resolveErrorMessage(error: string): string {
  if (!error) return 'Something went wrong. Please try again.';
  return (ERROR_MESSAGES as Record<string, string>)[error] ?? error;
}
