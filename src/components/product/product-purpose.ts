import { registerEnumType } from 'type-graphql';

export enum ProductPurpose {
  EvangelismChurchPlanting = 'evangelism_church_planting',
  ChurchLife = 'church_life',
  ChurchMaturity = 'church_maturity',
  Discipleship = 'discipleship',
  SocialIssues = 'social_issues',
}

registerEnumType(ProductPurpose, {
  name: 'ProductPurpose',
});
