import { Film } from "src/film/entities/film.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('LocationStreaming')
export class Locationstreaming {

    @PrimaryGeneratedColumn()
    idLocationStreaming : number;
    
    @Column({type : "date"})
    dateDeLocation : Date;
    
    @Column({type :"int"}) 
    duree : number;

    @Column({ unique: false })
    @ManyToOne(() => Utilisateur)
    @JoinColumn({name : 'idUtilisateur'})
    idUtilisateur : Utilisateur;
    
    @Column({ unique: false })
    @ManyToOne(() => Film)
    @JoinColumn({name : 'idFilm'})
    idFilm : Film;
    
}
