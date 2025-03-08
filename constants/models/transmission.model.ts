export interface TransmissionResponseList {
  id: string;
  name: string;
  createdAt: Date;
}

export interface TransmissionParams extends Partial<RootRequest> {}
