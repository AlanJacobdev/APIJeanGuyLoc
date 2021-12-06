import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';

@Injectable()
export class UtilisateurService {
  
  constructor( @InjectRepository(Utilisateur) private utilisateurRepo : Repository<Utilisateur>  ){}
  
  async create(createUtilisateurDto: CreateUtilisateurDto) {
    const utilisateur = await this.utilisateurRepo.create(createUtilisateurDto);
    await this.utilisateurRepo.save(utilisateur);
    return utilisateur;
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

  update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
    return `This action updates a #${id} utilisateur`;
  }

  remove(id: number) {
    return `This action removes a #${id} utilisateur`;
  }
}
