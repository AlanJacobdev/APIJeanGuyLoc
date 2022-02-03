import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceNoteCommService } from 'src/service-note-comm/service-note-comm.service';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmService {
  
  constructor( @InjectRepository(Film) private FilmRepo : Repository<Film>, private serviceNoteComm : ServiceNoteCommService) {}

  async create(createFilmDto: CreateFilmDto) {
    try{
      const film = this.FilmRepo.create(createFilmDto);
      await this.FilmRepo.save(film);
      return film;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: e,
      }, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    return await this.FilmRepo.find();
  }

  async findCommentairesNotesFromFilm(idFilm: number) {
    return await this.serviceNoteComm.getNoteFilmFromService(idFilm);
  }
  
  findOne(id: number) {
    return this.FilmRepo.findOne( {
      where : {
        idFilm : id
      }
    })
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    try {
      const User = await this.FilmRepo.findOneOrFail(id);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    
    await this.FilmRepo.update(id, updateFilmDto);
    return await this.FilmRepo.findOne(id)

  }

  async remove(id: number) {
    try {
      const Film = await this.FilmRepo.findOneOrFail(id);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    await this.FilmRepo.delete(id);
    return {delete : true};
  }

  async getFilmRecent() {
    return await this.FilmRepo.find({
      select : [
        'idFilm',
        'titre',
        'lienImage'
      ],
      order: {
        dateSortie : "DESC"
      },
      take : 10
    });
  }

}
