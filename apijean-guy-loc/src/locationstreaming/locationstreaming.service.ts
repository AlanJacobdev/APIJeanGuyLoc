import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmModule } from 'src/film/film.module';
import { FilmService } from 'src/film/film.service';
import { LocationphysiqueService } from 'src/locationphysique/locationphysique.service';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { Repository } from 'typeorm';
import { CreateLocationstreamingDto } from './dto/create-locationstreaming.dto';
import { UpdateLocationstreamingDto } from './dto/update-locationstreaming.dto';
import { Locationstreaming } from './entities/locationstreaming.entity';

@Injectable()
export class LocationstreamingService {
  constructor( @InjectRepository(Locationstreaming) private LocationStreamingRepo : Repository<Locationstreaming>, private filmservice : FilmService, private utilisateurservice: UtilisateurService  ) {}

  async create(createLocationstreamingDto: CreateLocationstreamingDto) {
    try{

      const filmExist = await this.filmservice.findOne(+createLocationstreamingDto.idFilm);  
      if(filmExist == undefined) {
       return {
        status: HttpStatus.CONFLICT,
        error: "Unknow film"}
      } else {
        const utilisateurservice = await this.utilisateurservice.findOneById(+createLocationstreamingDto.idUtilisateur);
        if(utilisateurservice == undefined) {
          return {
           status: HttpStatus.CONFLICT,
           error: "Unknow User"}
         } else {
          const film = this.LocationStreamingRepo.create(createLocationstreamingDto);
          await this.LocationStreamingRepo.save(film);
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
    return await this.LocationStreamingRepo.findOneOrFail();
  }

  async findOne(id: number) {
    try {
      return await this.LocationStreamingRepo.findOneOrFail( {
        where : {
          idLocationStreaming : id
        }
      })
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateLocationstreamingDto: UpdateLocationstreamingDto) {
    try {
      const Loc = await this.LocationStreamingRepo.findOneOrFail(id);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }

    await this.LocationStreamingRepo.update(id, updateLocationstreamingDto);
    return await this.LocationStreamingRepo.findOne(id)

  }

  async remove(id: number) {
    try {
      const Film = await this.LocationStreamingRepo.findOneOrFail(id);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    await this.LocationStreamingRepo.delete(id);
    return {delete : true};
  }

  



}
