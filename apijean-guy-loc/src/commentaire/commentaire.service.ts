import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateNoteDto } from 'src/note/dto/update-note.dto';
import { Note } from 'src/note/entities/note.entity';
import { NoteService } from 'src/note/note.service';
import { ServiceNoteCommService } from 'src/service-note-comm/service-note-comm.service';
import { Repository } from 'typeorm';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';
import { UpdateCommentaireNoteDto } from './dto/update-commentaireNote.dto';
import { Commentaire } from './entities/commentaire.entity';

@Injectable()
export class CommentaireService {

  constructor(@InjectRepository(Commentaire) private commentaireRepo : Repository<Commentaire>, private serviceNoteComm : ServiceNoteCommService){}

  async create(createCommentaireDto: CreateCommentaireDto) {
      try {
        // Recherche de la note via idNote
        const note = await this.serviceNoteComm.getNoteFromService(+createCommentaireDto.idNote);
        if(note !== undefined) {
          // Si il existe alors on effectue l'ajout
          this.commentaireRepo.save(createCommentaireDto);
        } else {
          return {Error : true};
        }
      } catch (e) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: e,
        }, HttpStatus.CONFLICT);
      }
  }

  async findAll() {
    return await this.commentaireRepo.find();
  }

  async findOne(id: number) {
    try{
      return await this.commentaireRepo.findOneOrFail({
        where : {
          idCommentaire : id
        }
      })
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }  
  }

  async update(id: number, updateCommentaireNoteDto: UpdateCommentaireNoteDto) {
    try {
      const commentaire = await this.commentaireRepo.findOneOrFail(id);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }

    console.log(updateCommentaireNoteDto);

    let updateCommentaireDto : UpdateCommentaireDto = {
        idNote : updateCommentaireNoteDto.idNote,
        dateCommentaire : updateCommentaireNoteDto.dateCommentaire,
        contenu : updateCommentaireNoteDto.contenu
    }

    let note : Note = await this.serviceNoteComm.getNoteFromService(+updateCommentaireNoteDto.idNote);
    let updateNoteDto : UpdateNoteDto = {
      idFilm : note.idFilm,
      idUtilisateur : note.idUtilisateur,
      valeur : updateCommentaireNoteDto.valeurNote
    }

    await this.serviceNoteComm.updateNote(note.idNote, updateNoteDto);
    await this.commentaireRepo.update(id, updateCommentaireDto);
    return await this.commentaireRepo.findOne(id)  
  }

  async remove(id: number) {
    try {
      const User = await this.commentaireRepo.findOneOrFail(id);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    await this.commentaireRepo.delete(id);
    return {delete : true};   }

    async getCommentaireByUser(id: number) {
      return await this.serviceNoteComm.getCommentaireByUser(id);
    }

}
