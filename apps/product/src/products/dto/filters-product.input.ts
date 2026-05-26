import { Field, InputType } from '@nestjs/graphql';
import { RangeInput } from './from-to-range-filter';
import { Tag } from '@repo/shared/tag';

@InputType()
export class FiltersProductInput {
  @Field({ nullable: true })
  price?: RangeInput;

  @Field({ nullable: true })
  company?: string;

  @Field(() => [Tag], { nullable: true })
  tags?: Tag[];
}
