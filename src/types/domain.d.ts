export interface UpcomingSesh {
  id: string;
  game: string;
  proposedDate: string;
  proposedTime: string;
  seshCreatedBy: string;
  status: 'planned' | 'completed' | 'cancelled';
  createdAt: string;
  numAccepted?: number;
  numDeclined?: number;
  numRecipients?: number;
}
