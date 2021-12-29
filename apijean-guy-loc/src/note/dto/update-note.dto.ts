import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Film } from 'src/film/entities/film.entity';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
    @IsNotEmpty()
    idFilm : Film;

    @IsNotEmpty()
    valeur : number;
}
