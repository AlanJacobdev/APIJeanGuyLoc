import { forwardRef, Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { Film } from './entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceNoteCommService } from 'src/service-note-comm/service-note-comm.service';
import { NoteModule } from 'src/note/note.module';
import { CommentaireModule } from 'src/commentaire/commentaire.module';
import { Note } from 'src/note/entities/note.entity';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { RealisateurModule } from 'src/realisateur/realisateur.module';
import { ActeurModule } from 'src/acteur/acteur.module';
import { CategorieModule } from 'src/categorie/categorie.module';

@Module({
  imports :[TypeOrmModule.forFeature([Film, Note, Commentaire, Utilisateur]), forwardRef(() => NoteModule), forwardRef(() => CommentaireModule),  forwardRef(() => RealisateurModule),  forwardRef(() => ActeurModule), forwardRef(() =>  CategorieModule)],
  controllers: [FilmController],
  providers: [FilmService, ServiceNoteCommService],
  exports : [FilmService]
})
export class FilmModule {}
