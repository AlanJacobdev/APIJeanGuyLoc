import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmService.create(createFilmDto);
  }

  @Get()
  findAll() {
    return this.filmService.findAll();
  }

  @Get("/getInfos/:id")
  getInfos(@Param('id') id: number) {
    return this.filmService.getInfos(id);
  }

  @Get("listeFilms/getFilmsWithNote")
  getAllFilmWithNotes() {
    return this.filmService.getAllFilmWithNotes();
  }

  @Get('commentaires/:idFilm/:idUtil')
  findCommentaires(@Param('idFilm') idFilm: number, @Param('idUtil') idUtil: number) {
    return this.filmService.findCommentairesNotesFromFilm(idFilm, idUtil);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.filmService.findOne(id);
  }

  @Get('carrousel/getFilmRecents')
  getFilmRecent() {
    return this.filmService.getFilmRecent();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmService.update(id, updateFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.filmService.remove(id);
  }


}
