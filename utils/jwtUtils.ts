// server/utils/jwtUtils.ts
import { jwtDecode } from "jwt-decode";

export const decodeJwt = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
