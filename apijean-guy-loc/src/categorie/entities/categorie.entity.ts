import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('CategorieFilm')
export class Categorie {

    @PrimaryGeneratedColumn()
    idCategorie : number;
    
    @Column()
    nomCategorie : string;
    
}
