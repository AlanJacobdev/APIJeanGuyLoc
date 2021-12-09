import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Acteur')
export class Acteur {

    @PrimaryGeneratedColumn()
    idActeur : number;
    
    @Column()
    nom : string;
    
    @Column() 
    prenom : string;

}
