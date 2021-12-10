import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeFilmDto } from './create-typefilm.dto';

export class UpdateTypeFilmDto extends PartialType(CreateTypeFilmDto) {}
