import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Injectable()
export class AuthService {

    constructor (private utilisateurService : UtilisateurService, private jwtService: JwtService){}

    
    async validateUser(username: string, password: string): Promise<any> {
        const utilisateur = await this.utilisateurService.findOne(username, password);
        
        if(utilisateur && utilisateur.motDePasse === password){
          return utilisateur
          }else {
            return null
          }
      }
    
      async login(user: any) {
        
        const payload = { username: user.pseudonyme, password: user.motDePasse };
        return {
          access_token: this.jwtService.sign(payload),
          idUtilisateur : user.idUtilisateur
        };
      }
    

}
