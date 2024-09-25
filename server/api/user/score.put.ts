import { Response } from "~/utils/responseUtils";
import { GetUsers } from "~/utils/userUtils";
import path from "path";
import { promises as fs } from "fs";
import type { User, UsersData } from "~/types/user";

const jsonFilePath = path.resolve(
  process.cwd(),
  "server",
  "json",
  "users.json"
);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const username = body.username;
  const score = body.score;
  const users = (await GetUsers()) as UsersData;

  const check_user = users.data.find((item) => {
    return item.username === username;
  });

  if (!check_user) return Response(event, 401);

  const user_edit = users.data.map((item) => {
    if (item.username === username) {
      item.score = score;
    }
    return item;
  });
  const users_new = {
    data: user_edit,
  };
  await fs.writeFile(jsonFilePath, JSON.stringify(users_new, null, 2));
  return Response(event, 200);
});
