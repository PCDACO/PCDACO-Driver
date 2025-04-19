export interface FeedbackParams extends Partial<RootRequest> {
  id?: string;
}

export interface FeedbackPayload {
  rating: number;
  comment: string;
}

export interface FeedbackResponse {
  id: string;
}
