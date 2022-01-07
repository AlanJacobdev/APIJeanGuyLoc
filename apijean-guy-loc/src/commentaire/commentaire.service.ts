import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';
import { Commentaire } from './entities/commentaire.entity';

@Injectable()
export class CommentaireService {
  constructor(@InjectRepository(Commentaire) private commentaireRepo : Repository<Commentaire>){}

  create(createCommentaireDto: CreateCommentaireDto) {
    return 'This action adds a new commentaire';
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

  async update(id: number, updateCommentaireDto: UpdateCommentaireDto) {
    try {
      const categorie = await this.commentaireRepo.findOneOrFail(id);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
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
}
