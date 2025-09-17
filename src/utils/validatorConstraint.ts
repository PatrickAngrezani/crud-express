import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from "class-validator";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(email: string, args: ValidationArguments) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return "E-mail já está em uso!";
  }
}

export function IsUserAlreadyExist() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: { message: "E-mail já está em uso!" },
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
