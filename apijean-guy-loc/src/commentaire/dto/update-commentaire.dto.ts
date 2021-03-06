import { IsNotEmpty } from "class-validator";
import { Note } from "src/note/entities/note.entity";

export class UpdateCommentaireDto {
    @IsNotEmpty()
    idNote : Note;

    @IsNotEmpty()
    dateCommentaire : Date;
    
    @IsNotEmpty()
    contenu : string;
}
