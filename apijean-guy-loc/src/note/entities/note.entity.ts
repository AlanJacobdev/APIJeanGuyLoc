import { Column, Double, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('NoteFilm')
export class Note {

    @PrimaryGeneratedColumn()
    idNote : number;
    
    @Column()
    idFilm : number;
    
    @Column() 
    valeur : number;

}
