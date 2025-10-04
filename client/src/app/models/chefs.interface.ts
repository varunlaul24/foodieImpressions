export interface RandomUserApiResponse {
  results: RandomUser[];
}

export interface RandomUser {
  login: {
    uuid: string;
  };
  id: {
    value: string;
  };
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
}

export interface Chef {
  id: string;
  name: string;
  avatar: string;
  reviews?: Review[];
}
export interface Review {
  author: string;
  content: string;
  date: string;
}