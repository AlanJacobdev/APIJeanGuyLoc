import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypefilmService } from './typefilm.service';
import { CreateTypeFilmDto } from './dto/create-typefilm.dto';
import { UpdateTypeFilmDto } from './dto/update-typefilm.dto';

@Controller('typefilm')
export class TypefilmController {
  constructor(private readonly typefilmService: TypefilmService) {}

  @Post()
  create(@Body() createTypefilmDto: CreateTypeFilmDto) {
    return this.typefilmService.create(createTypefilmDto);
  }

  @Get()
  findAll() {
    return this.typefilmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typefilmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypefilmDto: UpdateTypeFilmDto) {
    return this.typefilmService.update(+id, updateTypefilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typefilmService.remove(+id);
  }
}
