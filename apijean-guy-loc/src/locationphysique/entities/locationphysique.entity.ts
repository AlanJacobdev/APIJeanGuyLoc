import { Film } from "src/film/entities/film.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('LocationPhysique')
export class Locationphysique {
    
    @PrimaryGeneratedColumn()
    idLocationFilm : number;
    
    @Column()
    dateDeLocation : string;
    
    @Column() 
    duree : string;

    @Column({ unique: false })
    @ManyToOne(() => Utilisateur)
    @JoinColumn({name : 'idUtilisateur'})
    idUtilisateur : Utilisateur;
    
    @Column({ unique: false })
    @ManyToOne(() => Film)
    @JoinColumn({name : 'idFilm'})
    idFilm : Film;
    
    @Column({default : false }) 
    estRendu  : boolean;
}
