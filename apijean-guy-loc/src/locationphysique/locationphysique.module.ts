import { forwardRef, Module } from '@nestjs/common';
import { LocationphysiqueService } from './locationphysique.service';
import { LocationphysiqueController } from './locationphysique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locationphysique } from './entities/locationphysique.entity';
import { FilmModule } from 'src/film/film.module';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';

@Module({
  imports :[TypeOrmModule.forFeature([Locationphysique]), FilmModule, forwardRef(() =>UtilisateurModule)],
  controllers: [LocationphysiqueController],
  providers: [LocationphysiqueService],
  exports : [LocationphysiqueService]
})
export class LocationphysiqueModule {}
