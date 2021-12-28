import { Film } from "src/film/entities/film.entity";
import { Column, Entity, JoinTable, PrimaryGeneratedColumn, ManyToMany, PrimaryColumn } from "typeorm";
import { Categorie } from "./categorie.entity";

@Entity('estDeCategorie')
export class estDeCategorie {

    @PrimaryColumn()
    idFilm : number;

    @PrimaryColumn()
    idCategorie : number;
 
}
