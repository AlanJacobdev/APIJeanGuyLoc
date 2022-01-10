import { IsNotEmpty } from "class-validator";
import { Note } from "src/note/entities/note.entity";

export class CreateCommentaireDto {

    @IsNotEmpty()
    idNote : Note;

    @IsNotEmpty()
    dateCommentaire : Date;
    
    @IsNotEmpty()
    contenu : string;
}
