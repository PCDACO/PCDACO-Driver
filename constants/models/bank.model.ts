export interface BankResponseList {
  id: string;
  bankLookUpId: string;
  name: string;
  code: string;
  bin: number;
  shortName: string;
  logoUrl: string;
  iconUrl: string;
  swiftCode: string;
  lookupSupported: number;
}

export interface BankAccountResponseList {
  id: string;
  bankInfoId: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  isPrimary: boolean;
  bankIconUrl: string;
  bankShortName: string;
}

export interface BankAccountResponseDetail {
  id: string;
  bankInfoId: string;
  bankName: string;
  bankCode: string;
  bankShortName: string;
  accountNumber: string;
  accountName: string;
  isPrimary: boolean;
  bankIconUrl: string;
}

export interface BankRequest {
  search: string;
}

export interface BankAccountPayload {
  bankInfoId: string;
  accountNumber: string;
  accountName: string;
  isPrimary: boolean;
}
