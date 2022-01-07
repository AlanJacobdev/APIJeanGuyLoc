import { IsNotEmpty, isNotEmpty } from "class-validator";
import { Film } from "src/film/entities/film.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";

export class CreateLocationphysiqueDto {
    

    @IsNotEmpty()
    dateDeLocation : string;
    
    @IsNotEmpty()
    duree : string;

    @IsNotEmpty()
    idUtilisateur : Utilisateur;
    
    @IsNotEmpty()
    idFilm : Film;


}
