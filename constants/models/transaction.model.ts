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

export interface TransactionResponse {}

export interface WithdrawPayload {
  bankAccountId: string;
  amount: number;
}

export interface WithdrawResponse {}

export interface WithdrawPayloadResponse {}
