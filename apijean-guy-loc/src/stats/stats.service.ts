import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/film/entities/film.entity';
import { FilmService } from 'src/film/film.service';
import { Locationphysique } from 'src/locationphysique/entities/locationphysique.entity';
import { Locationstreaming } from 'src/locationstreaming/entities/locationstreaming.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class StatsService {

    constructor(@InjectRepository(Utilisateur) private utilisateurRepo : Repository<Utilisateur>,
                @InjectRepository(Film) private filmRepo : Repository<FilmService>,
                @InjectRepository(Locationstreaming) private locationStreamingRepo : Repository<Locationstreaming>,
                @InjectRepository(Locationphysique) private LocationphysiqueRepo : Repository<Locationphysique>){}



    async getStatToHome(annee : number, mois : string){
        const nbUsers =  await this.utilisateurRepo.count();
        const nbFilms = await this.filmRepo.count();
        const nbFilmLoueAnneeStreaming = await this.locationStreamingRepo.find({dateDeLocation : Like(annee-1+"%")})
        const nbFilmLoueMoisDernierStreaming = await this.locationStreamingRepo.find({dateDeLocation : Like(annee+"-"+mois+"-%")})
        const nbFilmLoueAnneePhysique = await this.LocationphysiqueRepo.find({dateDeLocation : Like(annee-1+"%")})
        const nbFilmLoueMoisDernierPhysique = await this.LocationphysiqueRepo.find({dateDeLocation : Like(annee+"-"+mois+"-%")})
        return {
            nbUser : nbUsers,
            nbFilms : nbFilms,
            nbFilmLoueAnnee : nbFilmLoueAnneeStreaming.length+nbFilmLoueAnneePhysique.length,
            nbFilmMoisDernier : nbFilmLoueMoisDernierStreaming.length + nbFilmLoueMoisDernierPhysique.length
        }
    
    }

}
