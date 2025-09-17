import { validateOrReject } from "class-validator";
import { AppDataSource } from "../database/data-source";
import { CreateUserDto } from "../dto/createUserDto";
import { User } from "../entities/User";
import { UpdateUserDto } from "../dto/updateUserDto";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async () => {
  return await userRepository.find();
};

export const getOneUser = async (id: string) => {
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const createUser = async (createUserDto: CreateUserDto) => {
  try {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await validateOrReject(user).catch((errors) => {
      throw new Error(errors.toString());
    });

    return await userRepository.save(user);
  } catch (error) {
    return {
      success: false,
      message: `Error creating user: ${error}`,
    };
  }
};

export const deleteUser = async (id: string) => {
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new Error("User not found");
  }

  return await userRepository.remove(user);
};

export const updateUser = async (id: string, data: UpdateUserDto) => {
  try {
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new Error("User not found");
    }

    userRepository.merge(user, data);
    return await userRepository.save(user);
  } catch (error) {
    return {
      success: false,
      message: `Error updating user: ${error}`,
    };
  }
};
