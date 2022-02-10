import { forwardRef, Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { Categorie } from './entities/categorie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { estDeCategorie } from './entities/categorie_film.entity';
import { FilmModule } from 'src/film/film.module';


@Module({
  imports :[TypeOrmModule.forFeature([Categorie, estDeCategorie]), forwardRef(()=>FilmModule)],
  controllers: [CategorieController],
  providers: [CategorieService],
  exports : [CategorieService]
})
export class CategorieModule {}
