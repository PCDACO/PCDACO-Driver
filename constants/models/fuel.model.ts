export interface FuelResponseList {
  id: string;
  name: string;
  createdAt: Date;
}

export interface FuelParams extends Partial<RootRequest> {}
