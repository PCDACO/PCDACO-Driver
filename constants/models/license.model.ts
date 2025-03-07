export interface LicensePayload {
  licenseNumber: string;
  expirationDate: Date;
}

export interface LicensePayloadResponse {
  id: string;
}

export interface LicenseResponse {}

export interface LicenseImagesPayload {
  licenseImageFront: File;
  licenseImageBack: File;
}

export interface LicenseImagesPayloadResponse {}
