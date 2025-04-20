export enum Role {
  Driver = 'Driver',
  Owner = 'Owner',
}

export enum FinancialReportStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Rejected = 'Rejected',
}

export enum CarStatus {
  Inactive = 'Inactive',
  Pending = 'Pending',
  Available = 'Available',
  Rented = 'Rented',
  Maintain = 'Maintain',
  Rejected = 'Rejected',
}

export enum CarContractStatus {
  Pending = 'Pending',
  OwnerSigned = 'OwnerSigned',
  TechnicianSigned = 'TechnicianSigned',
  Completed = 'Completed',
  Rejected = 'Rejected',
}

export enum BookingReportType {
  Conflict = 'Conflict',
  Accident = 'Accident',
  FineNotice = 'FineNotice',
  Damage = 'Damage',
  Maintenance = 'Maintenance',
  Other = 'Other',
}

export enum BookingReportTypeNumber {
  Conflict = 0,
  Accident = 1,
  FineNotice = 2,
  Damage = 3,
  Maintenance = 4,
  Other = 5,
}

export enum BookingReportStatus {
  Pending = 'Pending',
  UnderReview = 'UnderReview',
  Resolved = 'Resolved',
  Rejected = 'Rejected',
}

export enum BookingReportStatusNumber {
  Pending = 0,
  UnderReview = 1,
  Resolved = 2,
  Rejected = 3,
}

export enum CarStatusNumber {
  Inactive = 0,
  Pending = 1,
  Available = 2,
  Rented = 3,
  Maintain = 4,
  Rejected = 5,
}

export enum BookingStatusEnum {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  ReadyForPickup = 'ReadyForPickup',
  Ongoing = 'Ongoing',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Expired = 'Expired',
  Done = 'Done',
}

export enum BookingStatusNumber {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  ReadyForPickup = 3,
  Ongoing = 4,
  Completed = 5,
  Done = 6,
  Cancelled = 7,
  Expired = 8,
}
export enum TransactionStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
  Cancelled = 'Cancelled',
}
