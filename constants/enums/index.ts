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
}

export enum CarContractStatusEnum {
  Pending = 'Pending',
  OwnerSigned = 'OwnerSigned',
  TechnicianSigned = 'TechnicianSigned',
  Completed = 'Completed',
  Rejected = 'Rejected',
}
