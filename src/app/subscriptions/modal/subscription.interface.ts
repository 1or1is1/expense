export interface SubscriptionInterface {
  name: string;
  website: string;
  price: number;
  boughtDate: string;
  paying: RecurType;
  status: StatusType;
  notes?: string | null;
  uid?: string;
  subscriptionId?: string;
}

export enum StatusType {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum RecurType {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}
