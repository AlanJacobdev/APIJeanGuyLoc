import { Entity, PrimaryColumn } from "typeorm";

@Entity('estActeurDans')
export class estActeurDans {

    @PrimaryColumn()
    idFilm : number;

    @PrimaryColumn()
    idActeur : number;
 
}
