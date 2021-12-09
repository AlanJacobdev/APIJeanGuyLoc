import { IsNotEmpty } from "class-validator";

export class CreateActeurDto {
    @IsNotEmpty()
    nom : string;

    @IsNotEmpty()
    prenom : string;
}
