import { IsNotEmpty } from "class-validator";

export class CreateTypeFilmDto {
    @IsNotEmpty()
    idType : number;

    @IsNotEmpty()
    nomType : string;
}
