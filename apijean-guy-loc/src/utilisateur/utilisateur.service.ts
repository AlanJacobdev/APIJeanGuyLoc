import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';

@Injectable()
export class UtilisateurService {
  
  constructor( @InjectRepository(Utilisateur) private utilisateurRepo : Repository<Utilisateur>  ){}
  
 
  async create(createUtilisateurDto: CreateUtilisateurDto)  {
    try{
      const utilisateur = await this.utilisateurRepo.create(createUtilisateurDto);
      await this.utilisateurRepo.save(utilisateur);
      return utilisateur;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Already Exists',
      }, HttpStatus.CONFLICT);
    }
  }

 async findAll() {
    return await this.utilisateurRepo.find();
    //return `This action returns all utilisateur`;
  }

  async findOne(pseudo: string, mdp : string) {
    return await this.utilisateurRepo.findOne( {
      where : {
        pseudonyme : pseudo ,
        motDePasse : mdp
      }
    })
  }

  async update(idUser : string, updateUtilisateurDto: UpdateUtilisateurDto) {
    
    const User = await this.utilisateurRepo.findOneOrFail(idUser);
    if (!User.idUtilisateur) {
      // tslint:disable-next-line:no-console
      console.error("User doesn't exist");
    } 
    
    await this.utilisateurRepo.update(idUser, updateUtilisateurDto);
    return await this.utilisateurRepo.findOne(idUser)
  }

  remove(id: number) {
    return `This action removes a #${id} utilisateur`;
  }
}


