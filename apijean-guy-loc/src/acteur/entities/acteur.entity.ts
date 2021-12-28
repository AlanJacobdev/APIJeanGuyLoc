import { Film } from "src/film/entities/film.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Acteur')
export class Acteur {

    @PrimaryGeneratedColumn()
    idActeur : number;
    
    @Column()
    nom : string;
    
    @Column() 
    prenom : string;

    @ManyToMany(type => Film, film => film.acteurs)
    @JoinTable({
        name: "estActeurDans",
        joinColumn: {
            name: "idActeur",
            referencedColumnName: "idActeur",
        },
        inverseJoinColumn: {
            name: "idFilm",
            referencedColumnName: "idFilm",
        },
    })
    films: Film[]
}
