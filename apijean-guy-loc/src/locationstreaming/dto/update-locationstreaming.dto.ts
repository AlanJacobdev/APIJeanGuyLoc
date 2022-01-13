import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationstreamingDto } from './create-locationstreaming.dto';

export class UpdateLocationstreamingDto extends PartialType(CreateLocationstreamingDto) {}
