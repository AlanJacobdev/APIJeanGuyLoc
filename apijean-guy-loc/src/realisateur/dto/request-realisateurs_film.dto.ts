import { IsNotEmpty } from "class-validator"

export class RequestRealisateur_FilmDto {

    @IsNotEmpty()
    idFilm : number 

    @IsNotEmpty()
    idRealisateurs : number[] 

}
