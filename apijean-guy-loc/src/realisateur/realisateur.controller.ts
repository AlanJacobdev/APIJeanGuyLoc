import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { RealisateurService } from './realisateur.service';
import { CreateRealisateurDto } from './dto/create-realisateur.dto';
import { UpdateRealisateurDto } from './dto/update-realisateur.dto';
import { RequestRealisateur_FilmDto } from './dto/request-realisateurs_film.dto';

@Controller('realisateur')
export class RealisateurController {
  constructor(private readonly realisateurService: RealisateurService) {}

  @Post()
  create(@Body() createRealisateurDto: CreateRealisateurDto) {
    return this.realisateurService.create(createRealisateurDto);
  }

  @Post('/add')
  AddRealisateur(@Body() requestRealisateur_Film : RequestRealisateur_FilmDto) {
    return this.realisateurService.addRealisteurToFilm(requestRealisateur_Film);
  }

  @Get()
  findAll() {
    return this.realisateurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realisateurService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRealisateurDto: UpdateRealisateurDto) {
    return this.realisateurService.update(+id, updateRealisateurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realisateurService.remove(+id);
  }
}
