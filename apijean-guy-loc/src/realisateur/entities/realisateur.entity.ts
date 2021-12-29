import { Film } from "src/film/entities/film.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Realisateur')
export class Realisateur {

    @PrimaryGeneratedColumn()
    idRealisateur : number;
    
    @Column()
    nom : string;
    
    @Column() 
    prenom : string;

    @ManyToMany(type => Film, film => film.realisateurs)
    @JoinTable({
        name: "estRealisePar",
        joinColumn: {
            name: "idRealisateur",
            referencedColumnName: "idRealisateur",
        },
        inverseJoinColumn: {
            name: "idFilm",
            referencedColumnName: "idFilm",
        },
    })
    films: Film[]
}
