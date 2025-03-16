export interface LicensePayload {
  licenseNumber: string;
  expirationDate: Date;
}

export interface LicensePayloadResponse {
  id: string;
}

export interface LicenseResponse {
  userId: string;
  licenseNumber: string;
  expirationDate: Date;
  imageFrontUrl: string;
  imageBackUrl: string;
  isApproved: boolean;
  rejectReason: null;
  approvedAt: null;
  createdAt: Date;
  licenseImageUploadedAt: Date;
}

export interface LicenseImagesPayload {
  licenseImageFront: File;
  licenseImageBack: File;
}

export interface LicenseImagesPayloadResponse {}
