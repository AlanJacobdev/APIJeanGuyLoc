import { Injectable } from '@nestjs/common';
import { CreateTypeFilmDto } from './dto/create-typefilm.dto';
import { UpdateTypeFilmDto } from './dto/update-typefilm.dto';

@Injectable()
export class TypefilmService {
  create(createTypefilmDto: CreateTypeFilmDto) {
    return 'This action adds a new typefilm';
  }

  findAll() {
    return `This action returns all typefilm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typefilm`;
  }

  update(id: number, updateTypefilmDto: UpdateTypeFilmDto) {
    return `This action updates a #${id} typefilm`;
  }

  remove(id: number) {
    return `This action removes a #${id} typefilm`;
  }
}
