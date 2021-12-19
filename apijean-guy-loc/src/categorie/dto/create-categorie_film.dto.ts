import { IsNotEmpty } from "class-validator"

export class CreateCategorie_FilmDto {

    @IsNotEmpty()
    idFilm : number 

    @IsNotEmpty()
    idCategorie : number 

}
