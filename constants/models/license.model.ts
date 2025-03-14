export interface LicensePayload {
  licenseNumber: string;
  expirationDate: Date;
}

export interface LicensePayloadResponse {
  id: string;
}

export interface LicenseResponse {
  id: string;
  licenseNumber: string;
  expirationDate: Date;
  imageFrontUrl: string;
  imageBackUrl: string;
  isApproved: null;
  rejectReason: null;
  approvedAt: null;
  createdAt: Date;
}

export interface LicenseImagesPayload {
  licenseImageFront: File;
  licenseImageBack: File;
}

export interface LicenseImagesPayloadResponse {}
