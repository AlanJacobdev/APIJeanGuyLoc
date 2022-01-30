import { forwardRef, Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { ServiceNoteCommService } from 'src/service-note-comm/service-note-comm.service';
import { FilmModule } from 'src/film/film.module';
import { CommentaireModule } from 'src/commentaire/commentaire.module';
import { Film } from 'src/film/entities/film.entity';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Note, Film, Commentaire, Utilisateur]), forwardRef(() => FilmModule), forwardRef(() => CommentaireModule)],
  controllers: [NoteController],
  providers: [NoteService, ServiceNoteCommService],
  exports : [NoteService]
})
export class NoteModule {}
