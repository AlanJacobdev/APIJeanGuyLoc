import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FilmService } from 'src/film/film.service';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { Between, MoreThan, Repository } from 'typeorm';
import { CreateLocationphysiqueDto } from './dto/create-locationphysique.dto';
import { UpdateLocationphysiqueDto } from './dto/update-locationphysique.dto';
import { Locationphysique } from './entities/locationphysique.entity';

import * as Moment from 'moment';
import { DateRange, extendMoment } from 'moment-range';
import { Like } from 'typeorm';

const moment = extendMoment(Moment);


@Injectable()
export class LocationphysiqueService {
  
  constructor( @InjectRepository(Locationphysique) private LocationPhysiqueRepo : Repository<Locationphysique>, private filmservice : FilmService, @Inject(forwardRef(() => UtilisateurService)) private utilisateurservice: UtilisateurService ) {}

  
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
            if (await this.findLocationExistante(createLocationphysiqueDto.dateDeLocation, +createLocationphysiqueDto.duree, +createLocationphysiqueDto.idFilm) == undefined){
              const film = this.LocationPhysiqueRepo.create(createLocationphysiqueDto);
              await this.LocationPhysiqueRepo.save(film);
              return film;
            } else {
              return {
                status: HttpStatus.CONFLICT,
                error: "Date already exist"
              }
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

   async findLocationExistante(date : Date, duree : number, idFilm : number) {
    const dateN = new Date(date);
    dateN.setDate(dateN.getDate()+7);
    
    if (duree === 7 ){
        return await this.LocationPhysiqueRepo.findOne( {
          where : {
            dateDeLocation : date,
            idFilm : idFilm
          }
        })
      } else if (duree === 14) {
        
        return await this.LocationPhysiqueRepo.findOne( {
          where : [{
            dateDeLocation : date,
            idFilm : idFilm
          },{
            dateDeLocation : dateN.toISOString().slice(0, 10),
            idFilm : idFilm
          }]
        })
      }
  }
  
  async findLocationExistanteWithDate(date : Date, idFilm : number) {
    const dateN = new Date(date);

    return await this.LocationPhysiqueRepo.findOne( {
      where : {
        dateDeLocation : dateN.toISOString().slice(0, 10),
        idFilm : idFilm
      }
    })
  }


  async findAll() {
    return await this.LocationPhysiqueRepo.find();
  }

  async findFilmByRenter(idUti: number, idFilm : number) {
    try {
      return await this.LocationPhysiqueRepo.find( {
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

  async getFilmPlusLoue() {
    const d = new Date();
    console.log(d);
    let month = (d.getMonth() + 1).toString();
    if(parseInt(month) < 10) {
      month = "0" + month;
    }

    const myMap = new Map();
    const Films = await this.LocationPhysiqueRepo.find({
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

  async dispoPerMonth(id:number) {
    
        var date = new Date();
        
        let calendar = [];

        for (let i = 0; i <3 ; i++) {
          let y = date.getFullYear(), m = date.getMonth()+i;
          let startDate = moment([y, m])
          let firstDay = moment(startDate).startOf('month')
          let endDay = moment(startDate).endOf('month')


          let monthRange = moment.range(firstDay, endDay);
          
          let weeks = []
          for (let mday of monthRange.by('days')) {

              if (weeks.indexOf(mday.week()) === -1) {
                  weeks.push(mday.week());
              }
          }
      
          let index; 
          if (i == 0){
            index = 0;
          } else {
            index =1
          }
          let bool = false;

          for (index; index < weeks.length; index++) {
              var weeknumber = weeks[index];

              let firstWeekDay = moment(firstDay).week(weeknumber-1).day(6);

              let lastWeekDay = moment(endDay).week(weeknumber).day(6);
              
              let fw = firstWeekDay.format('YYYY-MM-DD'); 
              let lw = lastWeekDay.format('YYYY-MM-DD'); 

              if( await this.findLocationExistanteWithDate(new Date(fw),id) == undefined) {
                bool = true;
              }else{
                bool= false;
              }
              
              calendar.push({
                "start" : fw,
                "end" :lw,
                "dispo" : bool
              })
          }
        }
        return calendar;
 
  }


  async getFilmsByUser( idUser : number) {
    let res = {};
    res["LocPhysiqueNow"] = [];
    res["LocPhysiqueOlder"] = [];
    res["LocPhysiqueCome"] = [];
    const date = new Date();
    const filmsPhysique = await this.LocationPhysiqueRepo.find({ where : {
      idUtilisateur : idUser
    }})

    let filmStruc = {
      idLocationFilm: -1 ,
      dateDeLocation: new Date(),
      duree:-1,
      idUtilisateur:-1 ,
      idFilm: -1,
      estRendu : false,
      affiche : "",
      titre : ""
    }

    for( const film of filmsPhysique) {
      const afficheFilm = await this.filmservice.getAffiche(+film.idFilm);
      const dateDebut = new Date(film.dateDeLocation);
      filmStruc = {
        idLocationFilm: film.idLocationFilm ,
        dateDeLocation: film.dateDeLocation,
        duree:film.duree,
        idUtilisateur: +film.idUtilisateur ,
        idFilm: +film.idFilm,
        estRendu : film.estRendu,
        affiche : afficheFilm.lienImage,
        titre : afficheFilm.titre
      }

      let dateFin = new Date(film.dateDeLocation);
      dateFin.setDate(dateDebut.getDate()+film.duree);
      if ((dateDebut <= date && date <= dateFin ) && !(film.estRendu)){
        res["LocPhysiqueNow"].push(filmStruc);
      } else if(date > dateFin || film.estRendu) {
        res["LocPhysiqueOlder"].push(filmStruc);
      } else {
        res["LocPhysiqueCome"].push(filmStruc);
      }
    }
    
    return res;
  }
  
}
