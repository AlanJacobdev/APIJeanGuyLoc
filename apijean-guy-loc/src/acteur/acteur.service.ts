import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async update(idActeur: number, updateActeurDto: UpdateActeurDto) {
    try {
      const Acteur = await this.acteurRepo.findOneOrFail(idActeur);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    await this.acteurRepo.update(idActeur, updateActeurDto);
    return await this.acteurRepo.findOne(idActeur);
  }

  async remove(idActeur: number) {
    try {
      const Acteur = await this.acteurRepo.findOneOrFail(idActeur);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }

    await this.acteurRepo.delete(idActeur);
    return {}; // Json validation 200 ?
  }
}
