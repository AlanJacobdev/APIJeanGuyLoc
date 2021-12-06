import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Utilisateur')
export class Utilisateur {
    
    @PrimaryGeneratedColumn()
    idUtilisateur : number;
    
    @Column() 
    pseudonyme : string;
    
    @Column() 
    motDePasse : string;

    @Column() 
    adresse    : string;

    @Column() 
    nom         : string;

    @Column() 
    prenom      : string;

    
    
}
