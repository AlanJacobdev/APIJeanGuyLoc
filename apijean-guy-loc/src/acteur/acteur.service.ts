import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActeurDto } from './dto/create-acteur.dto';
import { UpdateActeurDto } from './dto/update-acteur.dto';
import { Acteur } from './entities/acteur.entity';

@Injectable()
export class ActeurService {

  constructor( @InjectRepository(Acteur) private acteurRepo : Repository<Acteur>){}

  async create(createActeurDto: CreateActeurDto) {
    const acteur = await this.acteurRepo.create(createActeurDto);
    await this.acteurRepo.save(acteur);
    return acteur;
  }

  async findAll() {
    return await this.acteurRepo.find();
  }

  async findOne(id: number) {
    return await this.acteurRepo.findOne( {
      where : {
        idActeur : id
      }
    })
  }

  update(id: number, updateActeurDto: UpdateActeurDto) {
    return `This action updates a #${id} acteur`;
  }

  async remove(id: number) {
    return await this.acteurRepo.delete(id);
  }
}
