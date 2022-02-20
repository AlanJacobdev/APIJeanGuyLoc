import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationphysiqueService } from 'src/locationphysique/locationphysique.service';
import { LocationstreamingService } from 'src/locationstreaming/locationstreaming.service';
import { Repository } from 'typeorm';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';

@Injectable()
export class UtilisateurService {
  
  constructor( @InjectRepository(Utilisateur) private utilisateurRepo : Repository<Utilisateur>, private locationStreamingService : LocationstreamingService,
                private locationPhysiqueService : LocationphysiqueService ){}
  
  async create(createUtilisateurDto: CreateUtilisateurDto)  {
    const pseudo = this.findOneByPseudo(createUtilisateurDto.pseudonyme);
    if (pseudo == undefined) {
        const utilisateur = this.utilisateurRepo.create(createUtilisateurDto);
        await this.utilisateurRepo.save(utilisateur);
        return utilisateur;
    } else {
      return {
        status: HttpStatus.CONFLICT,
        error: 'Pseudonyme Already Exist',
      }
    }
  }

 async findAll() {
    return await this.utilisateurRepo.find();
  }

  async findOne(pseudo: string, mdp : string) {
    return await this.utilisateurRepo.findOne( {
      where : {
        pseudonyme : pseudo ,
        motDePasse : mdp
      }
    })
  }

  async findOneById(id : number) {
    return await this.utilisateurRepo.findOne( {
      where : {
        idUtilisateur : id 
      }
    })
  }

  async findOneByPseudo (pseudo : string) {
    return await this.utilisateurRepo.findOne({
      where : {
        pseudonyme : pseudo
      }
    })
  }

  async update(idUser : number, updateUtilisateurDto: UpdateUtilisateurDto) {
    try {
      const User = await this.utilisateurRepo.findOneOrFail(idUser);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    
    await this.utilisateurRepo.update(idUser, updateUtilisateurDto);
    return await this.utilisateurRepo.findOne(idUser)

  }

  async remove(id: number) {
    try {
      const User = await this.utilisateurRepo.findOneOrFail(id);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Identifier Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    
    await this.utilisateurRepo.delete(id);
    return {delete : true};
  }

  async getFilmsByUser(id : number) {
    
    const filmsPhysique = await this.locationPhysiqueService.getFilmsByUser(id);
    const filmsStreaming = await this.locationStreamingService.getFilmsByUser(id);
    let res = {
      filmsPhysique,
      filmsStreaming
    }
    return res;
  }



  getPseudo (id :number) {
    return this.utilisateurRepo.findOne({
      where : {
        idUtilisateur : id
      },
      select : ['pseudonyme']
    })
  }
}


