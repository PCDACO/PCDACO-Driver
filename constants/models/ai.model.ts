export interface AILicensePlatePrevResponse {
  id: string;
  id_prob: string;
  name: string;
  name_prob: string;
  dob: string;
  dob_prob: string;
  nation: string;
  nation_prob: string;
  address: string;
  address_prob: string;
  place_issue: string;
  place_issue_prob: string;
  date: string;
  date_prob: string;
  doe: string;
  doe_prob: string;
  class: string;
  class_prob: string;
  type: string;
}

export interface AILicensePlatePostResponse {
  type: string;
}
