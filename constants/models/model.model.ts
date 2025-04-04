export interface ModelsResponse {
  id: string;
  name: string;
  releaseDate: Date;
  createdAt: Date;
  manufacturer: Manufacturer;
}

interface Manufacturer {
  id: string;
  name: string;
}

export interface ModelParams extends Partial<LastIdRootResquest> {}
