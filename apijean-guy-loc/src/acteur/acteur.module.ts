import { Module } from '@nestjs/common';
import { ActeurService } from './acteur.service';
import { ActeurController } from './acteur.controller';
import { Acteur } from './entities/acteur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports :[TypeOrmModule.forFeature([Acteur])],
  controllers: [ActeurController],
  providers: [ActeurService]
})
export class ActeurModule {}
