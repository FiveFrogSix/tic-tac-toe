import { Response } from "~/utils/responseUtils";
import path from "path";
import { promises as fs } from "fs";
import type { User, UsersData } from "~/types/user";
import { CheckExpire } from "~/utils/authUtils";

const jsonFilePath = path.resolve(
  process.cwd(),
  "server",
  "json",
  "users.json"
);

async function findUserWithToken(token: string): Promise<object | null> {
  const data = await fs.readFile(jsonFilePath, "utf-8");
  const usersData: UsersData = JSON.parse(data);
  const user = usersData.data.find((u) => u.token === token) as User;
  if (!user) return null;
  return user;
}

export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, "token") as string;
  const user = (await findUserWithToken(token)) as User;
  if (!user) return Response(event, 401, "user doest exist");
  if (user.expire && CheckExpire(user.expire))
    return Response(event, 401, "Token has expired");
  return Response(event, 200, user);
});
