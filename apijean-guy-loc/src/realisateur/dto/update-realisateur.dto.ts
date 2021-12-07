import { PartialType } from '@nestjs/mapped-types';
import { CreateRealisateurDto } from './create-realisateur.dto';

export class UpdateRealisateurDto extends PartialType(CreateRealisateurDto) {
    nom : string;
    prenom : string;
}
