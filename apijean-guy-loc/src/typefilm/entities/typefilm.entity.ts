import { Film } from "src/film/entities/film.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('TypeFilm')
export class TypeFilm {
    
    @OneToOne(() => Film, (film: Film) => film.idTypeFilm)
    @PrimaryGeneratedColumn()
    idType : number;

    @Column() 
    nomType : string;
}
