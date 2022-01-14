import { forwardRef, Module } from '@nestjs/common';
import { LocationphysiqueService } from './locationphysique.service';
import { LocationphysiqueController } from './locationphysique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locationphysique } from './entities/locationphysique.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Film } from 'src/film/entities/film.entity';
import { FilmService } from 'src/film/film.service';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { CommentaireModule } from 'src/commentaire/commentaire.module';
import { NoteModule } from 'src/note/note.module';
import { FilmModule } from 'src/film/film.module';
import { ServiceNoteCommService } from 'src/service-note-comm/service-note-comm.service';
import { Note } from 'src/note/entities/note.entity';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Locationphysique, Utilisateur, Film, Note, Commentaire]), forwardRef(() => FilmModule), forwardRef(() => NoteModule), forwardRef(() => CommentaireModule)],
  controllers: [LocationphysiqueController],
  providers: [LocationphysiqueService, FilmService, UtilisateurService, ServiceNoteCommService]
})
export class LocationphysiqueModule {}
