import { forwardRef, Module } from '@nestjs/common';
import { ActeurService } from './acteur.service';
import { ActeurController } from './acteur.controller';
import { Acteur } from './entities/acteur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { estActeurDans } from './entities/acteur_film.entity';
import { FilmModule } from 'src/film/film.module';

@Module({
  imports :[TypeOrmModule.forFeature([Acteur,estActeurDans]), forwardRef(()=>FilmModule)],
  controllers: [ActeurController],
  providers: [ActeurService],
  exports : [ActeurService]
})
export class ActeurModule {}
