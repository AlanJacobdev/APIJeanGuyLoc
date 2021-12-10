import { Film } from "src/film/entities/film.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('TypeFilm')
export class TypeFilm {
    
    @OneToMany(() => Film, (film: Film) => film.idTypeFilm)
    @PrimaryGeneratedColumn()
    idType : number;

    @Column() 
    nomType : string;
}
