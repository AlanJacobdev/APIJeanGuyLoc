import { IsNotEmpty } from "class-validator"
import { TypeFilm } from "src/typefilm/entities/typefilm.entity"

export class CreateFilmDto {

    @IsNotEmpty()
    idTypeFilm : TypeFilm 

    @IsNotEmpty()
    titre : string

    @IsNotEmpty()
    lienImage : string

    @IsNotEmpty()
    lienBandeAnnonce : string

    @IsNotEmpty()
    synopsis : string

    @IsNotEmpty()
    duree : number

    @IsNotEmpty()
    dateSortie : Date
}
