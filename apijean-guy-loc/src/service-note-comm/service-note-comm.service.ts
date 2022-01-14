import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';
import { Film } from 'src/film/entities/film.entity';
import { Note } from 'src/note/entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceNoteCommService {
    constructor( @InjectRepository(Film) private FilmRepo : Repository<Film>, @InjectRepository(Note) private NoteRepo : Repository<Note>
    , @InjectRepository(Commentaire) private CommentaireRepo : Repository<Commentaire>) {}

    async getFilmFromService(idFilm : number) {
        const film = this.FilmRepo.findOne({
            where : {
              idFilm : idFilm
            }
        });
        return film;
    }

    async getNoteFromService(idNote : number) {
        const note = this.NoteRepo.findOne({
            where : {
              idNote : idNote
            }
        });
        return note;
    }
}
