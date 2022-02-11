import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { LocationphysiqueService } from './locationphysique.service';
import { CreateLocationphysiqueDto } from './dto/create-locationphysique.dto';
import { UpdateLocationphysiqueDto } from './dto/update-locationphysique.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('locationphysique')
export class LocationphysiqueController {
  constructor(private readonly locationphysiqueService: LocationphysiqueService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLocationphysiqueDto: CreateLocationphysiqueDto) {
    return this.locationphysiqueService.create(createLocationphysiqueDto);
  }

  @Get()
  findAll() {
    return this.locationphysiqueService.findAll();
  }

  @Get('dispo/:id')
  getDisponibilite(@Param('id') id: number) {
    return this.locationphysiqueService.dispoPerMonth(id);
  }

  @Get('FilmByUsers/:idFilm/:idUti')
  findFilmByRenter(@Param('idFilm') idFilm: number, @Param('idUti') idUti: number ) {
    return this.locationphysiqueService.findFilmByRenter(idUti, idFilm);
  }

  @Get("/film/PlusLoue")
  getFilmPlusLoue() {
    return this.locationphysiqueService.getFilmPlusLoue();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.locationphysiqueService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateLocationphysiqueDto: UpdateLocationphysiqueDto) {
    return this.locationphysiqueService.update(+id, updateLocationphysiqueDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationphysiqueService.remove(+id);
  }
}
