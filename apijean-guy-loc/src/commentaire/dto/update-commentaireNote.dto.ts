import { IsNotEmpty } from "class-validator";
import { Note } from "src/note/entities/note.entity";

export class UpdateCommentaireNoteDto {
    @IsNotEmpty()
    idNote : Note;

    @IsNotEmpty()
    valeurNote : number;

    @IsNotEmpty()
    dateCommentaire : Date;
    
    @IsNotEmpty()
    contenu : string;
}
