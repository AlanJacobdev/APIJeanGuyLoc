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

    async getNoteFilmFromService(idFilm : number) {
        this.NoteRepo.find({
            where : {
              idFilm : idFilm
            }
        }).then((notes: Note[]) => {
                notes.forEach(note => {
                   this.CommentaireRepo.find({
                        where : {
                            idNote : note.idNote
                        }   
                    }).then((commentaires: Commentaire[]) => {
                        const obj = {
                            notes : notes,
                            commentaires : commentaires
                        };

                        console.log(obj);
                        return obj;
                        // commentaires.forEach(commentaire => {
                        // 
                        // })
                    }) 
                });
        }).catch(e => {
            return {err: e}
        })
        return {err: "fin"}
    }

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
