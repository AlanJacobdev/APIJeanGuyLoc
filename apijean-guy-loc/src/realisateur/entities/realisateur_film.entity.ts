import { Entity, PrimaryColumn } from "typeorm";

@Entity('estRealisePar')
export class estRealisePar {

    @PrimaryColumn()
    idFilm : number;

    @PrimaryColumn()
    idRealisateur : number;
 
}
