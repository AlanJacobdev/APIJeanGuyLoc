import { forwardRef, Module } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CommentaireController } from './commentaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commentaire } from './entities/commentaire.entity';
import { ServiceNoteCommService } from 'src/service-note-comm/service-note-comm.service';
import { FilmModule } from 'src/film/film.module';
import { Film } from 'src/film/entities/film.entity';
import { Note } from 'src/note/entities/note.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Commentaire, Film, Note]), forwardRef(() => FilmModule), forwardRef(() => CommentaireModule)],
  controllers: [CommentaireController],
  providers: [CommentaireService, ServiceNoteCommService]
})
export class CommentaireModule {}
