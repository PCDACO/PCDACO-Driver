export interface AmenityResponseList {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  createdAt: Date;
}

export interface AmenityParams extends Partial<RootRequest> {}
