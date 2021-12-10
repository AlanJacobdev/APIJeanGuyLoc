import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { Film } from './entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeFilm } from 'src/typefilm/entities/typefilm.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Film, TypeFilm])],
  controllers: [FilmController],
  providers: [FilmService]
})
export class FilmModule {}
