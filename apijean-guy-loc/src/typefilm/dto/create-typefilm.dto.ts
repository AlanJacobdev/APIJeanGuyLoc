import { IsNotEmpty } from "class-validator";

export class CreateTypeFilmDto {

    @IsNotEmpty()
    nomType : string;
}
