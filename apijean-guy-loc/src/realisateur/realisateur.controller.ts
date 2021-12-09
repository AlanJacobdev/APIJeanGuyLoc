import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RealisateurService } from './realisateur.service';
import { CreateRealisateurDto } from './dto/create-realisateur.dto';
import { UpdateRealisateurDto } from './dto/update-realisateur.dto';

@Controller('realisateur')
export class RealisateurController {
  constructor(private readonly realisateurService: RealisateurService) {}

  @Post()
  create(@Body() createRealisateurDto: CreateRealisateurDto) {
    return this.realisateurService.create(createRealisateurDto);
  }

  @Get()
  findAll() {
    return this.realisateurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realisateurService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRealisateurDto: UpdateRealisateurDto) {
    return this.realisateurService.update(+id, updateRealisateurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realisateurService.remove(+id);
  }
}
