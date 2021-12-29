import { Film } from "src/film/entities/film.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('NoteFilm')
export class Note {

    @PrimaryGeneratedColumn()
    idNote : number;
    
    @Column({ unique: false })
    @ManyToOne(() => Film)
    @JoinColumn({name : 'idFilm'})
    idFilm : Film
    //idFilm : number;
    
    @Column({type : "float"}) 
    valeur : number;

}
