import { IsNotEmpty } from "class-validator"

export class CreateRealisateur_FilmDto {

    @IsNotEmpty()
    idFilm : number 

    @IsNotEmpty()
    idRealisateur : number 

}
