import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('NoteFilm')
export class Note {

    @PrimaryGeneratedColumn()
    idNote : number;
    
    @Column()
    idFilm : number;
    
    @Column({type : "float"}) 
    valeur : number;

}
