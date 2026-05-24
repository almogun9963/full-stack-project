import { Field, InputType } from '@nestjs/graphql';
import { RangeInput } from './from-to-range-filter';

@InputType()
export class FiltersProductInput {
  @Field({ nullable: true })
  price?: RangeInput;

  @Field({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  tag?: string;
}
