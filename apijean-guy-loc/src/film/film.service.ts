import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
  
  constructor( @InjectRepository(Film) private FilmRepo : Repository<Film>, private serviceNoteComm : ServiceNoteCommService, private noteService : NoteService,  private realisateurService : RealisateurService, private categorieService : CategorieService , @Inject(forwardRef(() => ActeurService)) private acteurService : ActeurService
  ) {}

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

  async findCommentairesNotesFromFilm(idFilm: number, idUtilisateur : number) {
    return await this.serviceNoteComm.getNoteFilmFromService(idFilm, idUtilisateur);
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

  async getInfos(idFilm : number) {
    const film = await this.findOne(idFilm);

    if(film !== undefined) {
      const categories = await this.categorieService.getCategorieByFilm(idFilm);
      const realisateurs = await this.realisateurService.getRealisateurByFilm(idFilm);
      const acteurs = await this.acteurService.getActeursByFilm(idFilm);

      var res = new Object();      
      res["idFilm"] = idFilm;
      res["categories"] = [];
      res["realisateurs"] = [];
      res["acteurs"] = [];

      if(categories !== null) {
        for(const cat of categories) {
          res["categories"].push(cat.idCategorie); 
        }
      }
      
      if(realisateurs !== null) {
        for(const real of realisateurs) {
          res["realisateurs"].push(real.idRealisateur);
        }
      }

      if(acteurs !== null) {
        for(const act of acteurs) {
          res["acteurs"].push(act.idActeur);
        }
      }

      return res;
    }
    else {
      return {err : "idFilm inexistant"};
    }

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
        var objFilm = {
          idFilm : film.idFilm,
          titre : film.titre,
          lienImage : film.lienImage,
          synopsis : film.synopsis,
          moyenne : null,
          categories : [],
          type : film.idTypeFilm
        };

        const categories = await this.categorieService.getCategorieByFilm(film.idFilm);
        if(categories !== null) {
            for(const cat of categories) {
              objFilm["categories"].push(cat.idCategorie); 
            }
        }

        let moyenne = await this.noteService.getMoyenneByIdFilm(film.idFilm);
        objFilm["moyenne"] = moyenne;

        res.push({ objFilm });
      }
      return res;
    } else {
      return {
        status : HttpStatus.NOT_FOUND,
        error : "Zero films"
      }
    }
  }

  async getAffiche (id : number) {
    return this.FilmRepo.findOne({
      select : ['lienImage', 'titre'],
      where : {
        idFilm : id
      }
    })
  }

}
