import { Field, ID, ObjectType, InputType } from 'type-graphql';

@ObjectType()
@InputType('UserInput')
export class User implements IUser{
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  realFirstName: string;

  @Field()
  realLastName: string;

  @Field()
  displayFirstName: string;

  @Field()
  displayLastName: string;

  @Field()
  password: string;

  @Field()
  token: string;

  static from(user: User) {
    return Object.assign(new User(), user);
  }
}

export interface IUser {
  id: string;
  email: string | null;
  realFirstName: string | null;
  realLastName: string | null;
  displayFirstName: string | null;
  displayLastName: string | null;
}
