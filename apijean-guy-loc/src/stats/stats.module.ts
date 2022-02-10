import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Locationphysique } from 'src/locationphysique/entities/locationphysique.entity';
import { Locationstreaming } from 'src/locationstreaming/entities/locationstreaming.entity';
import { Film } from 'src/film/entities/film.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Utilisateur, Film, Locationphysique, Locationstreaming])],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
