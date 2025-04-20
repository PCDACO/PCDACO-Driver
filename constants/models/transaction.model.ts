export interface TransactionParams extends RootRequest {
  type: number;
  fromDate: string;
  toDate: string;
}

export interface WithdrawParams extends RootRequest {
  status: number;
  fromDate: string;
  toDate: string;
}

export interface TransactionResponse {
  id: string;
  type: string;
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: Date;
  status: string;
  details: Details;
  prooUrl: string;
  isIncome: boolean;
}

export interface Details {
  bookingId: string;
  bankName: string;
  bankAccountName: string;
}

export interface WithdrawPayload {
  bankAccountId: string;
  amount: number;
}

export interface WithdrawResponse {}

export interface WithdrawPayloadResponse {}
