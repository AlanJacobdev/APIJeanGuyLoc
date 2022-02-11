import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';
import { Film } from 'src/film/entities/film.entity';
import { Note } from 'src/note/entities/note.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceNoteCommService {
    constructor( @InjectRepository(Film) private FilmRepo : Repository<Film>, @InjectRepository(Note) private NoteRepo : Repository<Note>
    , @InjectRepository(Commentaire) private CommentaireRepo : Repository<Commentaire>, @InjectRepository(Utilisateur) private UserRepo : Repository<Utilisateur>) {}

    // async getNoteFilmFromService(idFilm : number) {
    //     this.NoteRepo.find({
    //         where : {
    //           idFilm : idFilm
    //         }
    //     }).then((notes: Note[]) => {
    //             notes.forEach(note => {
    //                this.CommentaireRepo.find({
    //                     where : {
    //                         idNote : note.idNote
    //                     }   
    //                 }).then((commentaires: Commentaire[]) => {
    //                     const obj = {
    //                         notes : notes,
    //                         commentaires : commentaires
    //                     };

    //                     console.log(obj);
    //                     return obj;
    //                     // commentaires.forEach(commentaire => {
    //                     // 
    //                     // })
    //                 }) 
    //             });
    //     }).catch(e => {
    //         return {err: e}
    //     })
    //     return {err: "fin"}
    // }


    async getNoteFilmFromService(idFilm : number, idUtilisateur : number) {
        var res = {};
        res["infosCommentaires"] = [];
        const notes = await this.NoteRepo.find({where: {idFilm : idFilm}})
        if(notes != undefined){
            res["nbNotes"] = notes.length;
            res["nbCommentaires"] = 0;
            res["idCommUtilisateur"]  = null;
            res["idNoteUtilisateur"]  = null;

            for (const note of notes) {
                const user = await this.UserRepo.findOne(note.idUtilisateur);
                const comm =  await this.CommentaireRepo.findOne({where:{idNote : note.idNote}})
                var resultat = {
                    username : user.pseudonyme,
                    idUtil : user.idUtilisateur,
                    valeurNote : note.valeur,
                    idNote : note.idNote,
                    dateCom : null,
                    textCom : null,
                    idCom : null
                };

                if (comm != undefined) {
                    res["nbCommentaires"] += 1;
                    resultat["dateCom"] = comm.dateCommentaire;
                    resultat["textCom"] = comm.contenu;
                    resultat["idCom"] = comm.idCommentaire;

                    if(+note.idUtilisateur == idUtilisateur) {
                        res["idCommUtilisateur"] = comm.idCommentaire;
                    }
                }

                if(+note.idUtilisateur == idUtilisateur) {
                    res["idNoteUtilisateur"] = note.idNote;
                }
                res["infosCommentaires"].push(resultat);
            }
            return res;
        } else {
            return {
                status : HttpStatus.NOT_FOUND,
                error : 'Film doesn\'t exist'
            }
        }

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

    async getCommentaireByUser( idUser : number){
        let res = [];
        const notes  = await this.NoteRepo.find({where :{idUtilisateur : idUser}});
        if (notes != undefined && notes.length !== 0) {
            for (const note of notes) {
                const comm = await this.CommentaireRepo.findOne({where:{idNote : note.idNote}})
                if( comm != undefined) {
                    const film = await this.FilmRepo.findOne({where:{idFilm : note.idFilm}})
                    res.push({
                        note: note.valeur,
                        commentaire : comm.contenu,
                        idFilm : film.idFilm,
                        nomFilm : film.titre,
                        lienImage : film.lienImage
                    })
                   
                }
            }
            return res;
        } else {
            return {
                status : HttpStatus.NOT_FOUND,
                error : 'User doesn\'t publish comments'
            }
        }        
    }

    async getAllFilmWithNotes(){
        let films = await this.FilmRepo.find();
        let res = [];

        for (const film of films) {
            const moyenne = null ;
        }
    }
}
