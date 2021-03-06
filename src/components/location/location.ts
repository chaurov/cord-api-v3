import { Field, ID, ObjectType, InputType } from 'type-graphql';
import { Area } from '../area/area';

@ObjectType()
@InputType('LocationInput')
export class Location {
  @Field(() => ID)
  id: string;

  @Field()
  country: string;

  @Field()
  area: Area;

  @Field()
  editable: boolean;

  static from(location: Location) {
    return Object.assign(new Location(), location);
  }
}

export interface ILocation {
  id: string;
  country: string | null;
  area: Area;
  editable: boolean;
}
