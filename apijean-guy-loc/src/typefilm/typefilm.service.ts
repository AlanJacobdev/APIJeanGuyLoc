import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeFilmDto } from './dto/create-typefilm.dto';
import { UpdateTypeFilmDto } from './dto/update-typefilm.dto';
import { TypeFilm } from './entities/typefilm.entity';

@Injectable()
export class TypefilmService {
  constructor( @InjectRepository(TypeFilm) private TypeFilmRepo : Repository<TypeFilm> ) {}

  async create(createTypefilmDto: CreateTypeFilmDto) {
    try{
      const film = this.TypeFilmRepo.create(createTypefilmDto);
      await this.TypeFilmRepo.save(film);
      return film;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: e,
      }, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    return await this.TypeFilmRepo.find();
  }

  findOne(id: number) {
    try {
      return this.TypeFilmRepo.findOneOrFail( {
        where : {
          idType : id
        }
      })
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateTypefilmDto: UpdateTypeFilmDto) {
    try {
      const User = await this.TypeFilmRepo.findOneOrFail(id);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
 
    await this.TypeFilmRepo.update(id, updateTypefilmDto);
    return await this.TypeFilmRepo.findOne(id)
  }

  async remove(id: number) {
    try {
      const Film = await this.TypeFilmRepo.findOneOrFail(id);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }

  try{ 
    await this.TypeFilmRepo.delete(id);
    return {delete : true};
  } catch (e) {
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'Impossible to delete Type',
    }, HttpStatus.NOT_FOUND);
  }
  }
}
