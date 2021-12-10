import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entities/categorie.entity';

@Injectable()
export class CategorieService {
  
  constructor( @InjectRepository(Categorie) private categorieRepo : Repository<Categorie>  ){}

  async create(createCategorieDto: CreateCategorieDto) {
    try{
      const categorie = await this.categorieRepo.create(createCategorieDto);
      await this.categorieRepo.save(categorie);
      return categorie;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Already Exists',
      }, HttpStatus.CONFLICT);
    }  }

  async findAll() {
    return await this.categorieRepo.find();
  }

  async findOne(id: number) {
    try{
      return await this.categorieRepo.findOneOrFail({
        where : {
          idCategorie : id
        }
      })
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }  
  }

  async update(idCategorie: number, updateCategorieDto: UpdateCategorieDto) {
    try {
      const categorie = await this.categorieRepo.findOneOrFail(idCategorie);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    await this.categorieRepo.update(idCategorie, updateCategorieDto);
    return await this.categorieRepo.findOne(idCategorie)
  }

  async remove(idCategorie: number) {
    try {
      const User = await this.categorieRepo.findOneOrFail(idCategorie);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    await this.categorieRepo.delete(idCategorie);
    return {delete : true};  }
}
