import { Module } from '@nestjs/common';
import { LocationphysiqueService } from './locationphysique.service';
import { LocationphysiqueController } from './locationphysique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locationphysique } from './entities/locationphysique.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Film } from 'src/film/entities/film.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Locationphysique, Utilisateur, Film])],
  controllers: [LocationphysiqueController],
  providers: [LocationphysiqueService]
})
export class LocationphysiqueModule {}
