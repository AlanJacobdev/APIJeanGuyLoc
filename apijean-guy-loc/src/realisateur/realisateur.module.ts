import { Module } from '@nestjs/common';
import { RealisateurService } from './realisateur.service';
import { RealisateurController } from './realisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Realisateur } from './entities/realisateur.entity';
import { estRealisePar } from './entities/realisateur_film.entity';
import { Film } from 'src/film/entities/film.entity';
import { FilmService } from 'src/film/film.service';

@Module({
  imports :[TypeOrmModule.forFeature([Realisateur, estRealisePar, Film])],
  controllers: [RealisateurController],
  providers: [RealisateurService, FilmService]
})
export class RealisateurModule {}
