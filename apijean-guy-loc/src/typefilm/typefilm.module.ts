import { Module } from '@nestjs/common';
import { TypefilmService } from './typefilm.service';
import { TypefilmController } from './typefilm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeFilm } from './entities/typefilm.entity';
import { Film } from 'src/film/entities/film.entity';

@Module({
  imports :[TypeOrmModule.forFeature([TypeFilm, Film])],
  controllers: [TypefilmController],
  providers: [TypefilmService]
})
export class TypefilmModule {}
