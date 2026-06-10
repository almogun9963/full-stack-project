import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOne(userName: string) {
    return this.userRepository.findOne(userName);
  }
}
