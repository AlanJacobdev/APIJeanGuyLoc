import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationphysiqueDto } from './create-locationphysique.dto';

export class UpdateLocationphysiqueDto extends PartialType(CreateLocationphysiqueDto) {}
