import { IsNotEmpty } from "class-validator";

export class CreateUtilisateurDto {
    @IsNotEmpty()
    pseudonyme : string;
    
    @IsNotEmpty()
    motDePasse : string;
    
    @IsNotEmpty()
    adresse    : string;
    
    @IsNotEmpty()
    nom        : string;
    
    @IsNotEmpty()
    prenom     : string;
    
    @IsNotEmpty()
    estAdmin   : boolean;
}
