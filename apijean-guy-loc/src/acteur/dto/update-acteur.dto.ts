import { PartialType } from '@nestjs/mapped-types';
import { CreateActeurDto } from './create-acteur.dto';

export class UpdateActeurDto extends PartialType(CreateActeurDto) {
    nom : string;
    prenom : string;
}
