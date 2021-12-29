import { IsNotEmpty } from "class-validator";
import { Film } from "src/film/entities/film.entity";

export class CreateNoteDto {
    @IsNotEmpty()
    idFilm : Film;
    
    @IsNotEmpty()
    valeur: number;
}
