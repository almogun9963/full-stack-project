import { registerDecorator } from "class-validator";
import { IsUniqueConstraint } from "./is-unique-constraint";
import { UserType } from "@repo/common-types";

export type IsUniqueConstraintInput = {
  tableName: string;
  column: string;
};

export function IsUnique() {
  return function (object: UserType, propertyName: string) {
    registerDecorator({
      name: "is-unique",
      target: object.constructor,
      propertyName: propertyName,
      validator: IsUniqueConstraint,
    });
  };
}
