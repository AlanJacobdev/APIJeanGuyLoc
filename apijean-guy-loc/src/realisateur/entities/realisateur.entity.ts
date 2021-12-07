import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Realisateur')
export class Realisateur {

    @PrimaryGeneratedColumn()
    idRealisateur : number;
    
    @Column()
    nom : string;
    
    @Column() 
    prenom : string;

}
