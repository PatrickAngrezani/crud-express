import { IsEmail, IsPhoneNumber } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["email", "phone"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @IsPhoneNumber("BR")
  phone!: string;

  @Column()
  password!: string;
}
