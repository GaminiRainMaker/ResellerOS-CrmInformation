export interface Credentials {
  username: string;
  password: string;
  remember_me: string;
}

export interface DecodedToken {
  exp?: number;
}
