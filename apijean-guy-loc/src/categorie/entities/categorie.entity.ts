import { Film } from "src/film/entities/film.entity";
import { Column, Entity, JoinTable, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity('CategorieFilm')
export class Categorie {

    @PrimaryGeneratedColumn()
    idCategorie : number;
    
    @Column()
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
