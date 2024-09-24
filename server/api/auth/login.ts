import path from "path";
import { promises as fs } from "fs";
import { decodeJwt } from "~/utils/jwtUtils";
import type { GoogleResponse } from "~/types/google";
import { Response } from "~/utils/responseUtils";
interface User {
  username: string;
  score: number;
}

interface UsersData {
  users: User[];
}

const jsonFilePath = path.resolve(
  process.cwd(),
  "server",
  "json",
  "users.json"
);

const loginUser = async (event: any) => {
  const body: GoogleResponse = await readBody(event);
  if (!body) return Response(event, 400);
  const obj = decodeJwt(body.credential);
  return Response(event, 200, obj);
};

const createUser = async (event: any) => {
  try {
    const body: User = await readBody(event);
    const { username } = body;

    // Read the existing users data
    let usersData: UsersData = { users: [] };

    try {
      const data = await fs.readFile(jsonFilePath, "utf-8");
      usersData = JSON.parse(data);
    } catch (err) {
      return {
        success: false,
        error: "Failed to parse json.",
      };
    }

    // Add the new user
    usersData.users.push({ username: username, score: 0 });

    // Save the updated users data
    await fs.writeFile(jsonFilePath, JSON.stringify(usersData, null, 2));

    return { success: true, message: `User ${username} created successfully.` };
  } catch (error) {
    console.error(error);

    return { success: false, error: "Failed to create user." };
  }
};

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;
  if (method === "POST") return await loginUser(event);
  return "Hello Nitro";
});
