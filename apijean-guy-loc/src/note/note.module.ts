import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Film } from 'src/film/entities/film.entity';
import { FilmService } from 'src/film/film.service';

@Module({
  imports :[TypeOrmModule.forFeature([Note, Film])],
  controllers: [NoteController],
  providers: [NoteService, FilmService]
})
export class NoteModule {}
