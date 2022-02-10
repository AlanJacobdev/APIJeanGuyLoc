import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActeurDto } from './dto/create-acteur.dto';
import { UpdateActeurDto } from './dto/update-acteur.dto';
import { Acteur } from './entities/acteur.entity';
import { RequestActeurs_FilmDto } from './dto/request-acteurs_film.dto';
import { estActeurDans } from './entities/acteur_film.entity';
import { FilmService } from 'src/film/film.service';
import { CreateActeur_FilmDto } from './dto/create-acteur_film.dto';

@Injectable()
export class ActeurService {

  constructor( @InjectRepository(Acteur) private acteurRepo : Repository<Acteur>, 
    @InjectRepository(estActeurDans) private estActeurDansRepo : Repository<estActeurDans>, 
    @Inject(forwardRef(() => FilmService))  private filmService : FilmService){}

  async addActeurToFilm(requestActeurs_film : RequestActeurs_FilmDto) {
    try {
      // Recherche le film via idFilm
      const film = await this.filmService.findOne(requestActeurs_film.idFilm);
      if(film !== undefined) {
        // Si il existe alors on déroule les idActeurs
        requestActeurs_film.idActeurs.forEach(idActeur => {
          this.acteurRepo.findOne(idActeur).then(acteur => {
            if(acteur !== undefined) {
              // Après vérification de l'existance de l'idActeur
              const acteurFilm_dto : CreateActeur_FilmDto = {
                idFilm: requestActeurs_film.idFilm,
                idActeur: idActeur
              };

              this.estActeurDansRepo.save(acteurFilm_dto);
            }
          }).catch(e => {
            throw new HttpException({
              status: HttpStatus.CONFLICT,
              error: e,
            }, HttpStatus.CONFLICT);
          });
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
  
  async create(createActeurDto: CreateActeurDto) {
    const acteur = await this.acteurRepo.create(createActeurDto);
    await this.acteurRepo.save(acteur);
    return acteur;
  }

  async findAll() {
    return await this.acteurRepo.find();
  }

  async findOne(id: number) {
    return await this.acteurRepo.findOne( {
      where : {
        idActeur : id
      }
    })
  }

  async update(idActeur: number, updateActeurDto: UpdateActeurDto) {
    try {
      const Acteur = await this.acteurRepo.findOneOrFail(idActeur);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    await this.acteurRepo.update(idActeur, updateActeurDto);
    return await this.acteurRepo.findOne(idActeur);
  }

  async remove(idActeur: number) {
    try {
      const Acteur = await this.acteurRepo.findOneOrFail(idActeur);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }

    await this.acteurRepo.delete(idActeur);
    return {}; // Json validation 200 ?
  }
}
