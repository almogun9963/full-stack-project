import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../user/user.repository";

@ValidatorConstraint({ name: "IsUniqueConstraint", async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(userName: string): Promise<boolean> {
    if (!userName) return true;

    const exists = await this.userRepository.findOne(userName);

    if (exists) {
      throw new BadRequestException("this user name is already exists");
    }

    return true;
  }
}
