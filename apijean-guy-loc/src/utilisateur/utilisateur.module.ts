import { forwardRef, Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { LocationphysiqueModule } from 'src/locationphysique/locationphysique.module';
import { LocationstreamingModule } from 'src/locationstreaming/locationstreaming.module';

@Module({
  imports :[TypeOrmModule.forFeature([Utilisateur]), forwardRef(() =>LocationphysiqueModule), forwardRef(() =>LocationstreamingModule)],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  exports : [UtilisateurService]
})
export class UtilisateurModule {}
