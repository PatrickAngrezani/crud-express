import * as userService from "../services/userService";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    return {
      success: false,
      message: `Error getting users: ${error}`,
    };
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await userService.getOneUser(id);
    return res.status(200).json(user);
  } catch (error) {
    return {
      success: false,
      message: `Error getting user: ${error}`,
    };
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.updateUser(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ result, message: "User updated succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
};
