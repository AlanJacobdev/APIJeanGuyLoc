import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
    @IsNotEmpty()
    idFilm : number;

    @IsNotEmpty()
    valeur : number;
}
