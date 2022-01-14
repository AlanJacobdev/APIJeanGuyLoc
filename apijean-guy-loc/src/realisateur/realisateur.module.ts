import { forwardRef, Module } from '@nestjs/common';
import { RealisateurService } from './realisateur.service';
import { RealisateurController } from './realisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Realisateur } from './entities/realisateur.entity';
import { estRealisePar } from './entities/realisateur_film.entity';
import { Film } from 'src/film/entities/film.entity';
import { FilmService } from 'src/film/film.service';
import { FilmModule } from 'src/film/film.module';
import { NoteModule } from 'src/note/note.module';
import { CommentaireModule } from 'src/commentaire/commentaire.module';
import { ServiceNoteCommService } from 'src/service-note-comm/service-note-comm.service';
import { Note } from 'src/note/entities/note.entity';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Realisateur, estRealisePar, Film, Note, Commentaire]), forwardRef(() => FilmModule), forwardRef(() => NoteModule), forwardRef(() => CommentaireModule)],
  controllers: [RealisateurController],
  providers: [RealisateurService, FilmService, ServiceNoteCommService]
})
export class RealisateurModule {}
