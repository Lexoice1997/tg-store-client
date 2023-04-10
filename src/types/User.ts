export interface User {
  id: string;
  name: string;
  phone: string;
  token: string;
}

export interface ResponseUser {
  data: SignIn;
}

export interface SignIn {
  phone: any;
  password: string;
}
