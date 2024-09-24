interface GoogleResponse {
  credential: string;
}

interface GoogleDecode {
  email: string;
  name: string;
  picture: string;
  exp: number;
}

export type { GoogleResponse, GoogleDecode };
