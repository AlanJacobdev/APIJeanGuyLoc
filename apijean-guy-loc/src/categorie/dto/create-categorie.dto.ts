import { IsNotEmpty } from "class-validator";

export class CreateCategorieDto {
        
    @IsNotEmpty()
    nomCategorie: string;

}
