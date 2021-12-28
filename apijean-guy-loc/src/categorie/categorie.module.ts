import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { Categorie } from './entities/categorie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { estDeCategorie } from './entities/categorie_film.entity';
import { FilmService } from 'src/film/film.service';
import { FilmModule } from 'src/film/film.module';
import { Film } from 'src/film/entities/film.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Categorie, estDeCategorie, Film])],
  controllers: [CategorieController],
  providers: [CategorieService, FilmService]
})
export class CategorieModule {}
