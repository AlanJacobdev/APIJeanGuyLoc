import { Module } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CommentaireController } from './commentaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/note/entities/note.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Commentaire } from './entities/commentaire.entity';
import { NoteService } from 'src/note/note.service';
import { FilmService } from 'src/film/film.service';
import { Film } from 'src/film/entities/film.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Commentaire ,Note, Utilisateur, Film])],
  controllers: [CommentaireController],
  providers: [CommentaireService, NoteService, FilmService]
})
export class CommentaireModule {}
