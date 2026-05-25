import { registerEnumType } from '@nestjs/graphql';

export enum Tag {
  North = 'North',
  East = 'East',
  South = 'South',
  West = 'West',
}

registerEnumType(Tag, {
  name: 'Tag',
});
