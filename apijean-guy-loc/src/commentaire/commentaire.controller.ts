import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireNoteDto } from './dto/update-commentaireNote.dto';

@Controller('commentaire')
export class CommentaireController {
  constructor(private readonly commentaireService: CommentaireService) {}

  @Post()
  create(@Body() createCommentaireDto: CreateCommentaireDto) {
    return this.commentaireService.create(createCommentaireDto);
  }

  @Get()
  findAll() {
    return this.commentaireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentaireService.findOne(+id);
  }

  @Get('/getCommentaireByUser/:id')
  getCommentaireByUser(@Param('id') id: number) {
    return this.commentaireService.getCommentaireByUser(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentaireNoteDto: UpdateCommentaireNoteDto) {
    return this.commentaireService.update(+id, updateCommentaireNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentaireService.remove(+id);
  }
}
