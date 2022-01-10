import { IsNotEmpty } from "class-validator";
import { Film } from "src/film/entities/film.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";

export class CreateNoteDto {
    @IsNotEmpty()
    idFilm : Film;
    
    @IsNotEmpty()
    valeur: number;
    
    @IsNotEmpty()
    idUtilisateur: Utilisateur;
}
