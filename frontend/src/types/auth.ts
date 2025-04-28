export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface RegisterPayload {
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    email: string;
    token: string;
  }
  