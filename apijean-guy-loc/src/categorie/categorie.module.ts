import { forwardRef, Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { Categorie } from './entities/categorie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { estDeCategorie } from './entities/categorie_film.entity';
import { FilmService } from 'src/film/film.service';
import { Film } from 'src/film/entities/film.entity';
import { NoteModule } from 'src/note/note.module';
import { FilmModule } from 'src/film/film.module';
import { CommentaireModule } from 'src/commentaire/commentaire.module';
import { ServiceNoteCommService } from 'src/service-note-comm/service-note-comm.service';
import { Note } from 'src/note/entities/note.entity';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Categorie, estDeCategorie, Film, Note, Commentaire,Utilisateur]), forwardRef(() => FilmModule), forwardRef(() => NoteModule), forwardRef(() => CommentaireModule)],
  controllers: [CategorieController],
  providers: [CategorieService, FilmService, ServiceNoteCommService]
})
export class CategorieModule {}
