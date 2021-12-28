import { IsNotEmpty } from "class-validator"

export class RequestActeurs_FilmDto {

    @IsNotEmpty()
    idFilm : number 

    @IsNotEmpty()
    idActeurs : number[] 

}
