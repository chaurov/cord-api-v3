import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ContextFunction } from 'apollo-server-core';
import { Request, Response } from 'express';
import { GqlContextType } from './common';
import { AreaResolver } from './components/area/area.resolver';
import { AreaService } from './components/area/area.service';
import { RegionResolver } from './components/region/region.resolver';
import { RegionService } from './components/region/region.service';
import { DatabaseService } from './core/database.service';
import { OrganizationService } from './components/organization/organization.service';
import { OrganizationResolver } from './components/organization/organization.resolver';
import { LanguageResolver } from './components/language/language.resolver';
import { LanguageService } from './components/language/language.service';
import { LocationResolver } from './components/location/location.resolver';
import { LocationService } from './components/location/location.service';
import { UserResolver } from './components/user/user.resolver';
import { UserService } from './components/user/user.service';
import { ProductResolver } from './components/product/product.resolver';
import { ProductService } from './components/product/product.service';
import { AdminService } from './components/admin/admin.service';
import { AdminResolver } from './components/admin/admin.resolver';
import { AuthService } from './components/auth/auth.service';
import { AuthResolver } from './components/auth/auth.resolver';

const context: ContextFunction<{ req: Request; res: Response }, GqlContextType> = ({
  req,
  res,
}) => ({
  token: req.header('token'),
});

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context,
    }),
  ],
  controllers: [],
  providers: [
    AreaResolver,
    AreaService,
    DatabaseService,
    OrganizationResolver,
    OrganizationService,
    LanguageResolver,
    LanguageService,
    LocationResolver,
    LocationService,
    RegionService,
    RegionResolver,
    UserService,
    UserResolver,
    ProductResolver,
    ProductService,
    AdminService,
    AdminResolver,
    AuthService,
    AuthResolver,
  ],
})
export class AppModule {}
