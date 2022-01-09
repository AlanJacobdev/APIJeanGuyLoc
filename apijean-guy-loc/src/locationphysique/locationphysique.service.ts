import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmService } from 'src/film/film.service';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { Repository } from 'typeorm';
import { CreateLocationphysiqueDto } from './dto/create-locationphysique.dto';
import { UpdateLocationphysiqueDto } from './dto/update-locationphysique.dto';
import { Locationphysique } from './entities/locationphysique.entity';

@Injectable()
export class LocationphysiqueService {
  
  constructor( @InjectRepository(Locationphysique) private LocationPhysiqueRepo : Repository<Locationphysique>, private filmservice : FilmService, private utilisateurservice: UtilisateurService ) {}

  
  async create(createLocationphysiqueDto: CreateLocationphysiqueDto) {
    try{
      const filmExist = await this.filmservice.findOne(+createLocationphysiqueDto.idFilm);  
      if(filmExist == undefined) {
       return {
        status: HttpStatus.CONFLICT,
        error: "Unknow film"}
      } else {
        const utilisateurservice = await this.utilisateurservice.findOneById(+createLocationphysiqueDto.idUtilisateur);
        if(utilisateurservice == undefined) {
          return {
           status: HttpStatus.CONFLICT,
           error: "Unknow User"}
         } else {
          const film = this.LocationPhysiqueRepo.create(createLocationphysiqueDto);
          await this.LocationPhysiqueRepo.save(film);
          return film;
         }
      }
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: e,
      }, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    return await this.LocationPhysiqueRepo.find();
  }

  async findOne(id: number) {
    try {
      return await this.LocationPhysiqueRepo.findOneOrFail( {
        where : {
          idLocationFilm : id
        }
      })
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
  }

  async update(id: number, updateLocationphysiqueDto: UpdateLocationphysiqueDto) {
    try {
      const Loc = await this.LocationPhysiqueRepo.findOneOrFail(id);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    
    await this.LocationPhysiqueRepo.update(id, updateLocationphysiqueDto);
    return await this.LocationPhysiqueRepo.findOne(id)
  }

  async remove(id: number) {
    try {
      const Film = await this.LocationPhysiqueRepo.findOneOrFail(id);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    await this.LocationPhysiqueRepo.delete(id);
    return {delete : true};
  }
  
}
