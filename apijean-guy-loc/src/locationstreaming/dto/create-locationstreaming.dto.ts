import { IsNotEmpty } from "class-validator";
import { Film } from "src/film/entities/film.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";

export class CreateLocationstreamingDto {

    @IsNotEmpty()
    dateDeLocation : Date;
    
    @IsNotEmpty()
    duree : string;

    @IsNotEmpty()
    idUtilisateur : Utilisateur;
    
    @IsNotEmpty()
    idFilm : Film;
}
