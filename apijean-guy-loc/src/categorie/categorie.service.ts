import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entities/categorie.entity';
import { FilmService } from 'src/film/film.service';
import { estDeCategorie } from './entities/categorie_film.entity';
import { CreateCategorie_FilmDto } from './dto/create-categorie_film.dto';
import { RequestCategorie_FilmDto } from './dto/request-categories_film.dto';

@Injectable()
export class CategorieService {
  
  constructor( @InjectRepository(Categorie) private categorieRepo : Repository<Categorie>, @InjectRepository(estDeCategorie) private estDeCategorieRepo : Repository<estDeCategorie>, @Inject(forwardRef(() => FilmService)) private filmService : FilmService  ){}

  async create(createCategorieDto: CreateCategorieDto) {
    try{
      const categorie = this.categorieRepo.create(createCategorieDto);
      await this.categorieRepo.save(categorie);
      return categorie;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Already Exists',
      }, HttpStatus.CONFLICT);
    }  
  }

  async getCategorieByFilm(idFilm: number) {
    const categories = await this.estDeCategorieRepo.find({
      where : {
        idFilm : idFilm
      }
    })

    if(categories !== undefined) {
      return categories;
    }
    else {
      return null;
    }
  }

  async addCategorieToFilm(requestCategories_film : RequestCategorie_FilmDto) {
    try {
      // Recherche le film via idFilm
      const film = await this.filmService.findOne(requestCategories_film.idFilm);
      if(film !== undefined) {
        // Si il existe alors on déroule les idCategories
        requestCategories_film.idCategories.forEach(async idCategorie => {
          this.categorieRepo.findOne(idCategorie).then(categorie => {
            if(categorie !== undefined) {
              // Après vérification de l'existance de l'idCategorie
              const categorieFilm_dto : CreateCategorie_FilmDto = {
                idFilm: requestCategories_film.idFilm,
                idCategorie: idCategorie
              };

              this.estDeCategorieRepo.save(categorieFilm_dto);
            }
          }).catch(e => {
            throw new HttpException({
              status: HttpStatus.CONFLICT,
              error: e,
            }, HttpStatus.CONFLICT);
          });
        });
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
    return {delete : true};  
  }
}
