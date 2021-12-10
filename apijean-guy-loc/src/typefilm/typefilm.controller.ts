import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
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
  findOne(@Param('id') id: number) {
    return this.typefilmService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTypefilmDto: UpdateTypeFilmDto) {
    return this.typefilmService.update(id, updateTypefilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.typefilmService.remove(id);
  }
}
