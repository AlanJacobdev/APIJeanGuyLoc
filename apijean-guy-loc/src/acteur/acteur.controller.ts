import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ActeurService } from './acteur.service';
import { CreateActeurDto } from './dto/create-acteur.dto';
import { UpdateActeurDto } from './dto/update-acteur.dto';

@Controller('acteur')
export class ActeurController {
  constructor(private readonly acteurService: ActeurService) {}

  @Post()
  create(@Body() createActeurDto: CreateActeurDto) {
    return this.acteurService.create(createActeurDto);
  }

  @Get()
  findAll() {
    return this.acteurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acteurService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateActeurDto: UpdateActeurDto) {
    return this.acteurService.update(+id, updateActeurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acteurService.remove(+id);
  }
}
