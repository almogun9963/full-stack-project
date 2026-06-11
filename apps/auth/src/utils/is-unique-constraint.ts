import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { UserRepository } from "../user/user.repository";

@ValidatorConstraint({ name: "IsUniqueConstraint", async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(value: any): Promise<boolean> {
    const userName: string | undefined =
      typeof value === "string" ? value : value?.userName;

    if (!userName) return true;

    const exists = await this.userRepository.findOne(userName);
    return exists ? false : true;
  }
}
