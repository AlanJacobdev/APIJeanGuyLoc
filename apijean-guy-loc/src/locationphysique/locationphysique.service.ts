import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FilmService } from 'src/film/film.service';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { Repository } from 'typeorm';
import { CreateLocationphysiqueDto } from './dto/create-locationphysique.dto';
import { UpdateLocationphysiqueDto } from './dto/update-locationphysique.dto';
import { Locationphysique } from './entities/locationphysique.entity';

import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);


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

  async dispoPerMonth() {
    
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

          for (index; index < weeks.length; index++) {
              var weeknumber = weeks[index];

              let firstWeekDay = moment(firstDay).week(weeknumber-1).day(6);

              let lastWeekDay = moment(endDay).week(weeknumber).day(6);
              
              let fw = firstWeekDay.format('DD-MM-YYYY'); 
              let lw = lastWeekDay.format('DD-MM-YYYY'); 

              calendar.push({
                "start" : fw,
                "end" :lw  
              })
          }
        }
        return calendar;
 
  }
  
}
