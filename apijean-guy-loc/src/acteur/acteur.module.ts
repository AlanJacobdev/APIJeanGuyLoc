import { forwardRef, Module } from '@nestjs/common';
import { ActeurService } from './acteur.service';
import { ActeurController } from './acteur.controller';
import { Acteur } from './entities/acteur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { estActeurDans } from './entities/acteur_film.entity';
import { Film } from 'src/film/entities/film.entity';
import { FilmService } from 'src/film/film.service';
import { ServiceNoteCommService } from 'src/service-note-comm/service-note-comm.service';
import { NoteModule } from 'src/note/note.module';
import { CommentaireModule } from 'src/commentaire/commentaire.module';
import { FilmModule } from 'src/film/film.module';
import { Note } from 'src/note/entities/note.entity';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Acteur, estActeurDans, Film, Note, Commentaire, Utilisateur]), forwardRef(() => FilmModule), forwardRef(() => NoteModule), forwardRef(() => CommentaireModule)],
  controllers: [ActeurController],
  providers: [ActeurService, FilmService, ServiceNoteCommService]
})
export class ActeurModule {}
