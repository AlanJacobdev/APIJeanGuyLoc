import { Module } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CommentaireController } from './commentaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/note/entities/note.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Commentaire } from './entities/commentaire.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Commentaire ,Note, Utilisateur])],
  controllers: [CommentaireController],
  providers: [CommentaireService]
})
export class CommentaireModule {}
