import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports : [UtilisateurModule, PassportModule,
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '3600s'},
  }),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports : [AuthService]
})
export class AuthModule {}
