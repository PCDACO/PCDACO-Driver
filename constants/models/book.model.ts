import { BookingStatusEnum } from '../enums';

export interface BookParams extends Partial<RootRequest> {
  search: string;
  status: number | number[];
  isPaid: boolean;
}

export interface BookPayload {
  carId: string;
  startTime: Date;
  endTime: Date;
}

export interface BookUpdatePayload {
  newStartTime: Date;
  newEndTime: Date;
}

export interface BookUpdateResponse {
  bookingId: string;
  newStartDate: Date;
  newEndDate: Date;
}

export interface BookPreInspectionPayload {
  exteriorPhotos: File;
  fuelGaugePhotos: File;
  carKeyPhotos: File;
  trunkPhotos: File;
  parkingLocationPhotos: File;
}

export interface BookPostInspectionPayload {
  fuelGaugeFinalPhotos: File;
  cleanlinessPhotos: File;
  scratchesPhotos: File;
  tollFeesPhotos: File;
}

export interface BookTrackBatch {
  locationPoints: LocationPoint[];
}

export interface LocationPoint {
  latitude: number;
  longitude: number;
  createdAt: Date;
}

export interface BookCancelPayload {
  id: string;
  cancelReason: string;
}

export interface BookApprovePayload {
  isApproved: boolean;
  signature: string;
}

export interface BookStartTripPayload {
  latitude: number;
  longitude: number;
  signature: string;
}

export interface BookCompletePayload {
  currentLatitude: number;
  currentLongitude: number;
}

export interface BookPaymentResponse {
  basePrice: number;
  excessDays: number;
  excessFee: number;
  orderCode: number;
  paymentUrl: string;
  platformFee: number;
  qrCode: string;
  totalAmount: number;
  totalDistance: number;
}

export interface BookResponseList {
  id: string;
  carName: string;
  driverName: string;
  ownerName: string;
  totalAmount: number;
  totalDistance: number;
  isPaid: boolean;
  status: BookingStatusEnum;
  startTime: Date;
  endTime: Date;
  actualReturnTime: Date;
}

export interface BookPostInspection {
  inspectionId: string;
  photos: Photo[];
}

export interface Photo {
  type: number;
  urls: string[];
}

export interface BookResponseDetail {
  id: string;
  car: Car;
  driver: Driver;
  owner: Driver;
  booking: Booking;
  payment: Payment;
  trip: Trip;
  feedbacks: Feedback[];
}

export interface Booking {
  startTime: Date;
  endTime: Date;
  actualReturnTime: Date;
  totalDistance: number;
  extensionAmount: number;
  isExtensionPaid: boolean;
  isRefund: boolean;
  status: string;
  note: string;
  refundDate: Date;
  refundAmount: number;
  preInspectionPhotos: PreInspectionPhotos;
  postInspectionPhotos: PostInspectionPhotos;
}

export interface PreInspectionPhotos {
  carKey: string[];
  exteriorCar: string[];
  fuelGauge: string[];
  parkingLocation: string[];
  trunkSpace: string[];
}

export interface PostInspectionPhotos {
  cleanliness: string[];
  scratches: string[];
  tollFees: string[];
  fuelGaugeFinal: string[];
}

export interface Car {
  id: string;
  modelName: string;
  licensePlate: string;
  color: string;
  seat: number;
  transmissionType: string;
  fuelType: string;
  carImageUrl: string[];
}

export interface BookCompleteResponse {
  totalDistance: number;
  unusedDays: number;
  refundAmount: number;
  excessDays: number;
  excessFee: number;
  basePrice: number;
  platformFee: number;
  finalAmount: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarUrl: string;
}

export interface Feedback {
  id: string;
  rating: number;
  content: string;
  type: number;
  userName: string;
  role: string;
}

export interface Payment {
  basePrice: number;
  platformFee: number;
  excessDay: number;
  excessDayFee: number;
  totalAmount: number;
  isPaid: boolean;
}

export interface Trip {
  totalDistance: number;
}

export interface Webhook {
  code: string;
  desc: string;
  success: boolean;
  data: Data;
  signature: string;
}

export interface Data {
  orderCode: number;
  amount: number;
  description: string;
  accountNumber: string;
  reference: string;
  transactionDateTime: string;
  currency: string;
  paymentLinkId: string;
  code: string;
  desc: string;
  counterAccountBankId: string;
  counterAccountBankName: string;
  counterAccountName: string;
  counterAccountNumber: string;
  virtualAccountName: string;
  virtualAccountNumber: string;
}
