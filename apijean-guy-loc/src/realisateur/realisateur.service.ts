import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRealisateurDto } from './dto/create-realisateur.dto';
import { UpdateRealisateurDto } from './dto/update-realisateur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Realisateur } from './entities/realisateur.entity';
import { Repository } from 'typeorm';
import { FilmService } from 'src/film/film.service';
import { estRealisePar } from './entities/realisateur_film.entity';
import { RequestRealisateur_FilmDto } from './dto/request-realisateurs_film.dto';
import { CreateRealisateur_FilmDto } from './dto/create-realisateur_film.dto';

@Injectable()
export class RealisateurService {

  constructor( @InjectRepository(Realisateur) private realisateurRepo : Repository<Realisateur>, 
    @InjectRepository(estRealisePar) private estRealiseParRepo : Repository<estRealisePar>, 
    private filmService : FilmService  ){}

  async create(createRealisateurDto: CreateRealisateurDto) {
    const realisateur = await this.realisateurRepo.create(createRealisateurDto);
    await this.realisateurRepo.save(realisateur);
    return realisateur;
  }

  async addRealisteurToFilm(requestRealisateur_film : RequestRealisateur_FilmDto) {
    try {
      // Recherche le film via idFilm
      const film = await this.filmService.findOne(requestRealisateur_film.idFilm);
      if(film !== undefined) {
        // Si il existe alors on déroule les idCategories
        requestRealisateur_film.idRealisateurs.forEach(idRealisateur => {
          const realisateur = this.realisateurRepo.findOne(idRealisateur).then(realisateur => {
            if(realisateur !== undefined) {
              // Après vérification de l'existance de l'idCategorie
              const realisateurFilm_dto : CreateRealisateur_FilmDto = {
                idFilm: requestRealisateur_film.idFilm,
                idRealisateur: idRealisateur
              };

              this.estRealiseParRepo.save(realisateurFilm_dto);
            }
          }).catch( e => {
            throw new HttpException({
              status: HttpStatus.CONFLICT,
              error: e,
            }, HttpStatus.CONFLICT);
          })
        });
      } else {
        return {Error : true};
      }
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: e,
      }, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    return await this.realisateurRepo.find();
  }

  async findOne(id: number) {
    return await this.realisateurRepo.findOne( {
      where : {
        idRealisateur : id
      }
    })
  }

  async update(idRealisateur: number, updateRealisateurDto: UpdateRealisateurDto) {
    try {
      const Realisateur = await this.realisateurRepo.findOneOrFail(idRealisateur);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    await this.realisateurRepo.update(idRealisateur, updateRealisateurDto);
    return await this.realisateurRepo.findOne(idRealisateur);
  }

  async remove(idRealisateur: number) {
    try {
      const Acteur = await this.realisateurRepo.findOneOrFail(idRealisateur);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }

    await this.realisateurRepo.delete(idRealisateur);
    return {}; // Json validation 200 ?
  }
}
