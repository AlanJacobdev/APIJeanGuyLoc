import { Film } from "src/film/entities/film.entity";
import { Column, Entity, JoinTable, PrimaryGeneratedColumn, ManyToMany, Unique } from "typeorm";

@Entity('CategorieFilm')
@Unique(["nomCategorie"])
export class Categorie {

    @PrimaryGeneratedColumn()
    idCategorie : number;
    
    @Column({ name : 'nomCategorie' })
    nomCategorie : string;
    
    @ManyToMany(type => Film, film => film.categories)
    @JoinTable({
        name: "estDeCategorie",
        joinColumn: {
            name: "idCategorie",
            referencedColumnName: "idCategorie",
        },
        inverseJoinColumn: {
            name: "idFilm",
            referencedColumnName: "idFilm",
        },
    })
    films: Film[]
}
