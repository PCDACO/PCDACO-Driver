import { CarStatus } from '../enums';

export interface CarParams extends Partial<RootRequest> {
  latitude: number;
  longtitude: number;
  radius: number;
  model: string;
  amentities: string[];
  fuel: string;
  transmission: string;
  keyword: string;
  status: CarStatus;
}

export interface CarUnavailableParams {
  id: string;
  month: number;
  year: number;
}

export interface CarUnavailableResponse {
  date: Date;
}

export interface CarResponseList {
  id: string;
  modelId: string;
  modelName: string;
  ownerId: string;
  ownerName: string;
  ownerAvatarUrl: string;
  licensePlate: string;
  color: string;
  seat: number;
  description: string;
  transmissionId: string;
  transmissionType: string;
  fuelTypeId: string;
  fuelType: string;
  fuelConsumption: number;
  requiresCollateral: boolean;
  price: number;
  terms: string;
  status: string;
  totalRented: number;
  averageRating: number;
  location: null;
  manufacturer: Manufacturer;
  images: Image[];
  amenities: Amenity[];
}

export interface Image {
  id: string;
  url: string;
  type: string;
  name: string;
}

export interface Manufacturer {
  id: string;
  name: string;
}

export interface CarResponseDetail {
  id: string;
  modelId: string;
  modelName: string;
  ownerId: string;
  ownerName: string;
  licensePlate: string;
  color: string;
  seat: number;
  description: string;
  transmissionType: string;
  fuelType: string;
  fuelConsumption: number;
  requiresCollateral: boolean;
  pickupLocation: Location;
  price: number;
  terms: string;
  status: string;
  totalRented: number;
  averageRating: number;
  location: null;
  manufacturer: Manufacturer;
  images: Image[];
  amenities: Amenity[];
  feedbacks: Feedback[];
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  createdAt: Date;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Location {
  longitude: number;
  address: string;
  latitude: number;
}
