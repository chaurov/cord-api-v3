import { Field, Int, ObjectType, InputType } from 'type-graphql';

@ObjectType()
@InputType('LanguageInput')
export class Language {
  @Field(type => String)
  id: string;

  @Field(type => String)
  name: string;

  @Field()
  displayName: string;

  @Field(() => Int)
  beginFiscalYear: number;

  @Field()
  ethnologueName: string;

  @Field(() => Int)
  ethnologuePopulation: number;

  @Field(() => Int)
  organizationPopulation: number;

  @Field(() => Int)
  rodNumber: number;

  static from(language: Language) {
    return Object.assign(new Language(), language);
  }
}

export interface ILanguage {
  id: string;
  name: string | null;
  displayName: string | null;
  beginFiscalYear: number | null;
  ethnologueName: string | null;
  ethnologuePopulation: number | null;
  organizationPopulation: number | null;
  rodNumber: number | null;
}