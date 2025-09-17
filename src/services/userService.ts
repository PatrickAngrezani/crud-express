import { validateOrReject } from "class-validator";
import { AppDataSource } from "../database/data-source";
import { CreateUserDto } from "../dto/createUserDto";
import { User } from "../entities/User";
import { UpdateUserDto } from "../dto/updateUserDto";
import bcrypt from "bcrypt";
import redisClient from "../providers/cache/redisClient";

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async () => {
  try {
    const cacheKey = "users";
    

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const users = await userRepository.find();

    if (!users || users.length === 0) {
      throw new Error("No users found");
    }

    await redisClient.set(cacheKey, JSON.stringify(users), { EX: 60 });

    return users;
  } catch (error) {
    throw new Error(`Error getting user: ${error}`);
  }
};

export const getOneUser = async (id: string) => {
  const cacheKey = `user:${id}`;

  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new Error("User not found");
  }

  await redisClient.set(cacheKey, JSON.stringify(user), { EX: 60 });

  return user;
};

export const createUser = async (createUserDto: CreateUserDto) => {
  try {
    await validateOrReject(createUserDto);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return await userRepository.save(user);
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

export const deleteUser = async (id: string) => {
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new Error("User not found");
  }

  await redisClient.del(`user:${id}`);

  return await userRepository.remove(user);
};

export const updateUser = async (id: string, data: UpdateUserDto) => {
  try {
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new Error("User not found");
    }

    userRepository.merge(user, data);
    const updated = await userRepository.save(user);

    await redisClient.set(`user:${id}`, JSON.stringify(updated), { EX: 60 });

    return updated;
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
};
