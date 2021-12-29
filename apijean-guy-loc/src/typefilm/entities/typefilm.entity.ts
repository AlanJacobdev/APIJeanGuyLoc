import { Film } from "src/film/entities/film.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('TypeFilm')
@Unique(["nomType"])
export class TypeFilm {
    
    @OneToMany(() => Film, (film: Film) => film.idTypeFilm)
    @PrimaryGeneratedColumn()
    idType : number;

    @Column({ name : 'nomType' })
    nomType : string;
}
