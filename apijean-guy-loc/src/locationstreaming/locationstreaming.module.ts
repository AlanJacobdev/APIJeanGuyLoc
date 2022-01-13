import { Module } from '@nestjs/common';
import { LocationstreamingService } from './locationstreaming.service';
import { LocationstreamingController } from './locationstreaming.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locationstreaming } from './entities/locationstreaming.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Film } from 'src/film/entities/film.entity';
import { FilmService } from 'src/film/film.service';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Module({
  imports :[TypeOrmModule.forFeature([Locationstreaming, Utilisateur, Film])],
  controllers: [LocationstreamingController],
  providers: [LocationstreamingService, FilmService, UtilisateurService]
})
export class LocationstreamingModule {}
