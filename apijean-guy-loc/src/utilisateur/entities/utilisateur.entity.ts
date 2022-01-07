import { Note } from "src/note/entities/note.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Utilisateur')
export class Utilisateur {
    
    @OneToMany(() => Note, (note: Note) => note.idUtilisateur)
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

    @Column({default : false }) 
    estAdmin    : boolean;
    
}
