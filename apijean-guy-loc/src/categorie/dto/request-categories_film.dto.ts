import { IsNotEmpty } from "class-validator"

export class RequestCategorie_FilmDto {

    @IsNotEmpty()
    idFilm : number 

    @IsNotEmpty()
    idCategories : number[] 

}
