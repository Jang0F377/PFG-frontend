export interface UpcomingSesh {
  id: string;
  game: string;
  proposedDate: string;
  proposedTime: string;
  seshCreatedBy: string;
  seshCreatedByEmail: string;
  status: 'planned' | 'completed' | 'cancelled';
  createdAt: string;
  numAccepted?: number;
  numDeclined?: number;
  numRecipients?: number;
  seshId: string;
  invitationResponse: 'accepted' | 'declined' | 'invited';
}

export interface Recipient {
  userId: string;
  seshId: string;
  respondedAt?: string;
  invitedAt: string;
  status: 'accepted' | 'declined' | 'invited';
  numRecipients: string;
  seshCreatedByEmail: string;
}
export interface CreatedSesh {
  id: string;
  game: string;
  date: string;
  time: string;
  createdBy: string;
  recipients: Recipient[];
  notes?: string;
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  email: string;
  username?: string;
  status: 'active' | 'blocked';
  createdAt: string;
}

export interface FriendRequest {
  id: string;
  recipientId: string;
  requesterId: string;
  requesterEmail: string;
  recipientEmail: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  updatedAt?: string;
}
