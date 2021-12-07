import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';


@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Post()
  create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
    return this.utilisateurService.create(createUtilisateurDto)
  }

  @Get()
  findAll() {
    return this.utilisateurService.findAll();
  }

  // @Get('/:login/:pass')
  // findOne(@Param('login') login: string, @Param('pass') pass: string) {
  //   return this.utilisateurService.findOne(login, pass);
  // }

  @Get()
  findOne(@Body('login') monUtilisateur: CreateUtilisateurDto) {
    return this.utilisateurService.findOne(monUtilisateur.pseudonyme, monUtilisateur.motDePasse);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUtilisateurDto: Partial<UpdateUtilisateurDto>) {
    return this.utilisateurService.update(id, updateUtilisateurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilisateurService.remove(+id);
  }
}
