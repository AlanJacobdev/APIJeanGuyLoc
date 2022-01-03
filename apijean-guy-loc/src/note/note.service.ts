import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmService } from 'src/film/film.service';


@Injectable()
export class NoteService {

  constructor( @InjectRepository(Note) private noteRepo : Repository<Note>, private filmService : FilmService){}

  async create(createNoteDto: CreateNoteDto) {
    const film = await this.filmService.findOne(parseInt("" + createNoteDto.idFilm));
      if(film !== undefined) {
        if(createNoteDto.valeur > 5 || createNoteDto.valeur < 0) {
          throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Note must be between 0 and 5',
          }, HttpStatus.CONFLICT);
        }
    
        let valTest = createNoteDto.valeur * 100;
        let modulo = 0.5 * 100;
        if(((valTest % modulo) / 100) != 0) {
          throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Incorrect note format',
          }, HttpStatus.CONFLICT);
        }
    
        const note = this.noteRepo.create(createNoteDto);
        await this.noteRepo.save(note);
        return note;
      } else {
        return {Error : true};
      }
  }

  async findAll() {
    return await this.noteRepo.find();
  }

  async findOne(id: number) {
    return await this.noteRepo.findOne( {
      where : {
        idNote : id
      }
    })
  }

  async findNotes(idFilm: number) {
    return await this.noteRepo.find( {
      where : {
        idFilm : idFilm
      }
    })
  }

  async update(idNote: number, updateNoteDto: UpdateNoteDto) {
    try {
      const Note = await this.noteRepo.findOneOrFail(idNote);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    await this.noteRepo.update(idNote, updateNoteDto);
    return await this.noteRepo.findOne(idNote);  
  }

  async remove(idNote: number) {
    try {
      const Note = await this.noteRepo.findOneOrFail(idNote);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }

    await this.noteRepo.delete(idNote);
    return {};  
  }
}
