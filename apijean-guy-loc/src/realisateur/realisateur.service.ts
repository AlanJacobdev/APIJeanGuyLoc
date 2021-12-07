import { Injectable } from '@nestjs/common';
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

  update(id: number, updateRealisateurDto: UpdateRealisateurDto) {
    return `This action updates a #${id} realisateur`;
  }

  async remove(id: number) {
    return await this.realisateurRepo.delete(id);
  }
}
