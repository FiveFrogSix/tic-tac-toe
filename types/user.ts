interface User {
  username: string;
  score: number;
  token: string;
  expire: number;
}

interface UsersData {
  data: User[];
}

export type { User, UsersData };
