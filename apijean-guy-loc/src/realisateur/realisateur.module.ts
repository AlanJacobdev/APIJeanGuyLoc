import { Module } from '@nestjs/common';
import { RealisateurService } from './realisateur.service';
import { RealisateurController } from './realisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Realisateur } from './entities/realisateur.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Realisateur])],
  controllers: [RealisateurController],
  providers: [RealisateurService]
})
export class RealisateurModule {}
