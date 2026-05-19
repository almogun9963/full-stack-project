import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Product {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;

  @Field
  id: number;

  @Field
  name: string;

  @Field
  type: string;

  @Field
  company: string;
}
