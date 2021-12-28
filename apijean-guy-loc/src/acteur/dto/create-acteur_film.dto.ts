import { IsNotEmpty } from "class-validator"

export class CreateActeur_FilmDto {

    @IsNotEmpty()
    idFilm : number 

    @IsNotEmpty()
    idActeur : number 

}
