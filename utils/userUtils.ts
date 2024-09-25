import path from "path";
import { promises as fs } from "fs";
import type { User, UsersData } from "~/types/user";
import type { H3Event } from "h3";

const jsonFilePath = path.resolve(
  process.cwd(),
  "server",
  "json",
  "users.json"
);

export const GetUsers = async (): Promise<Object | null> => {
  try {
    const data = await fs.readFile(jsonFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
};
