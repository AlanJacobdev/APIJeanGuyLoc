import { Module } from '@nestjs/common';
import { ActeurService } from './acteur.service';
import { ActeurController } from './acteur.controller';
import { Acteur } from './entities/acteur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { estActeurDans } from './entities/acteur_film.entity';
import { Film } from 'src/film/entities/film.entity';
import { FilmService } from 'src/film/film.service';

@Module({
  imports :[TypeOrmModule.forFeature([Acteur, estActeurDans, Film])],
  controllers: [ActeurController],
  providers: [ActeurService, FilmService]
})
export class ActeurModule {}
