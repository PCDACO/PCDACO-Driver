export interface CarParams extends Partial<LastIdRootResquest> {
  latitude: number;
  longtitude: number;
  radius: number;
  model: string;
  lastId: string;
  amentities: string[];
  fuel: string;
  transmission: string;
}

export interface CarResponseList {}
export interface CarResponseDetail {}
