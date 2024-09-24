// server/utils/jwtUtils.ts
import { jwtDecode } from "jwt-decode";

export const decodeJwt = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
};
