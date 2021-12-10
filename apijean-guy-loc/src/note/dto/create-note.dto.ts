import { IsNotEmpty } from "class-validator";

export class CreateNoteDto {
    @IsNotEmpty()
    idFilm : number;
    
    @IsNotEmpty()
    valeur: number;
}
