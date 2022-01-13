import { IsNotEmpty, isNotEmpty } from "class-validator";
import { Film } from "src/film/entities/film.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";

export class CreateLocationphysiqueDto {
    

    @IsNotEmpty()
    dateDeLocation : Date;
    
    @IsNotEmpty()
    duree : number;

    @IsNotEmpty()
    idUtilisateur : Utilisateur;
    
    @IsNotEmpty()
    idFilm : Film;


}
