import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { ActeurModule } from './acteur/acteur.module';
import { RealisateurModule } from './realisateur/realisateur.module';
import { NoteModule } from './note/note.module';
import { FilmModule } from './film/film.module';
import { TypefilmModule } from './typefilm/typefilm.module';
import { CategorieModule } from './categorie/categorie.module';
import { CommentaireModule } from './commentaire/commentaire.module';
import { LocationstreamingModule } from './locationstreaming/locationstreaming.module';
import { LocationphysiqueModule } from './locationphysique/locationphysique.module';
import { ServiceNoteCommService } from './service-note-comm/service-note-comm.service';
import { Commentaire } from './commentaire/entities/commentaire.entity';
import { Film } from './film/entities/film.entity';
import { Note } from './note/entities/note.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Commentaire, Film, Note]), UtilisateurModule, ActeurModule, RealisateurModule, NoteModule, FilmModule, TypefilmModule, CategorieModule, CommentaireModule, LocationstreamingModule, LocationphysiqueModule,
  ],
  controllers: [AppController],
  providers: [AppService, ServiceNoteCommService],
})
export class AppModule {}

