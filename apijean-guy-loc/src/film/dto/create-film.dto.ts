import { IsNotEmpty } from "class-validator"

export class CreateFilmDto {
    @IsNotEmpty()
    idFilm : number

    @IsNotEmpty()
    idTypeFilm : number 

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
