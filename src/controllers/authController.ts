import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const userRepository = AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not defined");
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email e senha são obrigatórios" });

  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "8h" } // token válido por 8h
    );

    return res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
