import { DateTime } from 'luxon';
import { Budget } from '../budget/budget';
import { Language } from '../language/language';
import { Location } from '../location/location';
import { Sensitivity } from './sensitivity';
import { TeamMember } from '../user/team-member';
import { ProjectStatus } from './status';
import { Partnership } from '../partnership/partnership';
import { ProjectEngagement } from '../project-engagement/engagement';
import { Field, ID, ObjectType, GraphQLISODateTime, InputType } from 'type-graphql';

@ObjectType()
@InputType('ProjectInput')
export class Project implements IProject {
  @Field(() => ID)
  id: string;

  @Field(type => String)
  name: string;

  @Field({ nullable: true })
  deptId: string | null;

  @Field(type => ProjectStatus, { nullable: true })
  status: ProjectStatus;

  @Field(type => Location, { nullable: true })
  location: Location | null;

  /** A version of the location that a "non-authorized" user would see. */
  @Field(type => Location, { nullable: true })
  publicLocation: Location | null;

  @Field(type => GraphQLISODateTime, { nullable: true })
  mouStart: DateTime | null;

  @Field(type => GraphQLISODateTime, { nullable: true })
  mouEnd: DateTime | null;

  @Field(type => [Language], { nullable: true })
  languages: Language[];

  @Field(type => [Partnership], { nullable: true })
  partnerships: Partnership[];

  @Field(type => Sensitivity, { nullable: true })
  sensitivity: Sensitivity;

  @Field(type => [TeamMember], { nullable: true })
  team: TeamMember[];

  @Field(type => [Budget], { nullable: true })
  budgets: Budget[];

  @Field(type => GraphQLISODateTime, { nullable: true })
  estimatedSubmission: DateTime | null;

  @Field(type => [ProjectEngagement], { nullable: true })
  engagements: ProjectEngagement[];

  static from(project: Project) {
    return Object.assign(new Project(), project);
  }
}
export interface IProject {
  id: string;
  name: string;
  deptId: string | null;
  status: ProjectStatus;
  location: Location | null;
  /** A version of the location that a "non-authorized" user would see. */
  publicLocation: Location | null;
  mouStart: DateTime | null;
  mouEnd: DateTime | null;
  languages: Language[];
  partnerships: Partnership[];
  sensitivity: Sensitivity;
  team: TeamMember[];
  budgets: Budget[];
  estimatedSubmission: DateTime | null;
  engagements: ProjectEngagement[];

}
