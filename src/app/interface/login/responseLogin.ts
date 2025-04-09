export interface ResponseI {
  data: dataI
  message: 'User Logged In';
}

interface dataI {
    id: string;
    email: string;
    userName: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    wins: number;
    losses: number;
    draws: number;
}
