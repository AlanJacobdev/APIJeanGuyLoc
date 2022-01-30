import { Module } from '@nestjs/common';
import { LocationstreamingService } from './locationstreaming.service';
import { LocationstreamingController } from './locationstreaming.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locationstreaming } from './entities/locationstreaming.entity';

import { FilmModule } from 'src/film/film.module';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';

@Module({
  imports :[TypeOrmModule.forFeature([Locationstreaming]),FilmModule, UtilisateurModule],
  controllers: [LocationstreamingController],
  providers: [LocationstreamingService],
  exports : [LocationstreamingService]
})
export class LocationstreamingModule {}
