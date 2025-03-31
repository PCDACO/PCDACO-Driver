export interface ManufacturerResponse {
  id: string;
  name: string;
  createdAt: Date;
}

export interface ManufacturerParams extends Partial<LastIdRootResquest> {}
