export interface BankResponse {
  id: string;
  name: string;
  code: string;
  bin: number;
  short_name: string;
  logo_url: string;
  icon_url: string;
  swift_code: string;
  lookup_supported: number;
}

export interface BankAccountResponse {
  ownerName: string;
}

export interface BankRequest extends RootRequest {}

export interface BankPayload {
  bank: string;
  account: string;
}
