import path from "path";
import { promises as fs } from "fs";

interface User {
  username: string;
}

interface UsersData {
  users: User[];
}

const createUser = async (event: any, usersFilePath: any) => {
  try {
    const body: User = await readBody(event);
    const { username } = body;

    // Read the existing users data
    let usersData: UsersData = { users: [] };

    try {
      const data = await fs.readFile(usersFilePath, "utf-8");
      usersData = JSON.parse(data);
    } catch (err) {
      // If the file does not exist, it will be created
    }

    // Add the new user
    usersData.users.push({ username });

    // Save the updated users data
    await fs.writeFile(usersFilePath, JSON.stringify(usersData));

    return { success: true, message: `User ${username} created successfully.` };
  } catch (error) {
    console.error(error);
    
    return { success: false, error: "Failed to create user." };
  }
};

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;
  const jsonFilePath = path.resolve(
    process.cwd(),
    "server",
    "json",
    "users.json"
  );
  if (method === "POST") return await createUser(event, jsonFilePath);
  return "Hello Nitro";
});
