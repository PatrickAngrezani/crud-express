import { IsEmail, IsOptional, IsPhoneNumber, Length } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @Length(2, 50)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
