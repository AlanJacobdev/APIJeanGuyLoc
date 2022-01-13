import { Film } from "src/film/entities/film.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('NoteFilm')
export class Note {

    @PrimaryGeneratedColumn()
    idNote : number;
    
    @Column({ unique: false })
    @ManyToOne(() => Film)
    @JoinColumn({name : 'idFilm'})
    idFilm : Film
    
    @Column("int" , {unique : false})
    @ManyToOne(() => Utilisateur, { nullable: false })
    @JoinColumn({name : 'idUtilisateur'})
    idUtilisateur : Utilisateur
    
    @Column({type : "float"}) 
    valeur : number;

}
