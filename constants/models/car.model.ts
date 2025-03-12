export interface CarParams extends Partial<LastIdRootResquest> {
  latitude: number;
  longtitude: number;
  radius: number;
  model: string;
  lastId: string;
  amentities: string[];
  fuel: string;
  transmission: string;
  keyword: string;
}

export interface CarResponseList {
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

interface Manufacturer {
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

interface Image {
  id: string;
  url: string;
  type: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
}
