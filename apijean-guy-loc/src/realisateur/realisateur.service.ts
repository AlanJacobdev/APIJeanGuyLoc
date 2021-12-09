import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRealisateurDto } from './dto/create-realisateur.dto';
import { UpdateRealisateurDto } from './dto/update-realisateur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Realisateur } from './entities/realisateur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RealisateurService {

  constructor( @InjectRepository(Realisateur) private realisateurRepo : Repository<Realisateur>){}

  async create(createRealisateurDto: CreateRealisateurDto) {
    const realisateur = await this.realisateurRepo.create(createRealisateurDto);
    await this.realisateurRepo.save(realisateur);
    return realisateur;
  }

  async findAll() {
    return await this.realisateurRepo.find();
  }

  async findOne(id: number) {
    return await this.realisateurRepo.findOne( {
      where : {
        idRealisateur : id
      }
    })
  }

  async update(idRealisateur: number, updateRealisateurDto: UpdateRealisateurDto) {
    try {
      const Realisateur = await this.realisateurRepo.findOneOrFail(idRealisateur);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    await this.realisateurRepo.update(idRealisateur, updateRealisateurDto);
    return await this.realisateurRepo.findOne(idRealisateur);
  }

  async remove(idRealisateur: number) {
    try {
      const Acteur = await this.realisateurRepo.findOneOrFail(idRealisateur);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }

    await this.realisateurRepo.delete(idRealisateur);
    return {}; // Json validation 200 ?
  }
}
