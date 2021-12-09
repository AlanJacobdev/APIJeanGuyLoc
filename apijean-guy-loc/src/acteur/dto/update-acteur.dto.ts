import { PartialType } from '@nestjs/mapped-types';
import { CreateActeurDto } from './create-acteur.dto';
import { IsNotEmpty } from "class-validator";

export class UpdateActeurDto extends PartialType(CreateActeurDto) {
    @IsNotEmpty()
    nom : string;

    @IsNotEmpty()
    prenom : string;
}
