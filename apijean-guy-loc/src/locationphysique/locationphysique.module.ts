import { Module } from '@nestjs/common';
import { LocationphysiqueService } from './locationphysique.service';
import { LocationphysiqueController } from './locationphysique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locationphysique } from './entities/locationphysique.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Film } from 'src/film/entities/film.entity';
import { FilmService } from 'src/film/film.service';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Module({
  imports :[TypeOrmModule.forFeature([Locationphysique, Utilisateur, Film])],
  controllers: [LocationphysiqueController],
  providers: [LocationphysiqueService, FilmService, UtilisateurService]
})
export class LocationphysiqueModule {}
