import { IsEmail, IsNotEmpty } from "class-validator";
import { IsUserAlreadyExist } from "../utils/validatorConstraint";

export class CreateUserDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsUserAlreadyExist()
  email!: string;

  @IsNotEmpty()
  phone!: string;

  @IsNotEmpty()
  password!: string;
}
