import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActeurService } from 'src/acteur/acteur.service';
import { CategorieService } from 'src/categorie/categorie.service';
import { NoteService } from 'src/note/note.service';
import { RealisateurService } from 'src/realisateur/realisateur.service';
import { ServiceNoteCommService } from 'src/service-note-comm/service-note-comm.service';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmService {
  
  constructor( @InjectRepository(Film) private FilmRepo : Repository<Film>, private serviceNoteComm : ServiceNoteCommService, private noteService : NoteService, private acteurService : ActeurService
  , private realisateurService : RealisateurService, private categorieService : CategorieService) {}

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

  async getAllFilmWithNotes(){
    let films = await this.FilmRepo.find();
    let res = [];
    if (films != undefined) {
      for (const film of films) {
          let moyenne = await this.noteService.getMoyenneByIdFilm(film.idFilm) ;
            res.push({
              idFilm : film.idFilm,
              titre : film.titre,
              lienImage : film.lienImage,
              synopsis : film.synopsis,
              moyenne : moyenne
            })
      }
      return res;
    } else {
      return {
        status : HttpStatus.NOT_FOUND,
        error : "Zero films"
      }
    }
  }

}
