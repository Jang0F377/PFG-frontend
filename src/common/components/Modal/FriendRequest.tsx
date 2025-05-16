export interface FriendRequestProps {
  recipientEmail: string;
  recipientUuid: string;
  handleSuccess: () => void;
  handleError: (error: string) => void;
}

export const FriendRequest = ({
  recipientEmail,
  recipientUuid,
  handleSuccess,
  handleError,
}: FriendRequestProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">
        Would you like to add {recipientEmail} as a friend?
      </h2>
    </div>
  );
};
