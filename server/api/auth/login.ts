import type { H3Event } from "h3";
import path from "path";
import { promises as fs } from "fs";
import { decodeJwt } from "~/utils/jwtUtils";
import type { GoogleResponse, GoogleDecode } from "~/types/google";
import { Response } from "~/utils/responseUtils";
import { createHash } from "crypto";
import { CheckExpire } from "~/utils/authUtils";
import type { User, UsersData } from "~/types/user";

const jsonFilePath = path.resolve(
  process.cwd(),
  "server",
  "json",
  "users.json"
);

const loginGoogle = async (event: H3Event) => {
  const body: GoogleResponse = await readBody(event);
  if (!body) return Response(event, 400);

  const obj = decodeJwt(body.credential) as GoogleDecode;
  // เช็ค JWT
  if (obj.exp && CheckExpire(obj.exp))
    return Response(event, 401, "Token has expired");
  // Check Email ว่างไหม
  if (!obj.email) return Response(event, 401, "Email not exist");
  // เช็คว่ามี user ยัง
  const user = (await findUser(obj.email)) as User;

  let result = null;
  let token = "";

  const expire = setExpire();
  const token_gen = genToken(obj.email + expire);

  if (!user) {
    result = (await createUser(obj.email, token_gen, expire)) as User;
    token = result.token ? result.token : "";
  } else {
    result = (await updateUser(obj.email, token_gen, expire)) as User;
    token = result.token ? result.token : "";
  }
  // Final
  return Response(event, 200, { token });
};

async function createUser(
  username: string,
  token: string,
  expire: number
): Promise<Object | null> {
  try {
    const users = (await getUsers()) as UsersData;

    const user = {
      username: username,
      score: 0,
      token: token,
      expire: expire,
    };
    users.data.push(user);
    await fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2));
    return user;
  } catch (error) {
    return null;
  }
}

function genToken(data: string): string {
  return createHash("md5").update(data).digest("hex");
}

function setExpire(): number {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 7);
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000);
  return unixTimestamp;
}

async function findUser(username: string): Promise<object | null> {
  const data = await fs.readFile(jsonFilePath, "utf-8");
  const usersData: UsersData = JSON.parse(data);
  const user = usersData.data.find((u) => u.username === username);
  if (!user) return null;
  return user;
}

async function getUsers(): Promise<Object | null> {
  try {
    const data = await fs.readFile(jsonFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
}

async function updateUser(username: string, token: string, expire: number) {
  try {
    const users = (await getUsers()) as UsersData;

    const user_edit = users.data.map((item) => {
      if (item.username === username) {
        item.token = token;
        item.expire = expire;
      }
      return item;
    });

    const users_new = {
      data: user_edit,
    };

    const user = {
      username: username,
      score: 0,
      token: token,
      expire: expire,
    };
    await fs.writeFile(jsonFilePath, JSON.stringify(users_new, null, 2));
    return user;
  } catch (error) {
    return null;
  }
}

export default defineEventHandler(async (event: H3Event) => {
  const { method } = event.node.req;
  if (method === "POST") return await loginGoogle(event);
  return Response(event, 404);
});
