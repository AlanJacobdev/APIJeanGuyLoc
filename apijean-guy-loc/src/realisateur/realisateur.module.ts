import { Module } from '@nestjs/common';
import { RealisateurService } from './realisateur.service';
import { RealisateurController } from './realisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Realisateur } from './entities/realisateur.entity';
import { estRealisePar } from './entities/realisateur_film.entity';
import { FilmModule } from 'src/film/film.module';


@Module({
  imports :[TypeOrmModule.forFeature([Realisateur, estRealisePar]), FilmModule],
  controllers: [RealisateurController],
  providers: [RealisateurService],
  exports : [RealisateurService]
})
export class RealisateurModule {}
