import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Utilisateur')
export class Utilisateur {
    
    @PrimaryGeneratedColumn()
    idUtilisateur : number;
    
    @Column({ unique: true })
    pseudonyme : string;
    
    @Column() 
    motDePasse : string;

    @Column() 
    adresse    : string;

    @Column() 
    nom         : string;

    @Column() 
    prenom      : string;

    @Column() 
    estAdmin    : boolean;
    
}
