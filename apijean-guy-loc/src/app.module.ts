import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { UtilisateurController } from './utilisateur/utilisateur.controller';
import { UtilisateurModule } from './utilisateur/utilisateur.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), UtilisateurModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

