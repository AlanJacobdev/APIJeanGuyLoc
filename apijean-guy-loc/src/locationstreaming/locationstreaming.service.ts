import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmService } from 'src/film/film.service';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { Like, Repository } from 'typeorm';
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
           if (await this.findIfAlreadyExist(+createLocationstreamingDto.idFilm, +createLocationstreamingDto.idUtilisateur, createLocationstreamingDto.dateDeLocation) === undefined){
            const film = this.LocationStreamingRepo.create(createLocationstreamingDto);
            await this.LocationStreamingRepo.save(film);
            return film;
           } else {
            return {
              status: HttpStatus.CONFLICT,
              error: "Already rent"}
           }
         }
      }
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: e,
      }, HttpStatus.CONFLICT);
    }
  }

  async getFilmPlusLoue() {
    const d = new Date();
    console.log(d);
    let month = (d.getMonth() + 1).toString();
    if(parseInt(month) < 10) {
      month = "0" + month;
    }

    const myMap = new Map();
    const Films = await this.LocationStreamingRepo.find({
      where : {
        dateDeLocation : Like("%-" + month + "-%")
      }
    });

    for(const film of Films){
      if(myMap.get(film.idFilm) != null) {
        myMap.set(film.idFilm, myMap.get(film.idFilm) + 1);
      } 
      else {
        myMap.set(film.idFilm, 1);
      }
    }

    let idFilm = -1;
    let maxLoc = 0;
    for(const key of myMap.keys()) {
      if(myMap.get(key) > maxLoc) {
        maxLoc = myMap.get(key);
        idFilm = key;
      }
    }
    
    if(idFilm != -1) {
      const film = await this.filmservice.findOne(idFilm);
      return {
        idFIlm : film.idFilm,
        lienImg : film.lienImage,
        titre : film.titre
      };
    }
    else {
      return {
        status: HttpStatus.NOT_FOUND,
        error: 'idFilm Not Found',   
      }
    }
  }

  async findAll() {
    return await this.LocationStreamingRepo.find();
  }

  async findAllById (id : number) {
    return await this.LocationStreamingRepo.find({ where : {
      idFilm : id
    }});
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


  async findFilmByRenter(idUti: number, idFilm : number) {
    try {
      return await this.LocationStreamingRepo.find( {
        where : {
          idFilm : idFilm,
          idUtilisateur : idUti
        }
      })
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
  }


  async findIfAlreadyExist(idFilm : number, idUti : number, date: Date) {
    
    let dateNew = new Date (date);
    let tabRes = await this.LocationStreamingRepo.find( {
        where : {
          idFilm : idFilm,
          idUtilisateur : idUti
        }
      })

    for (let i = 0; i < tabRes.length; i++) {
      let dateDebut = new Date(tabRes[i].dateDeLocation);
      let dateFin = new Date(tabRes[i].dateDeLocation);
      await dateFin.setDate(dateFin.getDate()+parseInt(tabRes[i].duree));   
      if ( dateNew >= dateDebut && dateNew <= dateFin ){
        return tabRes[i];
      }
    }
      return undefined;
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
